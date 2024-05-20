import { VectorIndexConfigCreateType, VectorIndexConfigUpdateType } from './vectorIndex.js';
import {
  Img2VecNeuralConfig,
  ModuleConfig,
  Multi2VecField,
  Ref2VecCentroidConfig,
  Text2VecAWSConfig,
  Text2VecAzureOpenAIConfig,
  Text2VecCohereConfig,
  Text2VecContextionaryConfig,
  Text2VecGPT4AllConfig,
  Text2VecHuggingFaceConfig,
  Text2VecJinaConfig,
  Text2VecOpenAIConfig,
  Text2VecPalmConfig,
  Text2VecTransformersConfig,
  Text2VecVoyageAIConfig,
  VectorIndexType,
  Vectorizer,
  VectorizerConfigType,
} from '../../config/types/index.js';
import { PrimitiveKeys } from '../../types/internal.js';

export type VectorizerCreateOptions<P, I, V> = {
  sourceProperties?: P;
  vectorIndexConfig?: ModuleConfig<I, VectorIndexConfigCreateType<I>>;
  vectorizerConfig?: ModuleConfig<V, VectorizerConfigType<V>>;
};

export type VectorizerUpdateOptions<I> = {
  vectorIndexConfig: ModuleConfig<I, VectorIndexConfigUpdateType<I>>;
};

export type VectorConfigCreate<P, N extends string, I extends VectorIndexType, V extends Vectorizer> = {
  vectorName: N;
  properties?: P[];
  vectorizer: ModuleConfig<V, VectorizerConfigType<V>>;
  vectorIndex: ModuleConfig<I, VectorIndexConfigCreateType<I>>;
};

export type VectorConfigUpdate<N extends string, I extends VectorIndexType> = {
  vectorName: N;
  vectorIndex: ModuleConfig<I, VectorIndexConfigUpdateType<I>>;
};

export type VectorizersConfigCreate<T> =
  | VectorConfigCreate<PrimitiveKeys<T>, string, VectorIndexType, Vectorizer>
  | VectorConfigCreate<PrimitiveKeys<T>, string, VectorIndexType, Vectorizer>[];

export type ConfigureNonTextVectorizerOptions<
  I extends VectorIndexType,
  V extends Vectorizer
> = VectorizerConfigCreateType<V> & {
  vectorIndexConfig?: ModuleConfig<I, VectorIndexConfigCreateType<I>>;
};

export type ConfigureTextVectorizerOptions<
  T,
  I extends VectorIndexType,
  V extends Vectorizer
> = VectorizerConfigCreateType<V> & {
  sourceProperties?: PrimitiveKeys<T>[];
  vectorIndexConfig?: ModuleConfig<I, VectorIndexConfigCreateType<I>>;
};

export type Img2VecNeuralConfigCreate = Img2VecNeuralConfig;

/** The configuration for the `multi2vec-clip` vectorizer. */
export type Multi2VecClipConfigCreate = {
  /** The image fields to use in vectorization. Can be string of `Multi2VecField` type. If string, weight 0 will be assumed. */
  imageFields?: string[] | Multi2VecField[];
  /** The inference url to use where API requests should go. */
  inferenceUrl?: string;
  /** The text fields to use in vectorization. Can be string of `Multi2VecField` type. If string, weight 0 will be assumed. */
  textFields?: string[] | Multi2VecField[];
  /** Whether to vectorize the collection name. */
  vectorizeCollectionName?: boolean;
};

/** The configuration for the `multi2vec-bind` vectorizer. */
export type Multi2VecBindConfigCreate = {
  /** The audio fields to use in vectorization. Can be string of `Multi2VecField` type. If string, weight 0 will be assumed. */
  audioFields?: string[] | Multi2VecField[];
  /** The depth fields to use in vectorization. Can be string of `Multi2VecField` type. If string, weight 0 will be assumed. */
  depthFields?: string[] | Multi2VecField[];
  /** The image fields to use in vectorization. Can be string of `Multi2VecField` type. If string, weight 0 will be assumed. */
  imageFields?: string[] | Multi2VecField[];
  /** The IMU fields to use in vectorization. Can be string of `Multi2VecField` type. If string, weight 0 will be assumed. */
  IMUFields?: string[] | Multi2VecField[];
  /** The text fields to use in vectorization. Can be string of `Multi2VecField` type. If string, weight 0 will be assumed. */
  textFields?: string[] | Multi2VecField[];
  /** The thermal fields to use in vectorization. Can be string of `Multi2VecField` type. If string, weight 0 will be assumed. */
  thermalFields?: string[] | Multi2VecField[];
  /** The video fields to use in vectorization. Can be string of `Multi2VecField` type. If string, weight 0 will be assumed. */
  videoFields?: string[] | Multi2VecField[];
  /** Whether to vectorize the collection name. */
  vectorizeCollectionName?: boolean;
};

/** The configuration for the `multi2vec-palm` vectorizer. */
export type Multi2VecPalmConfigCreate = {
  /** The project id of the palm model. */
  projectId: string;
  /** Where the model runs */
  location: string;
  /** The image fields to use in vectorization. Can be string of `Multi2VecField` type. If string, weight 0 will be assumed. */
  imageFields?: string[] | Multi2VecField[];
  /** The text fields to use in vectorization. Can be string of `Multi2VecField` type. If string, weight 0 will be assumed. */
  textFields?: string[] | Multi2VecField[];
  /** The video fields to use in vectorization. Can be string of `Multi2VecField` type. If string, weight 0 will be assumed. */
  videoFields?: string[] | Multi2VecField[];
  /** The model ID to use. */
  modelId?: string;
  /** The number of dimensions to use. */
  dimensions?: number;
  /** Whether to vectorize the collection name. */
  vectorizeCollectionName?: boolean;
};

export type Ref2VecCentroidConfigCreate = Ref2VecCentroidConfig;

export type Text2VecAWSConfigCreate = Text2VecAWSConfig;

export type Text2VecAzureOpenAIConfigCreate = Text2VecAzureOpenAIConfig;

export type Text2VecCohereConfigCreate = Text2VecCohereConfig;

export type Text2VecContextionaryConfigCreate = Text2VecContextionaryConfig;

export type Text2VecGPT4AllConfigCreate = Text2VecGPT4AllConfig;

export type Text2VecHuggingFaceConfigCreate = Text2VecHuggingFaceConfig;

export type Text2VecJinaConfigCreate = Text2VecJinaConfig;

export type Text2VecOpenAIConfigCreate = Text2VecOpenAIConfig;

export type Text2VecPalmConfigCreate = Text2VecPalmConfig;

export type Text2VecTransformersConfigCreate = Text2VecTransformersConfig;

export type Text2VecVoyageAIConfigCreate = Text2VecVoyageAIConfig;

export type VectorizerConfigCreateType<V> = V extends 'img2vec-neural'
  ? Img2VecNeuralConfigCreate | undefined
  : V extends 'multi2vec-clip'
  ? Multi2VecClipConfigCreate | undefined
  : V extends 'multi2vec-bind'
  ? Multi2VecBindConfigCreate | undefined
  : V extends 'multi2vec-palm'
  ? Multi2VecPalmConfigCreate
  : V extends 'ref2vec-centroid'
  ? Ref2VecCentroidConfigCreate
  : V extends 'text2vec-aws'
  ? Text2VecAWSConfigCreate
  : V extends 'text2vec-contextionary'
  ? Text2VecContextionaryConfigCreate | undefined
  : V extends 'text2vec-cohere'
  ? Text2VecCohereConfigCreate | undefined
  : V extends 'text2vec-gpt4all'
  ? Text2VecGPT4AllConfigCreate | undefined
  : V extends 'text2vec-huggingface'
  ? Text2VecHuggingFaceConfigCreate | undefined
  : V extends 'text2vec-jina'
  ? Text2VecJinaConfigCreate | undefined
  : V extends 'text2vec-openai'
  ? Text2VecOpenAIConfigCreate | undefined
  : V extends 'text2vec-azure-openai'
  ? Text2VecAzureOpenAIConfigCreate
  : V extends 'text2vec-palm'
  ? Text2VecPalmConfigCreate | undefined
  : V extends 'text2vec-transformers'
  ? Text2VecTransformersConfigCreate | undefined
  : V extends 'text2vec-voyageai'
  ? Text2VecVoyageAIConfigCreate | undefined
  : V extends 'none'
  ? {}
  : V extends undefined
  ? undefined
  : never;
