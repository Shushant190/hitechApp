import { Component, ɵConsole } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, LoadingController, AlertController, ModalController, ToastController, Thumbnail } from 'ionic-angular';
import { LeaddetailpopoverComponent } from '../../../../components/leaddetailpopover/leaddetailpopover';
import { CatelougeProvider } from '../../../../providers/catelouge/catelouge';
import { IonicSelectableComponent } from 'ionic-selectable';
import * as M from '../../../../assets/materialize/js/materialize.min.js';
import {Storage, StorageConfigToken} from '@ionic/storage';
import { OrderListPage } from '../../order/order-list/order-list';
import { SchemePopupPage } from '../../scheme-popup/scheme-popup';
import { AddToCartPage } from '../../add-to-cart/add-to-cart';
import { OtherAddressModalPage } from '../../other-address-modal/other-address-modal';
import { c } from '@angular/core/src/render3';
import { stringify } from '@angular/core/src/util';
import { OrderProvider } from '../../../../providers/order/order';
import * as $ from 'jquery';

/**
* Generated class for the CreatOrderPage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/

@IonicPage()
@Component({
    selector: 'page-creat-order',
    templateUrl: 'creat-order.html',
})

export class CreatOrderPage {
    
    options = {};
    
    distributor_list:any=[];
    category_list:any=[];
    data:any={};
    cartProductList:any=[];
    search:any;
    cart_array:any=[];
    tmp_array:any=[];
    category:any=false;
    userId:any;
    userType:any;
    networkId:any;
    user:any=[];
    
    productNameList:any=[];
    url:any = {};
    
    orderId:any='';
    cartArr = {};
    uploadUrl:any;
    
    currentStage:any;
    isStageSubmit:any=false;
    
    searchArr= {src: 'createOrder', name: ''};
    
    constructor(public navCtrl: NavController,
                public popoverCtrl: PopoverController,
                public service:CatelougeProvider,
                public loadingCtrl:LoadingController,
                public storage:Storage,
                public alertCtrl: AlertController, 
                public modalCtrl: ModalController,
                public navParams: NavParams,
                private toastCtrl: ToastController,
                public orderServ: OrderProvider) {
            
                this.currentStage = 1;
                this.uploadUrl = this.service.url;

                this.cartArr['cart'] = [];
                console.log(this.cartArr);

                this.storage.get('user').then((r)=>
                {
                    console.log(r);
                    this.user=r;
                    if(this.user) {

                        console.log(this.user);
                        this.userType=this.user.userType;
                        console.log(this.userType);
                    }
                })
                

                this.storage.get('userId').then((userId) => 
                { 
                     console.log(userId);
                     this.userId = userId;
                })


                if(this.navParams.get('orderId') || this.navParams.get('networkId')) {

                        this.currentStage = 2;

                        console.log(this.currentStage);

                        setTimeout(() => {
                          $('.show-back-button').hide(); 
                        }, 500);

                        this.getSegmentList();
                        this.categoryList();

                        this.orderId = this.navParams.get('orderId');
                        this.data.networkId = {};
                        this.data.networkId['networkId'] = this.navParams.get('networkId');
                        this.data.networkId['establishment'] = this.navParams.get('establishment');

                        const shippingAddressArr = this.navParams.get('shippingAddressSelectedArr');

                        console.log(shippingAddressArr);

                        this.data.shippingAddressId = {};
                        this.data.shippingAddressId['shippingAddressId'] = shippingAddressArr['shippingAddressId'];
                        this.data.shippingAddressId['shipping'] = shippingAddressArr['shipping'];
                       
                        this.storage.get('cartStorage').then((cartObj)=>{
                             this.cartArr = cartObj;
                             console.log(this.cartArr);
                        });


                        this.getNetworkRelatedData(this.data.networkId, 0);
                }

                console.log(this.orderId);
                this.userTypeList();
        }

        
        ngOnInit() {
            var elems = document.querySelectorAll('.collapsible');
            var instances1 = M.Collapsible.init(elems, this.options);
        }


        clearFilter() {

            let loading = this.loadingCtrl.create({
                spinner:'hide',
                content:`<img src="assets/imgs/loader.png"  class="rotate h45"/>`,
            });

            loading.present();

            setTimeout(() => {

                console.log('hello11'+ this.data.search);    
                
                if(!this.data.search) {
                    this.searchArr = {src: 'createOrder', name: ''};
                }

                loading.dismiss();
              
            }, 500);
        }

        onStageActionHandler() {
            
            this.isStageSubmit = true;
            
            setTimeout(() => {

                if(this.currentStage == 1 && this.data.networkId && this.data.networkId['networkId']) {
            
                    this.currentStage = 2;

                    $('.show-back-button').hide();
                    this.getSegmentList();
                    this.categoryList()

                } else if(this.currentStage == 2) {
                    this.currentStage = 1;
                    $('.show-back-button').show();
                }


                console.log('hello '+this.currentStage);
                
            });
        }
        
        
        searchChangeHandler() {
            
            console.log(this.data.search);
            
            if(this.data.search) {
                this.searchArr = {src: 'createOrder', name: this.data.search};
            } else {
                this.searchArr = {src: 'createOrder', name: ''};
            }
        }
        
        
        tmp_userList:any=[];
        distribotur_roleId:any;
        userTypeList()
        {
                console.log("userTypeList");

                let loading = this.loadingCtrl.create({
                    spinner:'hide',
                    content:`<img src="assets/imgs/loader.png"  class="rotate h45"/>`,
                });

                loading.present();

                this.service.getValue('',"usertype/list").then((result)=>{
                
                    loading.dismiss();
                    console.log(result['data'][2]['roles']);
                    this.tmp_userList=result['data'][2]['roles'];
                    
                    for(let i=0;i<this.tmp_userList.length;i++)
                    {
                        if(this.tmp_userList[i]['roleName']=='Distributor')
                        {
                                console.log("2");
                                this.distribotur_roleId=this.tmp_userList[i]['roleId'];
                                console.log(this.distribotur_roleId);

                                if(!this.orderId) {
                                   this.distributorList();
                                }
                        }
                    }
                })        
        }
        
        
        categoryList()
        {
            this.service.getValue("","category/list").then((result)=>{
                console.log(result);
                this.category_list=result['data'];
                console.log(this.category_list);
            })
        }
        
        
        segmentList:any=[];
        tmp_segmentList:any=[];
        getSegmentList()
        {

            let loading = this.loadingCtrl.create({
                spinner:'hide',
                content:`<img src="assets/imgs/loader.png"  class="rotate h45"/>`,
            });

            loading.present();

            this.service.getValue('',"segment/list").then((result=>{

                console.log(result['data']);

                setTimeout(() => {
                    loading.dismiss();
                }, 2000);

                if(result['status']=="Success")
                {
                    this.segmentList=result['data'];
                    this.tmp_segmentList=this.segmentList;
                    console.log(this.tmp_segmentList);
                }
            }))
        }
        
        
        ionViewDidLoad() {
            console.log('ionViewDidLoad CreatOrderPage');
        }
        
        
        addToCartHandler(productId, inputQty) {
            
            setTimeout(() => {
                
                console.log(this.data.networkId.networkId);
                
                if(!inputQty || inputQty==0 || inputQty < 0 ) {
                    
                    let message;
                    if(inputQty < 0 ) {
                        message = 'Qty Cannot be less than 0 !';
                    } else {
                        message = 'Qty Empty !';           
                    }
                    
                    let alert = this.alertCtrl.create({
                        title: 'Alert',
                        message: message,
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
                
                
                const index = this.cartProductList.findIndex(product => product.productId == productId);
                let qty = parseInt(this.cartProductList[index].qty);
                
                console.log(this.cartProductList);
                console.log(this.cartProductList[index]);
                
                const multiplier =  qty%this.cartProductList[index].moq;
                
                
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
                }  
                
                if(qty && qty>0) {
                    
                    let productId = this.cartProductList[index].productId;
                    let category = this.cartProductList[index].category;
                    let productName = this.cartProductList[index].productName;
                    let partNumber = this.cartProductList[index].partNumber;
                    let segment = this.cartProductList[index].segment;
                    let model = this.cartProductList[index].model;
                    let oem = this.cartProductList[index].oem;
                    let moq = this.cartProductList[index].moq;
                    
                    let qty = parseInt(this.cartProductList[index].qty);
                    
                    let amount = parseFloat(this.cartProductList[index].itemValue) * parseFloat(this.cartProductList[index].qty);
           
                    
                    let discountedListPrice = this.cartProductList[index].discountedListPrice;
                    
                    let priceSupport = this.cartProductList[index].priceSupport;
                    let itemValue = this.cartProductList[index].itemValue;
                    
                    let gstPercent = this.cartProductList[index].gstPercentage;
                    let gstAmount = this.cartProductList[index].gstamount;
                    
                    this.cartArr = this.orderServ.addToCart(productId, category, productName, partNumber, segment, model, oem, moq, qty, amount, discountedListPrice, priceSupport, itemValue, gstPercent, gstAmount);

                    this.onSelectedItemColorHandler();
                    
                    let toast = this.toastCtrl.create({
                        message: 'Item Updated to Cart!',
                        position: 'bottom',
                        duration: 2000
                    });
                    
                    toast.present();
                    console.log(this.cartArr);
                }
                
            }, 500);
        }  
        
        
        onQtyChangeHandler(productId) {
            
            const productIndex = this.cartProductList.findIndex(row => row.productId == productId);
            
            if(this.cartProductList[productIndex].qty < 0) {
                this.cartProductList[productIndex].qty = 0;
            }
        }
        
        
        goToCheckoutPage() {
            
            this.data.cartNavClick = true;
            
            if(!this.cartArr['cart']['length']) {
                
                let alert = this.alertCtrl.create({
                    title: 'Alert',
                    message: 'Cart Empty!',
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
                
                console.log(this.data.networkId['networkId']);
                
                this.navCtrl.push(AddToCartPage, {orderId: this.orderId, networkId: this.data.networkId['networkId'], establishment: this.data.networkId['establishment'], shippingAddressSelectedArr:this.data.shippingAddressId, distributorDetail: this.distributorDetail});
                
            }
        }
        
        
        tmp_cart_array:any=[];
        addToList()
        {
            let total_amount=this.tmp_array['QTY']*this.tmp_array['priceUnit'];
            this.tmp_array.price=total_amount;
            this.tmp_cart_array.push(this.tmp_array);
            this.cart_array.push({"productId":this.tmp_array['productId'],"quantity":this.tmp_array['QTY'],"price": total_amount});
            console.log(this.cart_array);
            this.tmp_array=[];
            this.tmp_array.QTY="";
            this.cartProductList=[];
            this.data.category='';
            this.data.productName='';
            this.category=false;
        }
        
        removeItem(index)
        {
            this.cart_array.splice(index,1);
            this.tmp_cart_array.splice(index,1);
        }
        
        
        leadOptionPopover(myEvent) {
            
            let popover = this.popoverCtrl.create(LeaddetailpopoverComponent);
            
            popover.present({
                ev: myEvent
            });
            
            popover.onDidDismiss(popoverData => {
                console.log(popoverData);
            })
            
        }
        
        
        distributorList()
        {
                let loading = this.loadingCtrl.create({
                    spinner:'hide',
                    content:`<img src="assets/imgs/loader.png"  class="rotate h45"/>`,
                });

                loading.present();

                this.service.getData({"role":this.distribotur_roleId,"salesUserId":this.userId,"currentPage":1,"pageSize": 50},"network/list").then((result)=>{

                    setTimeout(() => {
                        loading.dismiss();
                    }, 1000);
                
                    console.log(result);
                    this.distributor_list=result['data'];
                    
                    for (let index = 0; index < this.distributor_list.length; index++) {
                        // const element = array[index];
                        this.distributor_list[index].establishment= this.distributor_list[index].establishment +' / '+ this.distributor_list[index].networkCode;
                    }

                });
        }
        
        
        
        productList()
        {
            
            setTimeout(() => {
                
                console.log(this.data.segment);
                console.log(this.data.category);
                console.log(this.data.productName);
                
                console.log(this.data.networkId.networkId);
                console.log(this.data.shippingAddressId);
                
                this.url = {};
                
                this.url['networkId'] = this.data.networkId['networkId'];
                
                if(this.data.segment) {
                    this.url['segmentCode'] = this.data.segment.value;
                }
                
                if(this.data.category) {
                    this.url['categoryCode'] = this.data.category.value;
                }
                
                if(this.data.productName) {
                    this.url['productName'] = this.data.productName.productName;
                }
                
                this.url['currentPage'] = 1;
                this.url['pageSize'] = 500;
                
                if(this.url) {
                    
                    let loading = this.loadingCtrl.create({
                        spinner:'hide',
                        content:`<img src="assets/imgs/loader.png"  class="rotate h45"/>`,
                    });

                    loading.present();
                    
                    console.log(this.url);
                    
                    this.service.getData(this.url,"product/list").then((result)=>{
                        
                        console.log(result);
                        this.category=true;
                        
                        setTimeout(() => {
                           loading.dismiss(); 
                        }, 500);
                        
                        this.productNameList = [];
                        this.cartProductList = [];
                        
                        if(result['data']) {
                            
                            this.cartProductList = result['data'];
                            
                            for (let index = 0; index < this.cartProductList.length; index++) {
                                
                                    const itemIndex =  this.productNameList.findIndex(row => row.productName == this.cartProductList[index].productName);
                                    
                                    if(itemIndex === -1) {
                                        this.productNameList.push(JSON.parse(JSON.stringify(this.cartProductList[index])));
                                    }
                                    
                                    this.cartProductList[index].quantity=0;
                                    this.cartProductList[index].ifcheck=false;
                                    
                                    this.cartProductList[index].itemValue=parseFloat(this.cartProductList[index].discountedListPrice)-parseFloat(this.cartProductList[index].priceSupport);
                                    
                                    this.cartProductList[index].amount = parseFloat(this.cartProductList[index].quantity)*parseFloat(this.cartProductList[index].itemValue);
                                    
                                    this.cartProductList[index].gstamount = (parseFloat(this.cartProductList[index]['discountedListPrice']) * parseFloat(this.cartProductList[index]['gstPercentage'])/100)*parseFloat(this.cartProductList[index]['quantity']);
                            }
                        }


                        this.onSelectedItemColorHandler();
                        
                    })
                }
                
            }, 500);
            
        }
        
        
        
        getCartProductList()
        {
            setTimeout(() => {

                console.log(this.data.productName);
                
                console.log(this.data.productName['productName']);
                console.log(this.data.segment);
                console.log(this.data.category);
                
                this.url = {};
                
                this.url['networkId'] = this.data.networkId['networkId'];
                
                if(this.data.segment) {
                    this.url['segmentCode'] = this.data.segment.value;
                }
                
                if(this.data.category) {
                    this.url['categoryCode'] = this.data.category.value;
                }
                
                if(this.data.productName) {
                    this.url['productName'] = this.data.productName.productName;
                }
                
                this.url['currentPage'] = 1;
                this.url['pageSize'] = 500;
                
                
                let loading = this.loadingCtrl.create({
                    spinner:'hide',
                    content:`<img src="assets/imgs/loader.png"  class="rotate h45"/>`,
                });

                loading.present();

                console.log(this.url);


                this.service.getData(this.url ,"product/list").then((result)=>{
                    
                    console.log(result);
                    this.cartProductList = [];

                    loading.dismiss();
                    
                    if(result['status']=='Success')
                    {
                        this.cartProductList=result['data'];
                        
                        for(let i=0;i<this.cartProductList.length;i++)
                        {
                            this.cartProductList[i].quantity=0;
                            this.cartProductList[i].ifcheck=false;
                            
                            this.cartProductList[i].itemValue=parseFloat(this.cartProductList[i].discountedListPrice)-parseFloat(this.cartProductList[i].priceSupport);
                            
                            this.cartProductList[i].amount=parseFloat(this.cartProductList[i].quantity)*parseFloat(this.cartProductList[i].itemValue);
                            
                            this.cartProductList[i].gstamount=(parseFloat(this.cartProductList[i]['mrp'])*parseFloat(this.cartProductList[i]['gstPercentage'])/100)*parseFloat(this.cartProductList[i]['quantity']);
                        }  
                    }

                    this.onSelectedItemColorHandler();
                    
                })
                
            }, 500);
        }
        
        
        
        selectProduct(event: {
            component: IonicSelectableComponent,
            value: any
        })
        {
            this.tmp_array=event.value;
            console.log('port:', event.value);
            console.log(this.tmp_array);
            this.tmp_array.QTY=1
        }
        
        
        showSuccess(text) {
            let alert = this.alertCtrl.create({
                title: 'Success!',
                subTitle: text,
                buttons: ['OK']
            });
            alert.present();
        }
        
        
        goToSchemeData() {
            const modal = this.modalCtrl.create(SchemePopupPage);
            modal.present();
        }
        
        goToOtherAddress() {
            const modal = this.modalCtrl.create(OtherAddressModalPage);
            modal.present();
        }
        

        goToCart() {
            this.navCtrl.push(AddToCartPage);
        }


        tmpShipping:any=[];
        tmpShippingAddress:any=[];
        distributorDetail:any={}
        monthleyTarget:any=[]
        // networkId:any;
        netId:any
        getNetworkRelatedData(networkData, val:any)
        {
            console.log(networkData);
            this.netId=networkData;
            console.log( this.netId);
            console.log(val);
            
            let networkId;
            
            if(networkData.networkId!='')
            {
                this.tmpShippingAddress=[];
                
                this.data.distributor=networkData.networkId;
                console.log(this.data.distributor);
                networkId=this.data.distributor;
                
                this.service.getData({'networkId': networkId},"network/list").then((result=>{
                    
                    console.log(result);
                    
                    if(result['status']=='Success')
                    {
                        this.distributorDetail=result['data'][0];

                        if(this.orderId) {

                            this.distributor_list = [];

                            const establishment = this.distributorDetail['establishment'] + ' / ' + this.distributorDetail['networkCode'];

                            this.distributor_list.push({networkId: networkId, establishment:  establishment});

                            this.data.networkId['establishment'] = establishment;
                        }

                        this.tmpShipping=this.distributorDetail.shippingAddresses;
                        this.monthleyTarget=this.distributorDetail.networkLimits[0];
                    }
                 
                    console.log(this.tmpShipping);
                    const shippingData = [];
                    let shippingAddressStr = '';

                    for(let index=0;index < this.tmpShipping.length;index++)
                    {
                        let addStr = '';
                        for (const key in this.tmpShipping[index]) {

                            if(this.tmpShipping[index][key])  {

                                if(shippingAddressStr) {
                                    addStr = ', ';
                                } 

                                if(key == 'street') {
                                    shippingAddressStr += addStr + this.tmpShipping[index][key];
                                }

                                if(key == 'state') {
                                    shippingAddressStr += addStr + this.tmpShipping[index][key];
                                }

                                if(key == 'district') {
                                    shippingAddressStr += addStr + this.tmpShipping[index][key];
                                }

                                if(key == 'city') {
                                    shippingAddressStr += addStr + this.tmpShipping[index][key];
                                }

                                if(key == 'pin') {
                                    shippingAddressStr += addStr + this.tmpShipping[index][key];
                                }

                            }
                        }

                        shippingData.push({"shipping": shippingAddressStr,"shippingAddressId":this.tmpShipping[index]['shippingAddressId'] });
                    }
                    
                    this.tmpShippingAddress = shippingData;
                    console.log(this.tmpShippingAddress);
                    
                    if(val==1)
                    {
                        this.data.shippingAddressId=shippingData[shippingData.length-2].shippingAddressId;
                    }
                    
                    console.log(this.tmpShippingAddress);
                    console.log(this.distributorDetail);
                    console.log(this.data);
                }))
                
            } else {
                this.tmpShippingAddress=[];
            }
        }
        
        
        
        shippingAddress:any=[];
        tmpDistributor_list:any=[];
        
        deselectProduct:any=[];
        
        portChange(event: {
            component: IonicSelectableComponent,
            value: any 
        }) {
            console.log('port:', event.value);
        }


        onSelectedItemColorHandler() {

            setTimeout(() => {

                for (let index = 0; index < this.cartProductList.length; index++) {
                       
                    const indexExist = this.cartArr['cart'].findIndex(row => row.productId == this.cartProductList[index].productId);
    
                    if(indexExist !== -1) {
                        this.cartProductList[index].isItemSelected = true;
                    } else {
                        this.cartProductList[index].isItemSelected = false;
                    }
                }
            });
        }
        
    }
    