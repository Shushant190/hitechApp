import { Component,ViewChild,ElementRef,OnInit,NgZone  } from '@angular/core';
import { IonicPage, NavController, ToastController,NavParams, LoadingController, App, Content, ViewController, Platform } from 'ionic-angular';
import { OrderDetailPage } from '../order-detail/order-detail';
import { CatelougeProvider } from '../../../../providers/catelouge/catelouge';
import {Storage} from '@ionic/storage';
import { PopoverController } from 'ionic-angular';
import { OrderStatusPophoverComponent } from '../../../../components/order-status-pophover/order-status-pophover';
import * as moment from 'moment';


@IonicPage()
@Component({
  selector: 'page-order-list',
  templateUrl: 'order-list.html',
})

export class OrderListPage {

  
  @ViewChild(Content) content: Content;
  
  userId:any;
  userType:any;
  orderList:any=[];
  orderType:any = [];
  
  data:any={};
  isRequestInProcess:any = true;
  saveOriginalData:any = [];


  url:any;
  sendingData:any= {}
  currentPage:any = 1;





  
  constructor(public toastCtrl: ToastController,
              public navCtrl: NavController, 
              public navParams: NavParams,
              public service:CatelougeProvider,
              public storage:Storage,
              public loadingCtrl:LoadingController, 
              public popoverCtrl: PopoverController,
              public app: App,private zone: NgZone,
              public viewCtrl: ViewController,
              public platform: Platform,
              
              ) {

              
    
    this.storage.get('userType').then((userType) => 
    { 
      console.log(userType);
      this.userType=userType;
      if(userType==3)
      {
          this.storage.get('networkId').then((networkId) => 
          { 
              console.log(networkId);
              this.userId=networkId;
              this.getOrderList();
          })
      }
      
      if(userType==2)
      {
        this.storage.get('userId').then((userId) => 
        { 
          console.log(userId);
          this.userId=userId;
          this.orderType = 'Pending';
          this.getOrderList();
        })
      }
    })

  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderListPage');
  }
  
  goOnDetailPage(id){
    
    // this.data.search = '';
    // this.onClearSearchHandler();
    this.navCtrl.push(OrderDetailPage,{'orderId':id})
  }
  
  getOrderList()
  {

    let loading = this.loadingCtrl.create({
       spinner:'hide',
       content:`<img src="assets/imgs/loader.png"  class="rotate h45"/>`,
    });
    
    loading.present();
    this.isRequestInProcess = true;
    if(this.userType==2)
    {
        console.log(this.userType);
        this.service.getData({
            userId:this.userId, 
            networkId: undefined,
            dealerStatus: 0,
            companyStatus: 0,
            currentPage: this.currentPage,

            pageSize: this.service.pagesize },"order/list").then((result)=>{
            
                console.log(result);
                
                this.isRequestInProcess = false;
                
                setTimeout(() => {
                  
                  loading.dismiss();
                  
                }, 1000);
                
                const orderData = [];
                
                if(result['data'].length!='')
                
                {
                  for (let index = 0; index < result['data'].length; index++) {
                  
                    if(result['data'][index].dealerStatus != 4 ) {

                        orderData.push(result['data'][index]);
                    }

            }
                }

                else{
                  result['data'] = [];
                }

              
                
                this.orderList = orderData;

                this.saveOriginalData = JSON.parse(JSON.stringify(this.orderList));

                this.setOrderStatusTextHandler();

          })
          
      } else if(this.userType==3) {
        
            console.log(this.userType);
            
            this.service.getData({"networkId":this.userId},"order/list").then((result)=>{
              
                  console.log(result);
                  
                  this.isRequestInProcess = false;
                  
                  setTimeout(() => {
                    
                    loading.dismiss();
                    
                  }, 1000);
                  
                  if(result['status']=='Success')
                  {
                    this.orderList=result['data'];
                    
                  } else {
                    
                    this.orderList = [];
                  }

                  this.saveOriginalData = JSON.parse(JSON.stringify(this.orderList));
                  this.setOrderStatusTextHandler();
            })
      }
       
    }


    setOrderStatusTextHandler() {

           for (let index = 0; index < this.saveOriginalData.length; index++) {

                this.saveOriginalData[index]['createdTextDate'] =  moment(this.saveOriginalData[index].createdOn).format('DD MMM YYYY'); 
            
                if(this.saveOriginalData[index].dealerStatus == 1) {

                     this.saveOriginalData[index].dealerTextStatus = 'Draft';
                  
                } else if(this.saveOriginalData[index].dealerStatus == 2) {
                    
                     this.saveOriginalData[index].dealerTextStatus = 'Pending';
                    
                  
                } else if(this.saveOriginalData[index].dealerStatus == 3) {

                      this.saveOriginalData[index].dealerTextStatus = 'Approved';
                } 


                if(this.saveOriginalData[index].companyStatus == 1) {

                    this.saveOriginalData[index].companyTextStatus = 'Pending';
              
                } else if(this.saveOriginalData[index].companyStatus == 2) {
                    
                    this.saveOriginalData[index].companyTextStatus = 'Approved';
                    
                } else if(this.saveOriginalData[index].companyStatus == 3) {

                    this.saveOriginalData[index].companyTextStatus = 'Hold';
                }
           }
    }

    
    doRefresh(event) {
      
      console.log('Begin async operation');

      this.data.search = '';

      this.orderType = 'Pending';
      this.getOrderList();
      
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
    
    
    onSearchChangeHanlder() {
      
        setTimeout(() => {
          
            if(this.data.search) {
              
              const filterColumnArr = ['establishment','orderNumber', 'quantity', 'amount', 'dealerTextStatus', 'companyTextStatus', 'createdTextDate'];
              
              console.log(this.saveOriginalData);
              console.log(this.data.search);

              this.orderList =  this.service.onListSearchFilterCatalogue(this.saveOriginalData, this.data.search, filterColumnArr);
              
            } else {
              
              this.orderList = JSON.parse(JSON.stringify(this.saveOriginalData));
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
            
            this.orderList = JSON.parse(JSON.stringify(this.saveOriginalData));
            
            setTimeout(() => {  
              loading.dismiss(); 
            }, 500);
          }
          
        }, 500);
    }
    componentVariable:any;
    

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
  
        


    
  show:any='';
  scrollToTop() {
    this.content.scrollToTop();
  }
  
  
  ngAfterViewInit() {
    this.content.ionScroll.subscribe((data)=>{
      this.zone.run(() => {
        if(data.scrollTop > 180){
          this.show=true;
        }else{
          this.show=false;
        }
      });
    });
  }
  



  // component Code 


  dealerStatus:any;
  companyStatus:any;
  orderTypeComponent = 'All'
  colorClass:any = 1;
  orderTabsValue:any;
  myTabsValueData:any=[];
  variableForScroll = false;


  TabsValue:any = 1 ;
  
     onOrderTypeHandler(orderTypeComponent, tabValue) {
        this.TabsValue = tabValue;
        
        console.log(this.TabsValue);
      this.orderTabsValue = orderTypeComponent;
      this.currentPage = 1;
      console.log(orderTypeComponent);
      console.log("===================== onOrderTypeHandler  COMPONENT  FUNCTION =====================")
          if(orderTypeComponent == 'All') {

               this.dealerStatus = 0;
               this.companyStatus = 0;

          } else if(orderTypeComponent == 'Pending') {

               this.dealerStatus = 0;
               this.companyStatus = 1; 

          } else if(orderTypeComponent == 'Approve') {

               this.dealerStatus = 3;
               this.companyStatus = 2;

          } else if(orderTypeComponent == 'Hold') {

               this.dealerStatus = 0;
               this.companyStatus = 3; 

          } else if(orderTypeComponent == 'Reject') {

               this.dealerStatus = 4;
               this.companyStatus = 0; 
          }   

          const apiData = {

               userId: this.userId,
               networkId: undefined,
               currentPage:this.currentPage,
               pageSize:this.service.pagesize,
               dealerStatus: this.dealerStatus,
               companyStatus: this.companyStatus
          };

          const loading = this.loadingCtrl.create({
              spinner:'hide',
              content:`<img src="assets/imgs/loader.png"  class="rotate h45"/>`,
          });

          loading.present();
            console.log(apiData);
          this.service.getData(apiData,"order/list").then((result)=>{
            
                console.log(result); 
                loading.dismiss();

                this.currentPage += 1;

                if(result['status']=='Success')
                {
                      if(this.companyStatus == 1) {
                
                            const orderData = [];
                            
                            for (let index = 0; index < result['data'].length; index++) {
                              
                                if(result['data'][index].dealerStatus != 4 ) {
                                    orderData.push(result['data'][index]);
                                }
                            }
                            
                            this.orderList = orderData;
                            console.log(this.orderList);

                      } else {
                        
                          this.orderList = result['data'];

                          console.log(this.orderList);

                      }

                } else {

                      this.orderList = [];
                }


                if(this.dealerStatus == 4 || this.companyStatus == 4)
                {
                    this.getRejectedOrderList(4, orderTypeComponent);

                } else {

                    this.saveOriginalData = JSON.parse(JSON.stringify(this.orderList));
                    // this.viewCtrl.dismiss({saveOriginalData: this.saveOriginalData, orderData:this.orderList, orderType: orderTypeComponent });
                }
                
                console.log(this.orderList);
          })
    }

    orderListnewData:any = [];


    
    InfiniteScrollFunction(infiniteScroll) {

                if(this.orderTabsValue == 'All') {
      
                     this.dealerStatus = 0;
                     this.companyStatus = 0;
      
                } else if(this.orderTabsValue == 'Pending') {
      
                     this.dealerStatus = 0;
                     this.companyStatus = 1; 
      
                } else if(this.orderTabsValue == 'Approve') {
      
                     this.dealerStatus = 3;
                     this.companyStatus = 2;
      
                } else if(this.orderTabsValue == 'Hold') {
      
                     this.dealerStatus = 0;
                     this.companyStatus = 3; 
      
                } else if(this.orderTabsValue == 'Reject') {
      
                     this.dealerStatus = 4;
                     this.companyStatus = 0; 
                }   
      
                const apiData = {
      
                     userId: this.userId,
                     networkId: undefined,
                     currentPage:this.currentPage,
                     pageSize:this.service.pagesize,
                     dealerStatus: this.dealerStatus,
                     companyStatus: this.companyStatus
                };
      
                this.service.getData(apiData,"order/list").then((result)=>{
                  
                      console.log(result); 

                      this.currentPage = this.currentPage+1; 

                     
                      if(result['status']=='Success')
                      {


                        this.myTabsValueData = result['data'];
                                      if(this.myTabsValueData !="" )
                                      {
                                          for(var i = 0; i< this.myTabsValueData.length; i++)
                                          {
                                            this.orderList.push(this.myTabsValueData[i]);
                                          }
                                      }
                                      else
                                      {
                                        this.orderList = [];
                                        infiniteScroll.complete();
                                        this.variableForScroll = true;
                                      }


                              

                            console.log("result Is There " , this.companyStatus);
                            if(this.companyStatus == 1) { //PENDING CONDOITION
                      
                                  const orderData = [];
                                  
                                  for (let index = 0; index < result['data'].length; index++) {
                                    
                                      if(result['data'][index].dealerStatus != 4 ) {
                                          orderData.push(result['data'][index]);
                                      }
                                  }
                                  
                                  this.orderList = orderData;
                            }
                            else {
                              
                                    
                                    console.log(this.orderList);
                                    infiniteScroll.complete();
                            }

                      } else {
                            // this.orderList = [];
                            infiniteScroll.complete();
                            this.variableForScroll = true;
                      }

                      // console.log(this.orderList);
      
                      if(this.dealerStatus == 4 || this.companyStatus == 4)
                      {
                          this.getRejectedOrderList(4, this.orderTabsValue);
      
                      } else {
      
                          this.saveOriginalData = JSON.parse(JSON.stringify(this.orderList));
                          // this.viewCtrl.dismiss({saveOriginalData: this.saveOriginalData, orderData:this.orderList, orderType: orderTypeComponent });
                      }

                      
                      
                      console.log(this.orderList);
                })
          }

          












    getRejectedOrderList(status, orderType) {

      const loadingData = this.loadingCtrl.create({
        spinner:'hide',
        content:`<img src="assets/imgs/loader.png"  class="rotate h45"/>`,
      });

      loadingData.present();
      
      let apiData = {
                  networkId: undefined,
                  userId: this.userId ,
                  dealerStatus:status, 
                  companyStatus:0, 
                  currentPage:this.currentPage, 
                  pageSize:200
              };

      this.service.getData(apiData,"order/list").then((result)=>{

            console.log(result); 

            loadingData.dismiss();

            if(result['status']=='Success')
            {
                  const orderData = [];
                  for(let i=0; i < result['data'].length; i++)
                  {
                      let isExist = this.orderList.findIndex(row=>row.orderId==result['data'][i]['orderId']);
                      
                      console.log(isExist);
                      if(isExist === -1)
                      {
                           orderData.push(result['data'][i]);
                      }
                  }

                  setTimeout(()=>{

                      this.orderList = this.orderList.concat(orderData);

                  },200);
            }

            this.saveOriginalData = JSON.parse(JSON.stringify(this.orderList));
            // this.viewCtrl.dismiss({saveOriginalData: this.saveOriginalData,orderData:this.orderList, orderType: orderType });
         
            console.log(this.orderList);
    })
}






  }
  