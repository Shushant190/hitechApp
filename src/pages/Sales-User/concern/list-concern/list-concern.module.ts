import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListConcernPage } from './list-concern';

@NgModule({
  declarations: [
    ListConcernPage,
  ],
  imports: [
    IonicPageModule.forChild(ListConcernPage),
  ],
})
export class ListConcernPageModule {}
