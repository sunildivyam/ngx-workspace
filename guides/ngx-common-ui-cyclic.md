- color-palatte => themeService
- footer-nav.docs => menu.docs
- footer-nav.component => menu.interface
- ImageBrowser => AuthFirebaseService | ImageFireStoreService | UtilsService | LibConfig
- utils.service
    - ove following function to relevant module service.
    ```
    /**
    * Generates a message for an image upload, based on image specifications.
    * @date 2/4/2023 - 2:57:11 PM
    *
    * @public
    * @param {FirebaseStoreConfig} imageSpecs
    * @returns {string}
    */
    public getImageSpecsString(imageSpecs: FirebaseStoreConfig): string {
        const { minWidth, minHeight, maxWidth, maxHeight, maxKBs } = imageSpecs;

        return `Allowed Image specification: 1Kb <= size <= ${maxKBs}Kbs | ${minWidth}px <= width <= ${maxWidth}px | ${minHeight}px <= height <= ${maxHeight}px`;
    }

    ```
