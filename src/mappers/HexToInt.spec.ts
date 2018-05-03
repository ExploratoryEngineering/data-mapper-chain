import { Endianness } from "../Config";
import HexToInt from "./HexToInt";

describe("HexToInt mapper", () => {
  let hexToInt: HexToInt;

  describe("Big endianness", () => {
    beforeEach(() => {
      hexToInt = new HexToInt({ endianness: Endianness.BIG_ENDIAN });
    });

    it("should correctly parse hex to int", () => {
      const inputObj = {
        name: "name",
        value: "babe",
      };

      hexToInt.signed = false;

      const transformRes = hexToInt.transform(inputObj);

      expect(transformRes).toEqual({
        name: "name",
        value: 47806,
      });
    });

    it("should correctly parse signed hex to int", () => {
      const inputObj = {
        name: "name",
        value: "babe",
      };

      hexToInt.signed = true;

      const transformRes = hexToInt.transform(inputObj);

      expect(transformRes).toEqual({
        name: "name",
        value: -17730,
      });
    });
  });

  describe("Little endianness", () => {
    beforeEach(() => {
      hexToInt = new HexToInt({ endianness: Endianness.LITTLE_ENDIAN });
    });

    it("should correctly parse hex to int", () => {
      const inputObj = {
        name: "name",
        value: "babe",
      };

      hexToInt.signed = false;

      const transformRes = hexToInt.transform(inputObj);

      expect(transformRes).toEqual({
        name: "name",
        value: 48826,
      });
    });

    it("should correctly parse signed hex to int", () => {
      const inputObj = {
        name: "name",
        value: "babe",
      };

      hexToInt.signed = true;

      const transformRes = hexToInt.transform(inputObj);

      expect(transformRes).toEqual({
        name: "name",
        value: -16710,
      });
    });
  });

  describe("Invalid input", () => {
    beforeEach(() => {
      hexToInt = new HexToInt();
    });

    it("should return 0 for invalid input", () => {
      const inputObj = {
        name: "name",
        value: "gege",
      };

      hexToInt.signed = true;

      const transformRes = hexToInt.transform(inputObj);

      expect(transformRes).toEqual({
        name: "name",
        value: 0,
      });
    });
  });
});
