export interface IDataValue {
  name: string;
  value: string | number;
}

export interface IMapperConfig {
  ident: string;
  params: any;
}

export interface IMapper {
  transform(data: IDataValue): IDataValue;
  config(): IMapperConfig;
}
