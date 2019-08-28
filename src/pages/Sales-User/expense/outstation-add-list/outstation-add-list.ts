import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import * as M from '../../../../assets/materialize/js/materialize.min.js';
import { ExpenseProvider } from '../../../../providers/expense/expense';
import { Storage } from '@ionic/storage';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { Diagnostic } from '@ionic-native/diagnostic';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ImagePicker } from '@ionic-native/image-picker';
import { Base64 } from '@ionic-native/base64';
import { DomSanitizer } from '@angular/platform-browser';
import { OrderProvider } from '../../../../providers/order/order';
import { CatelougeProvider } from '../../../../providers/catelouge/catelouge';

/**
* Generated class for the OutstationAddListPage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/

@IonicPage()
@Component({
    selector: 'page-outstation-add-list',
    templateUrl: 'outstation-add-list.html',
})
export class OutstationAddListPage {
    
    loginUserArr:any = {};
    options = {};
    expenseCartObj:any = {};

    expenseSanctioner:any;
    
    travelTotal:any = 0;
    hotelTotal:any = 0;
    foodTotal:any = 0;
    convenceTotal:any = 0;
    miscTotal:any = 0;
    
    expenseTypeFinalTotalArr:any = {};
    finalTravelTotal:any = 0;
    expenseBasicArr:any = {};

    rentalExpenses:any = 0;
    foodExpense:any = 0;
    avAidsExpense:any = 0;
    giftsExpense:any = 0;
    miscExpense:any = 0;
    otherExpense:any = 0;

    basicTravelTotal:any = 0;
    taxTotal:any = 0;
    
    img_arr:any=[];
    db_img_arr:any=[];
    
    constructor(public navCtrl: NavController, 
        public navParams: NavParams,
        public expService: ExpenseProvider,
        public service: CatelougeProvider,
        public storage: Storage,
        public actionSheetCtrl: ActionSheetController,
        public orderService: OrderProvider,
        private androidPermissions: AndroidPermissions,
        private diagnostic: Diagnostic,
        public camera: Camera,
        private imagePicker: ImagePicker,
        private base64: Base64,
        private sanitizer: DomSanitizer, ) {
            
            this.expenseCartObj['Travel Entitlement'] = [];
            this.expenseCartObj['Hotel'] = [];
            this.expenseCartObj['Food'] = [];
            this.expenseCartObj['Local Convence'] = [];
            this.expenseCartObj['Misc Expense'] = [];
        }
        
        
        ionViewDidLoad() {
            
            console.log('ionViewDidLoad OutstationAddListPage');
            this.onGetLoginUserDetail();
            this.getStorageDataHandler();
        }


        getSeniorDetailForApproval() {

            console.log(this.loginUserArr['designation']);
            this.service.getValue('',"getseniors/list").then((result) => {
                console.log(result);   

                const seniorList=result['data'];
                if(seniorList.length!=0)
                {
                   this.expenseSanctioner = seniorList[0]['userId'];

                } else {
                   this.expenseSanctioner = 1;
                }
            })
        }

        
        getStorageDataHandler() {
            
            this.storage.get('cartStorage').then((cartObj) => {
                
                console.log(cartObj);
                this.expenseCartObj = cartObj;
                this.onFinalExpCalculateHandler();
                
                console.log(this.expenseCartObj);
            });
        }
        
        ngOnInit() {
            var elems = document.querySelectorAll('.collapsible');
            var instances1 = M.Collapsible.init(elems, this.options);
        }
        
        
        onFinalExpCalculateHandler() {
            
            this.finalTravelTotal = 0;
            
            console.log(this.expenseCartObj);

            this.rentalExpenses = 0;
            this.foodExpense = 0;
            this.avAidsExpense = 0;
            this.giftsExpense = 0;
            this.miscExpense = 0;
            this.otherExpense = 0;
            
            for (const key of Object.keys(this.expenseCartObj)) {
                
                console.log(key, this.expenseCartObj[key]);
                this.expenseTypeFinalTotalArr[key] = 0;
                
                console.log(this.expenseCartObj[key].length);
                for (let index = 0; index < this.expenseCartObj[key].length; index++) {
                    
                    console.log()
                    let amount = 0;
                    let tax = 0;
                    if(this.expenseCartObj[key][index].hasOwnProperty('amount')) {

                        amount += parseInt(this.expenseCartObj[key][index].amount);
                    } 

                    if(this.expenseCartObj[key][index].hasOwnProperty('otherExpense')) {

                        amount += parseInt(this.expenseCartObj[key][index].otherExpense);
                        this.otherExpense += parseInt(this.expenseCartObj[key][index].otherExpense);
                    } 
                    
                    
                    if(this.expenseCartObj[key][index].hasOwnProperty('billAmount')) {    
                        amount += parseInt(this.expenseCartObj[key][index].billAmount);
                    } 
                    
                    if(this.expenseCartObj[key][index].hasOwnProperty('fare')) {
                        
                        amount += parseInt(this.expenseCartObj[key][index].fare);
                    }

                    if(this.expenseCartObj[key][index].hasOwnProperty('rentalExpenses')) {
                        amount += parseInt(this.expenseCartObj[key][index].rentalExpenses);
                        this.rentalExpenses += parseInt(this.expenseCartObj[key][index].rentalExpenses);
                    }


                    if(this.expenseCartObj[key][index].hasOwnProperty('foodExpense')) {
                        amount += parseInt(this.expenseCartObj[key][index].foodExpense);
                        this.foodExpense += parseInt(this.expenseCartObj[key][index].foodExpense);

                    }


                    if(this.expenseCartObj[key][index].hasOwnProperty('avAidsExpense')) {
                        
                        amount += parseInt(this.expenseCartObj[key][index].avAidsExpense);
                        this.avAidsExpense += parseInt(this.expenseCartObj[key][index].avAidsExpense);

                    }


                    if(this.expenseCartObj[key][index].hasOwnProperty('giftsExpense')) {
                        
                        amount += parseInt(this.expenseCartObj[key][index].giftsExpense);
                        this.giftsExpense += parseInt(this.expenseCartObj[key][index].giftsExpense);

                    }


                    if(this.expenseCartObj[key][index].hasOwnProperty('miscExpense')) {
                        
                        amount += parseInt(this.expenseCartObj[key][index].miscExpense);
                        this.miscExpense += parseInt(this.expenseCartObj[key][index].miscExpense);
                    }


                    if(this.expenseCartObj[key][index].hasOwnProperty('tax')) {
                        tax = parseInt(this.expenseCartObj[key][index]['tax']);
                    }
                    
                    this.basicTravelTotal += amount;
                    this.taxTotal += tax;

                    const itemAmount = amount + tax;
                    this.expenseCartObj[key][index]['itemFinalAmount'] = itemAmount;
                    this.expenseTypeFinalTotalArr[key] += itemAmount;
                    this.finalTravelTotal += itemAmount;
                }
            }

            this.getExpenseBasicStorage();
            
            console.log(this.expenseTypeFinalTotalArr);
            console.log(this.finalTravelTotal);
        }
        

        onGetLoginUserDetail() {
                
                this.orderService.onGetLoginUserDetail().then(response => {

                      console.log(response);
                      this.loginUserArr = response['salesUser'];
                      this.getSeniorDetailForApproval();
                });
        }


        setExpenseEmptyArr() {

            if(!this.expenseCartObj['Travel Entitlement']) {
                this.expenseCartObj['Travel Entitlement'] = [];
            }

            if(!this.expenseCartObj['Hotel']) {
                this.expenseCartObj['Hotel'] = [];
            }

            if(!this.expenseCartObj['Food']) {
                this.expenseCartObj['Food'] = [];
            }

            if(!this.expenseCartObj['Local Convence']) {
                this.expenseCartObj['Local Convence'] = [];
            }

            if(!this.expenseCartObj['Misc Expense']) {
                this.expenseCartObj['Misc Expense'] = [];
            }
        }
        
        
        onSaveExpenseHandler() {

            console.log(this.loginUserArr);
            const apiExpenseData = {};
            apiExpenseData['expenseType'] = this.expenseBasicArr['expenseType'];
            apiExpenseData['expenseSanctioner'] = this.expenseSanctioner;
            apiExpenseData['userId'] = this.loginUserArr['userId'];
            apiExpenseData['department'] = 'Sales User';
            apiExpenseData['actualExpenseAmount'] = this.finalTravelTotal;

            if(this.expenseBasicArr['expenseType'] == 2) {

                this.setExpenseEmptyArr();
            
                apiExpenseData['outStationExpense'] = {outStationTravelExp:this.expenseCartObj['Travel Entitlement'], outStationHotelExp:this.expenseCartObj['Hotel'],foodExpenses:this.expenseCartObj['Food'], outStationLocalExp:this.expenseCartObj['Local Convence'],miscExpenses:this.expenseCartObj['Misc Expense']};
    
                apiExpenseData['purposeOfVisit'] = this.expenseBasicArr['purposeOfVisit'];
                apiExpenseData['advanceAmount'] = this.expenseBasicArr['advanceAmount'];
                apiExpenseData['claimAmount'] = this.expenseBasicArr['claimAmount'];
    
                apiExpenseData['status']=2;

            } 
            
            
            if(this.expenseBasicArr['expenseType'] == 3) {

                apiExpenseData['salesPromotionExpense']={salesPromotionExps: this.expenseCartObj['Sales Promotion']};
                apiExpenseData['status']=2;
            }


            if(this.expenseBasicArr['expenseType'] == 4) {

                apiExpenseData['miscExpense']={miscExp: this.expenseCartObj['Misc Expense']};
                apiExpenseData['status']=2;
            }

            if(this.expenseBasicArr['expenseType'] == 1) {

                apiExpenseData['localHQExpense']={localConveyances: this.expenseCartObj['Local Expense']};
                apiExpenseData['claimAmount'] = this.finalTravelTotal;
                apiExpenseData['status']=2;
            }
        
            console.log(apiExpenseData);

            this.service.getData(apiExpenseData,'expense/add').then((result) => {

                console.log(result);   
                this.onUploadBillHandler(result['data']);
            })
            
        }


        onUploadBillHandler(id)
        {
            let documentData = {};
            console.log(this.img_arr);
            
            let uploadData:any = [];
            
            for(let j=0;j < this.img_arr.length; j++)
            {  
                documentData = new FormData;
                documentData['action']=1;
                documentData['binaryData']=this.img_arr[j]['image'];
                documentData['documentType']=4;

                let randomName = Math.random().toString(36).substring(7);
                documentData['documentName'] = randomName+'.jpg';
                documentData['referenceId']=id;

                documentData['fileName'] = "document"+j+".jpg";
                uploadData.push(documentData);
            }

            console.log(uploadData);

            this.service.getData(uploadData, 'document/update').then((resp)=>
            {
                console.log(resp);
            });
        }
        
        
        getExpenseBasicStorage() {
            
            this.storage.get('expenseBasicStorage').then((cartObj) => {
                
                if(!cartObj['advanceAmount']) {
                    cartObj['advanceAmount'] = 0;
                }

                if(!cartObj['purposeOfVisit']) {
                    cartObj['purposeOfVisit'] = '';
                }

                this.expenseBasicArr['expenseType'] = cartObj.expenseType;
                this.expenseBasicArr['advanceAmount'] = cartObj.advanceAmount;
                this.expenseBasicArr['purposeOfVisit'] = cartObj.purposeOfVisit;
                
                if(this.finalTravelTotal > this.expenseBasicArr['advanceAmount']) {
                    this.expenseBasicArr['claimAmount'] = this.finalTravelTotal - this.expenseBasicArr['advanceAmount'];
                } else {
                    this.expenseBasicArr['claimAmount'] = 0;
                }
                
            })
        }
        
        takePhotograph() {
            
            this.expService.takePhotograph()
            .then((image)=>
            {
                this.img_arr.push({'image':image});
                console.log(this.img_arr);
            })
            .catch((err)=>
            {
                console.log(err);
            });
        }
        
        selectImageFromGallery() {
            
            
            let successCallback = (isAvailable) => { 
                
                console.log(isAvailable);
                
                let options = {
                    maximumImagesCount: 10,
                    DATA_URI: 1,
                    quality: 100
                }
                
                this.imagePicker.getPictures(options).then((results) => {
                    
                    for (var i = 0; i < results.length; i++) {
                        
                        this.base64.encodeFile(results[i]).then((base64File: string) => {

                            console.log(base64File);
                            this.img_arr.push({'image': base64File});
                            
                        }, (err) => {
                            console.log(err);
                        });
                        ; 
                    }
                    
                    console.log('Image URI: ' + this.img_arr);
                }, (err) => { });
            }
            
            let errorCallback = (e) => {
                
                console.log(e);
            }
            
            this.diagnostic.requestCameraAuthorization().then(successCallback).catch(errorCallback);
        }
        
        
        remove_image(index:any) {
            this.img_arr.splice(index,1);
        }
        
        
        remove_db_image(index:any) {
            
            console.log('delete '+index);
            this.db_img_arr[index].del = 1;
            console.log(this.db_img_arr);
        }


        getSecurityTrusted(imageData) {
             return this.sanitizer.bypassSecurityTrustResourceUrl(imageData);
        }
        
        openActionSheet() {
            
            let actionsheet = this.actionSheetCtrl.create({
                title:"Select image from",
                buttons:[{
                    text: 'Camera',
                    icon:'camera',
                    handler: () => {
                        console.log("Camera Clicked");
                        this.takePhotograph();
                    }
                },{
                    text: 'Gallery',
                    icon:'image',
                    handler: () => {
                        console.log("Gallery Clicked");
                        this.selectImageFromGallery();
                    }
                }]
            });
            
            actionsheet.present();
        }
        
    }
    
    