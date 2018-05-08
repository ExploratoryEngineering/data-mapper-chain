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
      const inputObj = {
        name: "name",
        value: JSON.stringify(simpleTestObject),
      };

      fromJSON.propertyString = "test";
      const transformRes = fromJSON.transform(inputObj);

      expect(transformRes).toEqual({
        name: "name",
        value: "simpleTestObjectValue",
      });
    });

    it("should correctly return the whole object if no propertyString", () => {
      const inputObj = {
        name: "name",
        value: JSON.stringify(simpleTestObject),
      };

      fromJSON.propertyString = "";
      const transformRes = fromJSON.transform(inputObj);

      expect(transformRes).toEqual({
        name: "name",
        value: JSON.stringify(simpleTestObject),
      });
    });

    it("should correctly return the nested object upon asking for top level property", () => {
      const inputObj = {
        name: "name",
        value: JSON.stringify(multiLayeredTestObject),
      };

      fromJSON.propertyString = "layer1test";
      const transformRes = fromJSON.transform(inputObj);

      expect(transformRes).toEqual({
        name: "name",
        value: JSON.stringify(simpleTestObject),
      });
    });

    it("should correctly drill down in object", () => {
      const inputObj = {
        name: "name",
        value: JSON.stringify(multiLayeredTestObject),
      };

      fromJSON.propertyString = "layer2test.layer2";
      const transformRes = fromJSON.transform(inputObj);

      expect(transformRes).toEqual({
        name: "name",
        value: "multiLayeredTestObjectValue",
      });
    });

    it("should correctly drill down in array", () => {
      const inputObj = {
        name: "name",
        value: JSON.stringify(arrayTestObject),
      };

      fromJSON.propertyString = "myArray.0";
      const transformRes = fromJSON.transform(inputObj);

      expect(transformRes).toEqual({
        name: "name",
        value: "arrayTestObjectValue",
      });
    });
  });

  describe("Configuration", () => {
    it("should correctly return config based on initial configuration", () => {
      const simpleFromJson = new FromJSON({
        propertyString: "simple",
      });

      expect(simpleFromJson.config()).toEqual({
        ident: "FROMJSON",
        params: {
          propertyString: "simple",
        },
      });
    });
  });

  describe("Invalid input", () => {
    it("should return empty string on nonexistant property", () => {
      const inputObj = {
        name: "name",
        value: JSON.stringify(simpleTestObject),
      };

      fromJSON.propertyString = "nonExistantProperty";
      const transformRes = fromJSON.transform(inputObj);

      expect(transformRes).toEqual({
        name: "name",
        value: "",
      });
    });

    it("should interpret trailing dot as no action", () => {
      const inputObj = {
        name: "name",
        value: JSON.stringify(arrayTestObject),
      };

      fromJSON.propertyString = "myArray.";
      const transformRes = fromJSON.transform(inputObj);

      expect(transformRes).toEqual({
        name: "name",
        value: JSON.stringify(arrayTestObject.myArray),
      });
    });
  });
});
