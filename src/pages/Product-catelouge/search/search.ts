import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { CatelougeListPage } from '../catelouge-list/catelouge-list';
import { ProductListPage } from '../product-list/product-list';
// import { ProductDetailPage } from '../product-detail/product-detail';

/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage() 
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public app:App) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }
  
  // goToProductDetailPage(id) {
  //   this.navCtrl.push(ProductDetailPage,{p_id:id});
  // } 

  gotoCategory()
  { this.navCtrl.push(CatelougeListPage); }

  gotoProduct()
  { this.navCtrl.push(ProductListPage); }


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
