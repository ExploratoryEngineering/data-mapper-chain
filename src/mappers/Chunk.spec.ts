import { Chunk } from "./Chunk";

describe("Chunk mapper", () => {
  let chunk: Chunk;

  beforeEach(() => {
    chunk = new Chunk();
  });

  describe("Initialization", () => {
    it("should allow for empty constructor", () => {
      chunk = new Chunk();

      expect(chunk).toBeDefined();
    });

    it("should allow for partial param in constructor", () => {
      chunk = new Chunk({
        start: 3,
      });

      expect(chunk.start).toBe(3);
    });

    it("should allow for both string and number in constructor", () => {
      chunk = new Chunk({
        start: 3,
        size: "2",
      });

      expect(chunk.start).toBe(3);
      expect(chunk.size).toBe(2);
    });
  });

  describe("Configuration export", () => {
    it("should return correct configuration based on input", () => {
      chunk.start = 2;
      chunk.size = 6;

      expect(chunk.config()).toEqual({
        id: Chunk.id,
        params: {
          start: 2,
          size: 6,
        },
      });
    });
  });

  describe("Chunking", () => {
    it("should correctly chunk part of a string", () => {
      chunk.start = 0;
      chunk.size = 2;

      const transformRes = chunk.transform("abba");

      expect(transformRes).toEqual("ab");
    });

    it("should correctly chunk part of a number", () => {
      chunk.start = 0;
      chunk.size = 2;

      const transformRes = chunk.transform(1234);

      expect(transformRes).toEqual("12");
    });

    it("should correctly return an empty string if the index is out of bounds", () => {
      chunk.start = 4;
      chunk.size = 2;

      const transformRes = chunk.transform("abba");

      expect(transformRes).toEqual("");
    });
  });
});
