import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { TodayFolowupPage } from '../today-folowup/today-folowup';
import { LeadlistPage } from '../leads/leadlist/leadlist';
import { TasklistPage } from '../task/tasklist/tasklist';
import { AnnouncementPage } from '../announcement/announcement';
import { OrderListPage } from '../order/order-list/order-list';
import { DistributionNetworkListPage } from '../distribution-network/distribution-network-list/distribution-network-list';
import { DistActivitiesListPageModule } from '../distribution-network/dist-activities-list/dist-activities-list.module';
import { CatelougeProvider } from '../../../providers/catelouge/catelouge';
import {Storage} from '@ionic/storage';
import moment from 'moment';
import { TabsPage } from '../../Product-catelouge/tabs/tabs';
import { HomePage } from '../../Product-catelouge/home/home';
import { UserprofilePage } from '../userprofile/userprofile'
import { DvrListPage } from '../dvr/dvr-list/dvr-list';
import { SalesMenuPage } from '../sales-menu/sales-menu';
import { BackgroundGeolocation, BackgroundGeolocationConfig, BackgroundGeolocationEvents,BackgroundGeolocationResponse } from '@ionic-native/background-geolocation';
import { AppUpdate } from '@ionic-native/app-update';

// import { TasklistPage } from '../tasklist/tasklist';
/**
 * Generated class for the SalesHomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sales-home',
  templateUrl: 'sales-home.html',
})
export class SalesHomePage {

  userId:any;
  today_Followup:any=[];
  date:any;
  time:any;
  currentDate:any;
  task_list:any=[];
  activity_list:any=[];

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public service:CatelougeProvider,
              public storage:Storage,
              public app:App,
              private appUpdate: AppUpdate,
              public backgroundGeolocation: BackgroundGeolocation) {

      console.log('hello12121212121');

      this.storage.get('userId').then((userId) => 
      { 
            console.log(userId);
            this.userId=userId;
            this.count_list();
      })

      this.date = moment().format('YYYY-MM-DD');
      this.currentDate=moment().format('DD-MMM-YYYY');;
      this.time = moment().format('HHmmss');

      const updateUrl = 'http://nextstep.net.in/kenshin/apk/update.xml';

      setTimeout(() => {

          // this.appUpdate.checkAppUpdate(updateUrl).then(() => { 
          
          //   console.log('Update available');
              
          // });
        
      }, 3000);
  }


  ionViewDidLoad() {
      console.log('ionViewDidLoad SalesHomePage');

      this.getBackGroundLocation();
  }


  getBackGroundLocation() {

      const config: BackgroundGeolocationConfig = {
        desiredAccuracy: 10,
        stationaryRadius: 20,
        distanceFilter: 30,
        debug: false, //  enable this hear sounds for background-geolocation life-cycle.
        stopOnTerminate: false // enable this to clear background location settings when the app terminates
      };

      this.backgroundGeolocation.configure(config).then(() => {
        this.backgroundGeolocation
          .on(BackgroundGeolocationEvents.location)
          .subscribe((location: BackgroundGeolocationResponse) => {
            console.log(location);


            const currentDateTime = moment().format('YYYY-MM-DD H:mm:ss');

            console.log(currentDateTime);

            const apiData = {
              userId: this.userId,
              userLocations: [
                {
                    locationId: 0,
                    visitDate: currentDateTime,
                    latitude: location['latitude'],
                    longitude: location['longitude']
                }
              ]
            };

            console.log(apiData);
             
            this.service.getData(apiData, "locations/add").then((result)=>{
                  console.log(result);
            })
                
          
          });
      });
      // start recording location
      // this.backgroundGeolocation.start();
  }


  goToProfile()
  {
    this.navCtrl.push(UserprofilePage);
  }

  followupList(){
    this.navCtrl.push(TodayFolowupPage)
  }
  announcementList(){
    this.navCtrl.push(AnnouncementPage)
  }
  leadList(){
    this.navCtrl.push(LeadlistPage)
  }
  orderList(){
    this.navCtrl.push(OrderListPage)
  }
  distributorList(){
    this.navCtrl.push(DistributionNetworkListPage)
  }
  TaskList()
  {
    this.navCtrl.push(TasklistPage);
  }

  activityList()
  {
    this.navCtrl.push(DvrListPage);
  }

  announcementCount:any=0;

  concernCount:any=0;
  expenseCount:any=0;

  leadCount:any=0;
  networkCount:any=[];

  distributorCount=0;
  wholeSellerCount=0;
  
  retailerCount=0;
  reconditionerCount=0;
  
  mechanicCount=0;

  orderCount:any=0;
  taskCount:any=0;

  travelPlanCount:any=0;

  activityCount:any=0;
  followUpCount:any=0;
  popCount:any=0;

  popOrderCount:any=0;
  
  count_list() {
      this.service.getValue('','dashboard/count').then((response)=>{
          console.log(response);
          if(response['status']="Success") {
            this.announcementCount=response['data']['announcementCount'];
            this.concernCount=response['data']['concernCount'];
            this.expenseCount=response['data']['expenseCount'];
            this.leadCount=response['data']['leadCount'].length;
            this.networkCount=response['data']['networkCount'];

            for(let i=0;i<this.networkCount.length;i++)
            {
                  if(this.networkCount[i].role==12)
                  {
                      this.distributorCount=this.networkCount[i].total;
                  }
                  if(this.networkCount[i].role==11)
                  {
                      this.wholeSellerCount=this.networkCount[i].total;
                  }
                  if(this.networkCount[i].role==13)
                  {
                      this.retailerCount=this.networkCount[i].total;
                  }
                  if(this.networkCount[i].role==14)
                  {
                      this.reconditionerCount=this.networkCount[i].total;
                  }
                  if(this.networkCount[i].role==15)
                  {
                      this.mechanicCount=this.networkCount[i].total;
                  }
            }

            this.orderCount=response['data']['orderCount'];
            this.taskCount=response['data']['taskCount'];
            this.travelPlanCount=response['data']['travelPlanCount'];
            this.activityCount=response['data']['activityCount'];
            this.followUpCount=response['data']['followUpCount'];
            this.popOrderCount=response['data']['popOrderCount'];
            this.popCount=response['data']['popCount']
            console.log(this.announcementCount)
            console.log(this.concernCount)
            console.log(this.expenseCount)
            console.log(this.leadCount)
            console.log(this.orderCount)
            console.log(this.taskCount)
            console.log(this.travelPlanCount)
         }
      });
  }


  ionViewDidLeave() {

      let nav = this.app.getActiveNav();
      console.log(nav);
      

      if(nav && nav.getActive()) {

        let activeView = nav.getActive().name;

        let previuosView = '';
        if(nav.getPrevious() && nav.getPrevious().name) {
           previuosView = nav.getPrevious().name;
        }
       
        console.log(previuosView);
  
  
        console.log(activeView);
        console.log('its leaving');
  
        if((activeView == 'SalesHomePage' || activeView == 'DistributionNetworkListPage' || activeView == 'OrderListPage' || activeView == 'SalesMenuPage') && (previuosView != 'SalesHomePage' && previuosView != 'DistributionNetworkListPage'  && previuosView != 'OrderListPage' && previuosView != 'SalesMenuPage')) {
  
            console.log(previuosView);
            this.navCtrl.popToRoot();
        }

      }
     
  }

}
