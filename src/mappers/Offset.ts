import { IDataValue, IMapper, IMapperConfig } from "./../Typings";

export interface IOffsetConfig {
  offset?: number | string;
}

export class Offset implements IMapper {
  static ident: string = "OFFSET";
  static description: string = "Offset number";
  name: string = "Offset";
  offset: number = 0;

  constructor({
    offset = "0",
  }: IOffsetConfig = {}) {
    this.offset = parseInt(offset.toString(), 10);
  }

  config(): IMapperConfig {
    return {
      ident: Offset.ident,
      params: {
        offset: this.offset,
      },
    };
  }

  transform(data: IDataValue): IDataValue {
    let parsedNumber: number;

    if (typeof data.value !== "number") {
      parsedNumber = parseInt(data.value, 10);
    } else {
      parsedNumber = data.value;
    }

    if (Number.isNaN(parsedNumber)) {
      return {
        ...data, ...{
          value: 0,
        },
      };
    }

    return {
      ...data, ...{
        value: parsedNumber + this.offset,
      },
    };
  }
}
