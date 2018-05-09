import { Base64Action, Endianness } from "./Config";
import { Mappers } from "./Mappers";

describe("Factory for mappers", () => {
  it("should have a factory Base64 mapper", () => {
    const mapper = Mappers.base64();
    expect(mapper instanceof Mappers.Base64).toBe(true);
  });

  it("should allow configuration in Base64 factory", () => {
    const mapperWithConf = Mappers.base64({
      action: Base64Action.ENCODE,
    });

    expect(mapperWithConf instanceof Mappers.Base64).toBe(true);
    expect(mapperWithConf.action).toBe(Base64Action.ENCODE);
  });

  it("should have a factory Chunk mapper", () => {
    const mapper = Mappers.chunk();
    expect(mapper instanceof Mappers.Chunk).toBe(true);
  });

  it("should allow configuration in Chunk factory", () => {
    const mapperWithConf = Mappers.chunk({
      start: 1,
      size: 10,
    });

    expect(mapperWithConf instanceof Mappers.Chunk).toBe(true);
    expect(mapperWithConf.start).toBe(1);
    expect(mapperWithConf.size).toBe(10);
  });

  it("should have a factory FromJSON mapper", () => {
    const mapper = Mappers.fromJson();
    expect(mapper instanceof Mappers.FromJSON).toBe(true);
  });

  it("should allow configuration in FromJSON factory", () => {
    const mapperWithConf = Mappers.fromJson({
      propertyString: "my.string",
    });

    expect(mapperWithConf instanceof Mappers.FromJSON).toBe(true);
    expect(mapperWithConf.propertyString).toBe("my.string");
  });

  it("should have a factory HexToFloat mapper", () => {
    const mapper = Mappers.hexToFloat();
    expect(mapper instanceof Mappers.HexToFloat).toBe(true);
  });

  it("should allow configuration in HexToFloat factory", () => {
    const mapperWithConf = Mappers.hexToFloat({
      endianness: Endianness.LITTLE_ENDIAN,
    });

    expect(mapperWithConf instanceof Mappers.HexToFloat).toBe(true);
    expect(mapperWithConf.endianness).toBe(Endianness.LITTLE_ENDIAN);
  });

  it("should have a factory HexToInt mapper", () => {
    const mapper = Mappers.hexToInt();
    expect(mapper instanceof Mappers.HexToInt).toBe(true);
  });

  it("should allow configuration in HexToInt factory", () => {
    const mapperWithConf = Mappers.hexToInt({
      endianness: Endianness.LITTLE_ENDIAN,
      signed: true,
    });

    expect(mapperWithConf instanceof Mappers.HexToInt).toBe(true);
    expect(mapperWithConf.endianness).toBe(Endianness.LITTLE_ENDIAN);
    expect(mapperWithConf.signed).toBe(true);
  });

  it("should have a factory Offset mapper", () => {
    const mapper = Mappers.offset();
    expect(mapper instanceof Mappers.Offset).toBe(true);
  });

  it("should allow configuration in Offset factory", () => {
    const mapperWithConf = Mappers.offset({
      offset: 75,
    });

    expect(mapperWithConf instanceof Mappers.Offset).toBe(true);
    expect(mapperWithConf.offset).toBe(75);
  });
});
