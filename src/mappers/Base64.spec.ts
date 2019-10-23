import { Base64Action, Base64DecodeAs } from "../Config";
import { Base64 } from "./Base64";

describe("Base64 mapper", () => {
  let base64: Base64;
  const helloWorldBase64: string = "aGVsbG8gd29ybGQ=";
  const helloWorldString: string = "hello world";

  const hexBase64: string =
    "SAHkwD45wbQ/jbR0Qc5mZkGSiIA/MjQAAAHLAIAAA+K0AAIAAw==";
  const hexString: string =
    "4801e4c03e39c1b43f8db47441ce6666419288803f3234000001cb00800003e2b400020003";

  beforeEach(() => {
    base64 = new Base64();
  });

  describe("Base64 encoding/decoding", () => {
    it("should correctly encode a string given", () => {
      base64.action = Base64Action.ENCODE;
      const transformRes = base64.transform(helloWorldString);

      expect(transformRes).toEqual(helloWorldBase64);
    });

    it("should correctly decode a base 64 string given", () => {
      base64.action = Base64Action.DECODE;
      const transformRes = base64.transform(helloWorldBase64);

      expect(transformRes).toEqual(helloWorldString);
    });

    it("should correctly decode a base 64 hexstring given", () => {
      base64.action = Base64Action.DECODE;
      base64.decodeAs = Base64DecodeAs.HEXSTRING;

      const transformRes = base64.transform(hexBase64);

      expect(transformRes).toEqual(hexString);
    });
  });

  describe("Configuration", () => {
    it("should correctly return config based on initial configuration", () => {
      const base64encode = new Base64({
        action: Base64Action.ENCODE,
      });

      expect(base64encode.config()).toEqual({
        id: "BASE64",
        params: {
          action: Base64Action.ENCODE,
          decodeAs: Base64DecodeAs.STRING,
        },
      });
    });
  });

  describe("Invalid input", () => {
    it("should correctly return the given object if no value is present", () => {
      const inputObj = "";

      const transformRes = base64.transform(inputObj);

      expect(transformRes).toBe(inputObj);
    });

    it("should correctly return value if base 64 decoding fails", () => {
      const inputObj = "æøå";

      const transformRes = base64.transform(inputObj);

      expect(transformRes).toBe(inputObj);
    });
  });
});
