export type IDataValue = string | number;
export enum IOutputType {
  "string",
  "number",
  "array",
}

export interface IMapperConfig {
  id: string;
  /** @deprecated */
  ident?: string;
  params: any;
}

export interface IMapper {
  outputType: IOutputType;
  transform(data: IDataValue): IDataValue;
  config(): IMapperConfig;
}

export interface IMapperType {
  id: string;
  value: string;
  entity: { new (params: object): IMapper };
}
