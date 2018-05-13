import { DataMapperChain, IDataMapperChainConfig } from "./DataMapperChain";

export * from "./DataMapperChain";
export * from "./Config";
export * from "./Mappers";
export * from "./Typings";

export const create = (newDataMapperChainParams: IDataMapperChainConfig = {}): DataMapperChain => {
  return new DataMapperChain(newDataMapperChainParams);
};
