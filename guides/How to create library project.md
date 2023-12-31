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
    "cssUrl": "inline",
    "styleIncludePaths": [
      "./scss"
    ]
    ```
  - If `[lib-name]` uses any existing or external library's `SCSS` styles, then thier `scss` source folder path has to be added in the `[lib-name/ng-package.json]` file's `styleIncludePaths` for both `dist` and `node_modules` folders:
    ```
    "styleIncludePaths": [
      "../../dist/ngx-common-ui/scss",
      "../../node_modules/ngx-common-ui/scss"
    ]
    ```
    **Note:**: ***This has to be included in all `[lib-name]/[module-name]/ng-package.json` files of each module that imports those styles.***

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
- If your library uses another library from the workspace, then Add following to the `[lib-name/tsConfig.json]` files's `paths` array (**Why this is needed?**, see **More Info** section below):
  ```
  "paths": {
    "@annuadvent/[existing-lib-name]": [
      "dist/[existing-lib-name]"
    ],
    "@annuadvent/[existing-lib-name]/*": [
      "dist/[existing-lib-name]/*"
    ]
  }
  ```

  **Example:**
  ```
  "paths": {
    "@annuadvent/ngx-common-ui": [
      "dist/ngx-common-ui"
    ],
    "@annuadvent/ngx-common-ui/*": [
      "dist/ngx-common-ui/*"
    ],
    "@annuadvent/ngx-core": [
      "dist/ngx-core"
    ],
    "@annuadvent/ngx-core/*": [
      "dist/ngx-core/*"
    ]
  }
  ```
  **More Info**
    - All library project must have their own path defined in `tsconfig.lib.json` for all other libraries used in it, from `dist` folder.
    - Workspace root tsconfig.json should have paths `projects/[lib-name]` while `[lib-name]/tsconfig.lib.json` should have paths `dist/[lib-name]`.
    - This is to avoid below **ERROR**:
    `.ngtypecheck.ts' is not under 'rootDir'. 'rootDir' is expected to contain all source files`

- Create new Github repository for your library
  - Run `git init` in the root folder of your lib `./projects/[new-lib-name]`
  - From your Github desktop or command line or from any other git tool, Add and publish newly created lib git repository to remote github.
  - Commit and publish Initial changes to github main/master branch.
- Add newly created lib project as a Git submodule to the workspace project
  - `git submodule add https://github.com/sunildivyam/[new-lib-name].git ./projects/[new-lib-name]`
- Add `projects/[lib-name]/tsconfig.doc.json` file to the root of the lib for generating documentation json or site:
  ```
  {
      "include": [
          "./**/*.ts"
      ],
      "exclude": [
          "./**/*.spec.ts"
      ]
  }

  ```
