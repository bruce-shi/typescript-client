import ConnectionGQL from './gql.js';
import { ConnectionParams } from './http.js';

import { ConsistencyLevel } from '../data/index.js';

import { ChannelCredentials, ChannelOptions, createChannel, createClientFactory, Metadata } from 'nice-grpc';
import { deadlineMiddleware } from 'nice-grpc-client-middleware-deadline';

import { WeaviateDefinition } from '../proto/v1/weaviate.js';
import { HealthDefinition, HealthCheckResponse_ServingStatus } from '../proto/google/health/v1/health.js';

import Batcher, { Batch } from '../grpc/batcher.js';
import Searcher, { Search } from '../grpc/searcher.js';
import { DbVersionSupport, initDbVersionProvider } from '../utils/dbVersion.js';
import TenantsManager, { Tenants } from '../grpc/tenantsManager.js';

import { WeaviateGRPCUnavailableError } from '../errors.js';

export interface GrpcConnectionParams extends ConnectionParams {
  grpcAddress: string;
  grpcSecure: boolean;
}

const clientFactory = createClientFactory().use(deadlineMiddleware);

const MAX_GRPC_MESSAGE_LENGTH = 104858000; // 10mb, needs to be synchronized with GRPC server

// Must extend from ConnectionGQL so that it can be passed to all the builder methods,
// which are tightly coupled to ConnectionGQL
export default class ConnectionGRPC extends ConnectionGQL {
  private grpc: GrpcClient;
  private grpcAddress: string;

  private constructor(params: GrpcConnectionParams) {
    super(params);
    this.grpc = grpcClient(params);
    this.grpcAddress = params.grpcAddress;
  }

  static use = async (params: GrpcConnectionParams) => {
    const connection = new ConnectionGRPC(params);
    const dbVersionProvider = initDbVersionProvider(connection);
    const dbVersionSupport = new DbVersionSupport(dbVersionProvider);
    const settled = await Promise.allSettled([
      dbVersionSupport.supportsCompatibleGrpcService().then((check) => {
        if (!check.supports) {
          throw new Error(check.message);
        }
      }),
      connection.connect(),
    ]);
    settled.forEach((promise) => {
      if (promise.status === 'rejected') {
        throw new Error(promise.reason);
      }
    });
    return { connection, dbVersionProvider, dbVersionSupport };
  };

  private async connect() {
    const isHealthy = await this.grpc.health();
    if (!isHealthy) {
      throw new WeaviateGRPCUnavailableError(this.grpcAddress);
    }
  }

  search = (collection: string, consistencyLevel?: ConsistencyLevel, tenant?: string) => {
    if (this.authEnabled) {
      return this.login().then((token) =>
        this.grpc.search(collection, consistencyLevel, tenant, `Bearer ${token}`)
      );
    }
    return new Promise<Search>((resolve) => resolve(this.grpc.search(collection, consistencyLevel, tenant)));
  };

  batch = (collection: string, consistencyLevel?: ConsistencyLevel, tenant?: string) => {
    if (this.authEnabled) {
      return this.login().then((token) =>
        this.grpc.batch(collection, consistencyLevel, tenant, `Bearer ${token}`)
      );
    }
    return new Promise<Batch>((resolve) => resolve(this.grpc.batch(collection, consistencyLevel, tenant)));
  };

  tenants = (collection: string) => {
    if (this.authEnabled) {
      return this.login().then((token) => this.grpc.tenants(collection, `Bearer ${token}`));
    }
    return new Promise<Tenants>((resolve) => resolve(this.grpc.tenants(collection)));
  };

  close = () => {
    this.grpc.close();
    this.http.close();
  };
}

export interface GrpcClient {
  close: () => void;
  batch: (
    collection: string,
    consistencyLevel?: ConsistencyLevel,
    tenant?: string,
    bearerToken?: string
  ) => Batch;
  health: () => Promise<boolean>;
  search: (
    collection: string,
    consistencyLevel?: ConsistencyLevel,
    tenant?: string,
    bearerToken?: string
  ) => Search;
  tenants: (collection: string, bearerToken?: string) => Tenants;
}

export const grpcClient = (config: GrpcConnectionParams): GrpcClient => {
  const channelOptions: ChannelOptions = {
    'grpc.max_send_message_length': MAX_GRPC_MESSAGE_LENGTH,
    'grpc.max_receive_message_length': MAX_GRPC_MESSAGE_LENGTH,
  };
  if (config.grpcProxyUrl) {
    // grpc.http_proxy is not used by grpc.js under-the-hood
    // only uses the env var and whether http_proxy is enabled
    process.env.grpc_proxy = config.grpcProxyUrl;
    channelOptions['grpc.enabled_http_proxy'] = true;
  }
  const channel = createChannel(
    config.grpcAddress,
    config.grpcSecure ? ChannelCredentials.createSsl() : ChannelCredentials.createInsecure(),
    channelOptions
  );
  const client = clientFactory.create(WeaviateDefinition, channel);
  const health = clientFactory.create(HealthDefinition, channel);
  return {
    close: () => channel.close(),
    batch: (collection: string, consistencyLevel?: ConsistencyLevel, tenant?: string, bearerToken?: string) =>
      Batcher.use(
        client,
        collection,
        new Metadata(bearerToken ? { ...config.headers, authorization: bearerToken } : config.headers),
        consistencyLevel,
        tenant
      ),
    health: () =>
      health
        .check({ service: '/grpc.health.v1.Health/Check' })
        .then((res) => res.status === HealthCheckResponse_ServingStatus.SERVING),
    search: (
      collection: string,
      consistencyLevel?: ConsistencyLevel,
      tenant?: string,
      bearerToken?: string
    ) =>
      Searcher.use(
        client,
        collection,
        new Metadata(bearerToken ? { ...config.headers, authorization: bearerToken } : config.headers),
        consistencyLevel,
        tenant
      ),
    tenants: (collection: string, bearerToken?: string) =>
      TenantsManager.use(
        client,
        collection,
        new Metadata(bearerToken ? { ...config.headers, authorization: bearerToken } : config.headers)
      ),
  };
};
