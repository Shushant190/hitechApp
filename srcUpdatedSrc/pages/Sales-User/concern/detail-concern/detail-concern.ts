import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, ModalController } from 'ionic-angular';
import { CatelougeProvider } from '../../../../providers/catelouge/catelouge';
import { ConcernDetailModelPage } from '../concern-detail-model/concern-detail-model';

/**
 * Generated class for the DetailConcernPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail-concern',
  templateUrl: 'detail-concern.html',
})
export class DetailConcernPage {
  concernId:any;
  myCateggoryName:any=[];
  categorydetail:any=[];
  productInfo:any=[];
  categoryArr:any=[];
  constructor( public modalCtrl:ModalController ,public toastCtrl: ToastController,public navCtrl: NavController, public serve : CatelougeProvider,  public loadingCtrl:LoadingController,public navParams: NavParams) {
    this.concernId = this.navParams.get("concernId");
    console.log(this.concernId)
    this.goToDetail();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailConcernPage');
  }



  
  goToDetail()
  {

    let loading = this.loadingCtrl.create({
      spinner:'hide',
      content:`<img src="assets/imgs/loader.png"  class="rotate h45"/>`,
    });

    loading.present();




      console.log(this.concernId);

      this.serve.getData( {concernId:this.concernId},'concern/list').then((response)=>{
        console.log(response);

        setTimeout(()=>{
          loading.dismiss();
        }, 2000)
 
        

        this.categorydetail=response['data'][0];
        console.log(this.categorydetail);
        this.productInfo = this.categorydetail['productConcerns'];
      
      for(var i =0; i<this.productInfo.length; i++)
      {
        const indexExist = this.categoryArr.findIndex(row=>row.category == this.productInfo[i].category);
        console.log(indexExist);

        if(indexExist == -1)
        {
          this.categoryArr.push({"category":this.productInfo[i].category,"amount":this.productInfo[i].netAmount,"productArray":[this.productInfo[i]]});

          console.log(this.categoryArr);

        } else {
          this.categoryArr[indexExist].productArray.push(this.productInfo[i]); 
        }

      }



      console.log(this.categoryArr);

      })



      

  }
  

  doRefresh(event) {
    console.log('Begin async operation');
    setTimeout(() => {
      console.log('Async operation has ended');
      event.complete();
    }, 3000);
    setTimeout(() => {
      this.presentToast();
    }, 3500);
  }
  presentToast() {
    let toast = this.toastCtrl.create({
      message: ' Refreshed Successfully',
      duration: 3000,
      position: 'bottom'
    });
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
    toast.present();
  }



  goToCategoryModel(category)
  {
    const modal = this.modalCtrl.create(ConcernDetailModelPage,{'category': category,"concernId":this.concernId});
    modal.present();
  }

}
