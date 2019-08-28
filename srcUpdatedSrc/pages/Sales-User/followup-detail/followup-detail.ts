import { Component } from '@angular/core';
import { IonicPage, NavController,AlertController,ToastController,LoadingController, NavParams, App } from 'ionic-angular';
import { CatelougeProvider } from '../../../providers/catelouge/catelouge';
import { TodayFolowupPage } from '../today-folowup/today-folowup';
import { Storage} from  '@ionic/storage';
import * as moment from 'moment';
import { DvrAddPage } from '../dvr/dvr-add/dvr-add';


@IonicPage()
@Component({
  selector: 'page-followup-detail',
  templateUrl: 'followup-detail.html',
})


export class FollowupDetailPage {
    followUpId:any;
    filter:any={};
    userType:any;
    data:any={};
    userId:any;
    currentDate:any;
    TodayDate:any;
    constructor( public storage:Storage,public navCtrl: NavController,public loadingCtrl:LoadingController, public toastCtrl: ToastController, public alertCtrl: AlertController,public navParams: NavParams, public serve: CatelougeProvider, public app: App) {
    this.TodayDate = moment(this.currentDate).format('YYYY-MM-DD');   
    console.log( this.TodayDate);
    this.storage.get('userType').then((r)=>
    {
      this.userType=r
    })
    this.storage.get('userId').then((r)=>
    {
     this.userId=r
     console.log(this.userId);
   })
    this.filter.followUpBeforeDate=1;
    this.followUpId=this.navParams.get('followUpId');
    console.log(this.followUpId);
    this.getActivityDetail();
    }




    ionViewDidLoad() {
      console.log('ionViewDidLoad FollowupDetailPage');
    }
    

    activityDetail:any=[];
    getActivityDetail()
    {
      this.serve.getData({'followupId':this.followUpId,'currentPage': 1,'pageSize': 50},"followup/list").then((result)=>{
        console.log(result);
        if(result['status']=='Success')
        {
          this.activityDetail=result['data'][0];
          console.log(this.activityDetail);
        }
      })
    }



    value:any;
    closeFollowUp()
    {
    console.log("this is test");
    var retVal = confirm("Do You Want To Create Next Follow-Up ?");
    if( retVal == true ) {
      this.value= retVal;
    }
    else 
    {
      this.value= retVal;
        console.log(this.activityDetail.followUpId);
        this.serve.getValue(this.activityDetail.followUpId,"followup/close/").then((result)=>{
          console.log(result);
          if(result['status']=='Success')
          {
            this.presentToast('Closed Successfully...!');
            setTimeout(() => {
              this.navCtrl.push(TodayFolowupPage);  
            }, 500);
            
          }
        })
      }
    }


    
    activitydata:any={}; 
    saveData()
    {
      console.log(this.activityDetail);
      this.activitydata.activityModule=this.activityDetail.activityModule;
      this.activitydata.activityId=this.activityDetail.activityId;
      this.activitydata.referenceId=this.activityDetail.referenceId;
      this.activitydata.followUpId=this.activityDetail.followUpId;
      this.activitydata.status=1;
      this.activitydata.userId=this.userId;
      console.log(this.activitydata);
      this.serve.getData(this.activitydata,"followup/add").then((result)=>{
        console.log(result);
        if(result['status']=='Success')
        {
          this.serve.getValue(this.activityDetail.followUpId,"followup/close/").then((result)=>{
            console.log(result);
            if(result['status']=='Success')
            {
              this.presentToast('Closed Successfully...!');
              setTimeout(() => {
                this.navCtrl.push(TodayFolowupPage);  
              }, 500);
            }
          })
        }
      })
    }


    createActivity(followUp_Id){
      console.log(followUp_Id);
      this.serve.getValue(followUp_Id,"followup/close/").then((result)=>{
        console.log(result);
        if(result['status']=='Success')
        {
          this.presentToast('Closed Successfully...!');
          console.log(followUp_Id);
          setTimeout(() => {
            this.navCtrl.push(DvrAddPage,{followUp_Id}); 
          }, 500);
         
        }
      })
    }


    presentToast(msg) {
      let toast = this.toastCtrl.create({
        message: msg,
        duration: 3000,
        position: 'top'
      });
      toast.onDidDismiss(() => {
        console.log('Dismissed toast');
      });
      toast.present();
    }


    ionViewDidLeave() {

      let nav = this.app.getActiveNav();
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
