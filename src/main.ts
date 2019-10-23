import { DataMapperChain, IDataMapperChainConfig } from "./DataMapperChain";

export * from "./DataMapperChain";
export * from "./Config";
export * from "./Mappers";
export * from "./Typings";

/**
 * Create a new instance of a DataMapperChain.
 * @param newDataMapperChainParams DataMapperChain configuration object
 */
export const create = (
  newDataMapperChainParams: IDataMapperChainConfig = {},
): DataMapperChain => {
  return new DataMapperChain(newDataMapperChainParams);
};
