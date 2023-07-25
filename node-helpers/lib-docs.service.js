const { readFileSync, writeFileSync } = require('./file.service');
const showdown = require('showdown');

const developmentUrl = 'http://localhost:4200';
const stagingUrl = 'https://docs-annu-business.web.app';
const productionUrl = 'https://ngx-libs.annuadvent.com';
const staticRoutes = [
    '/tnc/terms-and-conditions',
    '/tnc/privacy-policy',
    '/contact-us',
    '/about-us',
    '/libs',
]

const md2html = (mdText) => {
    const converter = new showdown.Converter();
    let html = converter.makeHtml(mdText);
    return html;
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
        description: pkg.description,
        descriptionHtml: md2html(mdStr),
        keywords: pkg.keywords,
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

const createSitemapXml = (libNames, sitemapEnv, sitemapEnvUrl) => {
    const lastMod = `<lastmod>${(new Date(Date.now())).toISOString()}</lastmod>`;
    const priority = (pr) => `<priority>${pr}</priority>`;

    let xmlStr = `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
    <url>
        <loc>${sitemapEnvUrl}</loc>
        ${lastMod}
        ${priority('1.00')}
    </url>
    ${staticRoutes.map(rt => `<url>
        <loc>${sitemapEnvUrl}${rt}</loc>
        ${lastMod}
        ${priority('0.80')}
    </url>
    `).join('')}`;



    libNames.forEach(libName => {
        // Lib route
        xmlStr += `<url>
        <loc>${sitemapEnvUrl}/libs/${libName}</loc>
        ${lastMod}
        ${priority('0.80')}
    </url>
    `;

        // read projects/ngx-ssr-libdocs-app/src/assets/[libNaame]/documentation.json
        const url = `projects/ngx-ssr-libdocs-app/src/assets/${libName}/documentation.json`;
        const libJsonStr = readFileSync(url);
        const libJson = JSON.parse(libJsonStr);
        const assets = {
            components: libJson.components,
            classes: libJson.classes,
            interfaces: libJson.interfaces,
            directives: libJson.directives,
            guards: libJson.injectables.filter(inj => inj.file.includes('.guard.')),
            interceptors: libJson.injectables.filter(inj => inj.file.includes('.interceptor.')),
            services: libJson.injectables.filter(inj => !inj.file.includes('.guard.') && !inj.file.includes('.interceptor.')),
        };


        Object.keys(assets).forEach(assetType => {
            // AssetType route
            xmlStr += `<url>
        <loc>${sitemapEnvUrl}/libs/${libName}/${assetType}</loc>
        ${lastMod}
        ${priority('0.80')}
    </url>
    `;

            assets[assetType].forEach(ast => xmlStr += `<url>
        <loc>${sitemapEnvUrl}/libs/${libName}/${assetType}/${ast.name}</loc>
        ${lastMod}
        ${priority('0.80')}
    </url>
    `)
        });
    });

    xmlStr += `
</urlset>`;

    const sitemapWriteUrl = `projects/ngx-ssr-libdocs-app/src/sitemaps/${sitemapEnv}/sitemap.xml`;
    writeFileSync(sitemapWriteUrl, xmlStr, true);

    console.log(
        'GENERATED - OK \n',
        sitemapWriteUrl + '\n',
    );
};

const createSitemapXmls = () => {
    const libNames = process.argv.slice(4);

    if (!libNames || !libNames.length) throw new Error('Array of lib names required.');

    createSitemapXml(libNames, 'development', developmentUrl);
    createSitemapXml(libNames, 'staging', stagingUrl);
    createSitemapXml(libNames, 'production', productionUrl);
};

const createPrerenderLibsRoutes = (libNames) => {
    let routesStr = `/
${staticRoutes.map(rt => `${rt}
`).join('')}`;


    libNames.forEach(libName => {
        // Lib route
        routesStr += `/libs/${libName}
`;

        // read projects/ngx-ssr-libdocs-app/src/assets/[libNaame]/documentation.json
        const url = `projects/ngx-ssr-libdocs-app/src/assets/${libName}/documentation.json`;
        const libJsonStr = readFileSync(url);
        const libJson = JSON.parse(libJsonStr);
        const assets = {
            components: libJson.components,
            classes: libJson.classes,
            interfaces: libJson.interfaces,
            directives: libJson.directives,
            guards: libJson.injectables.filter(inj => inj.file.includes('.guard.')),
            interceptors: libJson.injectables.filter(inj => inj.file.includes('.interceptor.')),
            services: libJson.injectables.filter(inj => !inj.file.includes('.guard.') && !inj.file.includes('.interceptor.')),
        };


        Object.keys(assets).forEach(assetType => {
            // AssetType route
            routesStr += `/libs/${libName}/${assetType}
`;

            assets[assetType].forEach(ast => routesStr += `/libs/${libName}/${assetType}/${ast.name}
`)
        });
    });

    const prerenderRoutesWriteUrl = `projects/ngx-ssr-libdocs-app/src/prerender-routes/routes.txt`;
    writeFileSync(prerenderRoutesWriteUrl, routesStr, true);

    console.log(
        'GENERATED - OK \n',
        prerenderRoutesWriteUrl + '\n',
    );
};

const createPrerenderRoutes = () => {
    const libNames = process.argv.slice(4);

    if (!libNames || !libNames.length) throw new Error('Array of lib names required.');

    createPrerenderLibsRoutes(libNames);
}

module.exports = {
    createAllLibDocsJson,   // generates libs-info.json, having all lif infos.
    createLibDocsImports,   // generates all lib resources cmp/cmpdata/svc imports for dynamic render.
    createSitemapXmls,      // generates sitemap.xml for all resources of all libs
    createPrerenderRoutes,  // generates routes.txt for all environments and for all libs, to prerender routes
}
