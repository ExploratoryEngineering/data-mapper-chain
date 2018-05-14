import { Endianness } from "../Config";
import { HexToInt } from "./HexToInt";

describe("HexToInt mapper", () => {
  let hexToInt: HexToInt;

  describe("Big endianness", () => {
    beforeEach(() => {
      hexToInt = new HexToInt({ endianness: Endianness.BIG_ENDIAN });
    });

    it("should correctly parse hex to int", () => {
      const inputObj = "babe";

      hexToInt.signed = false;

      const transformRes = hexToInt.transform(inputObj);

      expect(transformRes).toEqual(47806);
    });

    it("should correctly parse signed hex to int", () => {
      const inputObj = "babe";

      hexToInt.signed = true;

      const transformRes = hexToInt.transform(inputObj);

      expect(transformRes).toEqual(-17730);
    });

    it("should allow for prepended 0x on value", () => {
      const inputObj = "0xbabe";

      hexToInt.signed = false;

      const transformRes = hexToInt.transform(inputObj);

      expect(transformRes).toEqual(47806);
    });
  });

  describe("Little endianness", () => {
    beforeEach(() => {
      hexToInt = new HexToInt({ endianness: Endianness.LITTLE_ENDIAN });
    });

    it("should correctly parse hex to int", () => {
      const inputObj = "babe";

      hexToInt.signed = false;

      const transformRes = hexToInt.transform(inputObj);

      expect(transformRes).toEqual(48826);
    });

    it("should correctly parse signed hex to int", () => {
      const inputObj = "babe";

      hexToInt.signed = true;

      const transformRes = hexToInt.transform(inputObj);

      expect(transformRes).toEqual(-16710);
    });

    it("should allow for prepended 0x on value", () => {
      const inputObj = "0xbabe";

      hexToInt.signed = false;

      const transformRes = hexToInt.transform(inputObj);

      expect(transformRes).toEqual(48826);
    });
  });

  describe("Configuration", () => {
    it("should correctly return config based on initial configuration", () => {
      const hexToIntWithConfig = new HexToInt({
        endianness: Endianness.LITTLE_ENDIAN,
        signed: true,
      });

      expect(hexToIntWithConfig.config()).toEqual({
        ident: "HEXTOINT",
        params: {
          endianness: Endianness.LITTLE_ENDIAN,
          signed: true,
        },
      });
    });
  });

  describe("Invalid input", () => {
    beforeEach(() => {
      hexToInt = new HexToInt();
    });

    it("should return 0 upon empty value input", () => {
      const inputObj = undefined;

      const transformRes = hexToInt.transform(inputObj);

      expect(transformRes).toEqual(0);
    });

    it("should return 0 for invalid input", () => {
      const inputObj = "gege";

      hexToInt.signed = true;

      const transformRes = hexToInt.transform(inputObj);

      expect(transformRes).toEqual(0);
    });
  });
});
