import * as base64js from "base64-js";
import { Base64Action, Base64DecodeAs } from "../Config";
import { IDataValue, IMapper, IMapperConfig, IOutputType } from "./../Typings";

export interface IBase64Config {
  action?: Base64Action;
  decodeAs?: Base64DecodeAs;
}

/**
 * [[include:base64-tutorial.md]]
 */
export class Base64 implements IMapper {
  static id: string = "BASE64";
  static description: string = "Base64";

  name: string = "Base64";
  outputType: IOutputType = IOutputType.string;

  action: Base64Action = Base64Action.DECODE;
  decodeAs: Base64DecodeAs = Base64DecodeAs.STRING;

  constructor({
    action = Base64Action.DECODE,
    decodeAs = Base64DecodeAs.STRING,
  }: IBase64Config = {}) {
    this.action = action;
    this.decodeAs = decodeAs;
  }

  config(): IMapperConfig {
    return {
      id: Base64.id,
      params: {
        action: this.action,
        decodeAs: this.decodeAs,
      },
    };
  }

  transform(data: IDataValue): IDataValue {
    if (!data) {
      return data;
    }

    let resString: string = data as string;

    if (this.action === Base64Action.DECODE) {
      try {
        const uintArr = base64js.toByteArray(data as string);

        if (this.decodeAs === Base64DecodeAs.STRING) {
          return String.fromCharCode.apply(null, uintArr as any);
        } else if (this.decodeAs === Base64DecodeAs.HEXSTRING) {
          return Array.from(uintArr, (byte: number) => {
            return ("0" + (byte & 0xFF).toString(16)).slice(-2);
          }).join("");
        }
      } catch (e) {
        return resString;
      }
    }

    if (this.action === Base64Action.ENCODE) {
      try {
        resString = window.btoa(resString);
      } catch (e) {
        return resString;
      }
    }

    return resString;
  }
}
