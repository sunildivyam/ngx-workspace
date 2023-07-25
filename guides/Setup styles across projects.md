# Setup styles across projects

Using styles/stylesheets (scss) files across library projects or consumer application is little complicated, specially working locally as well as for builds. Here I tried to make the process simple and easier.

## Packaging strategy for libray stylesheets(scss)

- Tell ng-packager to copy your .scss files to the build package as assets.
    - In the library root `ng-package.json`, export scss files as assets.

        **Example:**
        ```
        "assets": [
            "scss/_mixins.scss",
            "scss/_colors.scss",
            "scss/_annu-ng-lib-theme.scss",
            "scss/normalize.scss"
        ],
        "lib": {  }
        ```
- Add **secondary endpoints** for all exported scss files in the library's root `package.json` file.
    - This enables importing them using secondary endpoints:
    ```
    "exports": {
        "./scss": {
        "mixins.scss": "./scss/_mixins.scss",
        "_colors.scss": "./scss/_colors.scss",
        "_annu-ng-lib-theme.scss": "./scss/_annu-ng-lib-theme.scss",
        "normalize.scss": "./scss/normalize.scss"
        }
    },
    ```

## Importing _partial.scss files from the same library project

### Steps:

- Add the `styleIncludePaths` to `ng-package.json` of the module that imports the `_partial.scss` files. It takes the relative paths of the scss folders.
    ```
    "lib": {
        "entryFile": "./public-api.ts",
        "cssUrl": "inline",
        "styleIncludePaths": [
            "[relative/path-to-scss/folder]"
        ]
    }
    ```
  **Example:**

  `ngx-common-ui` library has all its `scss` files in `scss` module. So if `ngx-common-ui/side-nav` module imports `_mixins.scss`
    - Add `styleIncludePaths` to `ngx-common-ui/side-nav/ng-package.json` as given below:

        ```
        "lib": {
            "entryFile": "./public-api.ts",
            "cssUrl": "inline",
            "styleIncludePaths": [
                "../scss"
            ]
        }
        ```
    - Import `mixins.scss` in any of the` .scss` files of the `side-nav` module:
        ```
        @import 'mixins';
        ```

## Importing _partial.scss files from other library project

- Same as above, the only difference is give relative path of the `scss` source folder of the other libraries,  from both `node_modules` and `dist`
    ```
        "lib": {
            "entryFile": "./public-api.ts",
            "cssUrl": "inline",
            "styleIncludePaths": [
                "../../node_modules/ngx-common-ui/scss",
                "../../dist/ngx-common-ui/scss",
                "../../node_modules/some-lib"
            ]
        }
    ```
