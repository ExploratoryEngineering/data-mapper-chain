import { Offset } from "./Offset";

describe("Offset data mapper", () => {
  let offset: Offset;

  beforeEach(() => {
    offset = new Offset();
  });

  describe("Offsetting", () => {
    it("should correctly offset value", () => {
      const inputObj = 0;

      offset.offset = 15;

      const transformRes = offset.transform(inputObj);

      expect(transformRes).toEqual(15);
    });

    it("should correctly offset a negative value", () => {
      const inputObj = 0;

      offset.offset = -15;

      const transformRes = offset.transform(inputObj);

      expect(transformRes).toEqual(-15);
    });

    it("should allow for string input", () => {
      const inputObj = "5";

      offset.offset = -15;

      const transformRes = offset.transform(inputObj);

      expect(transformRes).toEqual(-10);
    });
  });

  describe("Configuration", () => {
    it("should correctly return config based on initial configuration", () => {
      const simpleOffset = new Offset({
        offset: "25",
      });

      expect(simpleOffset.config()).toEqual({
        id: "OFFSET",
        params: {
          offset: 25,
        },
      });
    });
  });

  describe("Invalid input", () => {
    it("should return 0 for NaN input", () => {
      const inputObj = NaN;

      offset.offset = 1;

      const transformRes = offset.transform(inputObj);

      expect(transformRes).toEqual(0);
    });

    it("should return 0 for invalid input", () => {
      const inputObj = "æøå";

      offset.offset = 1;

      const transformRes = offset.transform(inputObj);

      expect(transformRes).toEqual(0);
    });
  });
});
