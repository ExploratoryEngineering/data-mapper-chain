# HexToInt

Take a hex input and convert it to an int.

## Configuration

```ts
interface IHexToIntConfig {
  endianness?: Endianness;
  signed?: boolean;
}

enum Endianness {
  LITTLE_ENDIAN = "le",
  BIG_ENDIAN = "be",
}
```

## Example

```ts
const hexToIntDefault = Mappers.hexToInt(); // HexToInt: endianness:"be"|signed:false

const hexToIntLittleEndian = Mappers.hexToInt({ endianness: Endianness.LITTLE_ENDIAN }) // HexToInt: endianness:"le"|signed:false

const hextoIntSigned = Mappers.hexToInt({ signed: true }); // HexToInt: endianness:"be"|signed:true
```