const { GENERIC_LIB_MODULE_NAME, NODE_VERSION, NPM_VERSION } = require("./shared.config");

const packageJson = {
  'name': '@annuadvent/' + GENERIC_LIB_MODULE_NAME,
  'version': '0.0.1',
  'license': 'MIT',
  'description': `Angular @annuadvent/${GENERIC_LIB_MODULE_NAME} components library`,
  'homepage': `https://github.com/sunildivyam/${GENERIC_LIB_MODULE_NAME}`,
  'bugs': `https://github.com/sunildivyam/${GENERIC_LIB_MODULE_NAME}/issues`,
  'repository': {
    'type': 'git',
    'url': `https://github.com/sunildivyam/${GENERIC_LIB_MODULE_NAME}.git`
  },
  'engines': {
    'node': NODE_VERSION,
    'npm': NPM_VERSION
  },
  'peerDependencies': {
    '@angular/common': '^16.1.0',
    '@angular/core': '^16.1.0'
  },
  'dependencies': {
    'tslib': '^2.3.0'
  },
  'sideEffects': false
}

module.exports = { packageJson };
