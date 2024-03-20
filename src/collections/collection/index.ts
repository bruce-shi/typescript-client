import Connection from '../../connection/grpc.js';
import { ConsistencyLevel } from '../../data/index.js';
import { DbVersionSupport } from '../../utils/dbVersion.js';

import aggregate, { metrics, Aggregate, Metrics } from '../aggregate/index.js';
import { backupCollection, BackupCollection } from '../backup/collection.js';
import config, { Config } from '../config/index.js';
import data, { Data } from '../data/index.js';
import filter, { Filter } from '../filters/index.js';
import generate, { Generate } from '../generate/index.js';
import { Iterator } from '../iterator/index.js';
import query, { Query } from '../query/index.js';
import sort, { Sort } from '../sort/index.js';
import tenants, { Tenant, Tenants } from '../tenants/index.js';
import { QueryMetadata, QueryProperty, QueryReference } from '../types/index.js';

export interface Collection<T = undefined, N = string> {
  /** This namespace includes all the querying methods available to you when using Weaviate's standard aggregation capabilities. */
  aggregate: Aggregate<T>;
  /** This namespace includes all the backup methods available to you when backing up a collection in Weaviate. */
  backup: BackupCollection;
  /** This namespace includes all the CRUD methods available to you when modifying the configuration of the collection in Weaviate. */
  config: Config<T>;
  /** This namespace includes all the CUD methods available to you when modifying the data of the collection in Weaviate. */
  data: Data<T>;
  /** This namespace includes the methods by which you can create the `FilterValue<V>` values for use when filtering queries over your collection. */
  filter: Filter<T extends undefined ? any : T>;
  /** This namespace includes all the querying methods available to you when using Weaviate's generative capabilities. */
  generate: Generate<T>;
  /** This namespace includes the methods by which you can create the `MetricsX` values for use when aggregating over your collection. */
  metrics: Metrics<T>;
  /** The name of the collection. */
  name: N;
  /** This namespace includes all the querying methods available to you when using Weaviate's standard query capabilities. */
  query: Query<T>;
  /** This namespaces includes the methods by which you can create the `Sorting<T>` values for use when sorting queries over your collection. */
  sort: Sort<T>;
  /** This namespace includes all the CRUD methods available to you when modifying the tenants of a multi-tenancy-enabled collection in Weaviate. */
  tenants: Tenants;
  /**
   * Use this method to return an iterator over the objects in the collection.
   *
   * This iterator keeps a record of the last object that it returned to be used in each subsequent call to Weaviate.
   * Once the collection is exhausted, the iterator exits.
   *
   * @param {IteratorOptions<T>} opts The options to use when fetching objects from Weaviate.
   * @returns {Iterator<T>} An iterator over the objects in the collection as an async generator.
   *
   * @description If `return_properties` is not provided, all the properties of each object will be
   * requested from Weaviate except for its vector as this is an expensive operation. Specify `include_vector`
   * to request the vector back as well. In addition, if `return_references=None` then none of the references
   * are returned. Use `wvc.QueryReference` to specify which references to return.
   */
  iterator: (opts?: IteratorOptions<T>) => Iterator<T>;
  /**
   * Use this method to return a collection object specific to a single consistency level.
   *
   * If replication is not configured for this collection then Weaviate will throw an error.
   *
   * This method does not send a request to Weaviate. It only returns a new collection object that is specific to the consistency level you specify.
   *
   * @param {ConsistencyLevel} consistencyLevel The consistency level to use.
   * @returns {Collection<T, N>} A new collection object specific to the consistency level you specified.
   */
  withConsistency: (consistencyLevel: ConsistencyLevel) => Collection<T, N>;
  /**
   * Use this method to return a collection object specific to a single tenant.
   *
   * If multi-tenancy is not configured for this collection then Weaviate will throw an error.
   *
   * This method does not send a request to Weaviate. It only returns a new collection object that is specific to the tenant you specify.
   *
   * @param {string | Tenant} tenant The tenant name or tenant object to use.
   * @returns {Collection<T, N>} A new collection object specific to the tenant you specified.
   */
  withTenant: (tenant: string | Tenant) => Collection<T, N>;
}

export type IteratorOptions<T> = {
  includeVector?: boolean | string[];
  returnMetadata?: QueryMetadata;
  returnProperties?: QueryProperty<T>[];
  returnReferences?: QueryReference<T>[];
};

const collection = <T, N>(
  connection: Connection,
  name: N,
  dbVersionSupport: DbVersionSupport,
  consistencyLevel?: ConsistencyLevel,
  tenant?: Tenant
) => {
  const queryCollection = query<T>(
    connection,
    name as string,
    dbVersionSupport,
    consistencyLevel,
    tenant?.name
  );
  return {
    aggregate: aggregate<T>(connection, name as string, dbVersionSupport, consistencyLevel, tenant?.name),
    backup: backupCollection(connection, name as string),
    config: config<T>(connection, name as string, tenant?.name),
    data: data<T>(connection, name as string, dbVersionSupport, consistencyLevel, tenant?.name),
    filter: filter<T extends undefined ? any : T>(),
    generate: generate<T>(connection, name as string, dbVersionSupport, consistencyLevel, tenant?.name),
    metrics: metrics<T>(),
    name: name,
    query: queryCollection,
    sort: sort<T>(),
    tenants: tenants(connection, name as string),
    iterator: (opts?: IteratorOptions<T>) =>
      new Iterator<T>((limit: number, after?: string) =>
        queryCollection
          .fetchObjects({
            limit,
            after,
            includeVector: opts?.includeVector,
            returnMetadata: opts?.returnMetadata,
            returnProperties: opts?.returnProperties,
            returnReferences: opts?.returnReferences,
          })
          .then((res) => res.objects)
      ),
    withConsistency: (consistencyLevel: ConsistencyLevel) =>
      collection<T, N>(connection, name, dbVersionSupport, consistencyLevel, tenant),
    withTenant: (tenant: string | Tenant) =>
      collection<T, N>(
        connection,
        name,
        dbVersionSupport,
        consistencyLevel,
        typeof tenant === 'string' ? { name: tenant } : tenant
      ),
  };
};

export default collection;
