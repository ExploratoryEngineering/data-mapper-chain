# Base64 mapper

Supports encoding and decoding of base64 input.

## Configuration

```ts
interface IBase64Config {
  action?: Base64Action;
  decodeAs?: Base64DecodeAs;
}

enum Base64Action {
  ENCODE = "encode",
  DECODE = "decode",
}

enum Base64DecodeAs {
  STRING = "string",
  HEXSTRING = "hexstring",
}

const base64Mapper = Mappers.Base64(configuration: IBase64Config);
```

## Example

```ts
const base64MapperDefault = Mappers.base64(); // Base64: action:"decode"|decodeAs:"string"

const base64MapperEncode = Mappers.base64({ action: Base64Action.ENCODE }); // Base64: action:"encode"

const base64DecodeAsHex = Mappers.base64({ decodeAs: Base64DecodeAs.HEXSTRING }); // Base64: action:"decode"|decodeAs:"hexstring"
```