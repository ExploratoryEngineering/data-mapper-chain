# HexToFloat

Take a hex input and convert it to a float.

## Configuration

```ts
interface IHexToFloatConfig {
  endianness?: Endianness;
}

enum Endianness {
  LITTLE_ENDIAN = "le",
  BIG_ENDIAN = "be",
}
```

## Example

```ts
const hexToFloatDefault = Mappers.hexToFloat(); // HexToFloat: endianness:"be"

const hexToFloatLittleEndian = Mappers.hexToFloat({ endianness: Endianness.LITTLE_ENDIAN }) // HexToFloat: endianness:"le"
```