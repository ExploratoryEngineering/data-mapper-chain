import { Endianness } from "../Config";
import { IDataValue, IMapper, IMapperConfig } from "./../Models";

export class HexToInt implements IMapper {
  static ident: string = "HEXTOINT";
  static description: string = "Hex to int";
  name: string = "Hex to int";

  endianness: Endianness = Endianness.BIG_ENDIAN;
  signed: boolean = false;
  hexRegExp: RegExp = new RegExp(/^[a-fxA-F0-9_]+$/);

  constructor({
    endianness = Endianness.BIG_ENDIAN,
    signed = false,
  } = {}) {
    this.endianness = endianness;
    this.signed = signed;
  }

  config(): IMapperConfig {
    return {
      ident: HexToInt.ident,
      params: {
        endianness: this.endianness,
        signed: this.signed,
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

    if (this.endianness === Endianness.LITTLE_ENDIAN) {
      if (resString.includes("0x")) {
        resString = resString.slice(2);
      }

      if (resString.length > 1) {
        const resStringGrouped = resString.match(/(..)/g);
        if (resStringGrouped) {
          resString = resStringGrouped.reverse().join("");
        }
      }
    }

    if (!resString.includes("0x")) {
      resString = "0x" + resString;
    }

    let resValue: number = parseInt(resString, 16);

    if (this.signed) {
      if (resValue >= parseInt(("0x8" + "0".repeat(resString.length - 3)), 16)) {
        resValue = resValue - (parseInt("0x1" + "0".repeat(resString.length - 2), 16));
      }
    }

    return {
      ...data, ...{ value: resValue },
    };
  }
}
