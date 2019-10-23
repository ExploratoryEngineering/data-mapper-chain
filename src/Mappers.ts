import { Base64, IBase64Config } from "./mappers/Base64";
import { Chunk, IChunkConfig } from "./mappers/Chunk";
import { FromJSON, IFromJSONConfig } from "./mappers/FromJSON";
import { HexToFloat, IHexToFloatConfig } from "./mappers/HexToFloat";
import { HexToInt, IHexToIntConfig } from "./mappers/HexToInt";
import { IOffsetConfig, Offset } from "./mappers/Offset";

import { IMapperType } from "./Typings";

export const Mappers = {
  Base64,
  Chunk,
  FromJSON,
  HexToFloat,
  HexToInt,
  Offset,
  base64: (params: IBase64Config = {}): Base64 => new Base64(params),
  chunk: (params: IChunkConfig = {}): Chunk => new Chunk(params),
  fromJson: (params: IFromJSONConfig = {}): FromJSON => new FromJSON(params),
  hexToFloat: (params: IHexToFloatConfig = {}): HexToFloat =>
    new HexToFloat(params),
  hexToInt: (params: IHexToIntConfig = {}): HexToInt => new HexToInt(params),
  offset: (params: IOffsetConfig = {}): Offset => new Offset(params),
};

export let AVAILABLE_MAPPERS_TYPES: IMapperType[] = [
  {
    id: Chunk.id,
    value: Chunk.description,
    entity: Chunk,
  },
  {
    id: HexToFloat.id,
    value: HexToFloat.description,
    entity: HexToFloat,
  },
  {
    id: HexToInt.id,
    value: HexToInt.description,
    entity: HexToInt,
  },
  {
    id: Offset.id,
    value: Offset.description,
    entity: Offset,
  },
  {
    id: Base64.id,
    value: Base64.description,
    entity: Base64,
  },
  {
    id: FromJSON.id,
    value: FromJSON.description,
    entity: FromJSON,
  },
];
