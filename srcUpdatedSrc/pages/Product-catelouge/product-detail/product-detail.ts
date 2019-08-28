import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, App } from 'ionic-angular';
import { EnquiryFormPage } from '../enquiry-form/enquiry-form';
// import { ProductListPage } from '../product-list/product-list';
import { SocialSharing } from '@ionic-native/social-sharing';
import { CatelougeProvider } from '../../../providers/catelouge/catelouge';
import {Storage} from '@ionic/storage';
/**
 * Generated class for the ProductDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-product-detail',
  templateUrl: 'product-detail.html',
})
export class ProductDetailPage {
  api:any;
  prodId:any;
  det:any=[];
  constructor(public socialSharing:SocialSharing,public navCtrl: NavController, public navParams: NavParams,public serv: CatelougeProvider,public loadingCtrl:LoadingController, public app: App,private storage:Storage) {
    this.prodId = navParams.get('id');
    this.prodDetail();
  }

  prodDetail()
  { 
      let loading = this.loadingCtrl.create({
      spinner:'hide',
      content:`<img src="assets/imgs/loader.png"  class="rotate h45"/>`,
    });
    this.serv.getValue(this.prodId,'product/detail/').then((resp)=>{
      loading.dismiss();
      console.log(resp);
      this.det=resp['data'];
      console.log(this.det);
      this.api=this.serv.url+"download/document/"
    });
    loading.present();
  }

  imgData:any;
  shareproduct()
  {
        if(this.det.documents.length==0){
           this.imgData='';
        } else {
           this.imgData= this.api+this.det.documents[0].documentId+'/'+'2';
        }

        console.log("Segment:"+this.det.segment+"\n"+"Subsegment:"+this.det.subSegment+"\n"+"Category:"+this.det.category+"\n"+"Product Name:  "+this.det.productName+ "\n"+"Oem:"+this.det.oem+"\n"+ "Part Number:"+this.det.partNumber+"\n"+"Price:"+this.det.mrp,null, this.imgData);

        this.socialSharing.share("Segment:"+this.det.segment+"\n"+"Subsegment:"+this.det.subSegment+"\n"+"Category:"+this.det.category+"\n"+"Product Name:  "+this.det.productName+ "\n"+"Oem:"+this.det.oem+"\n"+ "Part Number:"+this.det.partNumber+"\n"+"Price:"+this.det.mrp,null, this.imgData).then(() => {

            console.log("success"); 

        }).catch((e) => {
            console.log(e);
        });
  }

  doRefresh(event)
  {
    this.serv.getProductDetail(this.prodId).subscribe((resp)=>{
      console.log(resp);
      this.det=resp['data'];
      console.log(this.det);
      
    });
    setTimeout(() => {
      console.log('Async operation has ended');
      event.complete();
    }, 200);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductDetailPage');
  }

  enquiryNow(prodId){
    this.navCtrl.push(EnquiryFormPage,{prodId:prodId});
    // this.navCtrl.parent.selector(3,{prodId:prodId});
  }
  backToPrev()
  {
    this.navCtrl.pop();
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

    this.storage.get('token').then((token) => 
    {

         if(token && token != null) {

            if((activeView == 'SalesHomePage' || activeView == 'DistributionNetworkListPage' || activeView == 'OrderListPage' || activeView == 'SalesMenuPage') && (previuosView != 'SalesHomePage' && previuosView != 'DistributionNetworkListPage'  && previuosView != 'OrderListPage' && previuosView != 'SalesMenuPage')) {

                console.log(previuosView);
                this.navCtrl.popToRoot();
            }  
         } else {

              if((activeView == 'HomePage' || activeView == 'CatelougeListPage' || activeView == 'ContactPage' || activeView == 'EnquiryFormPage') && (previuosView != 'HomePage' && previuosView != 'CatelougeListPage'  && previuosView != 'ContactPage' && previuosView != 'EnquiryFormPage')) {
      
                console.log(previuosView);
                this.navCtrl.popToRoot();
              }

         }
    })
        
  }
  
}
