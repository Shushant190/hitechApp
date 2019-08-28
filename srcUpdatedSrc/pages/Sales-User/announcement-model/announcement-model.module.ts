import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AnnouncementModelPage } from './announcement-model';

@NgModule({
  declarations: [
    AnnouncementModelPage,
  ],
  imports: [
    IonicPageModule.forChild(AnnouncementModelPage),
  ],
})
export class AnnouncementModelPageModule {}
