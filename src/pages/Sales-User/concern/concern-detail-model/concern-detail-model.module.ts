import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConcernDetailModelPage } from './concern-detail-model';

@NgModule({
  declarations: [
    ConcernDetailModelPage,
  ],
  imports: [
    IonicPageModule.forChild(ConcernDetailModelPage),
  ],
})
export class ConcernDetailModelPageModule {}
