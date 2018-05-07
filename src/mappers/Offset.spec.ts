import { Offset } from "./Offset";

describe("Offset data mapper", () => {
  let offset: Offset;

  beforeEach(() => {
    offset = new Offset();
  });

  describe("Offsetting", () => {
    it("should correctly offset value", () => {
      const inputObj = {
        name: "name",
        value: 0,
      };

      offset.offset = 15;

      const transformRes = offset.transform(inputObj);

      expect(transformRes).toEqual({
        name: "name",
        value: 15,
      });
    });

    it("should correctly offset a negative value", () => {
      const inputObj = {
        name: "name",
        value: 0,
      };

      offset.offset = -15;

      const transformRes = offset.transform(inputObj);

      expect(transformRes).toEqual({
        name: "name",
        value: -15,
      });
    });

    it("should allow for string input", () => {
      const inputObj = {
        name: "name",
        value: "5",
      };

      offset.offset = -15;

      const transformRes = offset.transform(inputObj);

      expect(transformRes).toEqual({
        name: "name",
        value: -10,
      });
    });
  });

  describe("Invalid input", () => {
    it("should return 0 for NaN input", () => {
      const inputObj = {
        name: "name",
        value: NaN,
      };

      offset.offset = 1;

      const transformRes = offset.transform(inputObj);

      expect(transformRes).toEqual({
        name: "name",
        value: 0,
      });
    });

    it("should return 0 for invalid input", () => {
      const inputObj = {
        name: "name",
        value: "æøå",
      };

      offset.offset = 1;

      const transformRes = offset.transform(inputObj);

      expect(transformRes).toEqual({
        name: "name",
        value: 0,
      });
    });
  });
});
