## redux-template-generator

Simple way for init redux code in your project. Includes redux-saga (optional).

This package will generated all redux flow with typescript.

## Installation

```sh
# install globally
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

For init redux, in root directory of your project, run:

```sh
# globally
gen-redux init-redux
# locally
npm run gen-redux init-redux
```

It will generate (redux-saga is optional):

```sh
  src -
     |- /store folder name / -
        |- authenticate
            - actions.ts
            - model.ts
            - reducer.ts
            - types.ts
        - index.ts
        - global-reducer.ts
        - model.ts
        - initial-store.ts
     |- /saga folder name / -
        |- authenticate
            - index.ts
        - index.ts
```

For init some entity, in root directory of your project, run:

```sh
# globally
gen-redux init-entity
# locally
npm run gen-redux init-entity
```

It will generate (redux-saga is optional):

```sh
  src -
     |- /store folder name / -
        |- /entity / -
            - actions.ts
            - model.ts
            - reducer.ts
            - types.ts
     |- /saga folder name / -
        |- /entity / -
            - index.ts
```

## Contribute

1. Fork it: `git clone https://github.com/redux-generator/redux-generator.git`
2. Create your feature branch: `git checkout -b feature/my-new-feature`
3. Commit your changes: `git commit -am 'Added some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D
