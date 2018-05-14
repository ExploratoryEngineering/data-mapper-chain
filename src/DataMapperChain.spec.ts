import { DataMapperChain } from "./DataMapperChain";
import { AVAILABLE_MAPPERS_TYPES, Mappers } from "./Mappers";
import { IDataValue, IMapper, IMapperConfig } from "./Typings";

const { Base64, Chunk, FromJSON, HexToFloat, HexToInt, Offset } = Mappers;

class MapperMock implements IMapper {
  initParams: any = {};

  constructor(params = {}) {
    this.initParams = params;
  }

  transform(value: IDataValue): IDataValue {
    return "MOCK WAS HERE";
  }

  config(): IMapperConfig {
    return {
      ident: "MOCK",
      params: {
        p1: 1,
        p2: "2",
      },
    };
  }
}

describe("Data mapper chain", () => {
  let dataMapperChain: DataMapperChain;

  beforeEach(() => {
    dataMapperChain = new DataMapperChain();
    dataMapperChain.addNewMapperType({
      id: "MOCK",
      value: "My mock mapper",
      entity: MapperMock,
    });
  });

  describe("Initializing", () => {
    it("should initially have 0 mappers", () => {
      expect(dataMapperChain.mappers.length).toBe(0);
    });

    it("should allow for init with mappers", () => {
      const mappers: IMapper[] = [];

      mappers.push(new MapperMock());

      dataMapperChain = new DataMapperChain({
        mappers: mappers,
      });

      expect(dataMapperChain.mappers.length).toBe(1);
    });

    it("should be correctly named upon init", () => {
      dataMapperChain = new DataMapperChain({
        name: "test",
      });

      expect(dataMapperChain.name).toBe("test");
    });
  });

  describe("Config de-/serialization", () => {
    it("should correctly serialize when no mappers", () => {
      dataMapperChain.name = "Test";
      dataMapperChain.mappers = [];

      const serializedConfig = dataMapperChain.serializeConfig();
      expect(serializedConfig).toBe("{\"name\":\"Test\",\"mappers\":[]}");
    });

    it("should correctly serialize with mapper", () => {
      dataMapperChain.addMapper(new MapperMock());

      const serializedConfig = dataMapperChain.serializeConfig();
      expect(serializedConfig).toBe("{\"name\":\"\",\"mappers\":[{\"ident\":\"MOCK\",\"params\":{\"p1\":1,\"p2\":\"2\"}}]}");
    });

    it("should correctly deserialize with no mappers", () => {
      const serializedConfig = "{\"name\":\"Test\",\"mappers\":[]}";

      dataMapperChain.loadConfig(serializedConfig);

      expect(dataMapperChain.name).toBe("Test");
    });

    it("should correctly deserialize with mapper and corresponding config", () => {
      const serializedConfig = "{\"name\":\"Test\",\"mappers\":[{\"ident\":\"MOCK\",\"params\":{\"p1\":1,\"p2\":\"2\"}}]}";

      dataMapperChain.loadConfig(serializedConfig);

      expect(dataMapperChain.name).toBe("Test");
      expect(dataMapperChain.mappers.length).toBe(1);
      expect((dataMapperChain.mappers[0] as MapperMock).initParams).toEqual({
        p1: 1,
        p2: "2",
      });
    });
  });

  describe("Mapper configuration", () => {
    it("should correctly add new mapper type", () => {
      dataMapperChain.addNewMapperType({
        id: "MYNEWMOCKMAPPER",
        value: "My mock mapper",
        entity: MapperMock,
      });

      expect(dataMapperChain.findMapperTypeById("MYNEWMOCKMAPPER")).not.toBe(undefined);
    });

    it("should correctly return mapper initiated with params if type is present", () => {
      const mapperRes = dataMapperChain.createMapperByConfig({
        ident: "MOCK",
        params: "params",
      });

      expect(mapperRes).not.toBe(false);
      expect((mapperRes as MapperMock).initParams).toBe("params");
    });

    it("should correctly return false when no mapper type found", () => {
      const mapperRes = dataMapperChain.createMapperByConfig({
        ident: "NONEXISTANT",
        params: {},
      });

      expect(mapperRes).toBe(false);
    });
  });

  describe("Data transformation", () => {
    it("should work as intended with no mappers", () => {
      const inputObj = "babe";

      const transformRes = dataMapperChain.mapData(inputObj);

      expect(transformRes).toEqual(inputObj);
    });

    it("should allow for empty input in map data", () => {
      const transformRes = dataMapperChain.mapData();
      expect(transformRes).toEqual("");
    });

    it("should correctly run transform on added mappers", () => {
      const inputObj = "babe";

      dataMapperChain.addMapper(new MapperMock());
      const transformRes = dataMapperChain.mapData(inputObj);

      expect(transformRes).toEqual("MOCK WAS HERE");
    });
  });

  describe("Explicit mappers", () => {
    it("should have a currying Base64 mapper", () => {
      const curriedChain = dataMapperChain.base64({});
      expect(curriedChain.mappers.length).toBe(1);
      expect(curriedChain.mappers[0] instanceof Base64).toBe(true);
    });

    it("should have a currying Chunk mapper", () => {
      const curriedChain = dataMapperChain.chunk({});
      expect(curriedChain.mappers.length).toBe(1);
      expect(curriedChain.mappers[0] instanceof Chunk).toBe(true);
    });

    it("should have a currying FromJSON mapper", () => {
      const curriedChain = dataMapperChain.fromJson({});
      expect(curriedChain.mappers.length).toBe(1);
      expect(curriedChain.mappers[0] instanceof FromJSON).toBe(true);
    });

    it("should have a currying HexToFloat mapper", () => {
      const curriedChain = dataMapperChain.hexToFloat({});
      expect(curriedChain.mappers.length).toBe(1);
      expect(curriedChain.mappers[0] instanceof HexToFloat).toBe(true);
    });

    it("should have a currying HexToInt mapper", () => {
      const curriedChain = dataMapperChain.hexToInt({});
      expect(curriedChain.mappers.length).toBe(1);
      expect(curriedChain.mappers[0] instanceof HexToInt).toBe(true);
    });

    it("should have a currying Offset mapper", () => {
      const curriedChain = dataMapperChain.offset({});
      expect(curriedChain.mappers.length).toBe(1);
      expect(curriedChain.mappers[0] instanceof Offset).toBe(true);
    });
  });

  describe("Invalid input", () => {
    it("should correctly ignore serialized unknown mappers", () => {
      const serializedConfig = "{\"name\":\"Test\",\"mappers\":[{\"ident\":\"UNKNOWNMAPPER\",\"params\":{\"p1\":1,\"p2\":\"2\"}}]}";
      dataMapperChain.loadConfig(serializedConfig);

      expect(dataMapperChain.name).toBe("Test");
      expect(dataMapperChain.mappers.length).toBe(0);
    });
  });
});
