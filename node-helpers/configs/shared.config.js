const GENERIC_LIB_MODULE_NAME = 'GenericLibName';
const GITHUB_ACCOUNT = 'https://github.com/sunildivyam';
const NODE_VERSION = '18.16.0';
const NPM_VERSION = '9.5.1';
const NG_PACKAGE_SCHEMA = '/node_modules/ng-packagr/ng-package.schema.json';
const COMPANY_NAME = '@annuadvent';
const DIST_FOLDER_NAME = 'dist';
const NGX_MODULE_NAME_TOKEN = 'NgxModule';

const MODULE_FILES = {
    PACKAGE_JSON: 'package.json',
    NG_PACKAGE_JSON: 'ng-package.json',
    PUBLIC_API_TS: 'public-api.ts',
    INDEX_TS: 'index.ts',
    README: 'readme.md',
    NGX_MODULE: `./src/${NGX_MODULE_NAME_TOKEN}.module.ts`
}

const ANGULAR_ASSETS = {
    COMPONENT: { id: 'component', folderName: 'components' },
    SERVICE: { id: 'service', folderName: 'services' },
    DIRECTIVE: { id: 'directive', folderName: 'directives' },
    PIPE: { id: 'pipe', folderName: 'pipes' },
    INTERFACE: { id: 'interface', folderName: 'interfaces' },
    CLASS: { id: 'class', folderName: 'classes' },
    RESOLVER: { id: 'resolver', folderName: 'resolvers' },
    CONSTANTS: { id: 'constants', folderName: 'constants' },
    ENUMS: { id: 'enums', folderName: 'enums' },
}

module.exports =
{
    GENERIC_LIB_MODULE_NAME,
    NODE_VERSION,
    NPM_VERSION,
    NG_PACKAGE_SCHEMA,
    COMPANY_NAME,
    DIST_FOLDER_NAME,
    MODULE_FILES,
    NGX_MODULE_NAME_TOKEN,
    GITHUB_ACCOUNT,
    ANGULAR_ASSETS,
}
