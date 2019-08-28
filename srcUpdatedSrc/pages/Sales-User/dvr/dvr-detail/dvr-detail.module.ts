import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DvrDetailPage } from './dvr-detail';

@NgModule({
  declarations: [
    DvrDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(DvrDetailPage),
  ],
})
export class DvrDetailPageModule {}
