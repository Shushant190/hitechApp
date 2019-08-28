import { Component } from '@angular/core';
import { IonicPage, NavController,ViewController, AlertController, LoadingController, ToastController, NavParams, Row } from 'ionic-angular';
import { IfObservable } from 'rxjs/observable/IfObservable';
import { PopoverController } from 'ionic-angular';
import { CategoryActionPophoverComponent } from '../../../components/category-action-pophover/category-action-pophover';
import { jsonpFactory } from '@angular/http/src/http_module';

/**
* Generated class for the OrderDetailModelPage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/

@IonicPage()
@Component({
  selector: 'page-order-detail-model',
  templateUrl: 'order-detail-model.html',
})

export class OrderDetailModelPage {
  
  pageSrc:any;
  category:any;
  productList:any=[]

  storedProductList:any = [];
  finalProductList:any=[];



  searchArr= {src: 'orderItemModel', name: ''};
  data:any = {};
  
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public viewCtrl: ViewController,
    public alertCtrl : AlertController,
    private loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public popoverCtrl: PopoverController) {
      
      this.pageSrc=this.navParams.get('src');
      this.category=this.navParams.get('category');
      this.productList=this.navParams.get('productList');
      
      if(this.pageSrc == 'orderDetail') {
        
          console.log(this.category);
          console.log(this.productList[0]['productArray']);
          
          this.finalProductList= JSON.parse(JSON.stringify(this.productList[0]['productArray']));
          console.log(this.finalProductList); 
      }
      
      if(this.pageSrc == 'addCart') {
        
          console.log(this.category);
          console.log(this.productList);
          
          this.finalProductList = [];
          
          for (let index = 0; index < this.productList.length; index++) {
            
              if(this.productList[index].category == this.category) {
                  
                  this.productList[index].partNumberCode = this.productList[index].partNumber;
                  this.productList[index].price = this.productList[index].itemValue;
                  this.productList[index].isQtyEdit = false;
                  
                  this.finalProductList.push(this.productList[index]);
              }
          }
          console.log(this.finalProductList); 
      }

        this.storedProductList = JSON.parse(JSON.stringify(this.finalProductList));
      
    }
    
    
    onQtyChangeHandler(productId) {
      
      const productIndex = this.finalProductList.findIndex(row => row.productId == productId);
      
      if(this.finalProductList[productIndex].tempQty < 0) {
        this.finalProductList[productIndex].tempQty = 0;
      }
    }
    
    
    saveUpdatedQty(productId) {
      
      const productIndex = this.finalProductList.findIndex(row => row.productId == productId);
      
      const multiplier = this.finalProductList[productIndex].tempQty % this.finalProductList[productIndex].moq;
      
      
      if(!this.finalProductList[productIndex].tempQty || this.finalProductList[productIndex].tempQty==0) {
        
        let alert = this.alertCtrl.create({
          title: 'Alert',
          message: 'Qty Empty !',
          buttons: [
            {
              text: 'Ok',
              handler: () => {
                
              }
            }
          ]
        })
        
        alert.present();
        return;
      }
      
      
      if(multiplier !==0 ) {
        
        let alert = this.alertCtrl.create({
          title: 'Alert',
          message: 'Qty Must be multiplier of Min Qty',
          buttons: [
            {
              text: 'Ok',
              handler: () => {
                
              }
            }
          ]
        })
        
        alert.present();
        return;
        
      } else {
        
        this.finalProductList[productIndex].quantity = this.finalProductList[productIndex].tempQty; 
        this.finalProductList[productIndex].amount = this.finalProductList[productIndex].quantity * this.finalProductList[productIndex].itemValue;
        this.finalProductList[productIndex].isQtyEdit = false;
        
        let toast = this.toastCtrl.create({
          message: 'Quantity Updated Successfully!',
          duration: 2000
        });
        
        toast.present();
      }
      
    }
    
    
    onDeleteItemHandler(productId) {
      
      const productIndex = this.finalProductList.findIndex(row => row.productId == productId);
      
      let alert = this.alertCtrl.create({
        title: 'Confirm delete',
        message: 'Are you sure you want to delete?',
        buttons: [
          {
            text: 'No',
            handler: () => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Yes',
            handler: () => {
              
              this.finalProductList.splice(productIndex, 1);
              
              let toast = this.toastCtrl.create({
                message: 'Item Deleted!',
                duration: 2000
              });
              
              toast.present();
              
            }
          }
        ]
      })
      
      alert.present();    
    }
    
    ionViewDidLoad() {
      console.log('ionViewDidLoad OrderDetailModelPage');
    }
    
    onSearchChangeHandler() {
      
        console.log(this.data.search);

        if(this.data.search) {

              const finalProductList = this.storedProductList.filter(item => {

                  let isPartNumberMatch  = false;
                  let isCategoryMatch=false;
                  let isModelMatch = false;
    
                  let stringData;
    
                  if(item.partNumberCode && item.partNumberCode != null) {

                      stringData = (item.partNumberCode.toString()).toLowerCase();
                      isPartNumberMatch = stringData.indexOf(this.data.search.toLowerCase()) != -1;
                  }

                  if(item.category && item.category != null) {

                      stringData = (item.category.toString()).toLowerCase();
                      isCategoryMatch = stringData.indexOf(this.data.search.toLowerCase()) != -1;
                  }

                  if(item.model && item.model != null) {

                      stringData = (item.model.toString()).toLowerCase();
                      isModelMatch = stringData.indexOf(this.data.search.toLowerCase()) != -1;
                  }
    
                  if(isPartNumberMatch || isCategoryMatch || isModelMatch) {

                    return true;
                      
                  }  else {

                      return false;
                  }
            })


            this.finalProductList = JSON.parse(JSON.stringify(finalProductList));

        } else {

             this.finalProductList = JSON.parse(JSON.stringify(this.storedProductList));
        }

        console.log(this.data.search);
    }


    onRemoveSeachHandler() {


         setTimeout(() => {

             if(!this.data.search) {

                  let loading = this.loadingCtrl.create({
                      spinner:'hide',
                      content:`<img src="assets/imgs/loader.png"  class="rotate h45"/>`,
                  });
                  
                  loading.present();
          
                  setTimeout(() => {
                      loading.dismiss();
                  }, 1000);

                  this.finalProductList = JSON.parse(JSON.stringify(this.storedProductList));
             }

         }, 500);
    }

    
    CloseOrderDetail() {
      this.viewCtrl.dismiss(this.productList);
    }
    

    presentPopover(myEvent) {
      let popover = this.popoverCtrl.create(CategoryActionPophoverComponent);
      popover.present({
        ev: myEvent
      });
    }
    
  }
  