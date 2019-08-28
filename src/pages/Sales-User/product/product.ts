import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController, LoadingController, App } from 'ionic-angular';
import {Storage} from '@ionic/storage';
import { CatelougeProvider } from '../../../providers/catelouge/catelouge';
import { DetailProductPage } from '../detail-product/detail-product';


/**
* Generated class for the ProductPage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/

@IonicPage()
@Component({
  selector: 'page-product',
  templateUrl: 'product.html',
})
export class ProductPage {
  
  networkSegments:any=[];
  productList:any=[];
  api:any;
  segment:any=[];
  userId:any;
  segmentList:any=[];
  
  data:any = {};
  saveOriginalData:any = [];
  isRequestInProcess:any = false;
  
  
  constructor(public navCtrl: NavController,
              public toastCtrl: ToastController,  
              public navParams: NavParams,
              public storage:Storage,
              public service:CatelougeProvider,
              public loadingCtrl:LoadingController,
              public app: App) {
    
    this.storage.get('userId').then((userId)=>{
      console.log(userId);
      this.userId = userId;
    });
    
    this.isRequestInProcess = true;
    
    this.storage.get('segments').then((user)=>{
      
      console.log(user);
      for (var i=0; i<user.length; i++)
      {
        this.segmentList.push(user[i].segment);
      }
      console.log(this.segmentList);
      this.getProductList(this.segmentList);
      
    });
    
    this.storage.get('networkSegments').then((networkSegments) => 
    { 
      console.log(networkSegments);
      
      console.log(this.networkSegments);
      if(networkSegments && networkSegments.length !=0)
      {
        for(let i=0;i<networkSegments.length;i++)
        {
          this.networkSegments.push(networkSegments[i]['segment']);
        }
        if(this.networkSegments.length !=0)
        {
          // this.getProductList();
          
        }
      }
    })
    
    this.api=this.service.url+"download/document/"
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductPage');
  }
  
  g_view:boolean=false;
  
  changeView()
  {
    console.log("changeview");
    
    this.g_view = !this.g_view;
  }
  
  
  
  getProductList(segList)
  {
    let loading = this.loadingCtrl.create({
      spinner:'hide',
      content:`<img src="assets/imgs/loader.png"  class="rotate h45"/>`,
    });
    
    loading.present();
    
    
    console.log(segList);
    console.log("hello", this.userId);
    
    this.service.getData({'segments':segList,'currentPage':1, 'pageSize':200},'product/list').then((result)=>{
      // this.service.getData(segmentList,"product/list").then((result)=>{
      console.log(result);
      
      this.isRequestInProcess = false;
      
      setTimeout(() => {
        
        loading.dismiss();
        
      }, 1000);
      
      if(result['status']=="Success")
      {
        this.productList=result['data'];
        console.log(this.productList);
      } else {
        this.productList = [];
      }
      
      this.saveOriginalData = JSON.parse(JSON.stringify(this.productList));
    })
  }
  
  seeProductdetail(id)
  {
    console.log("hello");
    
    // this.data.search = '';
    // this.onClearSearchHandler();
    
    this.navCtrl.push(DetailProductPage,{productId:id});
  }
  
  onSearchChangeHanlder() {
    
      setTimeout(() => {
        
        if(this.data.search) {
          
          const filterColumnArr = ['productName', 'partNumber', 'mrp'];
          
          this.productList =  this.service.onListSearchFilterCatalogue(this.saveOriginalData, this.data.search, filterColumnArr);
          
        } else {
          
          this.productList = JSON.parse(JSON.stringify(this.saveOriginalData));
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
            
            this.productList = JSON.parse(JSON.stringify(this.saveOriginalData));
            
            setTimeout(() => {  
              loading.dismiss(); 
            }, 500);
        }
        
      }, 500);
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

  doRefresh(event) {
    console.log('Begin async operation');
    
    this.data.search = '';
    this.getProductList(this.segmentList);
    
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
