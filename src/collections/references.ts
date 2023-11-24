import { Properties, WeaviateObject } from './types';

interface ReferenceToArgs {
  uuids: string | string[];
}

interface ReferenceToMultiTargetArgs extends ReferenceToArgs {
  targetCollection: string;
}

export type Beacon = {
  beacon: string;
};

export class ReferenceManager<T extends Properties> {
  public objects: WeaviateObject<T>[];
  public targetCollection: string;
  public uuids?: string[];

  constructor(targetCollection: string, objects?: WeaviateObject<T>[], uuids?: string[]) {
    this.objects = objects ?? [];
    this.targetCollection = targetCollection;
    this.uuids = uuids;
  }

  public toBeaconObjs(): Beacon[] {
    return this.uuids
      ? this.uuids.map((uuid) => {
          return {
            beacon: `weaviate://localhost/${this.targetCollection ? `${this.targetCollection}/` : ''}${uuid}`,
          };
        })
      : [];
  }

  public toBeaconStrings(): string[] {
    return this.uuids
      ? this.uuids.map((uuid) => {
          return `weaviate://localhost/${this.targetCollection ? `${this.targetCollection}/` : ''}${uuid}`;
        })
      : [];
  }

  static fromBeaconStrings<T extends Properties>(beacons: string[]): ReferenceManager<T> {
    let targetCollection = '';
    if (beacons.length > 0) {
      targetCollection = beacons[0].split('/').length > 3 ? beacons[0].split('/')[3] : '';
    }
    return new ReferenceManager<T>(
      targetCollection,
      undefined,
      beacons.map((beacon) => {
        return beacon.split('/').pop() as string;
      })
    );
  }

  public isMultiTarget(): boolean {
    return this.targetCollection !== '';
  }
}

export class Reference {
  public static to<TProperties extends Properties>(args: ReferenceToArgs): ReferenceManager<TProperties> {
    return new ReferenceManager<TProperties>(
      '',
      undefined,
      Array.isArray(args.uuids) ? args.uuids : [args.uuids]
    );
  }
  public static toMultiTarget<TProperties extends Properties>(
    args: ReferenceToMultiTargetArgs
  ): ReferenceManager<TProperties> {
    return new ReferenceManager<TProperties>(
      args.targetCollection,
      undefined,
      Array.isArray(args.uuids) ? args.uuids : [args.uuids]
    );
  }
}

export const referenceFromObjects = <TProperties extends Properties>(
  objects: WeaviateObject<TProperties>[]
): ReferenceManager<TProperties> => {
  return new ReferenceManager<TProperties>('', objects);
};

export type CrossReference<TProperties extends Properties> = ReferenceManager<TProperties>;