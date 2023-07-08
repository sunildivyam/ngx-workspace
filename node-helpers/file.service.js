const fs = require('fs');
const path = require('path');


const readFileSync = (filePath) => {
    return fs.readFileSync(filePath, { encoding: 'utf-8' });
}

const writeFileSync = (filePath, data, forceCreateDirs = true) => {
    const dirPath = path.dirname(filePath);
    if (!fs.existsSync(dirPath) && forceCreateDirs) {
        fs.mkdirSync(dirPath, { recursive: true });
    }

    fs.writeFileSync(filePath, data);
}

const copyFileSync = (srcFile, targetFile) => {
    const dirPath = path.dirname(targetFile);
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
    fs.copyFileSync(srcFile, targetFile);
}

const appendFileSync = (filePath, data, forceCreateDirs = true) => {
    const dirPath = path.dirname(filePath);
    if (!fs.existsSync(dirPath) && forceCreateDirs) {
        fs.mkdirSync(dirPath, { recursive: true });
    }

    fs.appendFileSync(filePath, data);
}

const listFilesAndFolders = (srcFolder, recursive = false) => {
    const allItems = fs.readdirSync(srcFolder, { withFileTypes: true });
    const subFoldersList = allItems.filter(item => item.isDirectory()).map(item => item.name);
    const files = allItems.filter(item => !item.isDirectory()).map(item => item.name);
    let folders = subFoldersList.map(folder => ({ fullPath: path.join(srcFolder, folder) }));

    if (recursive && subFoldersList.length) {
        folders = subFoldersList.map(folder => {
            const { fullPath, files, folders } = listFilesAndFolders(path.join(srcFolder, folder), recursive);
            return {
                name: folder,
                fullPath,
                files,
                folders,
            }
        })
    }

    return {
        fullPath: srcFolder,
        files,
        folders
    };
}

module.exports = {
    readFileSync,
    writeFileSync,
    copyFileSync,
    appendFileSync,
    listFilesAndFolders,
};
