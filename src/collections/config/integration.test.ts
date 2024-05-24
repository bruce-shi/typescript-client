/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { WeaviateUnsupportedFeatureError } from '../../errors.js';
import weaviate, { WeaviateClient } from '../../index.js';
import { PropertyConfig, VectorIndexConfigDynamic, VectorIndexConfigHNSW } from './types/index.js';

const fail = (msg: string) => {
  throw new Error(msg);
};

describe('Testing of the collection.config namespace', () => {
  let client: WeaviateClient;

  beforeAll(async () => {
    client = await weaviate.client({
      rest: {
        secure: false,
        host: 'localhost',
        port: 8080,
      },
      grpc: {
        secure: false,
        host: 'localhost',
        port: 50051,
      },
    });
  });

  afterAll(() => client.collections.deleteAll());

  it('should be able get the config of a collection without generics', async () => {
    const collectionName = 'TestCollectionConfigGetWithGenerics';
    type TestCollectionConfigGet = {
      testProp: string;
    };
    await client.collections.create<TestCollectionConfigGet>({
      name: collectionName,
      properties: [
        {
          name: 'testProp',
          dataType: 'text',
        },
      ],
      vectorizers: weaviate.configure.vectorizers.none(),
    });
    const collection = client.collections.get<TestCollectionConfigGet>(collectionName);
    const config = await collection.config.get();

    expect(config.name).toEqual(collectionName);
    expect(config.properties).toEqual<PropertyConfig[]>([
      {
        name: 'testProp',
        dataType: 'text',
        description: undefined,
        indexSearchable: true,
        indexFilterable: true,
        indexInverted: false,
        vectorizerConfig: undefined,
        nestedProperties: undefined,
        tokenization: 'word',
      },
    ]);
    expect(config.generative).toBeUndefined();
    expect(config.reranker).toBeUndefined();
    expect(config.vectorizers.default.indexConfig).toEqual<VectorIndexConfigHNSW>({
      skip: false,
      cleanupIntervalSeconds: 300,
      maxConnections: 64,
      efConstruction: 128,
      ef: -1,
      dynamicEfMin: 100,
      dynamicEfMax: 500,
      dynamicEfFactor: 8,
      vectorCacheMaxObjects: 1000000000000,
      flatSearchCutoff: 40000,
      distance: 'cosine',
      quantizer: undefined,
    });
    expect(config.vectorizers.default.indexType).toEqual('hnsw');
    expect(config.vectorizers.default.vectorizers.name).toEqual('none');
  });

  it('should be able get the config of a collection with generics', async () => {
    const collectionName = 'TestCollectionConfigGetWithoutGenerics';
    type TestCollectionConfigGet = {
      testProp: string;
    };
    await client.collections.create<TestCollectionConfigGet>({
      name: collectionName,
      properties: [
        {
          name: 'testProp',
          dataType: 'text',
        },
      ],
      vectorizers: weaviate.configure.vectorizers.none(),
    });
    const collection = client.collections.get<TestCollectionConfigGet>(collectionName);
    const config = await collection.config.get();

    expect(config.name).toEqual(collectionName);
    expect(config.properties).toEqual<PropertyConfig[]>([
      {
        name: 'testProp',
        dataType: 'text',
        description: undefined,
        indexSearchable: true,
        indexFilterable: true,
        indexInverted: false,
        vectorizerConfig: undefined,
        nestedProperties: undefined,
        tokenization: 'word',
      },
    ]);
    expect(config.generative).toBeUndefined();
    expect(config.reranker).toBeUndefined();
    expect(config.vectorizers.default.indexConfig).toEqual<VectorIndexConfigHNSW>({
      skip: false,
      cleanupIntervalSeconds: 300,
      maxConnections: 64,
      efConstruction: 128,
      ef: -1,
      dynamicEfMin: 100,
      dynamicEfMax: 500,
      dynamicEfFactor: 8,
      vectorCacheMaxObjects: 1000000000000,
      flatSearchCutoff: 40000,
      distance: 'cosine',
      quantizer: undefined,
    });
    expect(config.vectorizers.default.indexType).toEqual('hnsw');
    expect(config.vectorizers.default.vectorizers.name).toEqual('none');
  });

  it('should be able to get a collection with named vectors', async () => {
    const collectionName = 'TestCollectionConfigGetVectors';
    const collection = await client.collections.create({
      name: collectionName,
      properties: [
        {
          name: 'title',
          dataType: 'text',
          skipVectorization: true,
          vectorizePropertyName: false,
        },
        {
          name: 'age',
          dataType: 'int',
        },
      ],
      vectorizers: [
        weaviate.configure.vectorizers.text2VecContextionary({
          name: 'title',
          sourceProperties: ['title'],
        }),
        weaviate.configure.vectorizers.text2VecContextionary({
          name: 'age',
          sourceProperties: ['age'],
        }),
      ],
    });
    const config = await collection.config.get();

    expect(config.name).toEqual(collectionName);
    expect(config.generative).toBeUndefined();
    expect(config.reranker).toBeUndefined();
    expect(config.properties[0].vectorizerConfig?.['text2vec-contextionary'].vectorizePropertyName).toEqual(
      false
    );
    expect(config.properties[0].vectorizerConfig?.['text2vec-contextionary'].skip).toEqual(true);
    expect(config.properties[1].vectorizerConfig?.['text2vec-contextionary'].vectorizePropertyName).toEqual(
      true
    );
    expect(config.properties[1].vectorizerConfig?.['text2vec-contextionary'].skip).toEqual(false);
    expect(config.vectorizers.title.indexConfig).toBeDefined();
    expect(config.vectorizers.title.indexType).toEqual('hnsw');
    expect(config.vectorizers.title.properties).toEqual(['title']);
    expect(config.vectorizers.title.vectorizers.name).toEqual('text2vec-contextionary');
  });

  it('should be able to get the config of a collection with HNSW+PQ', async () => {
    const collectionName = 'TestCollectionConfigGetHNSWPlusPQ';
    const collection = await client.collections.create({
      name: collectionName,
      vectorIndex: weaviate.configure.vectorIndex.hnsw({
        quantizer: weaviate.configure.vectorIndex.quantizer.pq(),
      }),
      vectorizer: {
        name: 'none',
        config: {},
      },
    });
    const config = await collection.config.get();

    const vectorIndexConfig = config.vectorizers.default.indexConfig as VectorIndexConfigHNSW;
    expect(config.name).toEqual(collectionName);
    expect(config.generative).toBeUndefined();
    expect(config.reranker).toBeUndefined();
    expect(vectorIndexConfig).toBeDefined();
    expect(vectorIndexConfig.quantizer).toBeDefined();
    expect(config.vectorizers.default.indexType).toEqual('hnsw');
    expect(config.vectorizers.default.properties).toBeUndefined();
    expect(config.vectorizers.default.vectorizers.name).toEqual('none');
  });

  it('should be able to get the config of a collection with HNSW+BQ', async () => {
    const collectionName = 'TestCollectionConfigGetHNSWPlusBQ';
    const collection = await client.collections.create({
      name: collectionName,
      vectorIndex: weaviate.configure.vectorIndex.hnsw({
        quantizer: weaviate.configure.vectorIndex.quantizer.bq(),
      }),
      vectorizer: {
        name: 'none',
        config: {},
      },
    });
    const config = await collection.config.get();

    const vectorIndexConfig = config.vectorizers.default.indexConfig as VectorIndexConfigHNSW;
    expect(config.name).toEqual(collectionName);
    expect(config.generative).toBeUndefined();
    expect(config.reranker).toBeUndefined();
    expect(vectorIndexConfig).toBeDefined();
    expect(vectorIndexConfig.quantizer).toBeDefined();
    expect(config.vectorizers.default.indexType).toEqual('hnsw');
    expect(config.vectorizers.default.properties).toBeUndefined();
    expect(config.vectorizers.default.vectorizers.name).toEqual('none');
  });

  it('should be able to get the config of a collection with flat+BQ', async () => {
    const collectionName = 'TestCollectionConfigGetFlatPlusBQ';
    const collection = await client.collections.create({
      name: collectionName,
      vectorIndex: weaviate.configure.vectorIndex.flat({
        quantizer: weaviate.configure.vectorIndex.quantizer.bq(),
      }),
    });
    const config = await collection.config.get();

    const vectorIndexConfig = config.vectorizers.default.indexConfig as VectorIndexConfigHNSW;
    expect(config.name).toEqual(collectionName);
    expect(config.generative).toBeUndefined();
    expect(config.reranker).toBeUndefined();
    expect(vectorIndexConfig).toBeDefined();
    expect(vectorIndexConfig.quantizer).toBeDefined();
    expect(config.vectorizers.default.indexType).toEqual('flat');
    expect(config.vectorizers.default.properties).toBeUndefined();
    expect(config.vectorizers.default.vectorizers.name).toEqual('text2vec-contextionary');
  });

  it('should be able to get the config of a single-vector collection with dynamic+BQ', async () => {
    const asyncIndexing = await weaviate.connectToLocal({ port: 8078, grpcPort: 50049 }); // need async indexing for dynamic vectorizer
    const collectionName = 'TestSVCollectionConfigGetDynamicPlusBQ';
    await asyncIndexing.collections.delete(collectionName);
    const query = () =>
      asyncIndexing.collections.create({
        name: collectionName,
        vectorIndex: weaviate.configure.vectorIndex.dynamic({
          hnsw: weaviate.configure.vectorIndex.hnsw({
            quantizer: weaviate.configure.vectorIndex.quantizer.pq(),
          }),
          flat: weaviate.configure.vectorIndex.flat({
            quantizer: weaviate.configure.vectorIndex.quantizer.bq(),
          }),
        }),
      });
    if (await client.getWeaviateVersion().then((ver) => ver.isLowerThan(1, 25, 0))) {
      await expect(query()).rejects.toThrow(WeaviateUnsupportedFeatureError);
      return;
    }
    const config = await query().then((collection) => collection.config.get());

    const vectorIndexConfig = config.vectorizers.default.indexConfig as VectorIndexConfigDynamic;
    expect(config.name).toEqual(collectionName);
    expect(config.generative).toBeUndefined();
    expect(config.reranker).toBeUndefined();
    expect(vectorIndexConfig).toBeDefined();
    expect((vectorIndexConfig as any).quantizer).toBeUndefined();
    expect(vectorIndexConfig.hnsw).toBeDefined();
    expect(vectorIndexConfig.hnsw.quantizer).toBeDefined();
    expect(vectorIndexConfig.flat).toBeDefined();
    expect(vectorIndexConfig.flat.quantizer).toBeDefined();
    expect(config.vectorizers.default.indexType).toEqual('dynamic');
    expect(config.vectorizers.default.properties).toBeUndefined();
    expect(config.vectorizers.default.vectorizers.name).toEqual('none');
  });

  it('should be able to get the config of a multi-vector collection with dynamic+BQ', async () => {
    const asyncIndexing = await weaviate.connectToLocal({ port: 8078, grpcPort: 50049 }); // need async indexing for dynamic vectorizer
    const collectionName = 'TestMVCollectionConfigGetDynamicPlusBQ';
    await asyncIndexing.collections.delete(collectionName);
    const query = () =>
      asyncIndexing.collections.create({
        name: collectionName,
        vectorizers: weaviate.configure.vectorizers.none({
          vectorIndexConfig: weaviate.configure.vectorIndex.dynamic({
            hnsw: weaviate.configure.vectorIndex.hnsw({
              quantizer: weaviate.configure.vectorIndex.quantizer.pq(),
            }),
            flat: weaviate.configure.vectorIndex.flat({
              quantizer: weaviate.configure.vectorIndex.quantizer.bq(),
            }),
          }),
        }),
      });
    if (await client.getWeaviateVersion().then((ver) => ver.isLowerThan(1, 25, 0))) {
      await expect(query()).rejects.toThrow(WeaviateUnsupportedFeatureError);
      return;
    }
    const config = await query().then((collection) => collection.config.get());

    const vectorIndexConfig = config.vectorizers.default.indexConfig as VectorIndexConfigDynamic;
    expect(config.name).toEqual(collectionName);
    expect(config.generative).toBeUndefined();
    expect(config.reranker).toBeUndefined();
    expect(vectorIndexConfig).toBeDefined();
    expect((vectorIndexConfig as any).quantizer).toBeUndefined();
    expect(vectorIndexConfig.hnsw).toBeDefined();
    expect(vectorIndexConfig.hnsw.quantizer).toBeDefined();
    expect(vectorIndexConfig.flat).toBeDefined();
    expect(vectorIndexConfig.flat.quantizer).toBeDefined();
    expect(config.vectorizers.default.indexType).toEqual('dynamic');
    expect(config.vectorizers.default.properties).toBeUndefined();
    expect(config.vectorizers.default.vectorizers.name).toEqual('none');
  });

  it('should be able to add a property to a collection', async () => {
    const collectionName = 'TestCollectionConfigAddProperty';
    const collection = await client.collections.create({
      name: collectionName,
      vectorizers: weaviate.configure.vectorizers.none(),
    });
    const config = await collection.config
      .addProperty({
        name: 'testProp',
        dataType: 'text',
      })
      .then(() => collection.config.get());
    expect(config.properties).toEqual<PropertyConfig[]>([
      {
        name: 'testProp',
        dataType: 'text',
        description: undefined,
        indexSearchable: true,
        indexFilterable: true,
        indexInverted: false,
        vectorizerConfig: undefined,
        nestedProperties: undefined,
        tokenization: 'word',
      },
    ]);
  });

  it('should be able to add a reference to a collection', async () => {
    const collectionName = 'TestCollectionConfigAddReference' as const;
    const collection = await client.collections.create({
      name: collectionName,
      vectorizers: weaviate.configure.vectorizers.none(),
    });
    const config = await collection.config
      .addReference({
        name: 'testProp',
        targetCollection: collection.name,
      })
      .then(() => collection.config.get());
    expect(config.references).toEqual([
      {
        name: 'testProp',
        targetCollections: [collectionName],
        description: undefined,
      },
    ]);
  });

  it('should get the shards of a sharded collection', async () => {
    const shards = await client.collections
      .create({
        name: 'TestCollectionConfigGetShards',
        sharding: {
          desiredCount: 2,
        },
      })
      .then((collection) => collection.config.getShards());

    expect(shards.length).toEqual(2);
    expect(shards[0].name).toBeDefined();
    expect(shards[0].status).toEqual('READY');
    expect(shards[0].vectorQueueSize).toEqual(0);
    expect(shards[1].name).toBeDefined();
    expect(shards[1].status).toEqual('READY');
    expect(shards[1].vectorQueueSize).toEqual(0);
  });

  it('should update all the shard statuses of a sharded collection', async () => {
    const shards = await client.collections
      .create({
        name: 'TestCollectionConfigUpdateAllShardStatuses',
        sharding: {
          desiredCount: 2,
        },
      })
      .then((collection) => collection.config.updateShards('READONLY'));

    expect(shards.length).toEqual(2);
    expect(shards[0].name).toBeDefined();
    expect(shards[0].status).toEqual('READONLY');
    expect(shards[0].vectorQueueSize).toEqual(0);
    expect(shards[1].name).toBeDefined();
    expect(shards[1].status).toEqual('READONLY');
    expect(shards[1].vectorQueueSize).toEqual(0);
  });

  it('should update all the shard statuses of a sharded collection', async () => {
    const { shards, shard } = await client.collections
      .create({
        name: 'TestCollectionConfigUpdateOneShardStatus',
        sharding: {
          desiredCount: 2,
        },
      })
      .then(async (collection) => {
        return { collection, shard: await collection.config.getShards().then((shards) => shards[0].name) };
      })
      .then(async ({ collection, shard }) => {
        return { shard, shards: await collection.config.updateShards('READONLY', shard) };
      });

    expect(shards.length).toEqual(2);
    const updated = shards.find((s) => s.name === shard);
    const notUpdated = shards.find((s) => s.name !== shard);
    expect(updated?.status).toEqual('READONLY');
    expect(notUpdated?.status).toEqual('READY');
  });

  it('should be able update the config of a collection', async () => {
    const collectionName = 'TestCollectionConfigUpdate';
    const collection = await client.collections.create({
      name: collectionName,
      properties: [
        {
          name: 'testProp',
          dataType: 'text',
        },
      ],
      vectorizers: weaviate.configure.vectorizers.none(),
    });
    const config = await collection.config
      .update({
        vectorizers: [
          weaviate.reconfigure.vectorizers.update('default', {
            vectorIndexConfig: weaviate.reconfigure.vectorIndex.hnsw({
              quantizer: weaviate.reconfigure.vectorIndex.quantizer.pq(),
              ef: 4,
            }),
          }),
        ],
      })
      .then(() => collection.config.get());

    expect(config.name).toEqual(collectionName);
    expect(config.properties).toEqual<PropertyConfig[]>([
      {
        name: 'testProp',
        dataType: 'text',
        description: undefined,
        indexSearchable: true,
        indexFilterable: true,
        indexInverted: false,
        vectorizerConfig: undefined,
        nestedProperties: undefined,
        tokenization: 'word',
      },
    ]);
    expect(config.generative).toBeUndefined();
    expect(config.reranker).toBeUndefined();
    expect(config.vectorizers.default.indexConfig).toEqual<VectorIndexConfigHNSW>({
      skip: false,
      cleanupIntervalSeconds: 300,
      maxConnections: 64,
      efConstruction: 128,
      ef: 4,
      dynamicEfMin: 100,
      dynamicEfMax: 500,
      dynamicEfFactor: 8,
      vectorCacheMaxObjects: 1000000000000,
      flatSearchCutoff: 40000,
      distance: 'cosine',
      quantizer: {
        bitCompression: false,
        segments: 0,
        centroids: 256,
        trainingLimit: 100000,
        encoder: {
          type: 'kmeans',
          distribution: 'log-normal',
        },
        type: 'pq',
      },
    });
    expect(config.vectorizers.default.indexType).toEqual('hnsw');
    expect(config.vectorizers.default.vectorizers.name).toEqual('none');
  });

  it('should be able update the config of a collection with legacy vectors', async () => {
    const collectionName = 'TestCollectionConfigUpdateLegacyVectors';
    const collection = await client.collections.create({
      name: collectionName,
      properties: [
        {
          name: 'testProp',
          dataType: 'text',
        },
      ],
      vectorizer: {
        name: 'none',
        config: {},
      },
    });
    const config = await collection.config
      .update({
        vectorizers: weaviate.reconfigure.vectorIndex.hnsw({
          quantizer: weaviate.reconfigure.vectorIndex.quantizer.pq(),
          ef: 4,
        }),
      })
      .then(() => collection.config.get());

    expect(config.name).toEqual(collectionName);
    expect(config.properties).toEqual<PropertyConfig[]>([
      {
        name: 'testProp',
        dataType: 'text',
        description: undefined,
        indexSearchable: true,
        indexFilterable: true,
        indexInverted: false,
        vectorizerConfig: undefined,
        nestedProperties: undefined,
        tokenization: 'word',
      },
    ]);
    expect(config.generative).toBeUndefined();
    expect(config.reranker).toBeUndefined();
    expect(config.vectorizers.default.indexConfig).toEqual<VectorIndexConfigHNSW>({
      skip: false,
      cleanupIntervalSeconds: 300,
      maxConnections: 64,
      efConstruction: 128,
      ef: 4,
      dynamicEfMin: 100,
      dynamicEfMax: 500,
      dynamicEfFactor: 8,
      vectorCacheMaxObjects: 1000000000000,
      flatSearchCutoff: 40000,
      distance: 'cosine',
      quantizer: {
        bitCompression: false,
        segments: 0,
        centroids: 256,
        trainingLimit: 100000,
        encoder: {
          type: 'kmeans',
          distribution: 'log-normal',
        },
        type: 'pq',
      },
    });
    expect(config.vectorizers.default.indexType).toEqual('hnsw');
    expect(config.vectorizers.default.vectorizers.name).toEqual('none');
  });
});
