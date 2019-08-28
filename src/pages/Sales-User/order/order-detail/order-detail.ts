import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ModalController, Row, App } from 'ionic-angular';
import { CatelougeProvider } from '../../../../providers/catelouge/catelouge';
import {Storage} from '@ionic/storage';
import { OrderDetailModelPage } from '../../order-detail-model/order-detail-model';


/**
* Generated class for the OrderDetailPage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/

@IonicPage()
@Component({
  selector: 'page-order-detail',
  templateUrl: 'order-detail.html',
})
export class OrderDetailPage {
  
  orderId:any;
  orderDetail:any=[];
  userType:any;
  data:any;

  constructor(public navCtrl: NavController,
              public storage:Storage,
              public alertCtrl: AlertController, 
              public navParams: NavParams,
              public service:CatelougeProvider,
              public loadingCtrl:LoadingController,
              public modalCtrl: ModalController,
              public app: App) {
    
    this.orderId=this.navParams.get('orderId');
    console.log(this.orderId);
    if(this.orderId)
    {
      this.getOrderDetail();
    }

    this.storage.get('userType').then((userType) => 
    { 
      console.log(userType);
      this.userType=userType;
    });
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderDetailPage');
  }
  tag:any;
  orederDetails:any=[];
  categoryArr:any=[];
  FinelArray:any=[];
  
  getOrderDetail()
  {

    let loading = this.loadingCtrl.create({
      spinner:'hide',
      content:`<img src="assets/imgs/loader.png"  class="rotate h45"/>`,
    });
    
    loading.present();

    this.service.getData({"orderId": this.orderId,"currentPage": 1,"pageSize": 50},"order/list").then((result)=>{
      console.log(result);

      setTimeout(() => {

          loading.dismiss();
        
      }, 1000);

      if(result['status']=="Success")
      {
        this.orderDetail=result['data'][0];
        // orderItemDetail
        this.orederDetails= result['data'][0]['orderDetail'];
        console.log(this.orederDetails);
        
        
        // console.log(this.FinelArray);
        for(var i =0; i<this.orederDetails.length; i++)
        {
          const indexExist = this.categoryArr.findIndex(row=>row.category == this.orederDetails[i].category);
          console.log(indexExist);

          if(indexExist == -1)
          {
            this.categoryArr.push({"category":this.orederDetails[i].category,"productArray":[this.orederDetails[i]]});

            console.log(this.categoryArr);

          } else {
            this.categoryArr[indexExist].productArray.push(this.orederDetails[i]); 
          }

        }
        
        
        console.log(this.categoryArr);
        this.tag=this.orderDetail['establishment'][0];
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
  
  orderStatusUpdate(id,status)
  {
    this.lodingPersent();
    console.log(id);
    console.log(status);
    
    console.log("order Update");
    
    this.service.getData({"orderId": id,"status": status,"statusFor": 2},"order/updatestatus").then((result)=>{
      console.log(result);
      if(result['status']=="Success")
      {
        this.orderDetail.dealerStatus=status;
        this.showSuccess("Order Status Update");
      }
    })
  }
  
  showSuccess(text) {
    let alert = this.alertCtrl.create({
      title: 'Success!',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present();
  }

  
  showError(text) {
    
    let alert = this.alertCtrl.create({
      title: 'Error!',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present();
  }
  
  goToAddorderDetailModel(category) {
    
    const modal = this.modalCtrl.create(OrderDetailModelPage,{src: 'orderDetail', 'category': category,'productList':this.categoryArr});
    modal.present();
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

        if((activeView == 'SalesHomePage' || activeView == 'DistributionNetworkListPage' || activeView == 'OrderListPage' || activeView == 'SalesMenuPage') && (previuosView != 'SalesHomePage' && previuosView != 'DistributionNetworkListPage'  && previuosView != 'OrderListPage' && previuosView != 'SalesMenuPage')) {

            console.log(previuosView);
            this.navCtrl.popToRoot();
        }
  }
  
  
}
