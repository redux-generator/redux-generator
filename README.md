## redux-template-generator

Simple way to initialize redux code in your project. 

This Package: 

- Generates all redux flow
- Generates tests (according to [official documentation](https://redux.js.org/recipes/writing-tests))
- Generates redux-saga code flow (optional)
- Generates entity code for redux
- All files can be generated with `.ts` or `.js` extension (`js` is default)


## Installation

```sh
# install globally (for some cases you will need to add sudo before the command)
npm install --global redux-template-generator

# or locally
npm install redux-template-generator
```

## Usage

If you install this package locally you will need to add a new script to `scripts` field in `package.json`

```json
{
  "scripts": {
    "gen-redux": "node_modules/.bin/gen-redux"
  }
}
```

### To initialize redux, in root directory of your project, run:

<details>
    <summary>For plain JavaScript</summary>

```sh
# globally
gen-redux init-redux
# locally
npm run gen-redux init-redux
```

It will generate (redux-saga is optional):

```sh
store folder name /
  ├─ authenticate /
  │  ├─ actions.js
  │  ├─ action.test.js
  │  ├─ api.js
  │  ├─ reducer.js
  │  ├─ reducer.test.js
  │  ├─ types.js
  │  └─ saga.js
  ├─ index.js
  ├─ global-reducer.js
  ├─ saga.js
  └─ initial-store.js
```
</details>


<details>
    <summary>Or with Typescript</summary>

```sh
# globally
gen-redux init-redux --ts or gen-redux init-redux --typescript
# locally
npm run gen-redux init-redux -- --ts or npm run gen-redux init-redux -- --typescript
```

It will generate (redux-saga is optional):

```sh
store folder name /
  ├─ authenticate /
  │  ├─ actions.ts
  │  ├─ action.test.ts
  │  ├─ api.ts
  │  ├─ reducer.ts
  │  ├─ reducer.test.ts
  │  ├─ model.ts
  │  ├─ types.ts
  │  └─ saga.ts
  ├─ index.ts
  ├─ global-reducer.ts
  ├─ model.ts
  ├─ saga.ts
  └─ initial-store.ts
```
</details>


Then simply connect `authenticate/reducer` to `global-reducer`, and connect store itself to the `Provider`.


### To initialize some entity, in root directory of your project, run:

<details>
    <summary>For plain JavaScript</summary>

```sh
# globally
gen-redux init-entity
# locally
npm run gen-redux init-entity
```

It will generate (redux-saga is optional):

```sh
folder name /
  ├─ actions.js
  ├─ action.test.js
  ├─ api.js
  ├─ reducer.js
  ├─ reducer.test.js
  ├─ types.js
  └─ saga.js
```
</details>


<details>
    <summary>Or with Typescript</summary>

```sh
# globally
gen-redux init-entity --ts or gen-redux init-entity --typescript
# locally
npm run gen-redux init-entity -- --ts or npm run gen-redux init-entity -- --typescript
```

It will generate (redux-saga is optional):

```sh
folder name /
  ├─ actions.ts
  ├─ action.test.ts
  ├─ api.ts
  ├─ reducer.ts
  ├─ reducer.test.ts
  ├─ types.ts
  ├─ model.ts
  └─ saga.ts
```
</details>


Then simply connect your new `reducer` to `global-reducer`, and connect saga if it exists.


## Contribute

1. Fork it: `git clone https://github.com/redux-generator/redux-generator.git`
2. Create your feature branch: `git checkout -b feature/my-new-feature`
3. Commit your changes: `git commit -am 'Added some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D
