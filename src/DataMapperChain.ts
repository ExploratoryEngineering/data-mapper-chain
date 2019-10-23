import {
  IBase64Config,
  IChunkConfig,
  IFromJSONConfig,
  IHexToFloatConfig,
  IHexToIntConfig,
  IOffsetConfig,
} from "./Config";
import { AVAILABLE_MAPPERS_TYPES, Mappers } from "./Mappers";
import { IDataValue, IMapper, IMapperConfig, IMapperType } from "./Typings";

const CURRENT_VERSION = "0.7.1";
const { Base64, Chunk, FromJSON, HexToFloat, HexToInt, Offset } = Mappers;

/**
 * IDataMapperChainConfig interface for constructor of a DataMapperChain
 */
export interface IDataMapperChainConfig {
  /**
   * Optional initial mappers
   */
  mappers?: IMapper[];
  /**
   * Optional name of the DataMapperChain
   */
  name?: string;

  /**
   * Optional meta information to put on mapper
   */
  meta?: object;
}

/**
 * Initial data mapping object for the DataMapperChain
 */
export interface IMapDataValue {
  name?: string;
  value?: number | string;
}

/**
 * DataMapperChain is a simple collection of mappers and allows for
 * serializing and loading configurations of mappers.
 * [[include:data-mapper-tutorial.md]]
 */
export class DataMapperChain {
  mappers: IMapper[] = [];
  initialValue: IDataValue = "";
  name: string = "";
  meta: object = {};

  /**
   * Create a new instance of a DataMapperChain.
   * @param __namedParameters DataMapperChain configuration object
   * @param mappers The initial mappers for the DataMapperChain
   * @param name The initial name for the DataMapperChain
   * @param meta The initial meta data for the DataMapperChain
   */
  constructor({
    mappers = [],
    name = "",
    meta = {},
  }: IDataMapperChainConfig = {}) {
    this.name = name;
    this.mappers = mappers;
    this.meta = meta;
  }

  /**
   * Serializes the DataMapperChain configuration including the mappers added to the chain.
   * Returns a string representation of the configuration which has been run through JSON.stringify.
   */
  serializeConfig(): string {
    return JSON.stringify({
      name: this.name,
      version: CURRENT_VERSION,
      meta: this.meta,
      mappers: this.mappers.map((mapper) => {
        return mapper.config();
      }),
    });
  }

  /**
   * Loads a configuration which has been exported earlier by serializeConfig.
   * @param configString Configuration string as exported from serializeConfig @see serializeConfig
   */
  loadConfig(configString: string): DataMapperChain {
    const parsedConfig = JSON.parse(configString);
    this.name = parsedConfig.name;
    this.meta = parsedConfig.meta;
    let mapperConfigs: IMapperConfig[] = [];

    mapperConfigs = parsedConfig.mappers.map((mapper: IMapperConfig) => {
      if (mapper.ident) {
        mapper.id = mapper.ident;
      }

      return mapper;
    });

    mapperConfigs.forEach((config) => {
      const mapper = this.createMapperByConfig(config);
      if (mapper) {
        this.addMapper(mapper);
      }
    });

    return this;
  }

  /**
   * Create a IMapper based on the given IMapperConfig. If no mapper type is found the function returns false.
   * @param config The IMapperConfig for the mapper
   */
  createMapperByConfig(config: IMapperConfig): IMapper | false {
    const mapperType = this.findMapperTypeById(config.id);
    if (mapperType) {
      return new mapperType.entity(config.params);
    }

    return false;
  }

  /**
   * Add a mapper to the DataMapperChain.
   * @param mapper Mapper to be added
   */
  addMapper(mapper: IMapper) {
    this.mappers.push(mapper);
  }

  /**
   * Make a new mapper type available to the DataMapperChain. If the mapper type already exists it will be overwritten.
   * @param mapperType Mappertype to be added
   */
  addNewMapperType(mapperType: IMapperType) {
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

  /**
   * Helper function to find a mapper in available mappers.
   * @param id Mapper ID as string
   */
  findMapperTypeById(id: string) {
    return AVAILABLE_MAPPERS_TYPES.find((mapperType) => {
      return mapperType.id === id;
    });
  }

  /**
   * Uses the configured mappers for the DataMapperChain and maps the given data through the mappers.
   * @param param0 Data to be mapped through the configured mappers
   */
  mapData(value: IDataValue = "") {
    this.initialValue = value;

    return this.mappers.reduce((curr, mapper, idx) => {
      return mapper.transform(curr);
    }, this.initialValue);
  }

  /**
   * Add a Base64 mapper
   * @param base64Config Configuration for the Base64 mapper
   */
  base64(base64Config: IBase64Config = {}): DataMapperChain {
    this.addMapper(new Base64(base64Config));
    return this;
  }

  /**
   * Add a Chunk mapper
   * @param chunkConfig Configuration for the Chunk mapper
   */
  chunk(chunkConfig: IChunkConfig = {}): DataMapperChain {
    this.addMapper(new Chunk(chunkConfig));
    return this;
  }

  /**
   * Add a FromJSON mapper
   * @param fromJsonConfig Configuration for the FromJSON mapper
   */
  fromJson(fromJsonConfig: IFromJSONConfig = {}) {
    this.addMapper(new FromJSON(fromJsonConfig));
    return this;
  }

  /**
   * Add a HexToFloat mapper
   * @param hexToFloatConfig Configuration for the HexToFloat mapper
   */
  hexToFloat(hexToFloatConfig: IHexToFloatConfig = {}) {
    this.addMapper(new HexToFloat(hexToFloatConfig));
    return this;
  }

  /**
   * Add a HexToInt mapper
   * @param hexToIntConfig Configuration for the HexToInt mapper
   */
  hexToInt(hexToIntConfig: IHexToIntConfig = {}) {
    this.addMapper(new HexToInt(hexToIntConfig));
    return this;
  }

  /**
   * Add a Offset mapper
   * @param offsetConfig Configuration for the Offset mapper
   */
  offset(offsetConfig: IOffsetConfig = {}) {
    this.addMapper(new Offset(offsetConfig));
    return this;
  }
}
