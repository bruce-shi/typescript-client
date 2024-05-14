/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal.js";
import { Struct } from "../google/protobuf/struct.js";
import {
  BooleanArrayProperties,
  ConsistencyLevel,
  consistencyLevelFromJSON,
  consistencyLevelToJSON,
  Filters,
  IntArrayProperties,
  NumberArrayProperties,
  ObjectArrayProperties,
  ObjectProperties,
  TextArrayProperties,
  Vectors,
} from "./base.js";
import { Properties } from "./properties.js";

export const protobufPackage = "weaviate.v1";

export interface SearchRequest {
  /** required */
  collection: string;
  /** parameters */
  tenant: string;
  consistencyLevel?:
    | ConsistencyLevel
    | undefined;
  /** what is returned */
  properties?: PropertiesRequest | undefined;
  metadata?: MetadataRequest | undefined;
  groupBy?:
    | GroupBy
    | undefined;
  /** affects order and length of results. 0/empty (default value) means disabled */
  limit: number;
  offset: number;
  autocut: number;
  after: string;
  /** protolint:disable:next REPEATED_FIELD_NAMES_PLURALIZED */
  sortBy: SortBy[];
  /** matches/searches for objects */
  filters?: Filters | undefined;
  hybridSearch?: Hybrid | undefined;
  bm25Search?: BM25 | undefined;
  nearVector?: NearVector | undefined;
  nearObject?: NearObject | undefined;
  nearText?: NearTextSearch | undefined;
  nearImage?: NearImageSearch | undefined;
  nearAudio?: NearAudioSearch | undefined;
  nearVideo?: NearVideoSearch | undefined;
  nearDepth?: NearDepthSearch | undefined;
  nearThermal?: NearThermalSearch | undefined;
  nearImu?: NearIMUSearch | undefined;
  generative?: GenerativeSearch | undefined;
  rerank?:
    | Rerank
    | undefined;
  /** @deprecated */
  uses123Api: boolean;
  uses125Api: boolean;
}

export interface GroupBy {
  /**
   * currently only supports one entry (eg just properties, no refs). But might
   * be extended in the future.
   * protolint:disable:next REPEATED_FIELD_NAMES_PLURALIZED
   */
  path: string[];
  numberOfGroups: number;
  objectsPerGroup: number;
}

export interface SortBy {
  ascending: boolean;
  /**
   * currently only supports one entry (eg just properties, no refs). But the
   * weaviate datastructure already has paths in it and this makes it easily
   * extendable in the future
   * protolint:disable:next REPEATED_FIELD_NAMES_PLURALIZED
   */
  path: string[];
}

export interface GenerativeSearch {
  singleResponsePrompt: string;
  groupedResponseTask: string;
  groupedProperties: string[];
}

export interface MetadataRequest {
  uuid: boolean;
  vector: boolean;
  creationTimeUnix: boolean;
  lastUpdateTimeUnix: boolean;
  distance: boolean;
  certainty: boolean;
  score: boolean;
  explainScore: boolean;
  isConsistent: boolean;
  vectors: string[];
}

export interface PropertiesRequest {
  nonRefProperties: string[];
  refProperties: RefPropertiesRequest[];
  objectProperties: ObjectPropertiesRequest[];
  returnAllNonrefProperties: boolean;
}

export interface ObjectPropertiesRequest {
  propName: string;
  primitiveProperties: string[];
  objectProperties: ObjectPropertiesRequest[];
}

export interface Hybrid {
  query: string;
  properties: string[];
  /**
   * protolint:disable:next REPEATED_FIELD_NAMES_PLURALIZED
   *
   * @deprecated
   */
  vector: number[];
  alpha: number;
  fusionType: Hybrid_FusionType;
  vectorBytes: Uint8Array;
  targetVectors: string[];
  /** target_vector in msg is ignored and should not be set for hybrid */
  nearText:
    | NearTextSearch
    | undefined;
  /** same as above. Use the target vector in the hybrid message */
  nearVector: NearVector | undefined;
}

export enum Hybrid_FusionType {
  FUSION_TYPE_UNSPECIFIED = 0,
  FUSION_TYPE_RANKED = 1,
  FUSION_TYPE_RELATIVE_SCORE = 2,
  UNRECOGNIZED = -1,
}

export function hybrid_FusionTypeFromJSON(object: any): Hybrid_FusionType {
  switch (object) {
    case 0:
    case "FUSION_TYPE_UNSPECIFIED":
      return Hybrid_FusionType.FUSION_TYPE_UNSPECIFIED;
    case 1:
    case "FUSION_TYPE_RANKED":
      return Hybrid_FusionType.FUSION_TYPE_RANKED;
    case 2:
    case "FUSION_TYPE_RELATIVE_SCORE":
      return Hybrid_FusionType.FUSION_TYPE_RELATIVE_SCORE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Hybrid_FusionType.UNRECOGNIZED;
  }
}

export function hybrid_FusionTypeToJSON(object: Hybrid_FusionType): string {
  switch (object) {
    case Hybrid_FusionType.FUSION_TYPE_UNSPECIFIED:
      return "FUSION_TYPE_UNSPECIFIED";
    case Hybrid_FusionType.FUSION_TYPE_RANKED:
      return "FUSION_TYPE_RANKED";
    case Hybrid_FusionType.FUSION_TYPE_RELATIVE_SCORE:
      return "FUSION_TYPE_RELATIVE_SCORE";
    case Hybrid_FusionType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface NearTextSearch {
  /** protolint:disable:next REPEATED_FIELD_NAMES_PLURALIZED */
  query: string[];
  certainty?: number | undefined;
  distance?: number | undefined;
  moveTo?: NearTextSearch_Move | undefined;
  moveAway?: NearTextSearch_Move | undefined;
  targetVectors: string[];
}

export interface NearTextSearch_Move {
  force: number;
  concepts: string[];
  uuids: string[];
}

export interface NearImageSearch {
  image: string;
  certainty?: number | undefined;
  distance?: number | undefined;
  targetVectors: string[];
}

export interface NearAudioSearch {
  audio: string;
  certainty?: number | undefined;
  distance?: number | undefined;
  targetVectors: string[];
}

export interface NearVideoSearch {
  video: string;
  certainty?: number | undefined;
  distance?: number | undefined;
  targetVectors: string[];
}

export interface NearDepthSearch {
  depth: string;
  certainty?: number | undefined;
  distance?: number | undefined;
  targetVectors: string[];
}

export interface NearThermalSearch {
  thermal: string;
  certainty?: number | undefined;
  distance?: number | undefined;
  targetVectors: string[];
}

export interface NearIMUSearch {
  imu: string;
  certainty?: number | undefined;
  distance?: number | undefined;
  targetVectors: string[];
}

export interface BM25 {
  query: string;
  properties: string[];
}

export interface RefPropertiesRequest {
  referenceProperty: string;
  properties: PropertiesRequest | undefined;
  metadata: MetadataRequest | undefined;
  targetCollection: string;
}

export interface NearVector {
  /**
   * protolint:disable:next REPEATED_FIELD_NAMES_PLURALIZED
   *
   * @deprecated
   */
  vector: number[];
  certainty?: number | undefined;
  distance?: number | undefined;
  vectorBytes: Uint8Array;
  targetVectors: string[];
}

export interface NearObject {
  id: string;
  certainty?: number | undefined;
  distance?: number | undefined;
  targetVectors: string[];
}

export interface Rerank {
  property: string;
  query?: string | undefined;
}

export interface SearchReply {
  took: number;
  results: SearchResult[];
  generativeGroupedResult?: string | undefined;
  groupByResults: GroupByResult[];
}

export interface RerankReply {
  score: number;
}

export interface GenerativeReply {
  result: string;
}

export interface GroupByResult {
  name: string;
  minDistance: number;
  maxDistance: number;
  numberOfObjects: number;
  objects: SearchResult[];
  rerank?: RerankReply | undefined;
  generative?: GenerativeReply | undefined;
}

export interface SearchResult {
  properties: PropertiesResult | undefined;
  metadata: MetadataResult | undefined;
}

export interface MetadataResult {
  id: string;
  /**
   * protolint:disable:next REPEATED_FIELD_NAMES_PLURALIZED
   *
   * @deprecated
   */
  vector: number[];
  creationTimeUnix: number;
  creationTimeUnixPresent: boolean;
  lastUpdateTimeUnix: number;
  lastUpdateTimeUnixPresent: boolean;
  distance: number;
  distancePresent: boolean;
  certainty: number;
  certaintyPresent: boolean;
  score: number;
  scorePresent: boolean;
  explainScore: string;
  explainScorePresent: boolean;
  isConsistent?: boolean | undefined;
  generative: string;
  generativePresent: boolean;
  isConsistentPresent: boolean;
  vectorBytes: Uint8Array;
  idAsBytes: Uint8Array;
  rerankScore: number;
  rerankScorePresent: boolean;
  vectors: Vectors[];
}

export interface PropertiesResult {
  /** @deprecated */
  nonRefProperties: { [key: string]: any } | undefined;
  refProps: RefPropertiesResult[];
  targetCollection: string;
  metadata:
    | MetadataResult
    | undefined;
  /** @deprecated */
  numberArrayProperties: NumberArrayProperties[];
  /** @deprecated */
  intArrayProperties: IntArrayProperties[];
  /** @deprecated */
  textArrayProperties: TextArrayProperties[];
  /** @deprecated */
  booleanArrayProperties: BooleanArrayProperties[];
  /** @deprecated */
  objectProperties: ObjectProperties[];
  /** @deprecated */
  objectArrayProperties: ObjectArrayProperties[];
  nonRefProps: Properties | undefined;
  refPropsRequested: boolean;
}

export interface RefPropertiesResult {
  properties: PropertiesResult[];
  propName: string;
}

function createBaseSearchRequest(): SearchRequest {
  return {
    collection: "",
    tenant: "",
    consistencyLevel: undefined,
    properties: undefined,
    metadata: undefined,
    groupBy: undefined,
    limit: 0,
    offset: 0,
    autocut: 0,
    after: "",
    sortBy: [],
    filters: undefined,
    hybridSearch: undefined,
    bm25Search: undefined,
    nearVector: undefined,
    nearObject: undefined,
    nearText: undefined,
    nearImage: undefined,
    nearAudio: undefined,
    nearVideo: undefined,
    nearDepth: undefined,
    nearThermal: undefined,
    nearImu: undefined,
    generative: undefined,
    rerank: undefined,
    uses123Api: false,
    uses125Api: false,
  };
}

export const SearchRequest = {
  encode(message: SearchRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.collection !== "") {
      writer.uint32(10).string(message.collection);
    }
    if (message.tenant !== "") {
      writer.uint32(82).string(message.tenant);
    }
    if (message.consistencyLevel !== undefined) {
      writer.uint32(88).int32(message.consistencyLevel);
    }
    if (message.properties !== undefined) {
      PropertiesRequest.encode(message.properties, writer.uint32(162).fork()).ldelim();
    }
    if (message.metadata !== undefined) {
      MetadataRequest.encode(message.metadata, writer.uint32(170).fork()).ldelim();
    }
    if (message.groupBy !== undefined) {
      GroupBy.encode(message.groupBy, writer.uint32(178).fork()).ldelim();
    }
    if (message.limit !== 0) {
      writer.uint32(240).uint32(message.limit);
    }
    if (message.offset !== 0) {
      writer.uint32(248).uint32(message.offset);
    }
    if (message.autocut !== 0) {
      writer.uint32(256).uint32(message.autocut);
    }
    if (message.after !== "") {
      writer.uint32(266).string(message.after);
    }
    for (const v of message.sortBy) {
      SortBy.encode(v!, writer.uint32(274).fork()).ldelim();
    }
    if (message.filters !== undefined) {
      Filters.encode(message.filters, writer.uint32(322).fork()).ldelim();
    }
    if (message.hybridSearch !== undefined) {
      Hybrid.encode(message.hybridSearch, writer.uint32(330).fork()).ldelim();
    }
    if (message.bm25Search !== undefined) {
      BM25.encode(message.bm25Search, writer.uint32(338).fork()).ldelim();
    }
    if (message.nearVector !== undefined) {
      NearVector.encode(message.nearVector, writer.uint32(346).fork()).ldelim();
    }
    if (message.nearObject !== undefined) {
      NearObject.encode(message.nearObject, writer.uint32(354).fork()).ldelim();
    }
    if (message.nearText !== undefined) {
      NearTextSearch.encode(message.nearText, writer.uint32(362).fork()).ldelim();
    }
    if (message.nearImage !== undefined) {
      NearImageSearch.encode(message.nearImage, writer.uint32(370).fork()).ldelim();
    }
    if (message.nearAudio !== undefined) {
      NearAudioSearch.encode(message.nearAudio, writer.uint32(378).fork()).ldelim();
    }
    if (message.nearVideo !== undefined) {
      NearVideoSearch.encode(message.nearVideo, writer.uint32(386).fork()).ldelim();
    }
    if (message.nearDepth !== undefined) {
      NearDepthSearch.encode(message.nearDepth, writer.uint32(394).fork()).ldelim();
    }
    if (message.nearThermal !== undefined) {
      NearThermalSearch.encode(message.nearThermal, writer.uint32(402).fork()).ldelim();
    }
    if (message.nearImu !== undefined) {
      NearIMUSearch.encode(message.nearImu, writer.uint32(410).fork()).ldelim();
    }
    if (message.generative !== undefined) {
      GenerativeSearch.encode(message.generative, writer.uint32(482).fork()).ldelim();
    }
    if (message.rerank !== undefined) {
      Rerank.encode(message.rerank, writer.uint32(490).fork()).ldelim();
    }
    if (message.uses123Api === true) {
      writer.uint32(800).bool(message.uses123Api);
    }
    if (message.uses125Api === true) {
      writer.uint32(808).bool(message.uses125Api);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SearchRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSearchRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.collection = reader.string();
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.tenant = reader.string();
          continue;
        case 11:
          if (tag !== 88) {
            break;
          }

          message.consistencyLevel = reader.int32() as any;
          continue;
        case 20:
          if (tag !== 162) {
            break;
          }

          message.properties = PropertiesRequest.decode(reader, reader.uint32());
          continue;
        case 21:
          if (tag !== 170) {
            break;
          }

          message.metadata = MetadataRequest.decode(reader, reader.uint32());
          continue;
        case 22:
          if (tag !== 178) {
            break;
          }

          message.groupBy = GroupBy.decode(reader, reader.uint32());
          continue;
        case 30:
          if (tag !== 240) {
            break;
          }

          message.limit = reader.uint32();
          continue;
        case 31:
          if (tag !== 248) {
            break;
          }

          message.offset = reader.uint32();
          continue;
        case 32:
          if (tag !== 256) {
            break;
          }

          message.autocut = reader.uint32();
          continue;
        case 33:
          if (tag !== 266) {
            break;
          }

          message.after = reader.string();
          continue;
        case 34:
          if (tag !== 274) {
            break;
          }

          message.sortBy.push(SortBy.decode(reader, reader.uint32()));
          continue;
        case 40:
          if (tag !== 322) {
            break;
          }

          message.filters = Filters.decode(reader, reader.uint32());
          continue;
        case 41:
          if (tag !== 330) {
            break;
          }

          message.hybridSearch = Hybrid.decode(reader, reader.uint32());
          continue;
        case 42:
          if (tag !== 338) {
            break;
          }

          message.bm25Search = BM25.decode(reader, reader.uint32());
          continue;
        case 43:
          if (tag !== 346) {
            break;
          }

          message.nearVector = NearVector.decode(reader, reader.uint32());
          continue;
        case 44:
          if (tag !== 354) {
            break;
          }

          message.nearObject = NearObject.decode(reader, reader.uint32());
          continue;
        case 45:
          if (tag !== 362) {
            break;
          }

          message.nearText = NearTextSearch.decode(reader, reader.uint32());
          continue;
        case 46:
          if (tag !== 370) {
            break;
          }

          message.nearImage = NearImageSearch.decode(reader, reader.uint32());
          continue;
        case 47:
          if (tag !== 378) {
            break;
          }

          message.nearAudio = NearAudioSearch.decode(reader, reader.uint32());
          continue;
        case 48:
          if (tag !== 386) {
            break;
          }

          message.nearVideo = NearVideoSearch.decode(reader, reader.uint32());
          continue;
        case 49:
          if (tag !== 394) {
            break;
          }

          message.nearDepth = NearDepthSearch.decode(reader, reader.uint32());
          continue;
        case 50:
          if (tag !== 402) {
            break;
          }

          message.nearThermal = NearThermalSearch.decode(reader, reader.uint32());
          continue;
        case 51:
          if (tag !== 410) {
            break;
          }

          message.nearImu = NearIMUSearch.decode(reader, reader.uint32());
          continue;
        case 60:
          if (tag !== 482) {
            break;
          }

          message.generative = GenerativeSearch.decode(reader, reader.uint32());
          continue;
        case 61:
          if (tag !== 490) {
            break;
          }

          message.rerank = Rerank.decode(reader, reader.uint32());
          continue;
        case 100:
          if (tag !== 800) {
            break;
          }

          message.uses123Api = reader.bool();
          continue;
        case 101:
          if (tag !== 808) {
            break;
          }

          message.uses125Api = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SearchRequest {
    return {
      collection: isSet(object.collection) ? globalThis.String(object.collection) : "",
      tenant: isSet(object.tenant) ? globalThis.String(object.tenant) : "",
      consistencyLevel: isSet(object.consistencyLevel) ? consistencyLevelFromJSON(object.consistencyLevel) : undefined,
      properties: isSet(object.properties) ? PropertiesRequest.fromJSON(object.properties) : undefined,
      metadata: isSet(object.metadata) ? MetadataRequest.fromJSON(object.metadata) : undefined,
      groupBy: isSet(object.groupBy) ? GroupBy.fromJSON(object.groupBy) : undefined,
      limit: isSet(object.limit) ? globalThis.Number(object.limit) : 0,
      offset: isSet(object.offset) ? globalThis.Number(object.offset) : 0,
      autocut: isSet(object.autocut) ? globalThis.Number(object.autocut) : 0,
      after: isSet(object.after) ? globalThis.String(object.after) : "",
      sortBy: globalThis.Array.isArray(object?.sortBy) ? object.sortBy.map((e: any) => SortBy.fromJSON(e)) : [],
      filters: isSet(object.filters) ? Filters.fromJSON(object.filters) : undefined,
      hybridSearch: isSet(object.hybridSearch) ? Hybrid.fromJSON(object.hybridSearch) : undefined,
      bm25Search: isSet(object.bm25Search) ? BM25.fromJSON(object.bm25Search) : undefined,
      nearVector: isSet(object.nearVector) ? NearVector.fromJSON(object.nearVector) : undefined,
      nearObject: isSet(object.nearObject) ? NearObject.fromJSON(object.nearObject) : undefined,
      nearText: isSet(object.nearText) ? NearTextSearch.fromJSON(object.nearText) : undefined,
      nearImage: isSet(object.nearImage) ? NearImageSearch.fromJSON(object.nearImage) : undefined,
      nearAudio: isSet(object.nearAudio) ? NearAudioSearch.fromJSON(object.nearAudio) : undefined,
      nearVideo: isSet(object.nearVideo) ? NearVideoSearch.fromJSON(object.nearVideo) : undefined,
      nearDepth: isSet(object.nearDepth) ? NearDepthSearch.fromJSON(object.nearDepth) : undefined,
      nearThermal: isSet(object.nearThermal) ? NearThermalSearch.fromJSON(object.nearThermal) : undefined,
      nearImu: isSet(object.nearImu) ? NearIMUSearch.fromJSON(object.nearImu) : undefined,
      generative: isSet(object.generative) ? GenerativeSearch.fromJSON(object.generative) : undefined,
      rerank: isSet(object.rerank) ? Rerank.fromJSON(object.rerank) : undefined,
      uses123Api: isSet(object.uses123Api) ? globalThis.Boolean(object.uses123Api) : false,
      uses125Api: isSet(object.uses125Api) ? globalThis.Boolean(object.uses125Api) : false,
    };
  },

  toJSON(message: SearchRequest): unknown {
    const obj: any = {};
    if (message.collection !== "") {
      obj.collection = message.collection;
    }
    if (message.tenant !== "") {
      obj.tenant = message.tenant;
    }
    if (message.consistencyLevel !== undefined) {
      obj.consistencyLevel = consistencyLevelToJSON(message.consistencyLevel);
    }
    if (message.properties !== undefined) {
      obj.properties = PropertiesRequest.toJSON(message.properties);
    }
    if (message.metadata !== undefined) {
      obj.metadata = MetadataRequest.toJSON(message.metadata);
    }
    if (message.groupBy !== undefined) {
      obj.groupBy = GroupBy.toJSON(message.groupBy);
    }
    if (message.limit !== 0) {
      obj.limit = Math.round(message.limit);
    }
    if (message.offset !== 0) {
      obj.offset = Math.round(message.offset);
    }
    if (message.autocut !== 0) {
      obj.autocut = Math.round(message.autocut);
    }
    if (message.after !== "") {
      obj.after = message.after;
    }
    if (message.sortBy?.length) {
      obj.sortBy = message.sortBy.map((e) => SortBy.toJSON(e));
    }
    if (message.filters !== undefined) {
      obj.filters = Filters.toJSON(message.filters);
    }
    if (message.hybridSearch !== undefined) {
      obj.hybridSearch = Hybrid.toJSON(message.hybridSearch);
    }
    if (message.bm25Search !== undefined) {
      obj.bm25Search = BM25.toJSON(message.bm25Search);
    }
    if (message.nearVector !== undefined) {
      obj.nearVector = NearVector.toJSON(message.nearVector);
    }
    if (message.nearObject !== undefined) {
      obj.nearObject = NearObject.toJSON(message.nearObject);
    }
    if (message.nearText !== undefined) {
      obj.nearText = NearTextSearch.toJSON(message.nearText);
    }
    if (message.nearImage !== undefined) {
      obj.nearImage = NearImageSearch.toJSON(message.nearImage);
    }
    if (message.nearAudio !== undefined) {
      obj.nearAudio = NearAudioSearch.toJSON(message.nearAudio);
    }
    if (message.nearVideo !== undefined) {
      obj.nearVideo = NearVideoSearch.toJSON(message.nearVideo);
    }
    if (message.nearDepth !== undefined) {
      obj.nearDepth = NearDepthSearch.toJSON(message.nearDepth);
    }
    if (message.nearThermal !== undefined) {
      obj.nearThermal = NearThermalSearch.toJSON(message.nearThermal);
    }
    if (message.nearImu !== undefined) {
      obj.nearImu = NearIMUSearch.toJSON(message.nearImu);
    }
    if (message.generative !== undefined) {
      obj.generative = GenerativeSearch.toJSON(message.generative);
    }
    if (message.rerank !== undefined) {
      obj.rerank = Rerank.toJSON(message.rerank);
    }
    if (message.uses123Api === true) {
      obj.uses123Api = message.uses123Api;
    }
    if (message.uses125Api === true) {
      obj.uses125Api = message.uses125Api;
    }
    return obj;
  },

  create(base?: DeepPartial<SearchRequest>): SearchRequest {
    return SearchRequest.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<SearchRequest>): SearchRequest {
    const message = createBaseSearchRequest();
    message.collection = object.collection ?? "";
    message.tenant = object.tenant ?? "";
    message.consistencyLevel = object.consistencyLevel ?? undefined;
    message.properties = (object.properties !== undefined && object.properties !== null)
      ? PropertiesRequest.fromPartial(object.properties)
      : undefined;
    message.metadata = (object.metadata !== undefined && object.metadata !== null)
      ? MetadataRequest.fromPartial(object.metadata)
      : undefined;
    message.groupBy = (object.groupBy !== undefined && object.groupBy !== null)
      ? GroupBy.fromPartial(object.groupBy)
      : undefined;
    message.limit = object.limit ?? 0;
    message.offset = object.offset ?? 0;
    message.autocut = object.autocut ?? 0;
    message.after = object.after ?? "";
    message.sortBy = object.sortBy?.map((e) => SortBy.fromPartial(e)) || [];
    message.filters = (object.filters !== undefined && object.filters !== null)
      ? Filters.fromPartial(object.filters)
      : undefined;
    message.hybridSearch = (object.hybridSearch !== undefined && object.hybridSearch !== null)
      ? Hybrid.fromPartial(object.hybridSearch)
      : undefined;
    message.bm25Search = (object.bm25Search !== undefined && object.bm25Search !== null)
      ? BM25.fromPartial(object.bm25Search)
      : undefined;
    message.nearVector = (object.nearVector !== undefined && object.nearVector !== null)
      ? NearVector.fromPartial(object.nearVector)
      : undefined;
    message.nearObject = (object.nearObject !== undefined && object.nearObject !== null)
      ? NearObject.fromPartial(object.nearObject)
      : undefined;
    message.nearText = (object.nearText !== undefined && object.nearText !== null)
      ? NearTextSearch.fromPartial(object.nearText)
      : undefined;
    message.nearImage = (object.nearImage !== undefined && object.nearImage !== null)
      ? NearImageSearch.fromPartial(object.nearImage)
      : undefined;
    message.nearAudio = (object.nearAudio !== undefined && object.nearAudio !== null)
      ? NearAudioSearch.fromPartial(object.nearAudio)
      : undefined;
    message.nearVideo = (object.nearVideo !== undefined && object.nearVideo !== null)
      ? NearVideoSearch.fromPartial(object.nearVideo)
      : undefined;
    message.nearDepth = (object.nearDepth !== undefined && object.nearDepth !== null)
      ? NearDepthSearch.fromPartial(object.nearDepth)
      : undefined;
    message.nearThermal = (object.nearThermal !== undefined && object.nearThermal !== null)
      ? NearThermalSearch.fromPartial(object.nearThermal)
      : undefined;
    message.nearImu = (object.nearImu !== undefined && object.nearImu !== null)
      ? NearIMUSearch.fromPartial(object.nearImu)
      : undefined;
    message.generative = (object.generative !== undefined && object.generative !== null)
      ? GenerativeSearch.fromPartial(object.generative)
      : undefined;
    message.rerank = (object.rerank !== undefined && object.rerank !== null)
      ? Rerank.fromPartial(object.rerank)
      : undefined;
    message.uses123Api = object.uses123Api ?? false;
    message.uses125Api = object.uses125Api ?? false;
    return message;
  },
};

function createBaseGroupBy(): GroupBy {
  return { path: [], numberOfGroups: 0, objectsPerGroup: 0 };
}

export const GroupBy = {
  encode(message: GroupBy, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.path) {
      writer.uint32(10).string(v!);
    }
    if (message.numberOfGroups !== 0) {
      writer.uint32(16).int32(message.numberOfGroups);
    }
    if (message.objectsPerGroup !== 0) {
      writer.uint32(24).int32(message.objectsPerGroup);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GroupBy {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGroupBy();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.path.push(reader.string());
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.numberOfGroups = reader.int32();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.objectsPerGroup = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GroupBy {
    return {
      path: globalThis.Array.isArray(object?.path) ? object.path.map((e: any) => globalThis.String(e)) : [],
      numberOfGroups: isSet(object.numberOfGroups) ? globalThis.Number(object.numberOfGroups) : 0,
      objectsPerGroup: isSet(object.objectsPerGroup) ? globalThis.Number(object.objectsPerGroup) : 0,
    };
  },

  toJSON(message: GroupBy): unknown {
    const obj: any = {};
    if (message.path?.length) {
      obj.path = message.path;
    }
    if (message.numberOfGroups !== 0) {
      obj.numberOfGroups = Math.round(message.numberOfGroups);
    }
    if (message.objectsPerGroup !== 0) {
      obj.objectsPerGroup = Math.round(message.objectsPerGroup);
    }
    return obj;
  },

  create(base?: DeepPartial<GroupBy>): GroupBy {
    return GroupBy.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<GroupBy>): GroupBy {
    const message = createBaseGroupBy();
    message.path = object.path?.map((e) => e) || [];
    message.numberOfGroups = object.numberOfGroups ?? 0;
    message.objectsPerGroup = object.objectsPerGroup ?? 0;
    return message;
  },
};

function createBaseSortBy(): SortBy {
  return { ascending: false, path: [] };
}

export const SortBy = {
  encode(message: SortBy, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.ascending === true) {
      writer.uint32(8).bool(message.ascending);
    }
    for (const v of message.path) {
      writer.uint32(18).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SortBy {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSortBy();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.ascending = reader.bool();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.path.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SortBy {
    return {
      ascending: isSet(object.ascending) ? globalThis.Boolean(object.ascending) : false,
      path: globalThis.Array.isArray(object?.path) ? object.path.map((e: any) => globalThis.String(e)) : [],
    };
  },

  toJSON(message: SortBy): unknown {
    const obj: any = {};
    if (message.ascending === true) {
      obj.ascending = message.ascending;
    }
    if (message.path?.length) {
      obj.path = message.path;
    }
    return obj;
  },

  create(base?: DeepPartial<SortBy>): SortBy {
    return SortBy.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<SortBy>): SortBy {
    const message = createBaseSortBy();
    message.ascending = object.ascending ?? false;
    message.path = object.path?.map((e) => e) || [];
    return message;
  },
};

function createBaseGenerativeSearch(): GenerativeSearch {
  return { singleResponsePrompt: "", groupedResponseTask: "", groupedProperties: [] };
}

export const GenerativeSearch = {
  encode(message: GenerativeSearch, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.singleResponsePrompt !== "") {
      writer.uint32(10).string(message.singleResponsePrompt);
    }
    if (message.groupedResponseTask !== "") {
      writer.uint32(18).string(message.groupedResponseTask);
    }
    for (const v of message.groupedProperties) {
      writer.uint32(26).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GenerativeSearch {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenerativeSearch();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.singleResponsePrompt = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.groupedResponseTask = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.groupedProperties.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GenerativeSearch {
    return {
      singleResponsePrompt: isSet(object.singleResponsePrompt) ? globalThis.String(object.singleResponsePrompt) : "",
      groupedResponseTask: isSet(object.groupedResponseTask) ? globalThis.String(object.groupedResponseTask) : "",
      groupedProperties: globalThis.Array.isArray(object?.groupedProperties)
        ? object.groupedProperties.map((e: any) => globalThis.String(e))
        : [],
    };
  },

  toJSON(message: GenerativeSearch): unknown {
    const obj: any = {};
    if (message.singleResponsePrompt !== "") {
      obj.singleResponsePrompt = message.singleResponsePrompt;
    }
    if (message.groupedResponseTask !== "") {
      obj.groupedResponseTask = message.groupedResponseTask;
    }
    if (message.groupedProperties?.length) {
      obj.groupedProperties = message.groupedProperties;
    }
    return obj;
  },

  create(base?: DeepPartial<GenerativeSearch>): GenerativeSearch {
    return GenerativeSearch.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<GenerativeSearch>): GenerativeSearch {
    const message = createBaseGenerativeSearch();
    message.singleResponsePrompt = object.singleResponsePrompt ?? "";
    message.groupedResponseTask = object.groupedResponseTask ?? "";
    message.groupedProperties = object.groupedProperties?.map((e) => e) || [];
    return message;
  },
};

function createBaseMetadataRequest(): MetadataRequest {
  return {
    uuid: false,
    vector: false,
    creationTimeUnix: false,
    lastUpdateTimeUnix: false,
    distance: false,
    certainty: false,
    score: false,
    explainScore: false,
    isConsistent: false,
    vectors: [],
  };
}

export const MetadataRequest = {
  encode(message: MetadataRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.uuid === true) {
      writer.uint32(8).bool(message.uuid);
    }
    if (message.vector === true) {
      writer.uint32(16).bool(message.vector);
    }
    if (message.creationTimeUnix === true) {
      writer.uint32(24).bool(message.creationTimeUnix);
    }
    if (message.lastUpdateTimeUnix === true) {
      writer.uint32(32).bool(message.lastUpdateTimeUnix);
    }
    if (message.distance === true) {
      writer.uint32(40).bool(message.distance);
    }
    if (message.certainty === true) {
      writer.uint32(48).bool(message.certainty);
    }
    if (message.score === true) {
      writer.uint32(56).bool(message.score);
    }
    if (message.explainScore === true) {
      writer.uint32(64).bool(message.explainScore);
    }
    if (message.isConsistent === true) {
      writer.uint32(72).bool(message.isConsistent);
    }
    for (const v of message.vectors) {
      writer.uint32(82).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MetadataRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMetadataRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.uuid = reader.bool();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.vector = reader.bool();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.creationTimeUnix = reader.bool();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.lastUpdateTimeUnix = reader.bool();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.distance = reader.bool();
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.certainty = reader.bool();
          continue;
        case 7:
          if (tag !== 56) {
            break;
          }

          message.score = reader.bool();
          continue;
        case 8:
          if (tag !== 64) {
            break;
          }

          message.explainScore = reader.bool();
          continue;
        case 9:
          if (tag !== 72) {
            break;
          }

          message.isConsistent = reader.bool();
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.vectors.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MetadataRequest {
    return {
      uuid: isSet(object.uuid) ? globalThis.Boolean(object.uuid) : false,
      vector: isSet(object.vector) ? globalThis.Boolean(object.vector) : false,
      creationTimeUnix: isSet(object.creationTimeUnix) ? globalThis.Boolean(object.creationTimeUnix) : false,
      lastUpdateTimeUnix: isSet(object.lastUpdateTimeUnix) ? globalThis.Boolean(object.lastUpdateTimeUnix) : false,
      distance: isSet(object.distance) ? globalThis.Boolean(object.distance) : false,
      certainty: isSet(object.certainty) ? globalThis.Boolean(object.certainty) : false,
      score: isSet(object.score) ? globalThis.Boolean(object.score) : false,
      explainScore: isSet(object.explainScore) ? globalThis.Boolean(object.explainScore) : false,
      isConsistent: isSet(object.isConsistent) ? globalThis.Boolean(object.isConsistent) : false,
      vectors: globalThis.Array.isArray(object?.vectors) ? object.vectors.map((e: any) => globalThis.String(e)) : [],
    };
  },

  toJSON(message: MetadataRequest): unknown {
    const obj: any = {};
    if (message.uuid === true) {
      obj.uuid = message.uuid;
    }
    if (message.vector === true) {
      obj.vector = message.vector;
    }
    if (message.creationTimeUnix === true) {
      obj.creationTimeUnix = message.creationTimeUnix;
    }
    if (message.lastUpdateTimeUnix === true) {
      obj.lastUpdateTimeUnix = message.lastUpdateTimeUnix;
    }
    if (message.distance === true) {
      obj.distance = message.distance;
    }
    if (message.certainty === true) {
      obj.certainty = message.certainty;
    }
    if (message.score === true) {
      obj.score = message.score;
    }
    if (message.explainScore === true) {
      obj.explainScore = message.explainScore;
    }
    if (message.isConsistent === true) {
      obj.isConsistent = message.isConsistent;
    }
    if (message.vectors?.length) {
      obj.vectors = message.vectors;
    }
    return obj;
  },

  create(base?: DeepPartial<MetadataRequest>): MetadataRequest {
    return MetadataRequest.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<MetadataRequest>): MetadataRequest {
    const message = createBaseMetadataRequest();
    message.uuid = object.uuid ?? false;
    message.vector = object.vector ?? false;
    message.creationTimeUnix = object.creationTimeUnix ?? false;
    message.lastUpdateTimeUnix = object.lastUpdateTimeUnix ?? false;
    message.distance = object.distance ?? false;
    message.certainty = object.certainty ?? false;
    message.score = object.score ?? false;
    message.explainScore = object.explainScore ?? false;
    message.isConsistent = object.isConsistent ?? false;
    message.vectors = object.vectors?.map((e) => e) || [];
    return message;
  },
};

function createBasePropertiesRequest(): PropertiesRequest {
  return { nonRefProperties: [], refProperties: [], objectProperties: [], returnAllNonrefProperties: false };
}

export const PropertiesRequest = {
  encode(message: PropertiesRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.nonRefProperties) {
      writer.uint32(10).string(v!);
    }
    for (const v of message.refProperties) {
      RefPropertiesRequest.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.objectProperties) {
      ObjectPropertiesRequest.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    if (message.returnAllNonrefProperties === true) {
      writer.uint32(88).bool(message.returnAllNonrefProperties);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PropertiesRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePropertiesRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.nonRefProperties.push(reader.string());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.refProperties.push(RefPropertiesRequest.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.objectProperties.push(ObjectPropertiesRequest.decode(reader, reader.uint32()));
          continue;
        case 11:
          if (tag !== 88) {
            break;
          }

          message.returnAllNonrefProperties = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): PropertiesRequest {
    return {
      nonRefProperties: globalThis.Array.isArray(object?.nonRefProperties)
        ? object.nonRefProperties.map((e: any) => globalThis.String(e))
        : [],
      refProperties: globalThis.Array.isArray(object?.refProperties)
        ? object.refProperties.map((e: any) => RefPropertiesRequest.fromJSON(e))
        : [],
      objectProperties: globalThis.Array.isArray(object?.objectProperties)
        ? object.objectProperties.map((e: any) => ObjectPropertiesRequest.fromJSON(e))
        : [],
      returnAllNonrefProperties: isSet(object.returnAllNonrefProperties)
        ? globalThis.Boolean(object.returnAllNonrefProperties)
        : false,
    };
  },

  toJSON(message: PropertiesRequest): unknown {
    const obj: any = {};
    if (message.nonRefProperties?.length) {
      obj.nonRefProperties = message.nonRefProperties;
    }
    if (message.refProperties?.length) {
      obj.refProperties = message.refProperties.map((e) => RefPropertiesRequest.toJSON(e));
    }
    if (message.objectProperties?.length) {
      obj.objectProperties = message.objectProperties.map((e) => ObjectPropertiesRequest.toJSON(e));
    }
    if (message.returnAllNonrefProperties === true) {
      obj.returnAllNonrefProperties = message.returnAllNonrefProperties;
    }
    return obj;
  },

  create(base?: DeepPartial<PropertiesRequest>): PropertiesRequest {
    return PropertiesRequest.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<PropertiesRequest>): PropertiesRequest {
    const message = createBasePropertiesRequest();
    message.nonRefProperties = object.nonRefProperties?.map((e) => e) || [];
    message.refProperties = object.refProperties?.map((e) => RefPropertiesRequest.fromPartial(e)) || [];
    message.objectProperties = object.objectProperties?.map((e) => ObjectPropertiesRequest.fromPartial(e)) || [];
    message.returnAllNonrefProperties = object.returnAllNonrefProperties ?? false;
    return message;
  },
};

function createBaseObjectPropertiesRequest(): ObjectPropertiesRequest {
  return { propName: "", primitiveProperties: [], objectProperties: [] };
}

export const ObjectPropertiesRequest = {
  encode(message: ObjectPropertiesRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.propName !== "") {
      writer.uint32(10).string(message.propName);
    }
    for (const v of message.primitiveProperties) {
      writer.uint32(18).string(v!);
    }
    for (const v of message.objectProperties) {
      ObjectPropertiesRequest.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ObjectPropertiesRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseObjectPropertiesRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.propName = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.primitiveProperties.push(reader.string());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.objectProperties.push(ObjectPropertiesRequest.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ObjectPropertiesRequest {
    return {
      propName: isSet(object.propName) ? globalThis.String(object.propName) : "",
      primitiveProperties: globalThis.Array.isArray(object?.primitiveProperties)
        ? object.primitiveProperties.map((e: any) => globalThis.String(e))
        : [],
      objectProperties: globalThis.Array.isArray(object?.objectProperties)
        ? object.objectProperties.map((e: any) => ObjectPropertiesRequest.fromJSON(e))
        : [],
    };
  },

  toJSON(message: ObjectPropertiesRequest): unknown {
    const obj: any = {};
    if (message.propName !== "") {
      obj.propName = message.propName;
    }
    if (message.primitiveProperties?.length) {
      obj.primitiveProperties = message.primitiveProperties;
    }
    if (message.objectProperties?.length) {
      obj.objectProperties = message.objectProperties.map((e) => ObjectPropertiesRequest.toJSON(e));
    }
    return obj;
  },

  create(base?: DeepPartial<ObjectPropertiesRequest>): ObjectPropertiesRequest {
    return ObjectPropertiesRequest.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<ObjectPropertiesRequest>): ObjectPropertiesRequest {
    const message = createBaseObjectPropertiesRequest();
    message.propName = object.propName ?? "";
    message.primitiveProperties = object.primitiveProperties?.map((e) => e) || [];
    message.objectProperties = object.objectProperties?.map((e) => ObjectPropertiesRequest.fromPartial(e)) || [];
    return message;
  },
};

function createBaseHybrid(): Hybrid {
  return {
    query: "",
    properties: [],
    vector: [],
    alpha: 0,
    fusionType: 0,
    vectorBytes: new Uint8Array(0),
    targetVectors: [],
    nearText: undefined,
    nearVector: undefined,
  };
}

export const Hybrid = {
  encode(message: Hybrid, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.query !== "") {
      writer.uint32(10).string(message.query);
    }
    for (const v of message.properties) {
      writer.uint32(18).string(v!);
    }
    writer.uint32(26).fork();
    for (const v of message.vector) {
      writer.float(v);
    }
    writer.ldelim();
    if (message.alpha !== 0) {
      writer.uint32(37).float(message.alpha);
    }
    if (message.fusionType !== 0) {
      writer.uint32(40).int32(message.fusionType);
    }
    if (message.vectorBytes.length !== 0) {
      writer.uint32(50).bytes(message.vectorBytes);
    }
    for (const v of message.targetVectors) {
      writer.uint32(58).string(v!);
    }
    if (message.nearText !== undefined) {
      NearTextSearch.encode(message.nearText, writer.uint32(66).fork()).ldelim();
    }
    if (message.nearVector !== undefined) {
      NearVector.encode(message.nearVector, writer.uint32(74).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Hybrid {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHybrid();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.query = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.properties.push(reader.string());
          continue;
        case 3:
          if (tag === 29) {
            message.vector.push(reader.float());

            continue;
          }

          if (tag === 26) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.vector.push(reader.float());
            }

            continue;
          }

          break;
        case 4:
          if (tag !== 37) {
            break;
          }

          message.alpha = reader.float();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.fusionType = reader.int32() as any;
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.vectorBytes = reader.bytes();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.targetVectors.push(reader.string());
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.nearText = NearTextSearch.decode(reader, reader.uint32());
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.nearVector = NearVector.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Hybrid {
    return {
      query: isSet(object.query) ? globalThis.String(object.query) : "",
      properties: globalThis.Array.isArray(object?.properties)
        ? object.properties.map((e: any) => globalThis.String(e))
        : [],
      vector: globalThis.Array.isArray(object?.vector) ? object.vector.map((e: any) => globalThis.Number(e)) : [],
      alpha: isSet(object.alpha) ? globalThis.Number(object.alpha) : 0,
      fusionType: isSet(object.fusionType) ? hybrid_FusionTypeFromJSON(object.fusionType) : 0,
      vectorBytes: isSet(object.vectorBytes) ? bytesFromBase64(object.vectorBytes) : new Uint8Array(0),
      targetVectors: globalThis.Array.isArray(object?.targetVectors)
        ? object.targetVectors.map((e: any) => globalThis.String(e))
        : [],
      nearText: isSet(object.nearText) ? NearTextSearch.fromJSON(object.nearText) : undefined,
      nearVector: isSet(object.nearVector) ? NearVector.fromJSON(object.nearVector) : undefined,
    };
  },

  toJSON(message: Hybrid): unknown {
    const obj: any = {};
    if (message.query !== "") {
      obj.query = message.query;
    }
    if (message.properties?.length) {
      obj.properties = message.properties;
    }
    if (message.vector?.length) {
      obj.vector = message.vector;
    }
    if (message.alpha !== 0) {
      obj.alpha = message.alpha;
    }
    if (message.fusionType !== 0) {
      obj.fusionType = hybrid_FusionTypeToJSON(message.fusionType);
    }
    if (message.vectorBytes.length !== 0) {
      obj.vectorBytes = base64FromBytes(message.vectorBytes);
    }
    if (message.targetVectors?.length) {
      obj.targetVectors = message.targetVectors;
    }
    if (message.nearText !== undefined) {
      obj.nearText = NearTextSearch.toJSON(message.nearText);
    }
    if (message.nearVector !== undefined) {
      obj.nearVector = NearVector.toJSON(message.nearVector);
    }
    return obj;
  },

  create(base?: DeepPartial<Hybrid>): Hybrid {
    return Hybrid.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<Hybrid>): Hybrid {
    const message = createBaseHybrid();
    message.query = object.query ?? "";
    message.properties = object.properties?.map((e) => e) || [];
    message.vector = object.vector?.map((e) => e) || [];
    message.alpha = object.alpha ?? 0;
    message.fusionType = object.fusionType ?? 0;
    message.vectorBytes = object.vectorBytes ?? new Uint8Array(0);
    message.targetVectors = object.targetVectors?.map((e) => e) || [];
    message.nearText = (object.nearText !== undefined && object.nearText !== null)
      ? NearTextSearch.fromPartial(object.nearText)
      : undefined;
    message.nearVector = (object.nearVector !== undefined && object.nearVector !== null)
      ? NearVector.fromPartial(object.nearVector)
      : undefined;
    return message;
  },
};

function createBaseNearTextSearch(): NearTextSearch {
  return {
    query: [],
    certainty: undefined,
    distance: undefined,
    moveTo: undefined,
    moveAway: undefined,
    targetVectors: [],
  };
}

export const NearTextSearch = {
  encode(message: NearTextSearch, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.query) {
      writer.uint32(10).string(v!);
    }
    if (message.certainty !== undefined) {
      writer.uint32(17).double(message.certainty);
    }
    if (message.distance !== undefined) {
      writer.uint32(25).double(message.distance);
    }
    if (message.moveTo !== undefined) {
      NearTextSearch_Move.encode(message.moveTo, writer.uint32(34).fork()).ldelim();
    }
    if (message.moveAway !== undefined) {
      NearTextSearch_Move.encode(message.moveAway, writer.uint32(42).fork()).ldelim();
    }
    for (const v of message.targetVectors) {
      writer.uint32(50).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NearTextSearch {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNearTextSearch();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.query.push(reader.string());
          continue;
        case 2:
          if (tag !== 17) {
            break;
          }

          message.certainty = reader.double();
          continue;
        case 3:
          if (tag !== 25) {
            break;
          }

          message.distance = reader.double();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.moveTo = NearTextSearch_Move.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.moveAway = NearTextSearch_Move.decode(reader, reader.uint32());
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.targetVectors.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): NearTextSearch {
    return {
      query: globalThis.Array.isArray(object?.query) ? object.query.map((e: any) => globalThis.String(e)) : [],
      certainty: isSet(object.certainty) ? globalThis.Number(object.certainty) : undefined,
      distance: isSet(object.distance) ? globalThis.Number(object.distance) : undefined,
      moveTo: isSet(object.moveTo) ? NearTextSearch_Move.fromJSON(object.moveTo) : undefined,
      moveAway: isSet(object.moveAway) ? NearTextSearch_Move.fromJSON(object.moveAway) : undefined,
      targetVectors: globalThis.Array.isArray(object?.targetVectors)
        ? object.targetVectors.map((e: any) => globalThis.String(e))
        : [],
    };
  },

  toJSON(message: NearTextSearch): unknown {
    const obj: any = {};
    if (message.query?.length) {
      obj.query = message.query;
    }
    if (message.certainty !== undefined) {
      obj.certainty = message.certainty;
    }
    if (message.distance !== undefined) {
      obj.distance = message.distance;
    }
    if (message.moveTo !== undefined) {
      obj.moveTo = NearTextSearch_Move.toJSON(message.moveTo);
    }
    if (message.moveAway !== undefined) {
      obj.moveAway = NearTextSearch_Move.toJSON(message.moveAway);
    }
    if (message.targetVectors?.length) {
      obj.targetVectors = message.targetVectors;
    }
    return obj;
  },

  create(base?: DeepPartial<NearTextSearch>): NearTextSearch {
    return NearTextSearch.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<NearTextSearch>): NearTextSearch {
    const message = createBaseNearTextSearch();
    message.query = object.query?.map((e) => e) || [];
    message.certainty = object.certainty ?? undefined;
    message.distance = object.distance ?? undefined;
    message.moveTo = (object.moveTo !== undefined && object.moveTo !== null)
      ? NearTextSearch_Move.fromPartial(object.moveTo)
      : undefined;
    message.moveAway = (object.moveAway !== undefined && object.moveAway !== null)
      ? NearTextSearch_Move.fromPartial(object.moveAway)
      : undefined;
    message.targetVectors = object.targetVectors?.map((e) => e) || [];
    return message;
  },
};

function createBaseNearTextSearch_Move(): NearTextSearch_Move {
  return { force: 0, concepts: [], uuids: [] };
}

export const NearTextSearch_Move = {
  encode(message: NearTextSearch_Move, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.force !== 0) {
      writer.uint32(13).float(message.force);
    }
    for (const v of message.concepts) {
      writer.uint32(18).string(v!);
    }
    for (const v of message.uuids) {
      writer.uint32(26).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NearTextSearch_Move {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNearTextSearch_Move();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 13) {
            break;
          }

          message.force = reader.float();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.concepts.push(reader.string());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.uuids.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): NearTextSearch_Move {
    return {
      force: isSet(object.force) ? globalThis.Number(object.force) : 0,
      concepts: globalThis.Array.isArray(object?.concepts) ? object.concepts.map((e: any) => globalThis.String(e)) : [],
      uuids: globalThis.Array.isArray(object?.uuids) ? object.uuids.map((e: any) => globalThis.String(e)) : [],
    };
  },

  toJSON(message: NearTextSearch_Move): unknown {
    const obj: any = {};
    if (message.force !== 0) {
      obj.force = message.force;
    }
    if (message.concepts?.length) {
      obj.concepts = message.concepts;
    }
    if (message.uuids?.length) {
      obj.uuids = message.uuids;
    }
    return obj;
  },

  create(base?: DeepPartial<NearTextSearch_Move>): NearTextSearch_Move {
    return NearTextSearch_Move.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<NearTextSearch_Move>): NearTextSearch_Move {
    const message = createBaseNearTextSearch_Move();
    message.force = object.force ?? 0;
    message.concepts = object.concepts?.map((e) => e) || [];
    message.uuids = object.uuids?.map((e) => e) || [];
    return message;
  },
};

function createBaseNearImageSearch(): NearImageSearch {
  return { image: "", certainty: undefined, distance: undefined, targetVectors: [] };
}

export const NearImageSearch = {
  encode(message: NearImageSearch, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.image !== "") {
      writer.uint32(10).string(message.image);
    }
    if (message.certainty !== undefined) {
      writer.uint32(17).double(message.certainty);
    }
    if (message.distance !== undefined) {
      writer.uint32(25).double(message.distance);
    }
    for (const v of message.targetVectors) {
      writer.uint32(34).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NearImageSearch {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNearImageSearch();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.image = reader.string();
          continue;
        case 2:
          if (tag !== 17) {
            break;
          }

          message.certainty = reader.double();
          continue;
        case 3:
          if (tag !== 25) {
            break;
          }

          message.distance = reader.double();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.targetVectors.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): NearImageSearch {
    return {
      image: isSet(object.image) ? globalThis.String(object.image) : "",
      certainty: isSet(object.certainty) ? globalThis.Number(object.certainty) : undefined,
      distance: isSet(object.distance) ? globalThis.Number(object.distance) : undefined,
      targetVectors: globalThis.Array.isArray(object?.targetVectors)
        ? object.targetVectors.map((e: any) => globalThis.String(e))
        : [],
    };
  },

  toJSON(message: NearImageSearch): unknown {
    const obj: any = {};
    if (message.image !== "") {
      obj.image = message.image;
    }
    if (message.certainty !== undefined) {
      obj.certainty = message.certainty;
    }
    if (message.distance !== undefined) {
      obj.distance = message.distance;
    }
    if (message.targetVectors?.length) {
      obj.targetVectors = message.targetVectors;
    }
    return obj;
  },

  create(base?: DeepPartial<NearImageSearch>): NearImageSearch {
    return NearImageSearch.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<NearImageSearch>): NearImageSearch {
    const message = createBaseNearImageSearch();
    message.image = object.image ?? "";
    message.certainty = object.certainty ?? undefined;
    message.distance = object.distance ?? undefined;
    message.targetVectors = object.targetVectors?.map((e) => e) || [];
    return message;
  },
};

function createBaseNearAudioSearch(): NearAudioSearch {
  return { audio: "", certainty: undefined, distance: undefined, targetVectors: [] };
}

export const NearAudioSearch = {
  encode(message: NearAudioSearch, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.audio !== "") {
      writer.uint32(10).string(message.audio);
    }
    if (message.certainty !== undefined) {
      writer.uint32(17).double(message.certainty);
    }
    if (message.distance !== undefined) {
      writer.uint32(25).double(message.distance);
    }
    for (const v of message.targetVectors) {
      writer.uint32(34).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NearAudioSearch {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNearAudioSearch();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.audio = reader.string();
          continue;
        case 2:
          if (tag !== 17) {
            break;
          }

          message.certainty = reader.double();
          continue;
        case 3:
          if (tag !== 25) {
            break;
          }

          message.distance = reader.double();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.targetVectors.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): NearAudioSearch {
    return {
      audio: isSet(object.audio) ? globalThis.String(object.audio) : "",
      certainty: isSet(object.certainty) ? globalThis.Number(object.certainty) : undefined,
      distance: isSet(object.distance) ? globalThis.Number(object.distance) : undefined,
      targetVectors: globalThis.Array.isArray(object?.targetVectors)
        ? object.targetVectors.map((e: any) => globalThis.String(e))
        : [],
    };
  },

  toJSON(message: NearAudioSearch): unknown {
    const obj: any = {};
    if (message.audio !== "") {
      obj.audio = message.audio;
    }
    if (message.certainty !== undefined) {
      obj.certainty = message.certainty;
    }
    if (message.distance !== undefined) {
      obj.distance = message.distance;
    }
    if (message.targetVectors?.length) {
      obj.targetVectors = message.targetVectors;
    }
    return obj;
  },

  create(base?: DeepPartial<NearAudioSearch>): NearAudioSearch {
    return NearAudioSearch.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<NearAudioSearch>): NearAudioSearch {
    const message = createBaseNearAudioSearch();
    message.audio = object.audio ?? "";
    message.certainty = object.certainty ?? undefined;
    message.distance = object.distance ?? undefined;
    message.targetVectors = object.targetVectors?.map((e) => e) || [];
    return message;
  },
};

function createBaseNearVideoSearch(): NearVideoSearch {
  return { video: "", certainty: undefined, distance: undefined, targetVectors: [] };
}

export const NearVideoSearch = {
  encode(message: NearVideoSearch, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.video !== "") {
      writer.uint32(10).string(message.video);
    }
    if (message.certainty !== undefined) {
      writer.uint32(17).double(message.certainty);
    }
    if (message.distance !== undefined) {
      writer.uint32(25).double(message.distance);
    }
    for (const v of message.targetVectors) {
      writer.uint32(34).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NearVideoSearch {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNearVideoSearch();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.video = reader.string();
          continue;
        case 2:
          if (tag !== 17) {
            break;
          }

          message.certainty = reader.double();
          continue;
        case 3:
          if (tag !== 25) {
            break;
          }

          message.distance = reader.double();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.targetVectors.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): NearVideoSearch {
    return {
      video: isSet(object.video) ? globalThis.String(object.video) : "",
      certainty: isSet(object.certainty) ? globalThis.Number(object.certainty) : undefined,
      distance: isSet(object.distance) ? globalThis.Number(object.distance) : undefined,
      targetVectors: globalThis.Array.isArray(object?.targetVectors)
        ? object.targetVectors.map((e: any) => globalThis.String(e))
        : [],
    };
  },

  toJSON(message: NearVideoSearch): unknown {
    const obj: any = {};
    if (message.video !== "") {
      obj.video = message.video;
    }
    if (message.certainty !== undefined) {
      obj.certainty = message.certainty;
    }
    if (message.distance !== undefined) {
      obj.distance = message.distance;
    }
    if (message.targetVectors?.length) {
      obj.targetVectors = message.targetVectors;
    }
    return obj;
  },

  create(base?: DeepPartial<NearVideoSearch>): NearVideoSearch {
    return NearVideoSearch.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<NearVideoSearch>): NearVideoSearch {
    const message = createBaseNearVideoSearch();
    message.video = object.video ?? "";
    message.certainty = object.certainty ?? undefined;
    message.distance = object.distance ?? undefined;
    message.targetVectors = object.targetVectors?.map((e) => e) || [];
    return message;
  },
};

function createBaseNearDepthSearch(): NearDepthSearch {
  return { depth: "", certainty: undefined, distance: undefined, targetVectors: [] };
}

export const NearDepthSearch = {
  encode(message: NearDepthSearch, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.depth !== "") {
      writer.uint32(10).string(message.depth);
    }
    if (message.certainty !== undefined) {
      writer.uint32(17).double(message.certainty);
    }
    if (message.distance !== undefined) {
      writer.uint32(25).double(message.distance);
    }
    for (const v of message.targetVectors) {
      writer.uint32(34).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NearDepthSearch {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNearDepthSearch();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.depth = reader.string();
          continue;
        case 2:
          if (tag !== 17) {
            break;
          }

          message.certainty = reader.double();
          continue;
        case 3:
          if (tag !== 25) {
            break;
          }

          message.distance = reader.double();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.targetVectors.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): NearDepthSearch {
    return {
      depth: isSet(object.depth) ? globalThis.String(object.depth) : "",
      certainty: isSet(object.certainty) ? globalThis.Number(object.certainty) : undefined,
      distance: isSet(object.distance) ? globalThis.Number(object.distance) : undefined,
      targetVectors: globalThis.Array.isArray(object?.targetVectors)
        ? object.targetVectors.map((e: any) => globalThis.String(e))
        : [],
    };
  },

  toJSON(message: NearDepthSearch): unknown {
    const obj: any = {};
    if (message.depth !== "") {
      obj.depth = message.depth;
    }
    if (message.certainty !== undefined) {
      obj.certainty = message.certainty;
    }
    if (message.distance !== undefined) {
      obj.distance = message.distance;
    }
    if (message.targetVectors?.length) {
      obj.targetVectors = message.targetVectors;
    }
    return obj;
  },

  create(base?: DeepPartial<NearDepthSearch>): NearDepthSearch {
    return NearDepthSearch.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<NearDepthSearch>): NearDepthSearch {
    const message = createBaseNearDepthSearch();
    message.depth = object.depth ?? "";
    message.certainty = object.certainty ?? undefined;
    message.distance = object.distance ?? undefined;
    message.targetVectors = object.targetVectors?.map((e) => e) || [];
    return message;
  },
};

function createBaseNearThermalSearch(): NearThermalSearch {
  return { thermal: "", certainty: undefined, distance: undefined, targetVectors: [] };
}

export const NearThermalSearch = {
  encode(message: NearThermalSearch, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.thermal !== "") {
      writer.uint32(10).string(message.thermal);
    }
    if (message.certainty !== undefined) {
      writer.uint32(17).double(message.certainty);
    }
    if (message.distance !== undefined) {
      writer.uint32(25).double(message.distance);
    }
    for (const v of message.targetVectors) {
      writer.uint32(34).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NearThermalSearch {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNearThermalSearch();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.thermal = reader.string();
          continue;
        case 2:
          if (tag !== 17) {
            break;
          }

          message.certainty = reader.double();
          continue;
        case 3:
          if (tag !== 25) {
            break;
          }

          message.distance = reader.double();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.targetVectors.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): NearThermalSearch {
    return {
      thermal: isSet(object.thermal) ? globalThis.String(object.thermal) : "",
      certainty: isSet(object.certainty) ? globalThis.Number(object.certainty) : undefined,
      distance: isSet(object.distance) ? globalThis.Number(object.distance) : undefined,
      targetVectors: globalThis.Array.isArray(object?.targetVectors)
        ? object.targetVectors.map((e: any) => globalThis.String(e))
        : [],
    };
  },

  toJSON(message: NearThermalSearch): unknown {
    const obj: any = {};
    if (message.thermal !== "") {
      obj.thermal = message.thermal;
    }
    if (message.certainty !== undefined) {
      obj.certainty = message.certainty;
    }
    if (message.distance !== undefined) {
      obj.distance = message.distance;
    }
    if (message.targetVectors?.length) {
      obj.targetVectors = message.targetVectors;
    }
    return obj;
  },

  create(base?: DeepPartial<NearThermalSearch>): NearThermalSearch {
    return NearThermalSearch.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<NearThermalSearch>): NearThermalSearch {
    const message = createBaseNearThermalSearch();
    message.thermal = object.thermal ?? "";
    message.certainty = object.certainty ?? undefined;
    message.distance = object.distance ?? undefined;
    message.targetVectors = object.targetVectors?.map((e) => e) || [];
    return message;
  },
};

function createBaseNearIMUSearch(): NearIMUSearch {
  return { imu: "", certainty: undefined, distance: undefined, targetVectors: [] };
}

export const NearIMUSearch = {
  encode(message: NearIMUSearch, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.imu !== "") {
      writer.uint32(10).string(message.imu);
    }
    if (message.certainty !== undefined) {
      writer.uint32(17).double(message.certainty);
    }
    if (message.distance !== undefined) {
      writer.uint32(25).double(message.distance);
    }
    for (const v of message.targetVectors) {
      writer.uint32(34).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NearIMUSearch {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNearIMUSearch();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.imu = reader.string();
          continue;
        case 2:
          if (tag !== 17) {
            break;
          }

          message.certainty = reader.double();
          continue;
        case 3:
          if (tag !== 25) {
            break;
          }

          message.distance = reader.double();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.targetVectors.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): NearIMUSearch {
    return {
      imu: isSet(object.imu) ? globalThis.String(object.imu) : "",
      certainty: isSet(object.certainty) ? globalThis.Number(object.certainty) : undefined,
      distance: isSet(object.distance) ? globalThis.Number(object.distance) : undefined,
      targetVectors: globalThis.Array.isArray(object?.targetVectors)
        ? object.targetVectors.map((e: any) => globalThis.String(e))
        : [],
    };
  },

  toJSON(message: NearIMUSearch): unknown {
    const obj: any = {};
    if (message.imu !== "") {
      obj.imu = message.imu;
    }
    if (message.certainty !== undefined) {
      obj.certainty = message.certainty;
    }
    if (message.distance !== undefined) {
      obj.distance = message.distance;
    }
    if (message.targetVectors?.length) {
      obj.targetVectors = message.targetVectors;
    }
    return obj;
  },

  create(base?: DeepPartial<NearIMUSearch>): NearIMUSearch {
    return NearIMUSearch.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<NearIMUSearch>): NearIMUSearch {
    const message = createBaseNearIMUSearch();
    message.imu = object.imu ?? "";
    message.certainty = object.certainty ?? undefined;
    message.distance = object.distance ?? undefined;
    message.targetVectors = object.targetVectors?.map((e) => e) || [];
    return message;
  },
};

function createBaseBM25(): BM25 {
  return { query: "", properties: [] };
}

export const BM25 = {
  encode(message: BM25, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.query !== "") {
      writer.uint32(10).string(message.query);
    }
    for (const v of message.properties) {
      writer.uint32(18).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BM25 {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBM25();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.query = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.properties.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): BM25 {
    return {
      query: isSet(object.query) ? globalThis.String(object.query) : "",
      properties: globalThis.Array.isArray(object?.properties)
        ? object.properties.map((e: any) => globalThis.String(e))
        : [],
    };
  },

  toJSON(message: BM25): unknown {
    const obj: any = {};
    if (message.query !== "") {
      obj.query = message.query;
    }
    if (message.properties?.length) {
      obj.properties = message.properties;
    }
    return obj;
  },

  create(base?: DeepPartial<BM25>): BM25 {
    return BM25.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<BM25>): BM25 {
    const message = createBaseBM25();
    message.query = object.query ?? "";
    message.properties = object.properties?.map((e) => e) || [];
    return message;
  },
};

function createBaseRefPropertiesRequest(): RefPropertiesRequest {
  return { referenceProperty: "", properties: undefined, metadata: undefined, targetCollection: "" };
}

export const RefPropertiesRequest = {
  encode(message: RefPropertiesRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.referenceProperty !== "") {
      writer.uint32(10).string(message.referenceProperty);
    }
    if (message.properties !== undefined) {
      PropertiesRequest.encode(message.properties, writer.uint32(18).fork()).ldelim();
    }
    if (message.metadata !== undefined) {
      MetadataRequest.encode(message.metadata, writer.uint32(26).fork()).ldelim();
    }
    if (message.targetCollection !== "") {
      writer.uint32(34).string(message.targetCollection);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RefPropertiesRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRefPropertiesRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.referenceProperty = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.properties = PropertiesRequest.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.metadata = MetadataRequest.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.targetCollection = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RefPropertiesRequest {
    return {
      referenceProperty: isSet(object.referenceProperty) ? globalThis.String(object.referenceProperty) : "",
      properties: isSet(object.properties) ? PropertiesRequest.fromJSON(object.properties) : undefined,
      metadata: isSet(object.metadata) ? MetadataRequest.fromJSON(object.metadata) : undefined,
      targetCollection: isSet(object.targetCollection) ? globalThis.String(object.targetCollection) : "",
    };
  },

  toJSON(message: RefPropertiesRequest): unknown {
    const obj: any = {};
    if (message.referenceProperty !== "") {
      obj.referenceProperty = message.referenceProperty;
    }
    if (message.properties !== undefined) {
      obj.properties = PropertiesRequest.toJSON(message.properties);
    }
    if (message.metadata !== undefined) {
      obj.metadata = MetadataRequest.toJSON(message.metadata);
    }
    if (message.targetCollection !== "") {
      obj.targetCollection = message.targetCollection;
    }
    return obj;
  },

  create(base?: DeepPartial<RefPropertiesRequest>): RefPropertiesRequest {
    return RefPropertiesRequest.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<RefPropertiesRequest>): RefPropertiesRequest {
    const message = createBaseRefPropertiesRequest();
    message.referenceProperty = object.referenceProperty ?? "";
    message.properties = (object.properties !== undefined && object.properties !== null)
      ? PropertiesRequest.fromPartial(object.properties)
      : undefined;
    message.metadata = (object.metadata !== undefined && object.metadata !== null)
      ? MetadataRequest.fromPartial(object.metadata)
      : undefined;
    message.targetCollection = object.targetCollection ?? "";
    return message;
  },
};

function createBaseNearVector(): NearVector {
  return { vector: [], certainty: undefined, distance: undefined, vectorBytes: new Uint8Array(0), targetVectors: [] };
}

export const NearVector = {
  encode(message: NearVector, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    writer.uint32(10).fork();
    for (const v of message.vector) {
      writer.float(v);
    }
    writer.ldelim();
    if (message.certainty !== undefined) {
      writer.uint32(17).double(message.certainty);
    }
    if (message.distance !== undefined) {
      writer.uint32(25).double(message.distance);
    }
    if (message.vectorBytes.length !== 0) {
      writer.uint32(34).bytes(message.vectorBytes);
    }
    for (const v of message.targetVectors) {
      writer.uint32(42).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NearVector {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNearVector();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag === 13) {
            message.vector.push(reader.float());

            continue;
          }

          if (tag === 10) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.vector.push(reader.float());
            }

            continue;
          }

          break;
        case 2:
          if (tag !== 17) {
            break;
          }

          message.certainty = reader.double();
          continue;
        case 3:
          if (tag !== 25) {
            break;
          }

          message.distance = reader.double();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.vectorBytes = reader.bytes();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.targetVectors.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): NearVector {
    return {
      vector: globalThis.Array.isArray(object?.vector) ? object.vector.map((e: any) => globalThis.Number(e)) : [],
      certainty: isSet(object.certainty) ? globalThis.Number(object.certainty) : undefined,
      distance: isSet(object.distance) ? globalThis.Number(object.distance) : undefined,
      vectorBytes: isSet(object.vectorBytes) ? bytesFromBase64(object.vectorBytes) : new Uint8Array(0),
      targetVectors: globalThis.Array.isArray(object?.targetVectors)
        ? object.targetVectors.map((e: any) => globalThis.String(e))
        : [],
    };
  },

  toJSON(message: NearVector): unknown {
    const obj: any = {};
    if (message.vector?.length) {
      obj.vector = message.vector;
    }
    if (message.certainty !== undefined) {
      obj.certainty = message.certainty;
    }
    if (message.distance !== undefined) {
      obj.distance = message.distance;
    }
    if (message.vectorBytes.length !== 0) {
      obj.vectorBytes = base64FromBytes(message.vectorBytes);
    }
    if (message.targetVectors?.length) {
      obj.targetVectors = message.targetVectors;
    }
    return obj;
  },

  create(base?: DeepPartial<NearVector>): NearVector {
    return NearVector.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<NearVector>): NearVector {
    const message = createBaseNearVector();
    message.vector = object.vector?.map((e) => e) || [];
    message.certainty = object.certainty ?? undefined;
    message.distance = object.distance ?? undefined;
    message.vectorBytes = object.vectorBytes ?? new Uint8Array(0);
    message.targetVectors = object.targetVectors?.map((e) => e) || [];
    return message;
  },
};

function createBaseNearObject(): NearObject {
  return { id: "", certainty: undefined, distance: undefined, targetVectors: [] };
}

export const NearObject = {
  encode(message: NearObject, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.certainty !== undefined) {
      writer.uint32(17).double(message.certainty);
    }
    if (message.distance !== undefined) {
      writer.uint32(25).double(message.distance);
    }
    for (const v of message.targetVectors) {
      writer.uint32(34).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NearObject {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNearObject();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id = reader.string();
          continue;
        case 2:
          if (tag !== 17) {
            break;
          }

          message.certainty = reader.double();
          continue;
        case 3:
          if (tag !== 25) {
            break;
          }

          message.distance = reader.double();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.targetVectors.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): NearObject {
    return {
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      certainty: isSet(object.certainty) ? globalThis.Number(object.certainty) : undefined,
      distance: isSet(object.distance) ? globalThis.Number(object.distance) : undefined,
      targetVectors: globalThis.Array.isArray(object?.targetVectors)
        ? object.targetVectors.map((e: any) => globalThis.String(e))
        : [],
    };
  },

  toJSON(message: NearObject): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    if (message.certainty !== undefined) {
      obj.certainty = message.certainty;
    }
    if (message.distance !== undefined) {
      obj.distance = message.distance;
    }
    if (message.targetVectors?.length) {
      obj.targetVectors = message.targetVectors;
    }
    return obj;
  },

  create(base?: DeepPartial<NearObject>): NearObject {
    return NearObject.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<NearObject>): NearObject {
    const message = createBaseNearObject();
    message.id = object.id ?? "";
    message.certainty = object.certainty ?? undefined;
    message.distance = object.distance ?? undefined;
    message.targetVectors = object.targetVectors?.map((e) => e) || [];
    return message;
  },
};

function createBaseRerank(): Rerank {
  return { property: "", query: undefined };
}

export const Rerank = {
  encode(message: Rerank, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.property !== "") {
      writer.uint32(10).string(message.property);
    }
    if (message.query !== undefined) {
      writer.uint32(18).string(message.query);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Rerank {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRerank();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.property = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.query = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Rerank {
    return {
      property: isSet(object.property) ? globalThis.String(object.property) : "",
      query: isSet(object.query) ? globalThis.String(object.query) : undefined,
    };
  },

  toJSON(message: Rerank): unknown {
    const obj: any = {};
    if (message.property !== "") {
      obj.property = message.property;
    }
    if (message.query !== undefined) {
      obj.query = message.query;
    }
    return obj;
  },

  create(base?: DeepPartial<Rerank>): Rerank {
    return Rerank.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<Rerank>): Rerank {
    const message = createBaseRerank();
    message.property = object.property ?? "";
    message.query = object.query ?? undefined;
    return message;
  },
};

function createBaseSearchReply(): SearchReply {
  return { took: 0, results: [], generativeGroupedResult: undefined, groupByResults: [] };
}

export const SearchReply = {
  encode(message: SearchReply, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.took !== 0) {
      writer.uint32(13).float(message.took);
    }
    for (const v of message.results) {
      SearchResult.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.generativeGroupedResult !== undefined) {
      writer.uint32(26).string(message.generativeGroupedResult);
    }
    for (const v of message.groupByResults) {
      GroupByResult.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SearchReply {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSearchReply();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 13) {
            break;
          }

          message.took = reader.float();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.results.push(SearchResult.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.generativeGroupedResult = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.groupByResults.push(GroupByResult.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SearchReply {
    return {
      took: isSet(object.took) ? globalThis.Number(object.took) : 0,
      results: globalThis.Array.isArray(object?.results)
        ? object.results.map((e: any) => SearchResult.fromJSON(e))
        : [],
      generativeGroupedResult: isSet(object.generativeGroupedResult)
        ? globalThis.String(object.generativeGroupedResult)
        : undefined,
      groupByResults: globalThis.Array.isArray(object?.groupByResults)
        ? object.groupByResults.map((e: any) => GroupByResult.fromJSON(e))
        : [],
    };
  },

  toJSON(message: SearchReply): unknown {
    const obj: any = {};
    if (message.took !== 0) {
      obj.took = message.took;
    }
    if (message.results?.length) {
      obj.results = message.results.map((e) => SearchResult.toJSON(e));
    }
    if (message.generativeGroupedResult !== undefined) {
      obj.generativeGroupedResult = message.generativeGroupedResult;
    }
    if (message.groupByResults?.length) {
      obj.groupByResults = message.groupByResults.map((e) => GroupByResult.toJSON(e));
    }
    return obj;
  },

  create(base?: DeepPartial<SearchReply>): SearchReply {
    return SearchReply.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<SearchReply>): SearchReply {
    const message = createBaseSearchReply();
    message.took = object.took ?? 0;
    message.results = object.results?.map((e) => SearchResult.fromPartial(e)) || [];
    message.generativeGroupedResult = object.generativeGroupedResult ?? undefined;
    message.groupByResults = object.groupByResults?.map((e) => GroupByResult.fromPartial(e)) || [];
    return message;
  },
};

function createBaseRerankReply(): RerankReply {
  return { score: 0 };
}

export const RerankReply = {
  encode(message: RerankReply, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.score !== 0) {
      writer.uint32(9).double(message.score);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RerankReply {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRerankReply();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 9) {
            break;
          }

          message.score = reader.double();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RerankReply {
    return { score: isSet(object.score) ? globalThis.Number(object.score) : 0 };
  },

  toJSON(message: RerankReply): unknown {
    const obj: any = {};
    if (message.score !== 0) {
      obj.score = message.score;
    }
    return obj;
  },

  create(base?: DeepPartial<RerankReply>): RerankReply {
    return RerankReply.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<RerankReply>): RerankReply {
    const message = createBaseRerankReply();
    message.score = object.score ?? 0;
    return message;
  },
};

function createBaseGenerativeReply(): GenerativeReply {
  return { result: "" };
}

export const GenerativeReply = {
  encode(message: GenerativeReply, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.result !== "") {
      writer.uint32(10).string(message.result);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GenerativeReply {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenerativeReply();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.result = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GenerativeReply {
    return { result: isSet(object.result) ? globalThis.String(object.result) : "" };
  },

  toJSON(message: GenerativeReply): unknown {
    const obj: any = {};
    if (message.result !== "") {
      obj.result = message.result;
    }
    return obj;
  },

  create(base?: DeepPartial<GenerativeReply>): GenerativeReply {
    return GenerativeReply.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<GenerativeReply>): GenerativeReply {
    const message = createBaseGenerativeReply();
    message.result = object.result ?? "";
    return message;
  },
};

function createBaseGroupByResult(): GroupByResult {
  return {
    name: "",
    minDistance: 0,
    maxDistance: 0,
    numberOfObjects: 0,
    objects: [],
    rerank: undefined,
    generative: undefined,
  };
}

export const GroupByResult = {
  encode(message: GroupByResult, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.minDistance !== 0) {
      writer.uint32(21).float(message.minDistance);
    }
    if (message.maxDistance !== 0) {
      writer.uint32(29).float(message.maxDistance);
    }
    if (message.numberOfObjects !== 0) {
      writer.uint32(32).int64(message.numberOfObjects);
    }
    for (const v of message.objects) {
      SearchResult.encode(v!, writer.uint32(42).fork()).ldelim();
    }
    if (message.rerank !== undefined) {
      RerankReply.encode(message.rerank, writer.uint32(50).fork()).ldelim();
    }
    if (message.generative !== undefined) {
      GenerativeReply.encode(message.generative, writer.uint32(58).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GroupByResult {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGroupByResult();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.name = reader.string();
          continue;
        case 2:
          if (tag !== 21) {
            break;
          }

          message.minDistance = reader.float();
          continue;
        case 3:
          if (tag !== 29) {
            break;
          }

          message.maxDistance = reader.float();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.numberOfObjects = longToNumber(reader.int64() as Long);
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.objects.push(SearchResult.decode(reader, reader.uint32()));
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.rerank = RerankReply.decode(reader, reader.uint32());
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.generative = GenerativeReply.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GroupByResult {
    return {
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      minDistance: isSet(object.minDistance) ? globalThis.Number(object.minDistance) : 0,
      maxDistance: isSet(object.maxDistance) ? globalThis.Number(object.maxDistance) : 0,
      numberOfObjects: isSet(object.numberOfObjects) ? globalThis.Number(object.numberOfObjects) : 0,
      objects: globalThis.Array.isArray(object?.objects)
        ? object.objects.map((e: any) => SearchResult.fromJSON(e))
        : [],
      rerank: isSet(object.rerank) ? RerankReply.fromJSON(object.rerank) : undefined,
      generative: isSet(object.generative) ? GenerativeReply.fromJSON(object.generative) : undefined,
    };
  },

  toJSON(message: GroupByResult): unknown {
    const obj: any = {};
    if (message.name !== "") {
      obj.name = message.name;
    }
    if (message.minDistance !== 0) {
      obj.minDistance = message.minDistance;
    }
    if (message.maxDistance !== 0) {
      obj.maxDistance = message.maxDistance;
    }
    if (message.numberOfObjects !== 0) {
      obj.numberOfObjects = Math.round(message.numberOfObjects);
    }
    if (message.objects?.length) {
      obj.objects = message.objects.map((e) => SearchResult.toJSON(e));
    }
    if (message.rerank !== undefined) {
      obj.rerank = RerankReply.toJSON(message.rerank);
    }
    if (message.generative !== undefined) {
      obj.generative = GenerativeReply.toJSON(message.generative);
    }
    return obj;
  },

  create(base?: DeepPartial<GroupByResult>): GroupByResult {
    return GroupByResult.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<GroupByResult>): GroupByResult {
    const message = createBaseGroupByResult();
    message.name = object.name ?? "";
    message.minDistance = object.minDistance ?? 0;
    message.maxDistance = object.maxDistance ?? 0;
    message.numberOfObjects = object.numberOfObjects ?? 0;
    message.objects = object.objects?.map((e) => SearchResult.fromPartial(e)) || [];
    message.rerank = (object.rerank !== undefined && object.rerank !== null)
      ? RerankReply.fromPartial(object.rerank)
      : undefined;
    message.generative = (object.generative !== undefined && object.generative !== null)
      ? GenerativeReply.fromPartial(object.generative)
      : undefined;
    return message;
  },
};

function createBaseSearchResult(): SearchResult {
  return { properties: undefined, metadata: undefined };
}

export const SearchResult = {
  encode(message: SearchResult, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.properties !== undefined) {
      PropertiesResult.encode(message.properties, writer.uint32(10).fork()).ldelim();
    }
    if (message.metadata !== undefined) {
      MetadataResult.encode(message.metadata, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SearchResult {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSearchResult();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.properties = PropertiesResult.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.metadata = MetadataResult.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SearchResult {
    return {
      properties: isSet(object.properties) ? PropertiesResult.fromJSON(object.properties) : undefined,
      metadata: isSet(object.metadata) ? MetadataResult.fromJSON(object.metadata) : undefined,
    };
  },

  toJSON(message: SearchResult): unknown {
    const obj: any = {};
    if (message.properties !== undefined) {
      obj.properties = PropertiesResult.toJSON(message.properties);
    }
    if (message.metadata !== undefined) {
      obj.metadata = MetadataResult.toJSON(message.metadata);
    }
    return obj;
  },

  create(base?: DeepPartial<SearchResult>): SearchResult {
    return SearchResult.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<SearchResult>): SearchResult {
    const message = createBaseSearchResult();
    message.properties = (object.properties !== undefined && object.properties !== null)
      ? PropertiesResult.fromPartial(object.properties)
      : undefined;
    message.metadata = (object.metadata !== undefined && object.metadata !== null)
      ? MetadataResult.fromPartial(object.metadata)
      : undefined;
    return message;
  },
};

function createBaseMetadataResult(): MetadataResult {
  return {
    id: "",
    vector: [],
    creationTimeUnix: 0,
    creationTimeUnixPresent: false,
    lastUpdateTimeUnix: 0,
    lastUpdateTimeUnixPresent: false,
    distance: 0,
    distancePresent: false,
    certainty: 0,
    certaintyPresent: false,
    score: 0,
    scorePresent: false,
    explainScore: "",
    explainScorePresent: false,
    isConsistent: undefined,
    generative: "",
    generativePresent: false,
    isConsistentPresent: false,
    vectorBytes: new Uint8Array(0),
    idAsBytes: new Uint8Array(0),
    rerankScore: 0,
    rerankScorePresent: false,
    vectors: [],
  };
}

export const MetadataResult = {
  encode(message: MetadataResult, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    writer.uint32(18).fork();
    for (const v of message.vector) {
      writer.float(v);
    }
    writer.ldelim();
    if (message.creationTimeUnix !== 0) {
      writer.uint32(24).int64(message.creationTimeUnix);
    }
    if (message.creationTimeUnixPresent === true) {
      writer.uint32(32).bool(message.creationTimeUnixPresent);
    }
    if (message.lastUpdateTimeUnix !== 0) {
      writer.uint32(40).int64(message.lastUpdateTimeUnix);
    }
    if (message.lastUpdateTimeUnixPresent === true) {
      writer.uint32(48).bool(message.lastUpdateTimeUnixPresent);
    }
    if (message.distance !== 0) {
      writer.uint32(61).float(message.distance);
    }
    if (message.distancePresent === true) {
      writer.uint32(64).bool(message.distancePresent);
    }
    if (message.certainty !== 0) {
      writer.uint32(77).float(message.certainty);
    }
    if (message.certaintyPresent === true) {
      writer.uint32(80).bool(message.certaintyPresent);
    }
    if (message.score !== 0) {
      writer.uint32(93).float(message.score);
    }
    if (message.scorePresent === true) {
      writer.uint32(96).bool(message.scorePresent);
    }
    if (message.explainScore !== "") {
      writer.uint32(106).string(message.explainScore);
    }
    if (message.explainScorePresent === true) {
      writer.uint32(112).bool(message.explainScorePresent);
    }
    if (message.isConsistent !== undefined) {
      writer.uint32(120).bool(message.isConsistent);
    }
    if (message.generative !== "") {
      writer.uint32(130).string(message.generative);
    }
    if (message.generativePresent === true) {
      writer.uint32(136).bool(message.generativePresent);
    }
    if (message.isConsistentPresent === true) {
      writer.uint32(144).bool(message.isConsistentPresent);
    }
    if (message.vectorBytes.length !== 0) {
      writer.uint32(154).bytes(message.vectorBytes);
    }
    if (message.idAsBytes.length !== 0) {
      writer.uint32(162).bytes(message.idAsBytes);
    }
    if (message.rerankScore !== 0) {
      writer.uint32(169).double(message.rerankScore);
    }
    if (message.rerankScorePresent === true) {
      writer.uint32(176).bool(message.rerankScorePresent);
    }
    for (const v of message.vectors) {
      Vectors.encode(v!, writer.uint32(186).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MetadataResult {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMetadataResult();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id = reader.string();
          continue;
        case 2:
          if (tag === 21) {
            message.vector.push(reader.float());

            continue;
          }

          if (tag === 18) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.vector.push(reader.float());
            }

            continue;
          }

          break;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.creationTimeUnix = longToNumber(reader.int64() as Long);
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.creationTimeUnixPresent = reader.bool();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.lastUpdateTimeUnix = longToNumber(reader.int64() as Long);
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.lastUpdateTimeUnixPresent = reader.bool();
          continue;
        case 7:
          if (tag !== 61) {
            break;
          }

          message.distance = reader.float();
          continue;
        case 8:
          if (tag !== 64) {
            break;
          }

          message.distancePresent = reader.bool();
          continue;
        case 9:
          if (tag !== 77) {
            break;
          }

          message.certainty = reader.float();
          continue;
        case 10:
          if (tag !== 80) {
            break;
          }

          message.certaintyPresent = reader.bool();
          continue;
        case 11:
          if (tag !== 93) {
            break;
          }

          message.score = reader.float();
          continue;
        case 12:
          if (tag !== 96) {
            break;
          }

          message.scorePresent = reader.bool();
          continue;
        case 13:
          if (tag !== 106) {
            break;
          }

          message.explainScore = reader.string();
          continue;
        case 14:
          if (tag !== 112) {
            break;
          }

          message.explainScorePresent = reader.bool();
          continue;
        case 15:
          if (tag !== 120) {
            break;
          }

          message.isConsistent = reader.bool();
          continue;
        case 16:
          if (tag !== 130) {
            break;
          }

          message.generative = reader.string();
          continue;
        case 17:
          if (tag !== 136) {
            break;
          }

          message.generativePresent = reader.bool();
          continue;
        case 18:
          if (tag !== 144) {
            break;
          }

          message.isConsistentPresent = reader.bool();
          continue;
        case 19:
          if (tag !== 154) {
            break;
          }

          message.vectorBytes = reader.bytes();
          continue;
        case 20:
          if (tag !== 162) {
            break;
          }

          message.idAsBytes = reader.bytes();
          continue;
        case 21:
          if (tag !== 169) {
            break;
          }

          message.rerankScore = reader.double();
          continue;
        case 22:
          if (tag !== 176) {
            break;
          }

          message.rerankScorePresent = reader.bool();
          continue;
        case 23:
          if (tag !== 186) {
            break;
          }

          message.vectors.push(Vectors.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MetadataResult {
    return {
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      vector: globalThis.Array.isArray(object?.vector) ? object.vector.map((e: any) => globalThis.Number(e)) : [],
      creationTimeUnix: isSet(object.creationTimeUnix) ? globalThis.Number(object.creationTimeUnix) : 0,
      creationTimeUnixPresent: isSet(object.creationTimeUnixPresent)
        ? globalThis.Boolean(object.creationTimeUnixPresent)
        : false,
      lastUpdateTimeUnix: isSet(object.lastUpdateTimeUnix) ? globalThis.Number(object.lastUpdateTimeUnix) : 0,
      lastUpdateTimeUnixPresent: isSet(object.lastUpdateTimeUnixPresent)
        ? globalThis.Boolean(object.lastUpdateTimeUnixPresent)
        : false,
      distance: isSet(object.distance) ? globalThis.Number(object.distance) : 0,
      distancePresent: isSet(object.distancePresent) ? globalThis.Boolean(object.distancePresent) : false,
      certainty: isSet(object.certainty) ? globalThis.Number(object.certainty) : 0,
      certaintyPresent: isSet(object.certaintyPresent) ? globalThis.Boolean(object.certaintyPresent) : false,
      score: isSet(object.score) ? globalThis.Number(object.score) : 0,
      scorePresent: isSet(object.scorePresent) ? globalThis.Boolean(object.scorePresent) : false,
      explainScore: isSet(object.explainScore) ? globalThis.String(object.explainScore) : "",
      explainScorePresent: isSet(object.explainScorePresent) ? globalThis.Boolean(object.explainScorePresent) : false,
      isConsistent: isSet(object.isConsistent) ? globalThis.Boolean(object.isConsistent) : undefined,
      generative: isSet(object.generative) ? globalThis.String(object.generative) : "",
      generativePresent: isSet(object.generativePresent) ? globalThis.Boolean(object.generativePresent) : false,
      isConsistentPresent: isSet(object.isConsistentPresent) ? globalThis.Boolean(object.isConsistentPresent) : false,
      vectorBytes: isSet(object.vectorBytes) ? bytesFromBase64(object.vectorBytes) : new Uint8Array(0),
      idAsBytes: isSet(object.idAsBytes) ? bytesFromBase64(object.idAsBytes) : new Uint8Array(0),
      rerankScore: isSet(object.rerankScore) ? globalThis.Number(object.rerankScore) : 0,
      rerankScorePresent: isSet(object.rerankScorePresent) ? globalThis.Boolean(object.rerankScorePresent) : false,
      vectors: globalThis.Array.isArray(object?.vectors) ? object.vectors.map((e: any) => Vectors.fromJSON(e)) : [],
    };
  },

  toJSON(message: MetadataResult): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    if (message.vector?.length) {
      obj.vector = message.vector;
    }
    if (message.creationTimeUnix !== 0) {
      obj.creationTimeUnix = Math.round(message.creationTimeUnix);
    }
    if (message.creationTimeUnixPresent === true) {
      obj.creationTimeUnixPresent = message.creationTimeUnixPresent;
    }
    if (message.lastUpdateTimeUnix !== 0) {
      obj.lastUpdateTimeUnix = Math.round(message.lastUpdateTimeUnix);
    }
    if (message.lastUpdateTimeUnixPresent === true) {
      obj.lastUpdateTimeUnixPresent = message.lastUpdateTimeUnixPresent;
    }
    if (message.distance !== 0) {
      obj.distance = message.distance;
    }
    if (message.distancePresent === true) {
      obj.distancePresent = message.distancePresent;
    }
    if (message.certainty !== 0) {
      obj.certainty = message.certainty;
    }
    if (message.certaintyPresent === true) {
      obj.certaintyPresent = message.certaintyPresent;
    }
    if (message.score !== 0) {
      obj.score = message.score;
    }
    if (message.scorePresent === true) {
      obj.scorePresent = message.scorePresent;
    }
    if (message.explainScore !== "") {
      obj.explainScore = message.explainScore;
    }
    if (message.explainScorePresent === true) {
      obj.explainScorePresent = message.explainScorePresent;
    }
    if (message.isConsistent !== undefined) {
      obj.isConsistent = message.isConsistent;
    }
    if (message.generative !== "") {
      obj.generative = message.generative;
    }
    if (message.generativePresent === true) {
      obj.generativePresent = message.generativePresent;
    }
    if (message.isConsistentPresent === true) {
      obj.isConsistentPresent = message.isConsistentPresent;
    }
    if (message.vectorBytes.length !== 0) {
      obj.vectorBytes = base64FromBytes(message.vectorBytes);
    }
    if (message.idAsBytes.length !== 0) {
      obj.idAsBytes = base64FromBytes(message.idAsBytes);
    }
    if (message.rerankScore !== 0) {
      obj.rerankScore = message.rerankScore;
    }
    if (message.rerankScorePresent === true) {
      obj.rerankScorePresent = message.rerankScorePresent;
    }
    if (message.vectors?.length) {
      obj.vectors = message.vectors.map((e) => Vectors.toJSON(e));
    }
    return obj;
  },

  create(base?: DeepPartial<MetadataResult>): MetadataResult {
    return MetadataResult.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<MetadataResult>): MetadataResult {
    const message = createBaseMetadataResult();
    message.id = object.id ?? "";
    message.vector = object.vector?.map((e) => e) || [];
    message.creationTimeUnix = object.creationTimeUnix ?? 0;
    message.creationTimeUnixPresent = object.creationTimeUnixPresent ?? false;
    message.lastUpdateTimeUnix = object.lastUpdateTimeUnix ?? 0;
    message.lastUpdateTimeUnixPresent = object.lastUpdateTimeUnixPresent ?? false;
    message.distance = object.distance ?? 0;
    message.distancePresent = object.distancePresent ?? false;
    message.certainty = object.certainty ?? 0;
    message.certaintyPresent = object.certaintyPresent ?? false;
    message.score = object.score ?? 0;
    message.scorePresent = object.scorePresent ?? false;
    message.explainScore = object.explainScore ?? "";
    message.explainScorePresent = object.explainScorePresent ?? false;
    message.isConsistent = object.isConsistent ?? undefined;
    message.generative = object.generative ?? "";
    message.generativePresent = object.generativePresent ?? false;
    message.isConsistentPresent = object.isConsistentPresent ?? false;
    message.vectorBytes = object.vectorBytes ?? new Uint8Array(0);
    message.idAsBytes = object.idAsBytes ?? new Uint8Array(0);
    message.rerankScore = object.rerankScore ?? 0;
    message.rerankScorePresent = object.rerankScorePresent ?? false;
    message.vectors = object.vectors?.map((e) => Vectors.fromPartial(e)) || [];
    return message;
  },
};

function createBasePropertiesResult(): PropertiesResult {
  return {
    nonRefProperties: undefined,
    refProps: [],
    targetCollection: "",
    metadata: undefined,
    numberArrayProperties: [],
    intArrayProperties: [],
    textArrayProperties: [],
    booleanArrayProperties: [],
    objectProperties: [],
    objectArrayProperties: [],
    nonRefProps: undefined,
    refPropsRequested: false,
  };
}

export const PropertiesResult = {
  encode(message: PropertiesResult, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.nonRefProperties !== undefined) {
      Struct.encode(Struct.wrap(message.nonRefProperties), writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.refProps) {
      RefPropertiesResult.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.targetCollection !== "") {
      writer.uint32(26).string(message.targetCollection);
    }
    if (message.metadata !== undefined) {
      MetadataResult.encode(message.metadata, writer.uint32(34).fork()).ldelim();
    }
    for (const v of message.numberArrayProperties) {
      NumberArrayProperties.encode(v!, writer.uint32(42).fork()).ldelim();
    }
    for (const v of message.intArrayProperties) {
      IntArrayProperties.encode(v!, writer.uint32(50).fork()).ldelim();
    }
    for (const v of message.textArrayProperties) {
      TextArrayProperties.encode(v!, writer.uint32(58).fork()).ldelim();
    }
    for (const v of message.booleanArrayProperties) {
      BooleanArrayProperties.encode(v!, writer.uint32(66).fork()).ldelim();
    }
    for (const v of message.objectProperties) {
      ObjectProperties.encode(v!, writer.uint32(74).fork()).ldelim();
    }
    for (const v of message.objectArrayProperties) {
      ObjectArrayProperties.encode(v!, writer.uint32(82).fork()).ldelim();
    }
    if (message.nonRefProps !== undefined) {
      Properties.encode(message.nonRefProps, writer.uint32(90).fork()).ldelim();
    }
    if (message.refPropsRequested === true) {
      writer.uint32(96).bool(message.refPropsRequested);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PropertiesResult {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePropertiesResult();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.nonRefProperties = Struct.unwrap(Struct.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.refProps.push(RefPropertiesResult.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.targetCollection = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.metadata = MetadataResult.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.numberArrayProperties.push(NumberArrayProperties.decode(reader, reader.uint32()));
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.intArrayProperties.push(IntArrayProperties.decode(reader, reader.uint32()));
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.textArrayProperties.push(TextArrayProperties.decode(reader, reader.uint32()));
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.booleanArrayProperties.push(BooleanArrayProperties.decode(reader, reader.uint32()));
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.objectProperties.push(ObjectProperties.decode(reader, reader.uint32()));
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.objectArrayProperties.push(ObjectArrayProperties.decode(reader, reader.uint32()));
          continue;
        case 11:
          if (tag !== 90) {
            break;
          }

          message.nonRefProps = Properties.decode(reader, reader.uint32());
          continue;
        case 12:
          if (tag !== 96) {
            break;
          }

          message.refPropsRequested = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): PropertiesResult {
    return {
      nonRefProperties: isObject(object.nonRefProperties) ? object.nonRefProperties : undefined,
      refProps: globalThis.Array.isArray(object?.refProps)
        ? object.refProps.map((e: any) => RefPropertiesResult.fromJSON(e))
        : [],
      targetCollection: isSet(object.targetCollection) ? globalThis.String(object.targetCollection) : "",
      metadata: isSet(object.metadata) ? MetadataResult.fromJSON(object.metadata) : undefined,
      numberArrayProperties: globalThis.Array.isArray(object?.numberArrayProperties)
        ? object.numberArrayProperties.map((e: any) => NumberArrayProperties.fromJSON(e))
        : [],
      intArrayProperties: globalThis.Array.isArray(object?.intArrayProperties)
        ? object.intArrayProperties.map((e: any) => IntArrayProperties.fromJSON(e))
        : [],
      textArrayProperties: globalThis.Array.isArray(object?.textArrayProperties)
        ? object.textArrayProperties.map((e: any) => TextArrayProperties.fromJSON(e))
        : [],
      booleanArrayProperties: globalThis.Array.isArray(object?.booleanArrayProperties)
        ? object.booleanArrayProperties.map((e: any) => BooleanArrayProperties.fromJSON(e))
        : [],
      objectProperties: globalThis.Array.isArray(object?.objectProperties)
        ? object.objectProperties.map((e: any) => ObjectProperties.fromJSON(e))
        : [],
      objectArrayProperties: globalThis.Array.isArray(object?.objectArrayProperties)
        ? object.objectArrayProperties.map((e: any) => ObjectArrayProperties.fromJSON(e))
        : [],
      nonRefProps: isSet(object.nonRefProps) ? Properties.fromJSON(object.nonRefProps) : undefined,
      refPropsRequested: isSet(object.refPropsRequested) ? globalThis.Boolean(object.refPropsRequested) : false,
    };
  },

  toJSON(message: PropertiesResult): unknown {
    const obj: any = {};
    if (message.nonRefProperties !== undefined) {
      obj.nonRefProperties = message.nonRefProperties;
    }
    if (message.refProps?.length) {
      obj.refProps = message.refProps.map((e) => RefPropertiesResult.toJSON(e));
    }
    if (message.targetCollection !== "") {
      obj.targetCollection = message.targetCollection;
    }
    if (message.metadata !== undefined) {
      obj.metadata = MetadataResult.toJSON(message.metadata);
    }
    if (message.numberArrayProperties?.length) {
      obj.numberArrayProperties = message.numberArrayProperties.map((e) => NumberArrayProperties.toJSON(e));
    }
    if (message.intArrayProperties?.length) {
      obj.intArrayProperties = message.intArrayProperties.map((e) => IntArrayProperties.toJSON(e));
    }
    if (message.textArrayProperties?.length) {
      obj.textArrayProperties = message.textArrayProperties.map((e) => TextArrayProperties.toJSON(e));
    }
    if (message.booleanArrayProperties?.length) {
      obj.booleanArrayProperties = message.booleanArrayProperties.map((e) => BooleanArrayProperties.toJSON(e));
    }
    if (message.objectProperties?.length) {
      obj.objectProperties = message.objectProperties.map((e) => ObjectProperties.toJSON(e));
    }
    if (message.objectArrayProperties?.length) {
      obj.objectArrayProperties = message.objectArrayProperties.map((e) => ObjectArrayProperties.toJSON(e));
    }
    if (message.nonRefProps !== undefined) {
      obj.nonRefProps = Properties.toJSON(message.nonRefProps);
    }
    if (message.refPropsRequested === true) {
      obj.refPropsRequested = message.refPropsRequested;
    }
    return obj;
  },

  create(base?: DeepPartial<PropertiesResult>): PropertiesResult {
    return PropertiesResult.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<PropertiesResult>): PropertiesResult {
    const message = createBasePropertiesResult();
    message.nonRefProperties = object.nonRefProperties ?? undefined;
    message.refProps = object.refProps?.map((e) => RefPropertiesResult.fromPartial(e)) || [];
    message.targetCollection = object.targetCollection ?? "";
    message.metadata = (object.metadata !== undefined && object.metadata !== null)
      ? MetadataResult.fromPartial(object.metadata)
      : undefined;
    message.numberArrayProperties = object.numberArrayProperties?.map((e) => NumberArrayProperties.fromPartial(e)) ||
      [];
    message.intArrayProperties = object.intArrayProperties?.map((e) => IntArrayProperties.fromPartial(e)) || [];
    message.textArrayProperties = object.textArrayProperties?.map((e) => TextArrayProperties.fromPartial(e)) || [];
    message.booleanArrayProperties = object.booleanArrayProperties?.map((e) => BooleanArrayProperties.fromPartial(e)) ||
      [];
    message.objectProperties = object.objectProperties?.map((e) => ObjectProperties.fromPartial(e)) || [];
    message.objectArrayProperties = object.objectArrayProperties?.map((e) => ObjectArrayProperties.fromPartial(e)) ||
      [];
    message.nonRefProps = (object.nonRefProps !== undefined && object.nonRefProps !== null)
      ? Properties.fromPartial(object.nonRefProps)
      : undefined;
    message.refPropsRequested = object.refPropsRequested ?? false;
    return message;
  },
};

function createBaseRefPropertiesResult(): RefPropertiesResult {
  return { properties: [], propName: "" };
}

export const RefPropertiesResult = {
  encode(message: RefPropertiesResult, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.properties) {
      PropertiesResult.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.propName !== "") {
      writer.uint32(18).string(message.propName);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RefPropertiesResult {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRefPropertiesResult();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.properties.push(PropertiesResult.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.propName = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RefPropertiesResult {
    return {
      properties: globalThis.Array.isArray(object?.properties)
        ? object.properties.map((e: any) => PropertiesResult.fromJSON(e))
        : [],
      propName: isSet(object.propName) ? globalThis.String(object.propName) : "",
    };
  },

  toJSON(message: RefPropertiesResult): unknown {
    const obj: any = {};
    if (message.properties?.length) {
      obj.properties = message.properties.map((e) => PropertiesResult.toJSON(e));
    }
    if (message.propName !== "") {
      obj.propName = message.propName;
    }
    return obj;
  },

  create(base?: DeepPartial<RefPropertiesResult>): RefPropertiesResult {
    return RefPropertiesResult.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<RefPropertiesResult>): RefPropertiesResult {
    const message = createBaseRefPropertiesResult();
    message.properties = object.properties?.map((e) => PropertiesResult.fromPartial(e)) || [];
    message.propName = object.propName ?? "";
    return message;
  },
};

function bytesFromBase64(b64: string): Uint8Array {
  if ((globalThis as any).Buffer) {
    return Uint8Array.from(globalThis.Buffer.from(b64, "base64"));
  } else {
    const bin = globalThis.atob(b64);
    const arr = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; ++i) {
      arr[i] = bin.charCodeAt(i);
    }
    return arr;
  }
}

function base64FromBytes(arr: Uint8Array): string {
  if ((globalThis as any).Buffer) {
    return globalThis.Buffer.from(arr).toString("base64");
  } else {
    const bin: string[] = [];
    arr.forEach((byte) => {
      bin.push(globalThis.String.fromCharCode(byte));
    });
    return globalThis.btoa(bin.join(""));
  }
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

function longToNumber(long: Long): number {
  if (long.gt(globalThis.Number.MAX_SAFE_INTEGER)) {
    throw new globalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  return long.toNumber();
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isObject(value: any): boolean {
  return typeof value === "object" && value !== null;
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
