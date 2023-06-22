const { MODULE_FILES, ANGULAR_ASSETS } = require('./configs/shared.config');
const {
    listFilesAndFolders,
    copyFileSync,
    writeFileSync,
    appendFileSync,
} = require('./file.service');
const {
    getFileData,
    getFileFullPath,
} = require('./nodejs-helper.service');


const createLibModule = (moduleFullPath) => {
    if (!moduleFullPath) {
        console.error('ERROR: Module full path is not provided.');
        console.log('Syntax:', 'npm run nh:add:module path-from-root/module-name');
        console.log('Example:', 'npm run nh:add:module projects/ngx-common-ui/ngx-card');
        return;
    }

    console.log(moduleFullPath, '\n\tLibrary Module Folder strcuture creating...');

    Object.values(MODULE_FILES).forEach(file => {
        const filePath = getFileFullPath(moduleFullPath, file);

        const fileData = getFileData(moduleFullPath, file);
        writeFileSync(filePath, fileData);
    })

    console.log('\tDONE');
}

const isModuleRoot = (folder) => {
    return !!folder.files.filter(file => file.includes('.module.ts')).length;
}


const getLibModules = (libSrcFolder) => {
    const filesAndFolders = listFilesAndFolders(libSrcFolder, true);
    return filesAndFolders.folders;
    // writeFileSync('./guides/lib-files.json', JSON.stringify(filesAndFolders, null, '\t'));
}

const getTargetCopyPath = (file, targetFolder, parentSrcFolder) => {
    let targetFileFullPath = '';
    const fileSplits = file.split('.');
    const firstName = fileSplits.length >= 1 && fileSplits[0] || '';
    const fileType = fileSplits.length >= 2 && fileSplits[1] || '';

    if (file === 'docs.data.ts') {
        targetFileFullPath = `${targetFolder}/src/${ANGULAR_ASSETS.COMPONENT.folderName}/${parentSrcFolder}/${parentSrcFolder}.docs.ts`;
        return targetFileFullPath;
    }

    switch (fileType) {
        case ANGULAR_ASSETS.COMPONENT.id:
            // ./src/components/cmp-name/file
            targetFileFullPath = `${targetFolder}/src/${ANGULAR_ASSETS.COMPONENT.folderName}/${firstName}/${file}`;
            break;
        case ANGULAR_ASSETS.SERVICE.id:
            // ./src/services/file
            targetFileFullPath = `${targetFolder}/src/${ANGULAR_ASSETS.SERVICE.folderName}/${file}`;
            break;
        case ANGULAR_ASSETS.INTERFACE.id:
            // ./src/interfaces/file
            targetFileFullPath = `${targetFolder}/src/${ANGULAR_ASSETS.INTERFACE.folderName}/${file}`;
            break;
        case ANGULAR_ASSETS.CLASS.id:
            // ./src/classes/file
            targetFileFullPath = `${targetFolder}/src/${ANGULAR_ASSETS.CLASS.folderName}/${file}`;
            break;
        case ANGULAR_ASSETS.RESOLVER.id:
            // ./src/resolvers/file
            targetFileFullPath = `${targetFolder}/src/${ANGULAR_ASSETS.RESOLVER.folderName}/${file}`;
            break;
        case ANGULAR_ASSETS.PIPE.id:
            // ./src/pipes/file
            targetFileFullPath = `${targetFolder}/src/${ANGULAR_ASSETS.PIPE.folderName}/${file}`;
            break;
        case ANGULAR_ASSETS.DIRECTIVE.id:
            // ./src/directives/file
            targetFileFullPath = `${targetFolder}/src/${ANGULAR_ASSETS.DIRECTIVE.folderName}/${file}`;
            break;
        case ANGULAR_ASSETS.CONSTANTS.id:
            // ./src/contants/file
            targetFileFullPath = `${targetFolder}/src/${ANGULAR_ASSETS.CONSTANTS.folderName}/${file}`;
            break;
        default:
            // All other files should be co[ied to ./src folder
            targetFileFullPath = `${targetFolder}/src/${file}`;
    }

    return targetFileFullPath;
}

const isValidToAddToPublicApiTs = (file) => {
    const filesToExclude = ['.html', '.scss', '.css', '.spec.ts', '.docs.ts'];
    const isValid = filesToExclude.filter(token => file.lastIndexOf(token) > 0 ? true : false).length ? false : true;

    return isValid;
}

// Update/overwrite public-api.ts with new imports
const updatePublicApiTsExports = (publicApiImports, targetFolder, append = false) => {

    const updateFn = append ? appendFileSync : writeFileSync;
    updateFn(
        `${targetFolder}/${MODULE_FILES.PUBLIC_API_TS}`,
        publicApiImports.join('\n') + '\n');
}

const transformToLibFormat = (libFolders, targetLibFolder) => {

    libFolders.map(folder => {
        const targetFolder = `${targetLibFolder}/${folder.name}`;
        const publicApiImports = [];

        console.log(targetFolder, '\tMigrating...');

        if (isModuleRoot(folder)) {
            // Create and init module in targetLibFolder
            createLibModule(targetFolder);
            // Skip index.ts and public-api.ts files from copy, but update public-api.ts with all imports
            const filesToSkip = [MODULE_FILES.PUBLIC_API_TS, MODULE_FILES.INDEX_TS];
            const filesToModuleSrc = folder.files.filter(file => !filesToSkip.includes(file));

            // copy files to targetFolder/src
            filesToModuleSrc.forEach(file => {
                const srcPath = `${folder.fullPath}/${file}`;
                const targetPath = getTargetCopyPath(file, targetFolder, folder.name);
                isValidToAddToPublicApiTs(targetPath) && publicApiImports.push(`export * from '.${targetPath.substring(targetPath.lastIndexOf('/src/'), targetPath.lastIndexOf('.'))}';`);
                copyFileSync(srcPath, targetPath);
            });

            // Update/overwrite public-api.ts with new imports
            updatePublicApiTsExports(publicApiImports, targetFolder, false);
        } else {
            // means folder is a non-module folder (any of the components,services etc. folder), so just copy every thing.

            folder.files.forEach(file => {
                const srcPath = `${folder.fullPath}/${file}`;
                const targetPath = getTargetCopyPath(file, targetLibFolder, folder.name);
                isValidToAddToPublicApiTs(targetPath) && publicApiImports.push(`export * from '.${targetPath.substring(targetPath.lastIndexOf('/src/'), targetPath.lastIndexOf('.'))}';`);
                copyFileSync(srcPath, targetPath);
            });

            // Update public-api.ts with new imports
            updatePublicApiTsExports(publicApiImports, targetLibFolder, true);
        }

        console.log('\nMigration DONE\n');

        folder.folders && transformToLibFormat(folder.folders, targetFolder);
    });
}

const runLibMigration = (libSrcFolder, targetLibFolder) => {
    if (!libSrcFolder || !targetLibFolder) {
        console.error('ERROR: Source and target full path is not provided.');
        console.log('Syntax:', 'npm run nh:migrate source/path/of/lib-modules target/path/of/lib-modules');
        console.log('Example:', 'npm run nh:migrate ../annu-ng-lib/projects/annu-ng-lib/src/components/common-ui projects/ngx-common-ui');
        return;
    }
    const libFolders = getLibModules(libSrcFolder);
    transformToLibFormat(libFolders, targetLibFolder);
}

module.exports = {
    isModuleRoot,
    getLibModules,
    transformToLibFormat,
    runLibMigration,    // Entry point - run from command line
    createLibModule,    // Entry point - run from command line
};
