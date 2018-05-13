import * as Main from "./main";

describe("Main export", () => {
  it("should have DataMapperChain exported", () => {
    expect(Main.DataMapperChain).toBeDefined();
  });

  it("should have Config exported", () => {
    expect(Main.Config).toBeDefined();
  });

  it("should have mappers exported", () => {
    expect(Main.Mappers).toBeDefined();
  });

  describe("DataMapperChain factory", () => {
    it("should have a create export", () => {
      expect(Main.create).toBeDefined();
    });

    it("should correctly create a default DataMapperChain upon create", () => {
      const mapper = Main.create();

      expect(mapper instanceof Main.DataMapperChain).toBe(true);
    });

    it("should correctly take a configuration object for DataMapperChain upon create", () => {
      const mapper = Main.create({
        name: "My mapper",
      });

      expect(mapper instanceof Main.DataMapperChain).toBe(true);
      expect(mapper.name).toBe("My mapper");
    });
  });
});
