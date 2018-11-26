import { FromJSON } from "./FromJSON";

describe("FromJSON mapper", () => {
  let fromJSON: FromJSON;

  const simpleTestObject = {
    test: "simpleTestObjectValue",
  };
  const multiLayeredTestObject = {
    layer1test: simpleTestObject,
    layer2test: {
      layer2: "multiLayeredTestObjectValue",
    },
  };
  const arrayTestObject = {
    myArray: [
      "arrayTestObjectValue",
    ],
  };

  beforeEach(() => {
    fromJSON = new FromJSON();
  });

  describe("JSON decoding", () => {
    it("should correctly decode and fetch property of a simple test obj", () => {
      const inputObj = JSON.stringify(simpleTestObject);

      fromJSON.propertyString = "test";
      const transformRes = fromJSON.transform(inputObj);

      expect(transformRes).toEqual("simpleTestObjectValue");
    });

    it("should correctly return the whole object if no propertyString", () => {
      const inputObj = JSON.stringify(simpleTestObject);

      fromJSON.propertyString = "";
      const transformRes = fromJSON.transform(inputObj);

      expect(transformRes).toEqual(JSON.stringify(simpleTestObject));
    });

    it("should correctly return the nested object upon asking for top level property", () => {
      const inputObj = JSON.stringify(multiLayeredTestObject);

      fromJSON.propertyString = "layer1test";
      const transformRes = fromJSON.transform(inputObj);

      expect(transformRes).toEqual(JSON.stringify(simpleTestObject));
    });

    it("should correctly drill down in object", () => {
      const inputObj = JSON.stringify(multiLayeredTestObject);

      fromJSON.propertyString = "layer2test.layer2";
      const transformRes = fromJSON.transform(inputObj);

      expect(transformRes).toEqual("multiLayeredTestObjectValue");
    });

    it("should correctly drill down in array", () => {
      const inputObj = JSON.stringify(arrayTestObject);

      fromJSON.propertyString = "myArray.0";
      const transformRes = fromJSON.transform(inputObj);

      expect(transformRes).toEqual("arrayTestObjectValue");
    });
  });

  describe("Configuration", () => {
    it("should correctly return config based on initial configuration", () => {
      const simpleFromJson = new FromJSON({
        propertyString: "simple",
      });

      expect(simpleFromJson.config()).toEqual({
        id: "FROMJSON",
        params: {
          propertyString: "simple",
        },
      });
    });
  });

  describe("Invalid input", () => {
    it("should return empty string on nonexistant property", () => {
      const inputObj = JSON.stringify(simpleTestObject);

      fromJSON.propertyString = "nonExistantProperty";
      const transformRes = fromJSON.transform(inputObj);

      expect(transformRes).toEqual("");
    });

    it("should interpret trailing dot as no action", () => {
      const inputObj = JSON.stringify(arrayTestObject);

      fromJSON.propertyString = "myArray.";
      const transformRes = fromJSON.transform(inputObj);

      expect(transformRes).toEqual(JSON.stringify(arrayTestObject.myArray));
    });

    it("should correctly return the given object if no value is present", () => {
      const inputObj = "";

      const transformRes = fromJSON.transform(inputObj);

      expect(transformRes).toBe(inputObj);
    });

    it("should correctly return the given object if it's not JSON parsable", () => {
      const inputObj = "{æøå}";

      const transformRes = fromJSON.transform(inputObj);

      expect(transformRes).toBe(inputObj);
    });
  });
});
