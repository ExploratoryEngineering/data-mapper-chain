import { IDataValue, IMapper, IMapperConfig } from "./../Models";

export class FromJSON implements IMapper {
  static ident: string = "FROMJSON";
  static description: string = "JSON";
  name: string = "JSON";

  propertyString: string = "";

  constructor({
    propertyString = "",
  } = {}) {
    this.propertyString = propertyString;
  }

  config(): IMapperConfig {
    return {
      ident: FromJSON.ident,
      params: {
        propertyString: this.propertyString,
      },
    };
  }

  transform(data: IDataValue): IDataValue {
    if (!data.value) {
      return data;
    }

    const resString = data.value.toString();
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

    return {
      ...data, ...{ value: res },
    };
  }
}
