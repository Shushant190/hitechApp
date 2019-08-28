import { Component } from '@angular/core';
import { SalesHomePage } from '../sales-home/sales-home';
import { SalesMenuPage } from '../sales-menu/sales-menu';
import { ActionSheetController, NavController, NavParams } from 'ionic-angular';
import { CreatFolowupPage } from '../creat-folowup/creat-folowup';
import { AddLeadPage } from '../add-lead/add-lead';
import { DistributionNetworkListPage } from '../distribution-network/distribution-network-list/distribution-network-list';
import { OrderListPage } from '../order/order-list/order-list';
import { AdddistributorPage } from '../adddistributor/adddistributor';
import { AddTaskPage } from '../task/add-task/add-task'
import { AddLeavePage } from '../add-leave/add-leave';
import { DvrListPage } from '../dvr/dvr-list/dvr-list';
import { AddFollowupPage } from '../add-followup/add-followup';
import { DvrAddPage } from '../dvr/dvr-add/dvr-add';
import { AddConcernPage } from '../concern/add-concern/add-concern';
import { CreatOrderPage } from '../order/creat-order/creat-order';
import { AddTravelPlanPage } from '../add-travel-plan/add-travel-plan';
import { AddExpensePage } from '../expense/add-expense/add-expense';
@Component({
  templateUrl: 'sales-tabs.html',
})

export class SalesTabsPage {

  tab1Root = SalesHomePage;
  tab2Root = DistributionNetworkListPage;
  tab4Root = OrderListPage;
  tab5Root = SalesMenuPage;

  constructor(public navCtrl: NavController, public navParams: NavParams, public actionsheetCtrl: ActionSheetController) {
  
  }

  presentActionSheet() {

    const actionSheet = this.actionsheetCtrl.create({
      cssClass: 'cs-action-sheet',
      buttons: [
        {
          text: 'Create Lead',
          icon: 'add-lead',
          handler: () => {
            console.log('Destructive clicked');
            this.navCtrl.push(AddLeadPage);
          }
        },
        {
          text: 'Create Task',
          icon: 'add-task',
          handler: () => {
            console.log('Destructive clicked');
            this.navCtrl.push(AddTaskPage);
          }
        },
        {
          icon: 'add-order',
          text: 'Create Order',
          handler: () => {
            console.log('Archive clicked');
            this.navCtrl.push(CreatOrderPage);
          }
        },
        {
          icon: 'travel',
          text: 'Create Travel Plan',
          handler: () => {
            this.navCtrl.push(AddTravelPlanPage);
            console.log('Archive clicked');
          }
        },
        {
          icon: 'expenses',
          text: 'Create Expenses',
          handler: () => {
            console.log('Archive clicked');
            this.navCtrl.push(AddExpensePage);

          }
        },
        {
          text: 'Create DVR',
          icon: 'add-dvr',
          handler: () => {
            console.log('Destructive clicked');
            this.navCtrl.push(DvrAddPage);
          }
        },
        {
          icon: 'followup',
          text: 'Create Follow-Up',
          handler: () => {
            console.log('Follow-Up clicked');
            this.navCtrl.push(CreatFolowupPage);
          }
        },
        {
          icon: 'target',
          text: 'Create Concern',
          handler: () => {
            console.log('Archive clicked');
            this.navCtrl.push(AddConcernPage);
          }
        },
        {
          icon: 'add-leaves',
          text: 'Create Leave',
          handler: () => {
            console.log('Archive clicked');
            this.navCtrl.push(AddLeavePage);
            console.log("this is add leave data ");
          }
        },
        // {
        //   icon: 'add-payment',
        //   text: 'Create Payment',
        //   handler: () => {
        //     console.log('Archive clicked');
        //   }
        // },
        {
          role: 'cancel',
          icon: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

}
