export { IBase64Config } from "./mappers/Base64";
export { IChunkConfig } from "./mappers/Chunk";
export { IFromJSONConfig } from "./mappers/FromJSON";
export { IHexToFloatConfig } from "./mappers/HexToFloat";
export { IHexToIntConfig } from "./mappers/HexToInt";
export { IOffsetConfig } from "./mappers/Offset";

export enum Endianness {
  /**
   * Config parameter for defining little endianness
   */
  LITTLE_ENDIAN = "le",
  /**
   * Config parameter for defining big endianness
   */
  BIG_ENDIAN = "be",
}

export enum Base64Action {
  ENCODE = "encode",
  DECODE = "decode",
}

export const Config = {
  Base64Action,
  Endianness,
};
