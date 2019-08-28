import { Component } from '@angular/core';
import { IonicPage,ToastController, NavController, NavParams, LoadingController, ViewController, Navbar, Loading } from 'ionic-angular';
import { CatelougeProvider } from '../../providers/catelouge/catelouge';
import {Storage} from '@ionic/storage';
import { OrderListPage } from '../../pages/Sales-User/order/order-list/order-list';

/**
 * Generated class for the OrderStatusPophoverComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */

@Component({
  selector: 'order-status-pophover',
  templateUrl: 'order-status-pophover.html'
})

export class OrderStatusPophoverComponent {

    text: string;

    dealerStatus:any;
    companyStatus:any;

    orderList:any;
    userId:any;

    saveOriginalData:any = [];

    constructor(public loadingCtrl: LoadingController,
                public service:CatelougeProvider,
                public viewCtrl: ViewController,
                public navctrl:NavController,
                public storage:Storage) {
      
        console.log('Hello OrderStatusPophoverComponent Component');
        this.text = 'Hello World';

        this.storage.get('userId').then((userId) => 
        { 
              console.log(userId);
              this.userId=userId;
        })
    }


    onOrderTypeHandler(orderType) {
        this.viewCtrl.dismiss({data:orderType})

    //       if(orderType == 'All') {

    //            this.dealerStatus = 0;
    //            this.companyStatus = 0;

    //       } else if(orderType == 'Pending') {

    //            this.dealerStatus = 0;
    //            this.companyStatus = 1; 

    //       } else if(orderType == 'Approve') {

    //            this.dealerStatus = 3;
    //            this.companyStatus = 2;

    //       } else if(orderType == 'Hold') {

    //            this.dealerStatus = 0;
    //            this.companyStatus = 3; 

    //       } else if(orderType == 'Reject') {

    //            this.dealerStatus = 4;
    //            this.companyStatus = 4; 
    //       }   

    //       const apiData = {

    //            userId: this.userId,
    //            networkId: undefined,
    //            currentPage:1,
    //            pageSize:100,
    //            dealerStatus: this.dealerStatus,
    //            companyStatus: this.companyStatus
    //       };

    //       const loading = this.loadingCtrl.create({
    //           spinner:'hide',
    //           content:`<img src="assets/imgs/loader.png"  class="rotate h45"/>`,
    //       });

    //       loading.present();

    //       this.service.getData(apiData,"order/list").then((result)=>{
            
    //             console.log(result); 
    //             loading.dismiss();

    //             if(result['status']=='Success')
    //             {
    //                   if(this.companyStatus == 1) {
                
    //                         const orderData = [];
                            
    //                         for (let index = 0; index < result['data'].length; index++) {
                              
    //                             if(result['data'][index].dealerStatus != 4 ) {
    //                                 orderData.push(result['data'][index]);
    //                             }
    //                         }
                            
    //                         this.orderList = orderData;

    //                   } else {
                        
    //                       this.orderList = result['data'];
    //                   }

    //             } else {

    //                   this.orderList = [];
    //             }


    //             if(this.dealerStatus == 4 || this.companyStatus == 4)
    //             {
    //                 this.getRejectedOrderList(4, orderType);

    //             } else {

    //                 this.saveOriginalData = JSON.parse(JSON.stringify(this.orderList));
    //                 this.viewCtrl.dismiss({saveOriginalData: this.saveOriginalData, orderData:this.orderList, orderType: orderType });
    //             }
                
    //             console.log(this.orderList);
    //       })
    }


    // getRejectedOrderList(status, orderType) {

    //         const loadingData = this.loadingCtrl.create({
    //           spinner:'hide',
    //           content:`<img src="assets/imgs/loader.png"  class="rotate h45"/>`,
    //         });

    //         loadingData.present();
            
    //         let apiData = {
    //                     networkId: undefined,
    //                     userId: this.userId ,
    //                     dealerStatus:status, 
    //                     companyStatus:0, 
    //                     currentPage:1, 
    //                     pageSize:200
    //                 };

    //         this.service.getData(apiData,"order/list").then((result)=>{

    //               console.log(result); 

    //               loadingData.dismiss();
  
    //               if(result['status']=='Success')
    //               {
    //                     const orderData = [];
    //                     for(let i=0; i < result['data'].length; i++)
    //                     {
    //                         let isExist = this.orderList.findIndex(row=>row.orderId==result['data'][i]['orderId']);
                            
    //                         console.log(isExist);
    //                         if(isExist === -1)
    //                         {
    //                              orderData.push(result['data'][i]);
    //                         }
    //                     }

    //                     setTimeout(()=>{

    //                         this.orderList = this.orderList.concat(orderData);

    //                     },200);
    //               }

    //               this.saveOriginalData = JSON.parse(JSON.stringify(this.orderList));
    //               this.viewCtrl.dismiss({saveOriginalData: this.saveOriginalData,orderData:this.orderList, orderType: orderType });
               
    //               console.log(this.orderList);
    //       })
    // }

}
