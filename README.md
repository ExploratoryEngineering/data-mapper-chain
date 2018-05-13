# Data mapper chain

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![Documentation](https://img.shields.io/badge/docs-tsdoc-blue.svg)](https://exploratoryengineering.github.io/data-mapper-chain/)
[![data-mapper-chain](https://img.shields.io/npm/v/@exploratoryengineering/data-mapper-chain.svg)](https://www.npmjs.com/package/@exploratoryengineering/data-mapper-chain)
[![npm bundle size (minified + gzip)](https://img.shields.io/bundlephobia/minzip/@exploratoryengineering/data-mapper-chain.svg)](#tiny)
[![Build Status](https://travis-ci.org/ExploratoryEngineering/data-mapper-chain.svg?branch=master)](https://travis-ci.org/ExploratoryEngineering/data-mapper-chain)
[![codecov](https://codecov.io/gh/ExploratoryEngineering/data-mapper-chain/branch/master/graph/badge.svg)](https://codecov.io/gh/ExploratoryEngineering/data-mapper-chain)

Simple data mapper library meant to be run in browser to ease data transformation for IoT devices in JS.

## Example: Simple in browser
```html
<body>
  ...
  <script src="https://cdn.jsdelivr.net/npm/@exploratoryengineering/data-mapper-chain"></script>
  <script>
    var myMapper = new dmc
      .DataMapperChain()
      .chunk({ start: 2, size: 2})
      .hexToInt();

    console.log(myMapper.mapData({
      name: "My hex value",
      value: "babe"
    })); // Prints 190
  </script>
</body>
```

## Example: In ts
You must first install the dependency

```bash
npm i @exploratoryengineering/data-mapper-chain
``` 

### Using shorthand
```ts
import { DataMapperChain, IDataValue } from "@exploratoryengineering/data-mapper-chain";

// Raw data from device
const deviceData: string = `47eee3803e3a8c713f8daf7242fc6666423c28c04111d84000024b00a3030c261b010b91d3`;

// Create a chain and add mappers
const dataMapperChain = new DataMapperChain()
  .chunk({
    start: 50,
    size: 4,
  })
  .hexToInt();

// Create data object (conincidentally the value is CO2 ppm)
const data: IDataValue = {
  name: "CO2 ppm",
  value: deviceData,
};

// Run mapper
dataMapperChain.mapData(data); // prints { name: 'CO2 ppm', value: 587 }

``` 


### Instanciating mappers directly
```ts

import { DataMapperChain, IDataValue, Mappers } from "@exploratoryengineering/data-mapper-chain";

// Raw data from device
const deviceData: string = `47eee3803e3a8c713f8daf7242fc6666423c28c04111d84000024b00a3030c261b010b91d3`;

/**
 * We know that on byte 25 there is 2 bytes of data which is a hex encoded uint16
 * We solve this by doing the following:
 */

/**
 * Create a Chunk mapper
 */
const chunk = Mappers.chunk({
  start: 50,
  size: 4,
});

/**
 * Create a HexToInt mapper
 */
const hexToInt = Mappers.hexToInt();

// Create a DataMapperChain
const dataMapperChain = new DataMapperChain();

// Add mappers
dataMapperChain.addMapper(chunk);
dataMapperChain.addMapper(hexToInt);

// Create data object (conincidentally the value is CO2 ppm)
const data: IDataValue = {
  name: "CO2 ppm",
  value: deviceData,
};

// Run mapper
dataMapperChain.mapData(data); // prints { name: 'CO2 ppm', value: 587 }


```

## What
The main workhorse is the `DataMapperChain` which serves a couple of purposes. It contains the different mappers you want to use in your "chain" of mappers and has functions to apply all mappers on a data set. It also allows for serializing configuration of both the chain and the added mappers. This serialized version can again be loaded directly into a new `DataMapperChain` which is now fully configured with the saved params. 

## Why
I found myself fiddling with a lot of IoT data recently and a need to graph it easily. The libs which which I found either relied heavily on `eval` or didn't have any typings. I put together this lib which is modular and pluggable and hopefully solves someones problem alongside mine.

## Pluggable
While the lib provide a decent amount of mappers as a starting point, I know I don't cover every use case out there.

## Tiny
The library relies mostly on native functions meaning it shouldn't get too big. More complex mappers should be application specific and be a part of the application which imports the library.