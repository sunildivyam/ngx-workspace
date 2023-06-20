const path = require('path');
const {
    COMPANY_NAME,
    MODULE_FILES,
    DIST_FOLDER_NAME,
    NG_PACKAGE_SCHEMA,
    GENERIC_LIB_MODULE_NAME,
} = require('./configs/shared.config');
const { packageJson } = require('./configs/package.json');
const { ngPackageJson } = require('./configs/ng-package.json');
const { readme } = require('./configs/readme.md');

const getPackageJson = (libName, moduleName) => {
    const pkgName = `${COMPANY_NAME}/${libName}/${moduleName}`;
    const repoHome = `https://github.com/sunildivyam/${libName}`;

    const pkg = {
        ...packageJson,
        name: pkgName,
        description: `Angular ${pkgName} components library module`,
        homepage: repoHome,
        bugs: `${repoHome}/issues`,
        repository: {
            type: 'git',
            url: `${repoHome}.git`
        },
    };

    return JSON.stringify(pkg, null, '\t');
}

const getNgPackageJson = (parentPath, libName, moduleName) => {
    const ngPkg = {
        ...ngPackageJson,
        $schema: path.join(parentPath, NG_PACKAGE_SCHEMA).replaceAll('\\', '/'),
        dest: path.join(parentPath, DIST_FOLDER_NAME, libName).replaceAll('\\', '/'),
    };

    return JSON.stringify(ngPkg, null, '\t');
}

const getReadme = (parentPath, libName, moduleName) => {
    const pkgName = `${COMPANY_NAME}/${libName}/${moduleName}`;
    const readmeMd = readme.replaceAll(GENERIC_LIB_MODULE_NAME, pkgName);

    return readmeMd;
}

const getPublicApi = (parentPath, libName, moduleName) => {
    return `export * from '.';`;
}


const getIndex = (parentPath, libName, moduleName) => {
    return `export * from './public-api';`;
}


const getSrcIndex = (parentPath, libName, moduleName) => {
    return `export * from '.';`;
}


const getFileData = (parentPath, libName, moduleName, moduleFile) => {
    let fileData = '';

    switch (moduleFile) {
        case MODULE_FILES.PACKAGE_JSON:
            fileData = getPackageJson(libName, moduleName);
        break;
        case MODULE_FILES.NG_PACKAGE_JSON:
            fileData = getNgPackageJson(parentPath, libName, moduleName);
            break;
        case MODULE_FILES.README:
            fileData = getReadme(parentPath, libName, moduleName);
            break;
        case MODULE_FILES.PUBLIC_API_TS:
            fileData = getPublicApi(parentPath, libName, moduleName);
            break;
        case MODULE_FILES.SRC_INDEX_TS:
            fileData = getSrcIndex(parentPath, libName, moduleName);
            break;
        case MODULE_FILES.INDEX_TS:
            fileData = getIndex(parentPath, libName, moduleName);
            break;
        default:
    }

    return fileData;

}

module.exports = {
    getFileData,
    getPackageJson,
    getNgPackageJson,
    getPublicApi,
    getIndex,
    getSrcIndex,
    getReadme,
};
