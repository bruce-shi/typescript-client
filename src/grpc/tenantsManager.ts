import { Metadata } from 'nice-grpc';
import { TenantsGetReply, TenantsGetRequest } from '../proto/v1/tenants.js';
import { WeaviateClient } from '../proto/v1/weaviate.js';
import Base from './base.js';

export type TenantsGetArgs = {
  names?: string[];
};

export interface Tenants {
  withGet: (args: TenantsGetArgs) => Promise<TenantsGetReply>;
}

export default class TenantsManager extends Base implements TenantsManager {
  public static use(
    connection: WeaviateClient,
    collection: string,
    metadata: Metadata,
    timeout: number
  ): Tenants {
    return new TenantsManager(connection, collection, metadata, timeout);
  }

  public withGet = (args: TenantsGetArgs) =>
    this.call(TenantsGetRequest.fromPartial({ names: args.names ? { values: args.names } : undefined }));

  private call(message: TenantsGetRequest) {
    return this.sendWithTimeout((signal: AbortSignal) =>
      this.connection.tenantsGet(
        {
          ...message,
          collection: this.collection,
        },
        {
          metadata: this.metadata,
          signal,
        }
      )
    );
  }
}
