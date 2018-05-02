import Base64 from "./sensor-data-mapper/Base64";
import Chunk from "./sensor-data-mapper/Chunk";
import FromJSON from "./sensor-data-mapper/FromJSON";
import HexToInt from "./sensor-data-mapper/HexToInt";
import Offset from "./sensor-data-mapper/Offset";

interface MapperType {
  id: string;
  value: string;
  entity: { new(params): IMapper };
}

export let AVAILABLE_MAPPERS_TYPES: MapperType[] = [{
  id: Chunk.ident,
  value: Chunk.description,
  entity: Chunk,
}, {
  id: HexToInt.ident,
  value: HexToInt.description,
  entity: HexToInt,
}, {
  id: Offset.ident,
  value: Offset.description,
  entity: Offset,
}, {
  id: Base64.ident,
  value: Base64.description,
  entity: Base64,
}, {
  id: FromJSON.ident,
  value: FromJSON.description,
  entity: FromJSON,
}];

export default class DataMapperChain {
  mappers: IMapper[] = [];
  initialValue: IDataValue;
  name: string = "";

  constructor({
    mappers = [],
    name = "",
  } = {}) {
    this.name = name;
    this.mappers = mappers;
  }

  serializeConfig() {
    return JSON.stringify({
      name: this.name,
      mappers: this.mappers.map((mapper) => {
        return mapper.config();
      }),
    });
  }

  loadConfig(configString: string) {
    const parsedConfig = JSON.parse(configString);
    this.name = parsedConfig.name;
    const mapperConfigs: IMapperConfig[] = parsedConfig.mappers;

    mapperConfigs.forEach((config) => {
      const mapper = this.getMapperByConfig(config);
      if (mapper) {
        this.addMapper(mapper);
      }
    });
  }

  getMapperByConfig(config: IMapperConfig): IMapper | false {
    const mapperType = this.findMapperTypeById(config.ident);
    if (mapperType) {
      return new mapperType.entity(config.params);
    }

    return false;
  }

  addMapper(mapper: IMapper) {
    this.mappers.push(mapper);
  }

  addNewMapperType(mapperType: MapperType) {
    const existingMapper = this.findMapperTypeById(mapperType.id);
    if (!existingMapper) {
      AVAILABLE_MAPPERS_TYPES.push(mapperType);
    } else {
      AVAILABLE_MAPPERS_TYPES.splice(
        AVAILABLE_MAPPERS_TYPES.indexOf(existingMapper),
        1,
        mapperType,
      );
    }
  }

  findMapperTypeById(id: string) {
    return AVAILABLE_MAPPERS_TYPES.find((mapperType) => {
      return mapperType.id === id;
    });
  }

  mapData({ name = "Unnamed data", value = "" } = {}) {
    this.initialValue = {
      name: name,
      value: value,
    };

    return this.mappers.reduce((curr, mapper, idx) => {
      return mapper.transform(curr);
    }, this.initialValue);
  }
}
