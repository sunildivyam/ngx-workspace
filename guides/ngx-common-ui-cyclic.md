- color-palatte => themeService
- footer-nav.docs => menu.docs
- footer-nav.component => menu.interface
- ImageBrowser => AuthFirebaseService | ImageFireStoreService | UtilsService | LibConfig
    - Add ImageBrowser Module, separately
- utils.service
    - move following function to relevant module service.
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
- openai-image-form.component
    - move upload image to consumer component code
    ```
    public async uploadImage(): Promise<void> {
        if (!this.generatedBase64Image) return;
        this.startLoading();
        try {
        const imageFileInfo: ImageFileInfo =
            await this.imageStoreService.uploadImage(
            this.imageFileName,
            this.generatedBase64Image,
            true,
            this.authService.getCurrentUserId(),
            true
            );
        this.generatedBase64Image = '';
        this.savedImageUrl = `${this.libConfig.imagesSourceUrl}${imageFileInfo.fullPath}`;
        this.fileUploaded.emit(imageFileInfo);

        this.stopLoading();
        return;
        } catch (err) {
        this.stopLoading(err.message);
        return;
        }
    }
    ```
- openai openai-form and openai-image-form have been moved to `ngx-tools` as `openai module`
- `sitemap` is moved to sitemap module in `ngx-tools`
- `firebase` is moved to firebase module in `ngx-tools`
