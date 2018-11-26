export type IDataValue = string | number;

export interface IMapperConfig {
  id: string;
  params: any;
}

export interface IMapper {
  transform(data: IDataValue): IDataValue;
  config(): IMapperConfig;
}

export interface IMapperType {
  id: string;
  value: string;
  entity: { new(params: object): IMapper };
}
