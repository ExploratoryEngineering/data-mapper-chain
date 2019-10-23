import { Endianness } from "../Config";
import { IDataValue, IMapper, IMapperConfig, IOutputType } from "./../Typings";

export interface IHexToFloatConfig {
  endianness?: Endianness;
}

/**
 * [[include:hexToFloat-tutorial.md]]
 */
export class HexToFloat implements IMapper {
  static id: string = "HEXTOFLOAT";
  static description: string = "Hex to float";

  name: string = "Hex to float";
  outputType: IOutputType = IOutputType.number;

  endianness: Endianness = Endianness.BIG_ENDIAN;
  hexRegExp: RegExp = new RegExp(/^[a-fxA-F0-9_]+$/);

  constructor({ endianness = Endianness.BIG_ENDIAN }: IHexToFloatConfig = {}) {
    this.endianness = endianness;
  }

  config(): IMapperConfig {
    return {
      id: HexToFloat.id,
      params: {
        endianness: this.endianness,
      },
    };
  }

  transform(data: IDataValue): IDataValue {
    if (!data) {
      return 0;
    }

    let resString: string = data.toString();

    if (!this.hexRegExp.test(resString)) {
      return 0;
    }

    if (resString.includes("0x")) {
      resString = resString.slice(2);
    }

    if (this.endianness === Endianness.LITTLE_ENDIAN && resString.length > 1) {
      const resStringGrouped = resString.match(/(..)/g);
      if (resStringGrouped) {
        resString = resStringGrouped.reverse().join("");
      }
    }

    const hexValue = parseInt(resString, 16);

    const signed = hexValue >> 31 ? -1 : 1;
    const exponent = (hexValue >> 23) & 0xff;
    const resValue: number =
      ((signed * ((hexValue & 0x7fffff) | 0x800000) * 1.0) / Math.pow(2, 23)) *
      Math.pow(2, exponent - 127);

    return resValue;
  }
}
