# nextup-platforms

This library was generated with [Nx](https://nx.dev).

## Installing

```bash
pnpm i nextup-platforms
```
or 
```bash
npm i nextup-platforms
```

## Plugin Usage

### Feature

Scaffolds sub feature into `src/features` directory

```bash
npx nx generate nextup-platforms:feature [name] [options,...]
```
or 
```bash
npx nx g feature [name] [options,...]
```

```
nx generate nextup-platforms:feature [name] [options,...]

From:  nextup-platforms (v0.1.1)
Name:  feature

Options:
    --name              Name for the feature                         [string]
    --api, -a           Api related files (eg: getUsers, postSearch) [array]
    --components, -c    Components to create                         [array]
    --hooks, -h         React Hooks (eg: windowSize)                 [array]
    --stores, -s        Store files for persistence (eg: authModal,  [array]
                        playlist)
    --types, -t         Types to create                              [array]
    --utils, -u         Utility methods to create                    [array]

*Note*
    array options a comma separated
```

## Building

Run `nx build nextup-platforms` to build the library.

## Running unit tests

Run `nx test nextup-platforms` to execute the unit tests via [Jest](https://jestjs.io).
