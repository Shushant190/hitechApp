import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, App } from 'ionic-angular';
import { ProductListPage } from '../product-list/product-list';
import { CatelougeProvider } from '../../../providers/catelouge/catelouge';


/**
 * Generated class for the SubCategoryListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sub-category-list',
  templateUrl: 'sub-category-list.html',
})
export class SubCategoryListPage {

  segCode:any;
  data:any={};
  category:any;
  tempArr:any=[];

  subCatList:any = [];
  saveOriginalData:any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public serv: CatelougeProvider,public loadingCtrl:LoadingController,public alertCtrl:AlertController, public app:App) {

      this.segCode = navParams.get('code');
      this.getSubSegmentList();
  }

  getSubSegmentList()
  {
        let loading = this.loadingCtrl.create({
            spinner:'hide',
            content:`<img src="assets/imgs/loader.png"  class="rotate h45"/>`,
        });
        loading.present();  
        this.serv.getData({"segmentCode":this.segCode},"subsegment/list").then((resp)=>{
              loading.dismiss();
              console.log(resp);
              this.subCatList = resp['data'];
              this.tempArr = this.subCatList;
              this.saveOriginalData = JSON.parse(JSON.stringify(this.subCatList));
        });
  }

  doRefresh(event)
  {
        this.data.search = '';
        this.getSubSegmentList();
        setTimeout(() => {
          console.log('Async operation has ended');
          event.complete();
        }, 200);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SubCategoryListPage');
  }

  Seeproduct(subSegCode){
    // this.data.search = '';
    // this.onClearSearchHandler();
    console.log(subSegCode);
    this.navCtrl.push(ProductListPage,{SegCode:this.segCode,subSegCode:subSegCode});
  }

onSearchChangeHanlder() {
    setTimeout(() => {
       if(this.data.search) {
            const filterColumnArr = ['text'];
            this.subCatList =  this.serv.onListSearchFilterCatalogue(this.saveOriginalData, this.data.search, filterColumnArr);
       } else {
           this.subCatList = JSON.parse(JSON.stringify(this.saveOriginalData));
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
            this.subCatList = JSON.parse(JSON.stringify(this.saveOriginalData));
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
