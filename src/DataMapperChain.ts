import { IBase64Config, IChunkConfig, IFromJSONConfig, IHexToFloatConfig, IHexToIntConfig, IOffsetConfig } from "./Config";
import { Mappers } from "./Mappers";
import { IDataValue, IMapper, IMapperConfig } from "./Models";

const { Base64, Chunk, FromJSON, HexToFloat, HexToInt, Offset } = Mappers;

export interface MapperType {
  id: string;
  value: string;
  entity: { new(params: any): IMapper };
}

export let AVAILABLE_MAPPERS_TYPES: MapperType[] = [{
  id: Chunk.ident,
  value: Chunk.description,
  entity: Chunk,
}, {
  id: HexToFloat.ident,
  value: HexToFloat.description,
  entity: HexToFloat,
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

export interface IDataMapperChainConfig {
  mappers?: IMapper[];
  name?: string;
}

export interface IMapDataValue {
  name?: string;
  value?: number | string;
}

export class DataMapperChain {
  mappers: IMapper[] = [];
  initialValue: IDataValue = { name: "Unnamed data", value: "" };
  name: string = "";

  constructor({
    mappers = [],
    name = "",
  }: IDataMapperChainConfig = { mappers, name }) {
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

  mapData({ name = "Unnamed data", value = "" }: IMapDataValue = { name, value }) {
    this.initialValue = {
      name: name,
      value: value,
    };

    return this.mappers.reduce((curr, mapper, idx) => {
      return mapper.transform(curr);
    }, this.initialValue);
  }

  // Explicit mappers to ease declarative mapping
  base64(base64Config: IBase64Config): DataMapperChain {
    this.addMapper(new Base64(base64Config));
    return this;
  }
  chunk(chunkConfig: IChunkConfig): DataMapperChain {
    this.addMapper(new Chunk(chunkConfig));
    return this;
  }
  fromJson(fromJsonConfig: IFromJSONConfig) {
    this.addMapper(new FromJSON(fromJsonConfig));
    return this;
  }
  hexToFloat(hexToFloatConfig: IHexToFloatConfig) {
    this.addMapper(new HexToFloat(hexToFloatConfig));
    return this;
  }
  hexToInt(hexToIntConfig: IHexToIntConfig) {
    this.addMapper(new HexToInt(hexToIntConfig));
    return this;
  }
  offset(offsetConfig: IOffsetConfig) {
    this.addMapper(new Offset(offsetConfig));
    return this;
  }
}
