import Base64, { Base64Actions } from "./Base64";

describe("Base64 mapper", () => {
  let base64: Base64;
  const helloWorldBase64: string = "aGVsbG8gd29ybGQ=";
  const helloWorldString: string = "hello world";

  beforeEach(() => {
    base64 = new Base64();
  });

  describe("Base64 encoding/decoding", () => {
    it("should correctly encode a string given", () => {
      base64.action = Base64Actions.ENCODE;
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
      base64.action = Base64Actions.DECODE;
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

  describe("Invalid input", () => {
    it("should correctly return the given object if no value is present", () => {
      const inputObj = {
        name: "name",
        value: "",
      };

      const transformRes = base64.transform(inputObj);

      expect(transformRes).toBe(inputObj);
    });
  });
});
