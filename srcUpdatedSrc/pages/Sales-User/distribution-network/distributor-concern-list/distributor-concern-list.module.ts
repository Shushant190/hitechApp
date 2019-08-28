import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DistributorConcernListPage } from './distributor-concern-list';

@NgModule({
  declarations: [
    DistributorConcernListPage,
  ],
  imports: [
    IonicPageModule.forChild(DistributorConcernListPage),
  ],
})
export class DistributorConcernListPageModule {}
