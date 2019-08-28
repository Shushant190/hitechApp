import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
// import { SessionProvider } from '../session/session';
import {Storage} from '@ionic/storage';
import 'rxjs/add/operator/map';
import { AlertController, LoadingController } from 'ionic-angular';
import { CatelougeProvider } from '../catelouge/catelouge';

/*
Generated class for the OrderProvider provider.

See https://angular.io/guide/dependency-injection for more info on providers
and Angular DI.
*/

@Injectable()
export class OrderProvider {
    
    cartObj = {};
    
    constructor(public http: Http,public storage:Storage,
                public alertCtrl: AlertController, 
                public loadingCtrl:LoadingController,
                public service: CatelougeProvider ) {
        
        console.log('Hello Order Provider Provider');
        
        this.cartObj['cart']=[];
        this.cartObj['networkId']=0;
    }


    public saveOrderDetail(apiData, apiEndPoint) {

        return new Promise((resolve, reject) => {

            this.storage.get('token').then((token) => 
            {  
              let header = new Headers();
              header.append('Content-Type',"application/json");
              header.append('Authorization','Bearer '+token);
              console.log(token);
                  return this.http.post(this.service.url + apiEndPoint,JSON.stringify(apiData),{headers:header}).map(res=>res.json()).subscribe(response=> {
                    console.log(response);

                    if(response.status == 'Success') {

                        this.cartObj = {};
                        this.cartObj['cart']=[];
                        this.cartObj['networkId']=0;
                        this.setCartStorageData();
                    }

                    resolve(response);
                }, (err) => {

                    console.log(err); 
                    resolve(err);
                });
            });

          });
    }

    
    public addToCart(productId, category, productName, partNumber, segment, model, oem, moq, qty, amount, discountedListPrice, priceSupport, itemValue, gstPercent, gstAmount) {
        
        if( this.cartFind(productId) !== -1 ) {
            
            let itemIndex =  this.cartFind(productId);
            
            this.cartObj['cart'][itemIndex]['quantity'] = qty; 
            this.cartObj['cart'][itemIndex]['discountedListPrice'] = discountedListPrice; 
            this.cartObj['cart'][itemIndex]['priceSupport'] = priceSupport; 
            this.cartObj['cart'][itemIndex]['price'] = itemValue; 
            this.cartObj['cart'][itemIndex]['amount'] = amount; 
            this.cartObj['cart'][itemIndex]['gstPercentage'] = gstPercent; 
            this.cartObj['cart'][itemIndex]['gstamount'] = gstAmount; 
            
        } else {
            
                this.cartObj['cart'].push( 
                {  
                    "productId": productId,
                    "partNumber": partNumber , 
                    "productName": productName , 
                    "category": category, 
                    "segment": segment, 
                    "model": model,
                    "oem": oem,
                    "moq": moq, 
                    "quantity": qty , 
                    "discountedListPrice": discountedListPrice, 
                    "priceSupport": priceSupport, 
                    "price": itemValue, 
                    "amount": amount, 
                    "gstamount": gstAmount,
                    "gstPercentage": gstPercent
                } 
            );
        }

     
        this.setCartStorageData();
    
        return this.cartObj;
    }


    public cartFind(id) {
        
        var result=-1;
        for( var i = 0, len = this.cartObj['cart'].length; i < len; i++ ) {
            if( this.cartObj['cart'][i].productId === id ) {
                result = i;
                break;
            }
        }
        return result;
    }


    public cartDropItem(id) {
        
        let itemIndex = this.cartFind(id);

        this.cartObj['cart'].splice(itemIndex, 1);
        
        this.setCartStorageData();
        
        return this.cartObj; 
    }
    

    public saveCartInputQty(id, qty) {
        
        let itemIndex = this.cartFind(id);
        
        this.cartObj['cart'][itemIndex].cart_item_qty=qty;
        let rate = this.cartObj['cart'][itemIndex].cart_item_rate;
        let gstPercent = this.cartObj['cart'][itemIndex].cart_item_gst;
        
        let amount = qty * rate;
        let gst_amount = +(amount * (gstPercent/100)).toFixed(2);
        let total_amount = amount + gst_amount;
        
        this.cartObj['cart'][itemIndex].cart_item_amount = amount; 
        this.cartObj['cart'][itemIndex].cart_item_gst_amount = gst_amount; 
        this.cartObj['cart'][itemIndex].cart_item_total_amount = total_amount; 
        
        let totalQty =0;
        let subTotal =0;
        let gstAmount = 0;
        let orderTotal = 0;
        
        for( var i = 0, len = this.cartObj['cart'].length; i < len; i++ ) 
        {
            totalQty += this.cartObj['cart'][i].cart_item_qty;
            subTotal += this.cartObj['cart'][i].cart_item_amount;
            gstAmount +=  this.cartObj['cart'][i].cart_item_gst_amount;
            orderTotal += this.cartObj['cart'][i].cart_item_total_amount;
        }
        
        this.cartObj['total_qty'] = totalQty; 
        this.cartObj['sub_total'] = +(subTotal).toFixed(2);
        this.cartObj['gst_amount'] = +(gstAmount).toFixed(2); 
        this.cartObj['order_total'] = +(orderTotal).toFixed(2);
        
        this.setCartStorageData();
    }
    

    public setCartStorageData() {
        
        console.log(this.cartObj);
        this.storage.set('cartStorage', this.cartObj);
    }


    public emptyCartStorageData(networkId, companyName, orderId) {
        
        this.cartObj = {};
        this.cartObj['cart']=[];
        
        this.cartObj['networkId']=networkId;
        this.cartObj['order_id']=orderId;
        
        this.setCartStorageData();
        
        console.log(this.cartObj);
    }


    public setCartServiceData() {
        
        this.storage.get('cartStorage').then((cartObj)=>{
            this.cartObj = cartObj;
            console.log(cartObj);
            console.log(this.cartObj);
        });
    }


    public onGetLoginUserDetail () {

        return new Promise((resolve, reject) => {
         
            this.storage.get('user').then(userData => {
                 resolve(userData);
            })
        })
    }

}
