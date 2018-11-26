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
      const inputObj = "4111d840";
      const transformRes = hexToFloat.transform(inputObj);

      expect(transformRes).toEqual(9.11529541015625);
    });
  });

  describe("Configuration", () => {
    it("should correctly return config based on initial configuration", () => {
      const hexToFloatWithConfig = new HexToFloat({
        endianness: Endianness.LITTLE_ENDIAN,
      });

      expect(hexToFloatWithConfig.config()).toEqual({
        id: "HEXTOFLOAT",
        params: {
          endianness: Endianness.LITTLE_ENDIAN,
        },
      });
    });
  });

  describe("Hex to float transform", () => {
    it("should correctly transform a little endian input", () => {
      const inputObj = "80e3ee47";
      hexToFloat.endianness = Endianness.LITTLE_ENDIAN;
      const transformRes = hexToFloat.transform(inputObj);

      expect(transformRes).toEqual(122311);
    });

    it("should correctly transform a little endian input with 0x prepended", () => {
      const inputObj = "0x80e3ee47";
      hexToFloat.endianness = Endianness.LITTLE_ENDIAN;
      const transformRes = hexToFloat.transform(inputObj);

      expect(transformRes).toEqual(122311);
    });

    it("should correctly transform a big endian input", () => {
      const inputObj = "3e3a8c71";
      hexToFloat.endianness = Endianness.BIG_ENDIAN;
      const transformRes = hexToFloat.transform(inputObj);

      expect(transformRes).toEqual(0.1821763664484024);
    });

    it("should correctly transform a big endian input with 0x prepended", () => {
      const inputObj = "0x3e3a8c71";
      hexToFloat.endianness = Endianness.BIG_ENDIAN;
      const transformRes = hexToFloat.transform(inputObj);

      expect(transformRes).toEqual(0.1821763664484024);
    });

    it("should correctly transform a signed hex", () => {
      const inputObj = "bfeccccd";
      hexToFloat.endianness = Endianness.BIG_ENDIAN;
      const transformRes = hexToFloat.transform(inputObj);

      expect(transformRes).toEqual(-1.850000023841858);
    });
  });

  describe("Invalid input", () => {
    it("should return 0 upon empty value input", () => {
      const inputObj = undefined;

      const transformRes = hexToFloat.transform(inputObj);

      expect(transformRes).toEqual(0);
    });

    it("should return 0 for invalid input", () => {
      const inputObj = "gege";

      const transformRes = hexToFloat.transform(inputObj);

      expect(transformRes).toEqual(0);
    });
  });
});
