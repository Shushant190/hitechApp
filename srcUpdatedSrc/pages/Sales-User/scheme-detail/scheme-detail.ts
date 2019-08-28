import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, App } from 'ionic-angular';
import { CatelougeProvider } from '../../../providers/catelouge/catelouge';

/**
 * Generated class for the SchemeDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-scheme-detail',
  templateUrl: 'scheme-detail.html',
})
export class SchemeDetailPage {
  schemeCode:any;
  schemeDetail:any=[];
  totalProduct:any=[];
  length:any;
  constructor(public loadingCtrl:LoadingController ,public service: CatelougeProvider ,public navCtrl: NavController, public navParams: NavParams, public app: App) {
    this.schemeCode=this.navParams.get("schemeCode");
    if(  this.schemeCode)
    {
      this.GetDetailList();
    }
   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SchemeDetailPage');
  }



  
  GetDetailList()
  {
   
    let loading = this.loadingCtrl.create({
      spinner:'hide',
      content:`<img src="assets/imgs/loader.png"  class="rotate h45"/>`,
  });

  loading.present();

    this.service.getData({"schemeCode": this.schemeCode},"/getschemedescription").then((result)=>{
      // console.log(result);
      // this.loader=false;
      if(result['message']=='Success')
      {
        loading.dismiss();
        this.schemeDetail=result['data'];
        this.totalProduct=this.schemeDetail.schemeProductDetails;
        this.length= this.schemeDetail.schemeProductDetails.length
        console.log(this.schemeDetail);
        console.log(this.totalProduct);
        // this.getDistribotorList(this.schemeDetail.schemeDistributors)
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
