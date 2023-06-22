const path = require('path');

const {
    COMPANY_NAME,
    MODULE_FILES,
    DIST_FOLDER_NAME,
    NG_PACKAGE_SCHEMA,
    GENERIC_LIB_MODULE_NAME,
    NGX_MODULE_NAME_TOKEN,
    GITHUB_ACCOUNT,
} = require('./configs/shared.config');

const {
    dashToCamel,
    relativeRoot
} = require('./utils.service');

const { packageJson } = require('./configs/package.json');
const { ngPackageJson } = require('./configs/ng-package.json');
const { readme } = require('./configs/readme.md');
const { ngxModule } = require('./configs/ngx-module');

const getModuleName = (moduleFullPath) => {
    return moduleFullPath.substring(moduleFullPath.lastIndexOf('/') + 1);
}

const getModuleClassName = (moduleFullPath) => {
    const moduleName = getModuleName(moduleFullPath);

    return `${dashToCamel(moduleName, true)}Module`
}

const getLibName = (moduleFullPath) => {
    const arr = moduleFullPath.split('/')
    return arr.length >= 2 && arr[1] || '';
}

const getPackageName = (moduleFullPath) => {
    const moduleName = getModuleName(moduleFullPath);
    const libName = getLibName(moduleFullPath);

    return `${COMPANY_NAME}/${libName}/${moduleName}`
};

const getPackageJson = (moduleFullPath) => {
    const moduleName = getModuleName(moduleFullPath);
    const libName = getLibName(moduleFullPath);
    const pkgName = getPackageName(moduleFullPath);
    const repoHome = `${GITHUB_ACCOUNT}/${libName}`;

    const pkg = {
        ...packageJson,
        name: moduleName,
        description: `Angular ${pkgName} components library module`,
        homepage: `${repoHome}/${moduleName}`,
        bugs: `${repoHome}/issues`,
        repository: {
            type: 'git',
            url: `${repoHome}.git`
        },
    };

    return JSON.stringify(pkg, null, '\t');
}

const getNgPackageJson = (moduleFullPath) => {
    const distPath = moduleFullPath.replace('projects', DIST_FOLDER_NAME)
    const relativeParentPath = relativeRoot(moduleFullPath);
    const ngPkg = {
        ...ngPackageJson,
        $schema: path.join(relativeParentPath, NG_PACKAGE_SCHEMA).replaceAll('\\', '/'),
        dest: path.join(relativeParentPath, distPath).replaceAll('\\', '/'),
    };

    return JSON.stringify(ngPkg, null, '\t');
}

const getReadme = (moduleFullPath) => {
    const pkgName = getPackageName(moduleFullPath);
    const readmeMd = readme.replaceAll(GENERIC_LIB_MODULE_NAME, pkgName);

    return readmeMd;
}

const getPublicApi = (moduleFullPath) => {
    const moduleName = getModuleName(moduleFullPath);
    return `
    // Export all exposable angular assets from ./src folder, like components, services, pipes, directives etc.
    export * from './src/${moduleName}.module';
    `;
}

const getIndex = () => {
    return `export * from './public-api';`;
}

const getNgxModule = (moduleFullPath) => {
    const ngxModuleClassName = getModuleClassName(moduleFullPath);
    const ngxModuleContent = ngxModule.replaceAll(NGX_MODULE_NAME_TOKEN, ngxModuleClassName);

    return ngxModuleContent;
}

const getFileFullPath = (moduleFullPath, moduleFile) => {
    const moduleName = getModuleName(moduleFullPath);

    switch (moduleFile) {
        case MODULE_FILES.NGX_MODULE:
            moduleFile = moduleFile.replace(NGX_MODULE_NAME_TOKEN, moduleName);
            break;
        default:
    }

    const filePath = path.resolve(path.join(moduleFullPath, moduleFile));

    return filePath;
}

const getFileData = (moduleFullPath, moduleFile) => {
    let fileData = '';

    switch (moduleFile) {
        case MODULE_FILES.PACKAGE_JSON:
            fileData = getPackageJson(moduleFullPath);
            break;
        case MODULE_FILES.NG_PACKAGE_JSON:
            fileData = getNgPackageJson(moduleFullPath);
            break;
        case MODULE_FILES.README:
            fileData = getReadme(moduleFullPath);
            break;
        case MODULE_FILES.PUBLIC_API_TS:
            fileData = getPublicApi(moduleFullPath);
            break;
        case MODULE_FILES.INDEX_TS:
            fileData = getIndex();
            break;
        case MODULE_FILES.NGX_MODULE:
            fileData = getNgxModule(moduleFullPath);
            break;
        default:
    }

    return fileData;

}

module.exports = {
    getModuleName,
    getModuleClassName,
    getLibName,
    getPackageName,
    getFileData,
    getFileFullPath,
    getPackageJson,
    getNgPackageJson,
    getPublicApi,
    getIndex,
    getReadme,
    getNgxModule,
};
