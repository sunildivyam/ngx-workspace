# How to create library project?

## Steps:

From ngx-workspace root folder, run

- Create new angular Library project, run `ng` or `npm` as given below:
  - `ng generate library` `[new-lib-name] --prefix=anu`
  - Or `npm run ng:add:lib [lib-name]`
  - Edit to prefix package name with `@annuadvent/` in `projects/[new-lib-name]/package.json` file.
  - Edit paths to prefix lib path name with `@annuadvent/` for the new lib in workspace root `./tsconfig.json`
  - Add/update additional inoformation to the new lib's `package.json`
    ```
    "license": "MIT",
    "description": "Angular components library",
    "homepage": "https://github.com/sunildivyam/[new-lib-name]",
    "bugs": "https://github.com/sunildivyam/[new-lib-name]/issues",
    "repository": {
    "type": "git",
    "url": "https://github.com/sunildivyam/[new-lib-name].git"
    },
    "engines": {
    "node": "18.16.0",
    "npm": "9.5.1"
    },
    ```
- `DELETE` the `./src` folder and its content, if you do not want to expose/export directly from Lib.
- add an public-api.ts file in the lib root and add an export to it

  - `export const LIB_NAME = "[lib-name]";`
  - This is needed as an import is needed at lib level, by ng-packager.
  - Edit the entryPoint in ng-package.json accordingly.
    ```
    "entryFile": "public-api.ts",
    "cssUrl": "inline"
    ```

  - Edit the `angular.json` too
    `"sourceRoot": "projects/[lib-name]",`
  - Edit `angular.json`, and add schematics for `scss` styles:

    ```
    "schematics": {
        "@schematics/angular:component": {
          "style": "scss"
        }
      },

    ```
- Update `ngx-workspace/package.json` with `npm` scripts to `build` and `deploy` library
  ```
  "/**[lib-name]": "*********[lib-name]******************",
  "build:[lib-name]": "ng build [lib-name]",
  "watch:[lib-name]": "ng build [lib-name] --watch",
  "publish:[lib-name]": "npm run build:[lib-name] && cd dist/[lib-name] && npm publish --access public",
  ```
  Example:
  ```
  "/**ngx-common-ui": "*********ngx-common-ui******************",
  "build:ngx-common-ui": "ng build ngx-common-ui",
  "watch:ngx-common-ui": "ng build ngx-common-ui --watch",
  "publish:ngx-common-ui": "npm run build:ngx-common-ui && cd dist/ngx-common-ui && npm publish --access public",
  ```
- Create new Github repository for your library
  - Run `git init` in the root folder of your lib `./projects/[new-lib-name]`
  - From your Github desktop or command line or from any other git tool, Add and publish newly created lib git repository to remote github.
  - Commit and publish Initial changes to github main/master branch.
- Add newly created lib project as a Git submodule to the workspace project
  - `git submodule add <https://github.com/sunildivyam/[new-lib-name].git> ./projects/[new-lib-name]`
