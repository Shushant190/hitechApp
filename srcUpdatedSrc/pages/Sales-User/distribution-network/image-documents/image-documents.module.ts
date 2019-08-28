import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ImageDocumentsPage } from './image-documents';

@NgModule({
  declarations: [
    ImageDocumentsPage,
  ],
  imports: [
    IonicPageModule.forChild(ImageDocumentsPage),
  ],
})
export class ImageDocumentsPageModule {}
