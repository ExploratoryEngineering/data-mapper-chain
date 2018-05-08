import { Endianness } from "../Config";
import { IDataValue, IMapper, IMapperConfig } from "./../Typings";

export interface IHexToFloatConfig {
  endianness?: Endianness;
}

export class HexToFloat implements IMapper {
  static ident: string = "HEXTOFLOAT";
  static description: string = "Hex to float";

  endianness: Endianness = Endianness.BIG_ENDIAN;
  hexRegExp: RegExp = new RegExp(/^[a-fxA-F0-9_]+$/);

  constructor({
    endianness = Endianness.BIG_ENDIAN,
  }: IHexToFloatConfig = {}) {
    this.endianness = endianness;
  }

  config(): IMapperConfig {
    return {
      ident: HexToFloat.ident,
      params: {
        endianness: this.endianness,
      },
    };
  }

  transform(data: IDataValue): IDataValue {
    if (!data.value) {
      return {
        ...data, ... {
          value: 0,
        },
      };
    }

    let resString: string = data.value.toString();

    if (!this.hexRegExp.test(resString)) {
      return {
        ...data, ...{
          value: 0,
        },
      };
    }

    if (resString.includes("0x")) {
      resString = resString.slice(2);
    }

    if (this.endianness === Endianness.LITTLE_ENDIAN && resString.length > 1) {
      const resStringGrouped = resString.match(/(..)/g);
      if (resStringGrouped) {
        resString = resStringGrouped.reverse().join("");
      } else {
        return {
          ...data, ...{
            value: 0,
          },
        };
      }
    }

    const hexValue = parseInt(resString, 16);

    const signed = hexValue >> 31 ? -1 : 1;
    const exponent = (hexValue >> 23) & 0xFF;
    const resValue: number = signed * (hexValue & 0x7fffff | 0x800000) * 1.0 / Math.pow(2, 23) * Math.pow(2, (exponent - 127));

    return {
      ...data, ...{ value: resValue },
    };
  }
}
