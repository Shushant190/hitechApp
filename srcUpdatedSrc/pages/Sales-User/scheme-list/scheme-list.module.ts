import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SchemeListPage } from './scheme-list';

@NgModule({
  declarations: [
    SchemeListPage,
  ],
  imports: [
    IonicPageModule.forChild(SchemeListPage),
  ],
})
export class SchemeListPageModule {}
