import { Base64 } from "./mappers/Base64";
import { Chunk } from "./mappers/Chunk";
import { FromJSON } from "./mappers/FromJSON";
import { HexToFloat } from "./mappers/HexToFloat";
import { HexToInt } from "./mappers/HexToInt";
import { Offset } from "./mappers/Offset";

import { IMapperType } from "./Typings";

export const Mappers = {
  Base64,
  Chunk,
  FromJSON,
  HexToFloat,
  HexToInt,
  Offset,
};

export let AVAILABLE_MAPPERS_TYPES: IMapperType[] = [{
  id: Chunk.ident,
  value: Chunk.description,
  entity: Chunk,
}, {
  id: HexToFloat.ident,
  value: HexToFloat.description,
  entity: HexToFloat,
}, {
  id: HexToInt.ident,
  value: HexToInt.description,
  entity: HexToInt,
}, {
  id: Offset.ident,
  value: Offset.description,
  entity: Offset,
}, {
  id: Base64.ident,
  value: Base64.description,
  entity: Base64,
}, {
  id: FromJSON.ident,
  value: FromJSON.description,
  entity: FromJSON,
}];
