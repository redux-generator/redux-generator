## redux-template-generator

Simple way for init redux code in your project. 

Package includes: 

- Generation all redux flow
- Generation tests (according a [official documentation](https://redux.js.org/recipes/writing-tests))
- Generation redux-saga code flow (optional)
- Generation entity code for redux
- All files can be with `.ts` or `.js` extension (`js` is default)


## Installation

```sh
# install globally (for some cases need add sudo before command)
npm install --global redux-template-generator

# or locally
npm install redux-template-generator
```

## Usage

If you install package locally you need add new script to `scripts` field in `package.json`

```json
{
  "scripts": {
    "gen-redux": "node_modules/.bin/gen-redux"
  }
}
```

### For init redux, in root directory of your project, run:

<details>
    <summary>JavaScript only</summary>

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
    <summary>With Typescript</summary>

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


After just connect `authenticate/reducer` to `global-reducer`, and connect store itself to `Provider`.


### For init some entity, in root directory of your project, run:

<details>
    <summary>JavaScript only</summary>

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
  ├─ reducer.js
  ├─ reducer.test.js
  ├─ types.js
  └─ saga.js
```
</details>


<details>
    <summary>With Typescript</summary>

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
  ├─ reducer.ts
  ├─ reducer.test.ts
  ├─ types.ts
  ├─ model.ts
  └─ saga.ts
```
</details>


After just connect your new `reducer` to `global-reducer`, and connect saga if exist.


## Contribute

1. Fork it: `git clone https://github.com/redux-generator/redux-generator.git`
2. Create your feature branch: `git checkout -b feature/my-new-feature`
3. Commit your changes: `git commit -am 'Added some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D
