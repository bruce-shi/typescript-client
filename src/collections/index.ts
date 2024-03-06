import Connection from '../connection/grpc';
import { DbVersionSupport } from '../utils/dbVersion';
import collection, { Collection } from './collection';
import { ClassCreator, ClassDeleter, ClassGetter, SchemaGetter } from '../schema';
import {
  CollectionConfig,
  CollectionConfigCreate,
  ModuleConfig,
  NamedVectorConfigCreate,
  Properties,
} from './types';
import ClassExists from '../schema/classExists';
import { classToCollection, resolveProperty, resolveReference, ReferenceTypeGuards } from './config';
import { ConsistencyLevel } from '../data';
import { WeaviateClass } from '..';

export interface IBuilder {
  withConsistencyLevel(consistencyLevel: ConsistencyLevel): this;
  withTenant(tenant: string): this;
}

export const addContext = <B extends IBuilder>(
  builder: B,
  consistencyLevel?: ConsistencyLevel,
  tenant?: string
): B => {
  if (consistencyLevel) {
    builder = builder.withConsistencyLevel(consistencyLevel);
  }
  if (tenant) {
    builder = builder.withTenant(tenant);
  }
  return builder;
};

const isLegacyVectorizer = (
  argument: ModuleConfig<string, any> | NamedVectorConfigCreate<any, string, string, string, any>[]
): argument is ModuleConfig<string, any> => {
  return !Array.isArray(argument);
};

const collections = (connection: Connection, dbVersionSupport: DbVersionSupport) => {
  const listAll = () =>
    new SchemaGetter(connection)
      .do()
      .then((schema) => (schema.classes ? schema.classes.map(classToCollection<any>) : []));
  const deleteCollection = (name: string) => new ClassDeleter(connection).withClassName(name).do();
  return {
    create: async function <TProperties = any, TName = string>(
      config: CollectionConfigCreate<TProperties, TName>
    ) {
      const { name, invertedIndex, multiTenancy, replication, sharding, vectorIndex, ...rest } = config;

      const moduleConfig: any = {};
      if (config.generative) {
        moduleConfig[config.generative.name] = config.generative.config ? config.generative.config : {};
      }

      let vectorizer: string | undefined;
      let vectorsConfig: any | undefined;
      if (config.vectorizer === undefined) {
        vectorizer = 'none';
        vectorsConfig = undefined;
      } else if (isLegacyVectorizer(config.vectorizer)) {
        vectorizer = config.vectorizer.name;
        vectorsConfig = undefined;
        moduleConfig[vectorizer] = config.vectorizer.config ? config.vectorizer.config : {};
      } else {
        vectorizer = undefined;
        vectorsConfig = {};
        config.vectorizer.forEach((v) => {
          const vectorConfig: any = {
            vectorIndexConfig: v.vectorIndexConfig,
            vectorIndexType: v.vectorIndexType,
            vectorizer: {},
          };
          vectorConfig.vectorizer[v.vectorizer.name] = v.vectorizer.config ? v.vectorizer.config : {};
          vectorsConfig![v.name] = vectorConfig;
        });
      }

      const properties = config.properties
        ? config.properties.map((prop) => resolveProperty<TProperties>(prop, vectorizer))
        : [];
      const references = config.references ? config.references.map(resolveReference<TProperties>) : [];

      const schema = {
        ...rest,
        class: name,
        vectorizer: vectorizer || 'none',
        invertedIndexConfig: invertedIndex,
        moduleConfig: moduleConfig,
        multiTenancyConfig: multiTenancy,
        properties: [...properties, ...references],
        replicationConfig: replication,
        shardingConfig: sharding,
        vectorConfig: vectorsConfig,
        vectorIndexConfig: vectorIndex ? vectorIndex.config : undefined,
        vectorIndexType: vectorIndex ? vectorIndex.name : 'hnsw',
      };
      await new ClassCreator(connection).withClass(schema).do();
      return collection<TProperties, TName>(connection, name, dbVersionSupport);
    },
    createFromSchema: (config: WeaviateClass) => new ClassCreator(connection).withClass(config).do(),
    delete: deleteCollection,
    deleteAll: () => listAll().then((configs) => Promise.all(configs?.map((c) => deleteCollection(c.name)))),
    exists: (name: string) => new ClassExists(connection).withClassName(name).do(),
    export: <TProperties>(name: string) =>
      new ClassGetter(connection)
        .withClassName(name)
        .do()
        .then(classToCollection<TProperties>),
    get: <TProperties extends Properties = any, TName extends string = string>(name: TName) =>
      collection<TProperties, TName>(connection, name, dbVersionSupport),
    listAll: listAll,
  };
};

export interface Collections {
  create<TProperties = any, TName = string>(
    config: CollectionConfigCreate<TProperties, TName>
  ): Promise<Collection<TProperties, TName>>;
  createFromSchema(config: WeaviateClass): Promise<WeaviateClass>;
  delete(collection: string): Promise<void>;
  deleteAll(): Promise<void[]>;
  exists(name: string): Promise<boolean>;
  export<TProperties>(name: string): Promise<CollectionConfig<TProperties>>;
  get<TProperties extends Properties = any, TName extends string = string>(
    name: TName
  ): Collection<TProperties, TName>;
  listAll(): Promise<CollectionConfig<any>[]>;
}

export default collections;
