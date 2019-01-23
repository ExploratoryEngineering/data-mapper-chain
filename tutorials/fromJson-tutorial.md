# FromJSON

Traverse a JSON struct and return value.

## Configuration

```ts
interface IFromJSONConfig {
  propertyString?: string;
}
```

## Example

```ts
const fromJSONDefault = Mappers.fromJson(); // FromJSON: propertyString:""

const fromJSONGetProperty = Mappers.fromJson({ propertyString: "myProperty" }); // FromJSON: propertyString:"myProperty"

const fromJSONTraversePropertyAndArray = Mappers.fromJson({ propertyString: "propertyWithArray.0" }); // FromJSON: propertyString:"propertyWithArray.0"
```