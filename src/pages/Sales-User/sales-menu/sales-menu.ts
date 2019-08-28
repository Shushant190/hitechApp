import { Component } from '@angular/core';
import { IonicPage,AlertController, NavController, NavParams, Events, App } from 'ionic-angular';
import {Storage} from '@ionic/storage';
import { TabsPage } from '../../Product-catelouge/tabs/tabs';
import { AnnouncementPage } from '../announcement/announcement';
import { HomePage } from '../../Product-catelouge/home/home';
import { TravelPlanListPage } from '../travel-plan-list/travel-plan-list';
import { ProductPage } from '../product/product';
import { LeadlistPage } from '../leads/leadlist/leadlist';
import { TasklistPage } from '../task/tasklist/tasklist';
import { LeaveHolidayListPage } from '../../Product-catelouge/leave-holiday-list/leave-holiday-list';
import { LeaveListPage } from '../leave-list/leave-list';
import { HolidayLitPage } from '../holiday-lit/holiday-lit';
import { TodayFolowupPage } from '../today-folowup/today-folowup';
import { DvrListPage } from '../dvr/dvr-list/dvr-list';
import { OrderListPage } from '../order/order-list/order-list';
import { ExpensesListsPage } from '../expense/expenses-lists/expenses-lists';
import { DistributionNetworkListPage } from '../distribution-network/distribution-network-list/distribution-network-list';
import { SchemeListPage } from '../scheme-list/scheme-list';
import { ListConcernPage } from '../concern/list-concern/list-concern';

// import { leaves_Holiday } from '../leave'


@IonicPage()
@Component({
    selector: 'page-sales-menu',
    templateUrl: 'sales-menu.html',
})
export class SalesMenuPage {
    
    constructor(public alertCtrl: AlertController,
                public events : Events,
                public navCtrl: NavController, 
                public navParams: NavParams,
                private storage:Storage,
                public app: App) {
    }
    
    ionViewDidLoad() {
        console.log('ionViewDidLoad SalesMenuPage');
    }
    
    logOut()
    {
        this.storage.set('token',"");
        this.storage.set('userId',"");
        this.storage.set('userType','');
        this.storage.set('networkId',"");
        this.storage.set('networkSegments',[]);
        this.events.publish('data','1',Date.now());
        this.showSuccess('Logout')
        // this.navCtrl.setRoot(TabsPage);
    }
    showSuccess(text) {
        
        let alert = this.alertCtrl.create({
          title: 'Success!',
          subTitle: text,
          buttons: ['OK']
        });
        alert.present();
      }
      
    salesSchemes()
    {
        this.navCtrl.push(AnnouncementPage);
    }

    goToDvr()
    {
        this.navCtrl.push(DvrListPage);
    }
    
    travelPlan()
    {
        
        this.navCtrl.push(TravelPlanListPage);
    }
    
    productList()
    {
        this.navCtrl.push(ProductPage);
    }
    
    goToLead(){
        this.navCtrl.push(LeadlistPage);
    }


    goToOrderList(){
        this.navCtrl.push(OrderListPage);
    }

    
    goToTask(){
        this.navCtrl.push(TasklistPage);
    }

    leaveListPage()
    {
        this.navCtrl.push(LeaveListPage);    
    }

    goToDistributorList() {

          this.navCtrl.push(DistributionNetworkListPage);
    }

    goTocustomerConcern() {
         
        this.navCtrl.push(ListConcernPage);  
          
    }

    gotoscheme()
    {
            this.navCtrl.push(SchemeListPage)
    }

    HolidayList()
    {
        this.navCtrl.push(HolidayLitPage);
    }
 
    goToExpense()
    {
        this.navCtrl.push(ExpensesListsPage);
    }

    followUp()
    {
        console.log(":");
        this.navCtrl.push(TodayFolowupPage)
    }

    ionViewDidLeave() {

        let nav = this.app.getActiveNav();
        let activeView = nav.getActive().name;

        console.log(activeView);
        console.log('its leaving');

        if(activeView == 'SalesHomePage' || activeView == 'DistributionNetworkListPage' || activeView == 'OrderListPage' || activeView == 'SalesMenuPage') {
            this.navCtrl.popToRoot();
        }
    }
}
