### Initialization and configuration
```ts

import { DataMapperChain } from "@exploratoryengineering/data-mapper-chain";

// Optional config
const myMapper = new DataMapperChain();

// With config
const myMapperWithConfig = new DataMapperChain({
  mappers: [],
  name: "My name for the mapper",
});

```

### Adding mappers

#### Using short hand
```ts
import { DataMapperChain } from "@exploratoryengineering/data-mapper-chain";

// Create mapper and add mappers
const dataMapperChain = new DataMapperChain()
  .chunk({
    start: 50,
    size: 4,
  })
  .hexToInt();

```


### Mapping data
```ts
// Create mapper and add mappers
const dataMapperChain = new DataMapperChain()
  .chunk({
    start: 50,
    size: 4,
  })
  .hexToInt();

const deviceData: string = `47eee3803e3a8c713f8daf7242fc6666423c28c04111d84000024b00a3030c261b010b91d3`;
// Create data object (coincidentally the value is CO2 ppm)
const data: IDataValue = {
  name: "CO2 ppm",
  value: deviceData,
};

// Run mapper
dataMapperChain.mapData(data); // prints { name: 'CO2 ppm', value: 587 }
```