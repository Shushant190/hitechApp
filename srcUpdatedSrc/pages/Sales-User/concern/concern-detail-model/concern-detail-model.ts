import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ViewController } from 'ionic-angular';
import { CatelougeProvider } from '../../../../providers/catelouge/catelouge';
import { DetailConcernPage } from '../detail-concern/detail-concern';

/**
 * Generated class for the ConcernDetailModelPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-concern-detail-model',
  templateUrl: 'concern-detail-model.html',
})
export class ConcernDetailModelPage {
  category:any;
  concernId:any;
  status:any = {}
  constructor( public viewCtrl: ViewController, public loadingCtrl:LoadingController,public navCtrl: NavController, public navParams: NavParams,public serve:CatelougeProvider) {
    this.category = this.navParams.get("category");
    this.concernId= this.navParams.get("concernId");
    console.log(this.category);
    this.productInformation();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConcernDetailModelPage');
  }

  categorydetail:any=[];
  productInfo:any=[];
  productInformation()
  {

    let loading = this.loadingCtrl.create({
      spinner:'hide',
      content:`<img src="assets/imgs/loader.png"  class="rotate h45"/>`,
    });

    loading.present();




    this.serve.getData( {concernId:this.concernId},'concern/list').then((response)=>{
      console.log(response);

      setTimeout(()=>{
        loading.dismiss();
      }, 2000)
      this.categorydetail=response['data'][0];
      console.log(this.categorydetail);
      this.productInfo = this.categorydetail['productConcerns'];
      console.log(this.productInfo);

  


    })
  }

  closeConcernPopUp()
  {
    this.viewCtrl.dismiss(DetailConcernPage);
  }

  a()
  {
    console.log(this.status)
  }
}
