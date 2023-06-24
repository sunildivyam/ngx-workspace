# How to create SSR application project?

## Steps:

From ngx-workspace root folder, run

- Create new angular Library project, run `ng` or `npm` as given below:
  - `ng generate application --prefix=app --style=scss --routing=true [app-name]`
  - Or `npm run ng:add:app [app-name]`
- Create new Github repository for your application
  - Run `git init` in the root folder of your lib `./projects/[new-app-name]`
  - From your Github desktop or command line or from any other git tool, Add and publish newly created lib git repository to remote github.
  - Commit and publish Initial changes to github main/master branch.
- Add newly created app project as a Git submodule to the workspace project
  - `git submodule add <https://github.com/sunildivyam/[new-app-name].git> ./projects/[new-app-name]`
- Copy contents of `ngx-ssr-app` folder to newly created app folder `[new-app-name]`
    - Edit `package.json`
        - Change package name to `[@annuadvent/new-app-name]`;
