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
});
