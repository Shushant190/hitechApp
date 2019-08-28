
import { ImagePopupPage } from '../../concern/image-popup/image-popup';
import { AddCartProductPage } from '../add-cart-product/add-cart-product';
import { Component } from '@angular/core';
import { IonicPage, NavController,AlertController,ModalController,NavParams, LoadingController, Loading, ToastController } from 'ionic-angular';
import { CatelougeProvider } from '../../../../providers/catelouge/catelouge';
import {Storage} from '@ionic/storage';
import * as moment from 'moment';

/**
 * Generated class for the AddConcernPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-concern',
  templateUrl: 'add-concern.html',
})
export class AddConcernPage {
concern_form:any={};
isStep1:boolean=false;
isStep1Process:boolean=false;
isStep2:boolean=false;
isStep2Process:boolean=false;
isStep3:boolean=false;
isStep3Process:boolean=false;
segmentList:any=[];
tmp_segmentList:any=[];
userNetworks:any=[];
distributorList:any=[];
  constructor(public alertCtrl: AlertController,  public serve : CatelougeProvider,
    public store:Storage, public loadingCtrl:LoadingController, public toastCtrl: ToastController,public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
      this.store.get('segments').then((segments)=>{
        console.log(segments);
        this.segmentList = segments;
      });
      this.store.get('userNetworks').then((userNetworks)=>{
        console.log(userNetworks);
        this.userNetworks = userNetworks;
      });
      
    }

  ionViewDidLoad() {
    this.isStep1=true;
    console.log('ionViewDidLoad AddConcernPage');
  }

  Next1(){
    this.isStep1=false;
    this.isStep2=true;
    console.log("hello1");
    
  }

  goToImageData() {
    const modal = this.modalCtrl.create(ImagePopupPage);
    modal.present();
}

  
goToCart() {
  this.navCtrl.push(AddCartProductPage);
}

}
