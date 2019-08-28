import { NgModule } from '@angular/core';
import { IonicPageModule} from 'ionic-angular';
import { DvrListPage } from './dvr-list';

@NgModule({
  declarations: [
    DvrListPage,
  ],
  imports: [
    IonicPageModule.forChild(DvrListPage),
  ],
})
export class DvrListPageModule {

  constructor() 
  {}

 
}
