# Data mapper chain 
## deprecated, superseded by https://github.com/lab5e/data-mapper-chain

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![Documentation](https://img.shields.io/badge/docs-tsdoc-blue.svg)](https://exploratoryengineering.github.io/data-mapper-chain/)
[![npm bundle size (minified + gzip)](https://img.shields.io/bundlephobia/minzip/@exploratoryengineering/data-mapper-chain.svg)](#tiny)
[![codebeat badge](https://codebeat.co/badges/e35c9d0d-17d5-41bd-9488-bce440c84cf4)](https://codebeat.co/projects/github-com-exploratoryengineering-data-mapper-chain-master)
[![data-mapper-chain](https://img.shields.io/npm/v/@exploratoryengineering/data-mapper-chain.svg)](https://www.npmjs.com/package/@exploratoryengineering/data-mapper-chain)
[![Build Status](https://travis-ci.org/ExploratoryEngineering/data-mapper-chain.svg?branch=master)](https://travis-ci.org/ExploratoryEngineering/data-mapper-chain)
[![codecov](https://codecov.io/gh/ExploratoryEngineering/data-mapper-chain/branch/master/graph/badge.svg)](https://codecov.io/gh/ExploratoryEngineering/data-mapper-chain)

Simple data mapper library meant to be run in browser to ease data transformation for IoT devices in JS.

## Example: Simple in browser
```html
<body>
  ...
  <script src="https://cdn.jsdelivr.net/npm/@exploratoryengineering/data-mapper-chain@0.7"></script>
  <script>
    var myMapper = dmc.create()
      .chunk({ start: 2, size: 2})
      .hexToInt();

    console.log(myMapper.mapData("babe")); // Prints 190
  </script>
</body>
```

### Codepen example
Play around with this [Codepen pen](https://codepen.io/pkkummermo/pen/MLgVPO?editors=1010) for a real life example usage of 
the data-mapper-chain.

## Example: In ts
You must first install the dependency

```bash
npm i @exploratoryengineering/data-mapper-chain
``` 

### Using shorthand
```ts
import { DataMapperChain } from "@exploratoryengineering/data-mapper-chain";

// Create a chain and add mappers
const dataMapperChain = new DataMapperChain()
  .chunk({
    start: 50,
    size: 4,
  })
  .hexToInt();

// Raw data from device
const deviceData: string = `47eee3803e3a8c713f8daf7242fc6666423c28c04111d84000024b00a3030c261b010b91d3`;

// Run mapper
dataMapperChain.mapData(deviceData); // prints 587

``` 


### Instanciating mappers directly
```ts

import { DataMapperChain, Mappers } from "@exploratoryengineering/data-mapper-chain";

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

// Raw data from device
const deviceData: string = `47eee3803e3a8c713f8daf7242fc6666423c28c04111d84000024b00a3030c261b010b91d3`;

// Run mapper
dataMapperChain.mapData(deviceData); // prints 587


```

## Available mappers

All mappers have fully optional configurations, meaning if no configuration is provided it will fallback to sane defaults. It also supports partly providing parameters if you want to just override one option of the mapper.

### Base64

Supports encoding and decoding of base64 input.

[Configuration](./tutorials/base64-tutorial.md)

### Chunk

Take a chunk of the input and return it.

[Configuration](./tutorials/chunk-tutorial.md)

### FromJSON

Traverse a JSON struct and return value.

[Configuration](./tutorials/fromJson-tutorial.md)

### HexToFloat

Take a hex input and convert it to a float.

[Configuration](./tutorials/hexToFloat-tutorial.md)

### HexToInt

Take a hex input and convert it to an int.

[Configuration](./tutorials/hexToInt-tutorial.md)


### Offset

Take an input and offset it by a positive or negative value.

[Configuration](./tutorials/offset-tutorial.md)

## History

### What
The main workhorse is the `DataMapperChain` which serves a couple of purposes. It contains the different mappers you want to use in your "chain" of mappers and has functions to apply all mappers on a data set. It also allows for serializing configuration of both the chain and the added mappers. This serialized version can again be loaded directly into a new `DataMapperChain` which is now fully configured with the saved params. 

### Why
I found myself fiddling with a lot of IoT data recently and a need to graph it easily. The libs which which I found either relied heavily on `eval` or didn't have any typings. I put together this lib which is modular and pluggable and hopefully solves someones problem alongside mine.

### Pluggable
While the lib provide a decent amount of mappers as a starting point, I know I don't cover every use case out there.

### Tiny
The library relies mostly on native functions meaning it shouldn't get too big. More complex mappers should be application specific and be a part of the application which imports the library.
