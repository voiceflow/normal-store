Normal Store
=========================

[![npm version](https://img.shields.io/npm/v/normal-store.svg?style=flat-square)](https://www.npmjs.com/package/normal-store)
[![npm downloads](https://img.shields.io/npm/dm/normal-store.svg?style=flat-square)](https://www.npmjs.com/package/normal-store)

Utilities to transform data with unique identifiers to and from a normalized data store.
All data is treated as immutable, new data structures are returned when updating.

## Why?

Often when dealing with data in a single-page-application (SPA) it is useful to represent collections of resources in a way that is both easy to query and to update.

With `normal-store` you can convert the resources served by your backend into a format similar to an indexed database.

```ts
const resources = [{ id: 'a' }, { id: 'b' }];

const normalized = normalize(resources); // { allKeys: ['a', 'b'], byKey: { a: { id: 'a' }, b: { id: 'b' } }}

const denormalized = denormalize(normalized); // [{ id: 'a' }, { id: 'b' }]
```

## Example

```ts
import axios from 'axios';
import { normalize, getOne, patchOne, removeOne } from 'normal-store';

const products = await axios.get('/products').then(res => res.data);

let productStore = normalize(products);

const decrementStock = (productID) => {
  productStore = patchOne(productStore, productID, ({ stock }) => ({ stock: stock - 1 }));
};

const removeProduct = (productID) => {
  productStore = removeOne(productStore, productID);
};
```

## Installation

To use `normal-store`, install it as a dependency:

```bash
# If you use npm:
npm install normal-store

# Or if you use Yarn:
yarn add normal-store
```

This assumes that you’re using a package manager such as [npm](http://npmjs.com/).

## License

[ISC](LICENSE.md)
