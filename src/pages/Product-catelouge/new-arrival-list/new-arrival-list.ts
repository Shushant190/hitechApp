import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, App } from 'ionic-angular';
import { ProductDetailPage } from '../product-detail/product-detail';
import { CatelougeProvider } from '../../../providers/catelouge/catelouge';

/**
 * Generated class for the NewArrivalListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-new-arrival-list',
  templateUrl: 'new-arrival-list.html',
})
export class NewArrivalListPage {
  api:any;
  data={};
  totProd:any;
  productList:any = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public serv: CatelougeProvider,public loadingCtrl:LoadingController, public app:App) {
    
    this.newArrivalProd();
  }

  newArrivalProd()
  {
    let loading = this.loadingCtrl.create({
      spinner:'hide',
      content:`<img src="assets/imgs/loader.png"  class="rotate h45"/>`,
    });
    // this.data = {"currentPage":1,"pageSize":500 };
    this.serv.getData({"currentPage":1,"pageSize":500 },'product/list').then(resp=>{
      loading.dismiss();
      console.log(resp);
      this.totProd = resp['recordsFound'];
      this.productList = resp['data'];
    });
    loading.present();
    this.api=this.serv.url+"download/document/"
  }

  g_view:boolean=false;

  changeView()
  {
    this.g_view = !this.g_view;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewArrivalListPage');
  }

  SeeProductDetail(id){
    this.navCtrl.push(ProductDetailPage,{id:id});
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
