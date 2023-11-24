/* eslint-disable */
import type { CallContext, CallOptions } from "nice-grpc-common";
import { BatchObjectsReply, BatchObjectsRequest } from "./batch";
import { SearchReply, SearchRequest } from "./search_get";

export const protobufPackage = "weaviate.v1";

export type WeaviateDefinition = typeof WeaviateDefinition;
export const WeaviateDefinition = {
  name: "Weaviate",
  fullName: "weaviate.v1.Weaviate",
  methods: {
    search: {
      name: "Search",
      requestType: SearchRequest,
      requestStream: false,
      responseType: SearchReply,
      responseStream: false,
      options: {},
    },
    batchObjects: {
      name: "BatchObjects",
      requestType: BatchObjectsRequest,
      requestStream: false,
      responseType: BatchObjectsReply,
      responseStream: false,
      options: {},
    },
  },
} as const;

export interface WeaviateServiceImplementation<CallContextExt = {}> {
  search(request: SearchRequest, context: CallContext & CallContextExt): Promise<DeepPartial<SearchReply>>;
  batchObjects(
    request: BatchObjectsRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<BatchObjectsReply>>;
}

export interface WeaviateClient<CallOptionsExt = {}> {
  search(request: DeepPartial<SearchRequest>, options?: CallOptions & CallOptionsExt): Promise<SearchReply>;
  batchObjects(
    request: DeepPartial<BatchObjectsRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<BatchObjectsReply>;
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;