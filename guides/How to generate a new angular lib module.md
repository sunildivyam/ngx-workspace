# How to generate a new angular lib module?

## Steps

1. Generates module folder in the path specified and all needed files.

   - package.json
   - ng-package.json
   - readme.md
   - index.ts
   - public-api.ts
   - src/[module-name].module.ts
   - syntax:

     `npm run nh:add:module projects/[lib-name]/[module-name]`

   - Example:

     `npm run nh:add:module projects/ngx-common-ui/anu-article`

2. Keep generating all other angular assets like componets, pipes, services etc. using ng commands.

   - syntax:

     `ng g c [module-name] --path=projects/[lib-name]/[module-name]/src --project=[lib-name] --module=[module-name].module`

   - Example:

     `ng g c anu-article --path=projects/ngx-common-ui/anu-article/src --project=ngx-common-ui --module=anu-article.module`
