interface IDataValue {
  name: string;
  value: string | number;
}

interface IMapperConfig {
  ident: string;
  params: any;
}

interface IMapper {
  transform(data: IDataValue): IDataValue;
  config(): IMapperConfig;
}
