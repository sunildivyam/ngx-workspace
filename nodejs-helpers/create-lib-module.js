const fs = require('fs');
const path = require('path');
const { MODULE_FILES } = require('./configs/shared.config');
const { getFileData } = require('./nodejs-helper.service');

const createLibModule = (parentPath = '', libName= '', moduleName='') => {
    Object.values(MODULE_FILES).forEach(file => {
        const filePath = path.resolve(path.join(parentPath, libName, moduleName, file));
        console.log('Generating... - ', filePath);
        const fileData = getFileData(parentPath, libName, moduleName, file);
        fs.writeFileSync(filePath, fileData, {encoding:'utf8',flag:'w'});
        console.log('DONE - ', filePath);
    })
}

module.exports = {createLibModule};
