export { IBase64Config } from "./mappers/Base64";
export { IChunkConfig } from "./mappers/Chunk";
export { IFromJSONConfig } from "./mappers/FromJSON";
export { IHexToFloatConfig } from "./mappers/HexToFloat";
export { IHexToIntConfig } from "./mappers/HexToInt";
export { IOffsetConfig } from "./mappers/Offset";

/**
 * Endianness used as config parameter
 */
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

/**
 * Base64Action used as config parameter
 */
export enum Base64Action {
  /**
   * Config parameter for defining encoding in Base64
   */
  ENCODE = "encode",
  /**
   * Config parameter for defining decoding in Base64
   */
  DECODE = "decode",
}

/**
 * Base64DecodeAs used as config parameter
 */
export enum Base64DecodeAs {
  /**
   * Config parameter for defining decoding as string
   */
  STRING = "string",
  /**
   * Config parameter for defining decoding as hex string
   */
  HEXSTRING = "hexstring",
}

export const Config = {
  Base64Action,
  Base64DecodeAs,
  Endianness,
};
