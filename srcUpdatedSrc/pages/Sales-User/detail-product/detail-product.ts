import { Component } from '@angular/core';
import { IonicPage, AlertController,NavController, NavParams, LoadingController ,ToastController} from 'ionic-angular';
import { CatelougeProvider } from '../../../providers/catelouge/catelouge';
import { SocialSharing } from '@ionic-native/social-sharing';
/**
 * Generated class for the DetailProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-detail-product',
  templateUrl: 'detail-product.html',
})
export class DetailProductPage {

  productId:any;
  prodcuDetail:any=[];
  api:any;

  constructor(   private socialSharing: SocialSharing,public alertCtrl: AlertController,public toastCtrl: ToastController,public navCtrl: NavController, public navParams: NavParams,public service:CatelougeProvider,public loadingCtrl:LoadingController)
   {

    this.productId=this.navParams.get("productId");
    if(this.productId)
    {
      console.log(this.productId);
      
      this.getProductDetail()
    }
    
    this.api=this.service.url+"download/document/";
  }
  imgData:any;
  shareproduct()
{
  if(this.prodcuDetail.documents.length!=0){
    this.imgData= this.api+this.prodcuDetail.documents[0].documentId+'/'+'2';
  }
  else{
    this.imgData='';
  }
  this.socialSharing.share("Segment:"+this.prodcuDetail.segment+"\n"+"Subsegment:"+this.prodcuDetail.subSegment+"\n"+"Category:"+this.prodcuDetail.category+"\n"+"Product Name:  "+this.prodcuDetail.productName+ "\n"+"Oem:"+this.prodcuDetail.oem+"\n"+
    "Part Number:"+this.prodcuDetail.partNumber+
    "\n"+"Price:"+this.prodcuDetail.mrp,
    null,
    this.imgData
    ).then(() => {
      console.log("success"); 
    }).catch((e) => {
      console.log(e);
  });
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
  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailProductPage');
  }
  backToPrev()
  {
    this.navCtrl.pop();
  }
  
  getProductDetail()
  {
    this.lodingPersent();
    console.log("hello");
    this.service.getValue("","product/detail/"+this.productId).then((result)=>{
      console.log(result);
      if(result['status']=="Success")
      {
        this.prodcuDetail=result['data'];
      }
      
    })
  }

  lodingPersent()
  {
    let loading = this.loadingCtrl.create({
      spinner:'hide',
      content:`<img src="assets/imgs/loader.png"  class="rotate h45"/>`,
    });
    loading.present();
    setTimeout(() => {
      loading.dismiss();
     }, 1500);
  }
}
