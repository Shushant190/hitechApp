import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, Loading, ModalController } from 'ionic-angular';
import * as M from '../../../assets/materialize/js/materialize.min.js';
import { OrderProvider } from '../../../providers/order/order';
import {Storage, StorageConfigToken} from '@ionic/storage';
import { CatelougeProvider } from '../../../providers/catelouge/catelouge';
import { OrderListPage } from '../order/order-list/order-list';
import { OrderDetailModelPage } from '../order-detail-model/order-detail-model';
import * as moment from 'moment';

/**
* Generated class for the AddToCartPage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/

@IonicPage()
@Component({
  selector: 'page-add-to-cart',
  templateUrl: 'add-to-cart.html',
})
export class AddToCartPage {
  options = {};
  
  loading:Loading;
  orderId:any='';
  cartArr = {};

  orderCatArr:any = [];

  userId:any;
  networkId:any;

  distributorDetail:any = [];

  currentMonth:any= moment().format('M');
  allMonthArr:any = [];
  currentMonthTarget:any = {};

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private storage : Storage,  
              private loadingCtrl: LoadingController,
              private toastCtrl: ToastController,
              public orderServ: OrderProvider,
              public modalCtrl: ModalController) {


            if(this.navParams.get('networkId')) {
                this.networkId = this.navParams.get('networkId');
            }

            if(this.navParams.get('distributorDetail')) {
                 this.distributorDetail = this.navParams.get('distributorDetail');
            }
  }
  
  ngOnInit() {
      var elems = document.querySelectorAll('.collapsible');
      var instances1 = M.Collapsible.init(elems, this.options);

      this.allMonthArr = ['jan','feb','mar','apr','may','jun','jul', 'aug','sep','oct',  'nov','dec'];

      console.log(this.distributorDetail);
      console.log(this.allMonthArr[this.currentMonth-1]);


      this.currentMonthTarget['targetLimit'] = this.distributorDetail.networkLimits[0][this.allMonthArr[this.currentMonth-1]+'TargetLimit'];

      this.currentMonthTarget['targetAchieved'] = this.distributorDetail.networkLimits[0][this.allMonthArr[this.currentMonth-1]+'TargetAchieved'];

      this.currentMonthTarget['targetBalanced'] = this.distributorDetail.networkLimits[0][this.allMonthArr[this.currentMonth-1]+'TargetBalanced'];
  }
  
  ionViewDidLoad() {

    console.log('ionViewDidLoad AddToCartPage');

    this.storage.get('userId').then((userId)=>{

        console.log(userId);
        this.userId =userId;
        console.log( this.userId);
    });

    this.getCartStorageData();
  }

  getCartStorageData() {

      this.orderCatArr = [];

      this.storage.get('cartStorage').then((cartObj)=>{

          console.log(cartObj);

          this.cartArr = cartObj;

          let totalQty = 0;
          let subTotal = 0;
          let gstAmount = 0;
          let grandTotal =  0;

          for (let index = 0; index < this.cartArr['cart'].length; index++) {
           
                totalQty += this.cartArr['cart'][index].quantity;
                subTotal += this.cartArr['cart'][index].amount;
                gstAmount += this.cartArr['cart'][index].gstamount;
                grandTotal += this.cartArr['cart'][index].amount + this.cartArr['cart'][index].gstamount;

                const indexFound = this.orderCatArr.findIndex(row => row.category == this.cartArr['cart'][index].category);

                if(indexFound === -1) {

                      this.orderCatArr.push({category: this.cartArr['cart'][index].category, totalQty: this.cartArr['cart'][index].quantity, totalAmount: this.cartArr['cart'][index].amount});

                } else {

                      this.orderCatArr[indexFound].totalQty += this.cartArr['cart'][index].quantity;
                      this.orderCatArr[indexFound].totalAmount += this.cartArr['cart'][index].amount;
                }
          }

          this.cartArr['totalQty'] = totalQty;
          this.cartArr['subTotal'] = subTotal;
          this.cartArr['gstAmount'] = gstAmount;
          this.cartArr['grandTotal'] = grandTotal;

          console.log(this.cartArr);


      });
  }


  saveOrderHandler() {

      console.log(this.cartArr['subTotal']);
      console.log(this.cartArr['grandTotal']);

      const apiData = {'shippingAddressId':1,"remarks":'',"dealerStatus": 2,"companyStatus": 1,"networkId":this.networkId,"orderDetail":this.cartArr['cart'],"createBy":this.userId,"amount":this.cartArr['subTotal'],"quantity":this.cartArr['totalQty'],"gstAmount":this.cartArr['gstAmount'],"totalAmount":this.cartArr['grandTotal']};

      console.log(apiData);

      let loading = this.loadingCtrl.create({
        spinner:'hide',
        content:`<img src="assets/imgs/loader.png"  class="rotate h45"/>`,
      });

      loading.present();

      this.orderServ.saveOrderDetail(apiData, 'order/add').then((response:any) => {

          console.log(response);

          loading.dismiss();

          let toast = this.toastCtrl.create({
              message: 'Order Saved Successfully!',
              duration: 2000
          });

          toast.present();

          this.navCtrl.push(OrderListPage);

      },error => {
          console.log(error);
      });
  }

  goToAddorderDetailModel(category) {
    
        const modal = this.modalCtrl.create(OrderDetailModelPage,{src: 'addCart', 'category': category,'productList':this.cartArr['cart']});
        modal.present();

        modal.onDidDismiss(data => {

            console.log(data);
            this.cartArr['cart'] = data;
            this.storage.set('cartStorage', this.cartArr);

            setTimeout(() => {

                 this.getCartStorageData();
                 this.orderServ.setCartServiceData();

            }, 500);

            console.log('Hello Data');

        });
  }


  showLoading() {

      this.loading = this.loadingCtrl.create({
          spinner: 'hide',
          content: '<p><img src="assets/imgs/gif.svg"/></p>'
      });
      this.loading.present();
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
