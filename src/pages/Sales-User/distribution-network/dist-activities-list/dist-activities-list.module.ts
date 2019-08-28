import { NgModule,Component } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DistActivitiesListPage } from './dist-activities-list';
import { IonicPage, NavController, NavParams,LoadingController} from 'ionic-angular';
import { CatelougeProvider } from '../../../../providers/catelouge/catelouge';
import * as moment from 'moment';
@NgModule({
  declarations: [
    DistActivitiesListPage,
  ],
  imports: [
    IonicPageModule.forChild(DistActivitiesListPage),
  ],
})
export class DistActivitiesListPageModule {

}
