import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,ToastController, App} from 'ionic-angular';
import { CatelougeProvider } from '../../../../providers/catelouge/catelouge';
import * as moment from 'moment';
import {Storage} from '@ionic/storage';
/**
 * Generated class for the DvrDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dvr-detail',
  templateUrl: 'dvr-detail.html',
})
export class DvrDetailPage {
dvrId:any;
dvr_detail:any={}
  constructor(public service:CatelougeProvider,
              public toastCtrl: ToastController,
              public navCtrl: NavController, 
              public navParams: NavParams,
              public loadingCtrl:LoadingController,
              public app: App) {
    this.dvrId=this.navParams.get('dvrId');
    console.log(this.dvrId);
    if(this.dvrId){
      this.dvrDetail();
    }
  }
 

  ionViewDidLoad() {
    console.log('ionViewDidLoad DvrDetailPage');
  }

  doRefresh(event) {
    console.log('Begin async operation');
    setTimeout(() => {
      console.log('Async operation has ended');
      event.complete();
    }, 3000);
    setTimeout(() => {
      this.presentToast(' Refreshed Successfully');
    }, 3500);
  }
  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message:msg,
      duration: 3000,
      position: 'bottom'
    });
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
    toast.present();
  }






  title:any;
  dvrDetail(){
    let loading = this.loadingCtrl.create({
      spinner:'hide',
      content:`<img src="assets/imgs/loader.png"  class="rotate h45"/>`,
    });
    loading.present();
       
    this.service.getData({"activityId":this.dvrId,"currentPage": 1,"pageSize": 500,},"activity/list").then((result)=>{
      console.log(result);
      loading.dismiss();
      if(result['status']=='Success'){
      this.dvr_detail=result['data'][0];
      console.log(this.dvr_detail);
      this.title=this.dvr_detail.userName[0];
      this.dvr_detail.checkinDuration=moment.utc(moment.duration(moment(this.dvr_detail.checkOutTime).diff(moment(this.dvr_detail.checkInTime))).asMilliseconds()).format('HH:mm');
    }
    })
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
