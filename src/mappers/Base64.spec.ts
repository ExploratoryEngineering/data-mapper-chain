import { Base64Action } from "../Config";
import { Base64 } from "./Base64";

describe("Base64 mapper", () => {
  let base64: Base64;
  const helloWorldBase64: string = "aGVsbG8gd29ybGQ=";
  const helloWorldString: string = "hello world";

  beforeEach(() => {
    base64 = new Base64();
  });

  describe("Base64 encoding/decoding", () => {
    it("should correctly encode a string given", () => {
      base64.action = Base64Action.ENCODE;
      const transformRes = base64.transform({
        name: "data",
        value: helloWorldString,
      });

      expect(transformRes).toEqual({
        name: "data",
        value: helloWorldBase64,
      });
    });

    it("should correctly decode a base 64 string given", () => {
      base64.action = Base64Action.DECODE;
      const transformRes = base64.transform({
        name: "data",
        value: helloWorldBase64,
      });

      expect(transformRes).toEqual({
        name: "data",
        value: helloWorldString,
      });
    });
  });

  describe("Configuration", () => {
    it("should correctly return config based on initial configuration", () => {
      const base64encode = new Base64({
        action: Base64Action.ENCODE,
      });

      expect(base64encode.config()).toEqual({
        ident: "BASE64",
        params: {
          action: Base64Action.ENCODE,
        },
      });
    });
  });

  describe("Invalid input", () => {
    it("should correctly return the given object if no value is present", () => {
      const inputObj = {
        name: "name",
        value: "",
      };

      const transformRes = base64.transform(inputObj);

      expect(transformRes).toBe(inputObj);
    });

    it("should correctly return value if base 64 decoding fails", () => {
      const inputObj = {
        name: "name",
        value: "æøå",
      };

      const transformRes = base64.transform(inputObj);

      expect(transformRes).toBe(inputObj);
    });
  });
});
