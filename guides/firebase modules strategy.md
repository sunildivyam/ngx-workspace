# firebase modules strategy

For firebase, we would have multiple firebase modules, each for different firebase functionality.
Each frefixed with `fire-[module-name]`, example: `fire-common`, `fire-auth`, etc.

## List of firebase modules
- `fire-common` - module for common functionalities used across other firebase modules, like initialize app, query generations etc.
- `fire-articles` - module for exposing all REST APIs for working with articles, and their seeding.
- `fire-categories` - module for exposing all REST APIs for working with Categories, and their seeding.
- `fire-auth` - module to work with firebase auth, users, roles etc.
- `fire-auth-ui` - module to work with firebase UI, login with service providers, logout etc.
- `fire-image-storage` - module to work with firebase storage and images.
- `fire-sitemap-storage` - module to work with firebase storage and sitemap.xml.
-
