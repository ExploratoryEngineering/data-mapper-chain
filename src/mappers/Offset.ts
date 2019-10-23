import { IDataValue, IMapper, IMapperConfig, IOutputType } from "./../Typings";

export interface IOffsetConfig {
  offset?: number | string;
}

/**
 * [[include:offset-tutorial.md]]
 */
export class Offset implements IMapper {
  static id: string = "OFFSET";
  static description: string = "Offset number";

  name: string = "Offset";
  outputType: IOutputType = IOutputType.number;

  offset: number = 0;

  constructor({ offset = "0" }: IOffsetConfig = {}) {
    this.offset = parseInt(offset.toString(), 10);
  }

  config(): IMapperConfig {
    return {
      id: Offset.id,
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
