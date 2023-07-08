const { readFileSync, writeFileSync } = require('./file.service');

const libInfo = {
    name: '',
    fullName: '',
    version: '',
    description: '',
    homepage: '',
    bugs: '',
    git: '',
    dependencies: [],
    node: '',
    npm: '',
}

const createLibDocsJson = (libName) => {
    // read `projects/{libName}/package.json`
    const pkjStr = readFileSync(`projects/${libName}/package.json`);
    const pkg = JSON.parse(pkjStr);

    // read `projects/{libName}/readme.md`
    const mdStr = readFileSync(`projects/${libName}/readme.md`);

    const libInfo = {
        name: libName,
        fullName: pkg.name,
        version: pkg.version,
        description: mdStr,
        homepage: pkg.homepage,
        bugs: pkg.bugs,
        git: pkg.repository.url,
        dependencies: Object.keys(pkg.peerDependencies),
        node: pkg.engines.node,
        npm: pkg.engines.npm,
    }

    return libInfo;
}

const createAllLibDocsJson = (/*libNames*/) => {
    const libNames = process.argv.slice(4);

    if (!libNames || !libNames.length) throw new Error('Array of lib names required.');

    const libsInfo = {};

    libNames.forEach(libName => {
        libsInfo[libName] = createLibDocsJson(libName);
    });

    writeFileSync(
        `projects/ngx-ssr-libdocs-app/src/assets/libs-info.json`,
        JSON.stringify(libsInfo, null, '\t'),
        true
    );

    console.log('GENERATED- Ok ', `projects/ngx-ssr-libdocs-app/src/assets/libs-info.json`);
}

const createLibDocsImports = () => {
    const libNames = process.argv.slice(4);

    if (!libNames || !libNames.length) throw new Error('Array of lib names required.');

    let cmpImportsStr = ``;
    let cmpConstStr = `export const libComponentClasses = {`;
    let cmpDataImportsStr = ``;
    let cmpDataConstStr = `export const libComponentData = {`;
    let svcImportsStr = ``;
    let svcConstStr = `export const libServiceClasses = {`;

    libNames.forEach(libName => {
        // read projects/ngx-ssr-libdocs-app/src/assets/[libNaame]/documentation.json
        const url = `projects/ngx-ssr-libdocs-app/src/assets/${libName}/documentation.json`;
        const libJsonStr = readFileSync(url);
        const libJson = JSON.parse(libJsonStr);

        const components = libJson.components;
        const services = libJson.injectables;

        // Generate services imports
        svcImportsStr += `
        // ${libName} imports
        ${services.map(svc => {
            const moduleName = svc.file.split('/')[2];
            return `import { ${svc.name} } from '@annuadvent/${libName}/${moduleName}';`;
        }).join(`
        `)}
        `;

        // Generate components imports
        cmpImportsStr += `
        // ${libName} imports
        ${components.map(cmp => {
            const moduleName = cmp.file.split('/')[2];
            return `import { ${cmp.name} } from '@annuadvent/${libName}/${moduleName}';`;
        }).join(`
        `)}
        `;

        // Generate components data imports
        cmpDataImportsStr += `
        // ${libName} imports
        ${components.map(cmp => {
            const moduleName = cmp.file.split('/')[2];
            const cmpfolder = cmp.file.split('/')[5];
            return `import { ${cmp.name} } from '@annuadvent/${libName}/${moduleName}/src/components/${cmpfolder}/${cmpfolder}.docs';`;
        }).join(`
        `)}
        `;


        // Generate svc consts
        svcConstStr += `
    '${libName}': {
        ${services.map(svc => svc.name).join(
            `,
    `
        )}
},`;

        // Generate cmp consts
        cmpConstStr += `
    '${libName}': {
        ${components.map(cmp => cmp.name).join(
            `,
    `
        )}
},`;

        // Generate cmp data consts
        cmpDataConstStr += `
    '${libName}': {
        ${components.map(cmp => cmp.name).join(
            `,
    `
        )}
},`;
    });

    // close svc consts
    svcConstStr += `
}`;

    // close cmp consts
    cmpConstStr += `
}`;

    // close cmp data consts
    cmpDataConstStr += `
}`;

    const svcWriteUrl = `projects/ngx-ssr-libdocs-app/src/app/constants/lib-services.constants.ts`;
    writeFileSync(svcWriteUrl, `${svcImportsStr}${svcConstStr}`, true);

    const cmpWriteUrl = `projects/ngx-ssr-libdocs-app/src/app/constants/lib-components.constants.ts`;
    writeFileSync(cmpWriteUrl, `${cmpImportsStr}${cmpConstStr}`, true);

    const cmpDataWriteUrl = `projects/ngx-ssr-libdocs-app/src/app/constants/lib-components-data.constants.ts`;
    writeFileSync(cmpDataWriteUrl, `${cmpDataImportsStr}${cmpDataConstStr}`, true);

    console.log(
        'GENERATED - OK \n',
        svcWriteUrl + '\n',
        cmpWriteUrl + '\n',
        cmpDataWriteUrl + '\n',
    );
};

module.exports = {
    createAllLibDocsJson,   // generates libs-info.json, having all lif infos.
    createLibDocsImports,   // generates all lib resources cmp/cmpdata/svc imports for dynamic render.
}
