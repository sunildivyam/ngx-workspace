# how to create a Library project?

## Steps:

From ngx-workspace root folder, run

- Create new angular Library project
  - `ng generate` `[new-lib-name]`
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
- Create new Github repository for your library
  - Run `git init` in the root folder of your lib `./projects/[new-lib-name]`
  - From your Github desktop or command line or from any other git tool, Add and publish newly created lib git repository to remote github.
  - Commit and publish Initial changes to github main/master branch.
- Add newly created lib project as a Git submodule to the workspace project
  - `git submodule add <https://github.com/sunildivyam/[new-lib-name].git> ./projects/[new-lib-name]`
