import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController,Navbar, App } from 'ionic-angular';
import { SubCategoryListPage } from '../sub-category-list/sub-category-list';
import { CatelougeProvider } from '../../../providers/catelouge/catelouge';
// import { SearchPage } from '../search/search';
import { Storage } from '@ionic/storage';
import { Platform } from 'ionic-angular/platform/platform';
import { HomePage } from '../home/home';
import { setDOM } from '@angular/platform-browser/src/dom/dom_adapter';


/**
 * Generated class for the CatelougeListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-catelouge-list',
  templateUrl: 'catelouge-list.html',
})
export class CatelougeListPage {

  @ViewChild(Navbar) navBar:Navbar;

  catelougeList:any=[];
  data:any = {};
  tempArr:any=[];
  segArr:any=[];


  saveOriginalData:any = [];

  constructor(public platform:Platform,public navCtrl: NavController, public navParams: NavParams, public serv: CatelougeProvider, public storage: Storage,public loadingCtrl:LoadingController,public alertCtrl:AlertController, public app:App) {

       this.getCatelougeList();
       
  }

  ionViewDidLoad() {
      console.log('ionViewDidLoad CatelougeListPage');
      // this.navBar.backButtonClick = (e:UIEvent)=>{this.navCtrl.push(HomePage);
  
}

  
  getCatelougeList()
  {

        let loading = this.loadingCtrl.create({
           spinner:'hide',
           content:`<img src="assets/imgs/loader.png"  class="rotate h45"/>`,
        });

        loading.present();

        this.serv.getValue('',"segment/list").then((resp)=>{

             loading.dismiss();
             console.log(resp);
             this.catelougeList = resp['data'];
             this.tempArr = this.catelougeList;

             this.saveOriginalData = JSON.parse(JSON.stringify(this.catelougeList));

        }, err => {

             console.log(err);
             loading.dismiss();

             if(err['name'] == 'TimeoutError' || err['type']==3) {
                this.serv.showInternetError();
             }
        });
     
  }

  doRefresh(event)
  {
      this.data.search = '';
      this.getCatelougeList();
      setTimeout(() => {
        console.log('Async operation has ended');
        event.complete();
      }, 200);
  }

  GoOnSubSegment(code) {

      // this.data.search = '';
      // this.onClearSearchHandler();
      this.navCtrl.push(SubCategoryListPage,{code:code});
  }

  onSearchChangeHanlder() {

        setTimeout(() => {

           if(this.data.search) {

                const filterColumnArr = ['text'];

                this.catelougeList =  this.serv.onListSearchFilterCatalogue(this.saveOriginalData, this.data.search, filterColumnArr);

           } else {

               this.catelougeList = JSON.parse(JSON.stringify(this.saveOriginalData));
           }
          
        }, 500);
  }

  onClearSearchHandler() {
       
       setTimeout(() => {

          if(!this.data.search) {

              let loading = this.loadingCtrl.create({
                  spinner:'hide',
                  content:`<img src="assets/imgs/loader.png"  class="rotate h45"/>`,
              });

              loading.present();

               this.catelougeList = JSON.parse(JSON.stringify(this.saveOriginalData));

               setTimeout(() => {  
                   loading.dismiss(); 
               }, 500);
          }
        
       }, 500);
  }

  showError() {

      let alert = this.alertCtrl.create({
        title: 'Error!',
        subTitle: 'Data Not Found!',
        buttons: ['OK']
      });
      alert.present();
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
