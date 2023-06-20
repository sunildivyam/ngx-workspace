const GENERIC_LIB_MODULE_NAME = 'GenericLibName';
const NODE_VERSION = '18.16.0';
const NPM_VERSION = '9.5.1';
const NG_PACKAGE_SCHEMA = '/node_modules/ng-packagr/ng-package.schema.json';
const COMPANY_NAME = '@annuadvent';
const DIST_FOLDER_NAME = 'dist';

const MODULE_FILES = {
    PACKAGE_JSON:'package.json',
    NG_PACKAGE_JSON:'ng-package.json',
    INDEX_TS:'index.ts',
    PUBLIC_API_TS:'public-api.ts',
    SRC_INDEX_TS: './src/index.ts',
    README: 'readme.md',
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
}
