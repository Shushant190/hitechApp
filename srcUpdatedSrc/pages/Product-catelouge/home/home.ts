import { Component } from '@angular/core';
import { NavController, App, AlertController } from 'ionic-angular';
// import { CatelougeListPage } from '../catelouge-list/catelouge-list';
import { AboutPage } from '../about/about';
import { NewArrivalListPage } from '../../Product-catelouge/new-arrival-list/new-arrival-list';
import { SearchPage } from '../../Product-catelouge/search/search';
import { SalesLoginPage } from '../../Sales-User/sales-login/sales-login';
import { CatelougeListPage } from '../catelouge-list/catelouge-list';
import { ProductListPageModule } from '../product-list/product-list.module';
import { ProductListPage } from '../product-list/product-list';
import { Network} from '@ionic-native/network';
import { CatelougeProvider } from '../../../providers/catelouge/catelouge';
// import { duration } from 'moment';
import { AppVersion } from '@ionic-native/app-version';
// import { SalesLoginPage } from '../../sales-login/sales-login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  versionNumber:any={};
  app_version:any;

  constructor(private appVersion: AppVersion, private network: Network, public navCtrl: NavController,public app: App, public alertMsg:AlertController, public service:CatelougeProvider ) {

this.appVersion.getVersionNumber().then((verNumber)=>{
console.log(verNumber);
this.app_version= verNumber;
this.CallStaticVersion();
})


    // this.network.onConnect().subscribe(()=>{
    //   this.alertMsg.create({
    //     message:'Network Connected',
    //     buttons: ['OK']
    //   }).present();
    // });
    // this.network.onDisconnect().subscribe(()=>{
    //   this.alertMsg.create({
    //     message:'Network Not Connected',
    //     buttons: ['OK']
    //   }).present();
    // });
    
console.log("==========================")
  }
  SeeCataloguelist(){
    this.navCtrl.push(CatelougeListPage);
    // this.navCtrl.parent.select(1);
  }

  SeeNewArrivallist(){
    this.navCtrl.push(NewArrivalListPage)
  }

  SeeAboutus(){
    this.navCtrl.push(AboutPage)
  }

  GoOnSearch(){
    this.navCtrl.push(SearchPage)
  }
  gotoLoginPage()
  {
     this.navCtrl.push(SalesLoginPage);
  }


  // async getAppName()
  // {
  //   this.service.getData({},"").then((r)=>{
  //     console.log(r);
  //   });
  //   const getAppName =  await this.appVersion.getAppName;
  // }



 
  CallStaticVersion()
  {
    
    this.service.getData({},"").then((r)=>{
      console.log(r)
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

    if((activeView == 'HomePage' || activeView == 'CatelougeListPage' || activeView == 'ContactPage' || activeView == 'EnquiryFormPage') && (previuosView != 'HomePage' && previuosView != 'CatelougeListPage'  && previuosView != 'ContactPage' && previuosView != 'EnquiryFormPage')) {

        console.log(previuosView);
        this.navCtrl.popToRoot();
    }
  }
}
