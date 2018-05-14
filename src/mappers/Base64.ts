import { Base64Action } from "../Config";
import { IDataValue, IMapper, IMapperConfig } from "./../Typings";

export interface IBase64Config {
  action?: Base64Action;
}

export class Base64 implements IMapper {
  static ident: string = "BASE64";
  static description: string = "Base64";

  name: string = "Base64";

  action: Base64Action = Base64Action.DECODE;

  constructor({
    action = Base64Action.DECODE,
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
    if (!data) {
      return data;
    }

    let resString = data.toString();

    if (this.action === Base64Action.DECODE) {
      try {
        resString = window.atob(resString);
      } catch (e) {
        return data;
      }
    }
    if (this.action === Base64Action.ENCODE) {
      try {
        resString = window.btoa(resString);
      } catch (e) {
        return data;
      }
    }

    return resString;
  }
}
