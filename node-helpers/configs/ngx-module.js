const { NGX_MODULE_NAME_TOKEN } = require('./shared.config');

const ngxModule = `
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class ${NGX_MODULE_NAME_TOKEN} { }
`;

module.exports = {
  ngxModule,
}
