import { IDataValue, IMapper, IMapperConfig } from "./../Models";

export enum Base64Actions {
  ENCODE = "encode",
  DECODE = "decode",
}

export interface IBase64Config {
  action?: Base64Actions;
}

export class Base64 implements IMapper {
  static ident: string = "BASE64";
  static description: string = "Base64";
  name: string = "Base64";

  action: Base64Actions = Base64Actions.DECODE;

  constructor({
    action = Base64Actions.DECODE,
  }: IBase64Config = {}) {
    this.action = action;
  }

  config(): IMapperConfig {
    return {
      ident: Base64.ident,
      params: {
        action: this.action,
      },
    };
  }

  transform(data: IDataValue): IDataValue {
    if (!data.value) {
      return data;
    }

    let resString = data.value.toString();

    if (this.action === Base64Actions.DECODE) {
      try {
        resString = window.atob(resString);
      } catch (e) {
        return data;
      }
    }
    if (this.action === Base64Actions.ENCODE) {
      try {
        resString = window.btoa(resString);
      } catch (e) {
        return data;
      }
    }

    return {
      ...data, ...{ value: resString },
    };
  }
}
