# Chunk

Take a chunk of the input and return it.

## Configuration

```ts
interface IChunkConfig {
  start?: string | number;
  size?: string | number;
}
```

## Example

```ts
const chunkMapperDefault = Mappers.chunk(); // Chunk: start:0|size:4

const chunkMapper7to11 = Mappers.chunk({ start: 7 }); // Chunk: start:7|size:4

const chunkMapper10to22 = Mappers.chunk({ start: 10, size: 12 }); // Chunk: start:10|size:12
```