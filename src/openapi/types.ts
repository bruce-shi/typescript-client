import { definitions } from './schema';

type Override<T1, T2> = Omit<T1, keyof T2> & T2;
type DefaultProperties = { [key: string]: unknown };

export type WeaviateObject<T extends Record<string, any> = DefaultProperties> = Override<
  definitions['Object'],
  { properties?: T }
>;
export type WeaviateObjectsList = definitions['ObjectsListResponse'];
export type WeaviateObjectsGet = definitions['ObjectsGetResponse'];
export type Reference = definitions['SingleRef'];
export type WeaviateError = definitions['ErrorResponse'];
export type Properties = definitions['PropertySchema'];
export type Property = definitions['Property'];
export type DataObject = definitions['Object'];
// Backup
export type BackupCreateRequest = definitions['BackupCreateRequest'];
export type BackupCreateResponse = definitions['BackupCreateResponse'];
export type BackupCreateStatusResponse = definitions['BackupCreateStatusResponse'];
export type BackupRestoreRequest = definitions['BackupRestoreRequest'];
export type BackupRestoreResponse = definitions['BackupRestoreResponse'];
export type BackupRestoreStatusResponse = definitions['BackupRestoreStatusResponse'];
// Batch
export type BatchDelete = definitions['BatchDelete'];
export type BatchDeleteResponse = definitions['BatchDeleteResponse'];
export type BatchRequest = {
  fields?: ('ALL' | 'class' | 'schema' | 'id' | 'creationTimeUnix')[];
  objects?: WeaviateObject<any>[];
};
export type BatchReference = definitions['BatchReference'];
export type BatchReferenceResponse = definitions['BatchReferenceResponse'];
// C11y
export type C11yWordsResponse = definitions['C11yWordsResponse'];
export type C11yExtension = definitions['C11yExtension'];
// Classifications
export type Classification = definitions['Classification'];
// GraphQL
export type WhereFilter = definitions['WhereFilter'];
// Schema
export type WeaviateSchema = definitions['Schema'];
export type WeaviateClass = definitions['Class'];
export type WeaviateProperty = definitions['Property'];
export type ShardStatus = definitions['ShardStatus'];
export type ShardStatusList = definitions['ShardStatusList'];
export type Tenant = definitions['Tenant'];
export type SchemaClusterStatus = definitions['SchemaClusterStatus'];
export type WeaviateModuleConfig = WeaviateClass['moduleConfig'];
export type WeaviateInvertedIndexConfig = definitions['InvertedIndexConfig'];
export type WeaviateBM25Config = definitions['BM25Config'];
export type WeaviateStopwordConfig = definitions['StopwordConfig'];
export type WeaviateMultiTenancyConfig = definitions['MultiTenancyConfig'];
export type WeaviateReplicationConfig = definitions['ReplicationConfig'];
export type WeaviateShardingConfig = WeaviateClass['shardingConfig'];
export type WeaviateVectorIndexConfig = WeaviateClass['vectorIndexConfig'];
// Nodes
export type NodesStatusResponse = definitions['NodesStatusResponse'];
// Meta
export type Meta = definitions['Meta'];
