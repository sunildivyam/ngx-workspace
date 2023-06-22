# how to migrate lib modules to this workspace

## Steps:

1. Create the desired library project if not created already. Follow steps given in here:
   - [how to create an angular workspace project to work with multiple library projects](<./how to create an angular workspace project to work with multiple library projects>)
2. Run following commands from root of the project:

   - Syntax:

     `npm run nh:migrate source/path/of/lib-modules target/path/of/lib-modules`

   - Example:

     `npm run nh:migrate ../annu-ng-lib/projects/annu-ng-lib/src/components/common-ui projects/ngx-common-ui`

3. Verify the migration mannually.
4. There would be some imports in your module's angular files that you need to correct mannually.
