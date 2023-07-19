# How to create SSR application project?

## Steps:

From ngx-workspace root folder, run

- Create new angular Library project, run `ng` or `npm` as given below:
  - `ng generate application --prefix=app --style=scss --routing=true [app-name]`
  - Or `npm run ng:add:app [app-name]`

- Add SSR to `[new-app-project]`, there are two ways to do that:
  1) Copy contents of already ssr initialized `ngx-ssr-app` folder to newly created app folder `[new-app-name]`
      - Edit `package.json`
          - Change package name to `[@annuadvent/new-app-name]`;
  2) Or, For a fresh ssr app, run:
      - `ng add @nguniversal/express-engine --project [new-app-name]`
      - Or, `npm run ng:add:app:ssr []new-app-name]`
      - Run `npm init` from the [new-app=name] root folder.
- Add npm scripts in the `package.json` for the `[new-app-name]`, this makes easier to build/run/deploy app:
  - Copy all scripts of `ngx-ssr-app`, and replace `ngx-ssr-app` instances with your `[new-app-name]`.
  - All scripts should look like below:
    ```
    scripts: {
      "/**ngx-ssr-app": "*********ngx-ssr-app******************",
      "test:ngx-ssr-app": "ng test",
      "start/**ngx-ssr-app": "------------------------------------",
      "start:ngx-ssr-app:development": "ng serve --configuration development --project ngx-ssr-app",
      "start:ngx-ssr-app:staging": "ng serve --configuration staging --project ngx-ssr-app",
      "start:ngx-ssr-app:production": "ng serve --configuration production --project ngx-ssr-app",
      "build/**ngx-ssr-app": "------------------------------------",
      "build:ngx-ssr-app:development": "ng build --configuration development --project ngx-ssr-app",
      "build:ngx-ssr-app:staging": "ng build --configuration staging --project ngx-ssr-app",
      "build:ngx-ssr-app:production": "ng build --configuration production --project ngx-ssr-app",
      "watch/**ngx-ssr-app": "------------------------------------",
      "watch:ngx-ssr-app:development": "ng build --configuration development --watch --project ngx-ssr-app",
      "watch:ngx-ssr-app:staging": "ng build --configuration staging --watch --project ngx-ssr-app",
      "watch:ngx-ssr-app:production": "ng build --configuration production --watch --project ngx-ssr-app",
      "dev:ssr/**ngx-ssr-app": "------------------------------------",
      "dev:ssr:ngx-ssr-app:development": "ng run ngx-ssr-app:serve-ssr:development",
      "dev:ssr:ngx-ssr-app:staging": "ng run ngx-ssr-app:serve-ssr:staging",
      "dev:ssr:ngx-ssr-app:production": "ng run ngx-ssr-app:serve-ssr:production",
      "build:ssr/**ngx-ssr-app": "------------------------------------",
      "build:ssr:ngx-ssr-app:development": "npm run build:ngx-ssr-app:development && ng run ngx-ssr-app:server:development",
      "build:ssr:ngx-ssr-app:staging": "npm run build:ngx-ssr-app:staging && ng run ngx-ssr-app:server:staging",
      "build:ssr:ngx-ssr-app:production": "npm run build:ngx-ssr-app:production && ng run ngx-ssr-app:server:production",
      "serve:ssr/**ngx-ssr-app": "------------------------------------",
      "serve:ssr:ngx-ssr-app:development": "npm run build:ssr:ngx-ssr-app:development && node dist/ngx-ssr-app/server/main.js",
      "serve:ssr:ngx-ssr-app:staging": "npm run build:ssr:ngx-ssr-app:staging && node dist/ngx-ssr-app/server/main.js",
      "serve:ssr:ngx-ssr-app:production": "npm run build:ssr:ngx-ssr-app:production && node dist/ngx-ssr-app/server/main.js",
      "prerender/**ngx-ssr-app": "------------------------------------",
      "prerender:ngx-ssr-app:development": "ng run ngx-ssr-app:prerender:development",
      "prerender:ngx-ssr-app:staging": "ng run ngx-ssr-app:prerender:staging",
      "prerender:ngx-ssr-app:production": "ng run ngx-ssr-app:prerender:production",
      "firebase:build/**ngx-ssr-app": "------------------------------------",
      "firebase:copy:build:ngx-ssr-app": "del-cli --force projects/ngx-ssr-app/firebase-setup/functions/dist/ngx-ssr-app && cpy dist/ngx-ssr-app projects/ngx-ssr-app/firebase-setup/functions",
      "firebase:build:ngx-ssr-app:development": "npm run build:ssr:ngx-ssr-app:development && npm run firebase:copy:build:ngx-ssr-app",
      "firebase:build:ngx-ssr-app:staging": "npm run build:ssr:ngx-ssr-app:staging && npm run firebase:copy:build:ngx-ssr-app",
      "firebase:build:ngx-ssr-app:production": "npm run build:ssr:ngx-ssr-app:production && npm run firebase:copy:build:ngx-ssr-app",
      "firebase:serve/**ngx-ssr-app": "------------------------------------",
      "firebase:serve:ngx-ssr-app:development": "npm run firebase:build:ngx-ssr-app:development && cd projects/ngx-ssr-app/firebase-setup && firebase use staging && firebase serve",
      "firebase:serve:ngx-ssr-app:staging": "npm run firebase:build:ngx-ssr-app:staging && cd projects/ngx-ssr-app/firebase-setup && firebase use staging && firebase serve",
      "firebase:serve:ngx-ssr-app:production": "npm run firebase:build:ngx-ssr-app:production && cd projects/ngx-ssr-app/firebase-setup && firebase use production && firebase serve",
      "firebase:deploy/**ngx-ssr-app": "------------------------------------",
      "firebase:deploy:ngx-ssr-app:staging": "npm run firebase:build:ngx-ssr-app:staging && cd projects/ngx-ssr-app/firebase-setup && firebase deploy --except hosting -P staging",
      "firebase:deploy:ngx-ssr-app:production": "npm run firebase:build:ngx-ssr-app:production && cd projects/ngx-ssr-app/firebase-setup && firebase deploy --except hosting -P production",
      "firebase:deploy:hosting:ngx-ssr-app:staging": "cd projects/ngx-ssr-app/firebase-setup && firebase deploy --only hosting:staging -P staging",
      "firebase:deploy:hosting:ngx-ssr-app:production": "cd projects/ngx-ssr-app/firebase-setup && firebase deploy --only hosting:production -P production",
      "firebase:list:indexes/**ngx-ssr-app": "------------------------------------",
      "firebase:list:indexes:ngx-ssr-app:staging": "cd projects/ngx-ssr-app/firebase-setup && firebase firestore:indexes -P staging",
      "firebase:list:indexes:ngx-ssr-app:production": "cd projects/ngx-ssr-app/firebase-setup && firebase firestore:indexes -P production"
      }
    ```
- Update `angular.json`:
  - Copy project config of `ngx-ssr-app` to `[new-app-name]`, and replace all instances of `ngx-ssr-app` with `[new-app-name]`.
    - This adds all configs for development, staging, and production.
    - This should look like below:
      ```
        "ngx-ssr-app": {
        "projectType": "application",
        "schematics": {
          "@schematics/angular:component": {
            "style": "scss"
          }
        },
        "root": "projects/ngx-ssr-app",
        "sourceRoot": "projects/ngx-ssr-app/src",
        "prefix": "app",
        "architect": {
          "build": {
            "builder": "@angular-devkit/build-angular:browser",
            "options": {
              "outputPath": "dist/ngx-ssr-app/browser",
              "index": "projects/ngx-ssr-app/src/index.html",
              "main": "projects/ngx-ssr-app/src/main.ts",
              "polyfills": [
                "zone.js"
              ],
              "tsConfig": "projects/ngx-ssr-app/tsconfig.app.json",
              "inlineStyleLanguage": "scss",
              "assets": [
                "projects/ngx-ssr-app/src/favicon.ico",
                "projects/ngx-ssr-app/src/assets"
              ],
              "styles": [
                "projects/ngx-ssr-app/src/styles.scss"
              ],
              "scripts": []
            },
            "configurations": {
              "production": {
                "budgets": [
                  {
                    "type": "initial",
                    "maximumWarning": "500kb",
                    "maximumError": "1mb"
                  },
                  {
                    "type": "anyComponentStyle",
                    "maximumWarning": "2kb",
                    "maximumError": "4kb"
                  }
                ],
                "fileReplacements": [
                  {
                    "replace": "projects/ngx-ssr-app/src/environments/environment.ts",
                    "with": "projects/ngx-ssr-app/src/environments/environment.prod.ts"
                  }
                ],
                "outputHashing": "all"
              },
              "staging": {
                "budgets": [
                  {
                    "type": "initial",
                    "maximumWarning": "500kb",
                    "maximumError": "1mb"
                  },
                  {
                    "type": "anyComponentStyle",
                    "maximumWarning": "2kb",
                    "maximumError": "4kb"
                  }
                ],
                "fileReplacements": [
                  {
                    "replace": "projects/ngx-ssr-app/src/environments/environment.ts",
                    "with": "projects/ngx-ssr-app/src/environments/environment.staging.ts"
                  }
                ],
                "outputHashing": "all"
              },
              "development": {
                "buildOptimizer": false,
                "optimization": false,
                "vendorChunk": true,
                "extractLicenses": false,
                "sourceMap": true,
                "namedChunks": true
              }
            },
            "defaultConfiguration": "production"
          },
          "serve": {
            "builder": "@angular-devkit/build-angular:dev-server",
            "configurations": {
              "production": {
                "browserTarget": "ngx-ssr-app:build:production"
              },
              "staging": {
                "browserTarget": "ngx-ssr-app:build:staging"
              },
              "development": {
                "browserTarget": "ngx-ssr-app:build:development"
              }
            },
            "defaultConfiguration": "development"
          },
          "extract-i18n": {
            "builder": "@angular-devkit/build-angular:extract-i18n",
            "options": {
              "browserTarget": "ngx-ssr-app:build"
            }
          },
          "test": {
            "builder": "@angular-devkit/build-angular:karma",
            "options": {
              "polyfills": [
                "zone.js",
                "zone.js/testing"
              ],
              "tsConfig": "projects/ngx-ssr-app/tsconfig.spec.json",
              "inlineStyleLanguage": "scss",
              "assets": [
                "projects/ngx-ssr-app/src/favicon.ico",
                "projects/ngx-ssr-app/src/assets"
              ],
              "styles": [
                "projects/ngx-ssr-app/src/styles.scss"
              ],
              "scripts": []
            }
          },
          "server": {
            "builder": "@angular-devkit/build-angular:server",
            "options": {
              "outputPath": "dist/ngx-ssr-app/server",
              "main": "projects/ngx-ssr-app/server.ts",
              "tsConfig": "projects/ngx-ssr-app/tsconfig.server.json",
              "inlineStyleLanguage": "scss"
            },
            "configurations": {
              "production": {
                "outputHashing": "media"
              },
              "staging": {
                "outputHashing": "media"
              },
              "development": {
                "buildOptimizer": false,
                "optimization": false,
                "sourceMap": true,
                "extractLicenses": false,
                "vendorChunk": true
              }
            },
            "defaultConfiguration": "production"
          },
          "serve-ssr": {
            "builder": "@nguniversal/builders:ssr-dev-server",
            "configurations": {
              "development": {
                "browserTarget": "ngx-ssr-app:build:development",
                "serverTarget": "ngx-ssr-app:server:development"
              },
              "staging": {
                "browserTarget": "ngx-ssr-app:build:staging",
                "serverTarget": "ngx-ssr-app:server:staging"
              },
              "production": {
                "browserTarget": "ngx-ssr-app:build:production",
                "serverTarget": "ngx-ssr-app:server:production"
              }
            },
            "defaultConfiguration": "development"
          },
          "prerender": {
            "builder": "@nguniversal/builders:prerender",
            "options": {
              "routes": [
                "/"
              ]
            },
            "configurations": {
              "production": {
                "browserTarget": "ngx-ssr-app:build:production",
                "serverTarget": "ngx-ssr-app:server:production"
              },
              "staging": {
                "browserTarget": "ngx-ssr-app:build:staging",
                "serverTarget": "ngx-ssr-app:server:staging"
              },
              "development": {
                "browserTarget": "ngx-ssr-app:build:development",
                "serverTarget": "ngx-ssr-app:server:development"
              }
            },
            "defaultConfiguration": "production"
          }
        }
      }
      ```
- Create new Github repository for your application
  - Run `git init` in the root folder of your lib `./projects/[new-app-name]`
  - From your Github desktop or command line or from any other git tool, Add and publish newly created lib git repository to remote github.
  - Commit and publish Initial changes to github main/master branch.
- Add newly created app project as a Git submodule to the workspace project
  - `git submodule add <https://github.com/sunildivyam/[new-app-name].git> ./projects/[new-app-name]`
- Firebase setup
  - `firebase-setup` folder has firebase setup already initialized, with `staging` and `production` projects.
  - Replace firebase project names with your own firebase projects, as needed.
  - Update/remove/add configurations as per your requirements.
  - To work with firebase npm scripts and command line, you need to install `firebase-tools` gobally.
    `npm i firebase-tools -g`
  - login to firebase from command line, `firebase login`
