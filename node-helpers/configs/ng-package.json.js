const { GENERIC_LIB_MODULE_NAME, NG_PACKAGE_SCHEMA } = require('./shared.config');

const ngPackageJson = {
  '$schema': `../..${NG_PACKAGE_SCHEMA}`,
  'dest': `../../dist/${GENERIC_LIB_MODULE_NAME}`,
  'lib': {
    'entryFile': './public-api.ts',
    'cssUrl': 'inline'
  }
};

module.exports = {ngPackageJson};
