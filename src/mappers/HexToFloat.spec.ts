import { Endianness } from "../Config";
import { HexToFloat } from "./HexToFloat";

describe("Hex to float mapper", () => {
  let hexToFloat: HexToFloat;

  beforeEach(() => {
    hexToFloat = new HexToFloat();
  });

  describe("Initialization", () => {
    it("should correctly take the input from init", () => {
      hexToFloat = new HexToFloat({
        endianness: Endianness.LITTLE_ENDIAN,
      });

      expect(hexToFloat.endianness).toBe(Endianness.LITTLE_ENDIAN);
    });

    it("should correctly transform input with default init", () => {
      const inputObj = {
        name: "name",
        value: "4111d840",
      };
      const transformRes = hexToFloat.transform(inputObj);

      expect(transformRes).toEqual({
        name: "name",
        value: 9.11529541015625,
      });
    });
  });

  describe("Hex to float transform", () => {
    it("should correctly transform a little endian input", () => {
      const inputObj = {
        name: "name",
        value: "80e3ee47",
      };
      hexToFloat.endianness = Endianness.LITTLE_ENDIAN;
      const transformRes = hexToFloat.transform(inputObj);

      expect(transformRes).toEqual({
        name: "name",
        value: 122311,
      });
    });

    it("should correctly transform a big endian input", () => {
      const inputObj = {
        name: "name",
        value: "3e3a8c71",
      };
      hexToFloat.endianness = Endianness.BIG_ENDIAN;
      const transformRes = hexToFloat.transform(inputObj);

      expect(transformRes).toEqual({
        name: "name",
        value: 0.1821763664484024,
      });
    });
  });

  describe("Invalid input", () => {
    it("should return 0 for invalid input", () => {
      const inputObj = {
        name: "name",
        value: "gege",
      };

      const transformRes = hexToFloat.transform(inputObj);

      expect(transformRes).toEqual({
        name: "name",
        value: 0,
      });
    });
  });
});
