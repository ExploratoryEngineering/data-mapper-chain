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

    if (typeof data !== "number") {
      parsedNumber = parseInt(data, 10);
    } else {
      parsedNumber = data;
    }

    if (Number.isNaN(parsedNumber) || typeof this.offset !== "number") {
      return 0;
    }

    return parsedNumber + this.offset;
  }
}
