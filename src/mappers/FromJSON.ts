import { IDataValue, IMapper, IMapperConfig, IOutputType } from "./../Typings";

export interface IFromJSONConfig {
  propertyString?: string;
}

/**
 * [[include:fromJson-tutorial.md]]
 */
export class FromJSON implements IMapper {
  static id: string = "FROMJSON";
  static description: string = "JSON";

  name: string = "JSON";
  outputType: IOutputType = IOutputType.string;

  propertyString: string = "";

  constructor({ propertyString = "" }: IFromJSONConfig = {}) {
    this.propertyString = propertyString;
  }

  config(): IMapperConfig {
    return {
      id: FromJSON.id,
      params: {
        propertyString: this.propertyString,
      },
    };
  }

  transform(data: IDataValue): IDataValue {
    if (!data) {
      return data;
    }

    const resString = data.toString();
    let element = {};

    try {
      element = JSON.parse(resString);
    } catch (e) {
      return data;
    }

    const pieces = this.propertyString.split(".");
    let tempEl = { ...element } as any;

    pieces.forEach((piece) => {
      try {
        if (piece === "") {
          return;
        }

        const propValue = tempEl[piece];

        if (propValue) {
          tempEl = tempEl[piece];
        } else {
          tempEl = "";
        }
      } catch {
        return data;
      }
    });

    let res = "";
    if (typeof tempEl === "string") {
      res = tempEl;
    } else {
      res = JSON.stringify(tempEl);
    }

    return res;
  }
}
