# Offset

Take an input and offset it by a positive or negative value.

## Configuration

```ts
interface IOffsetConfig {
  offset?: number | string;
}
```

## Example

```ts
const offsetMapperDefault = Mappers.offset(); // Offset: offset:0

const offsetMapperPositive = Mappers.offset({ offset: 42 }); // Offset: offset:42

const offsetMapperNegative = Mappers.offset({ offset: -42 }); // Offset: offset:-42
```