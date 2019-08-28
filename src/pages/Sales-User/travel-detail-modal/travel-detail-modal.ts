import { Component, ɵConsole } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController,ToastController,LoadingController, AlertController } from 'ionic-angular';
import { CatelougeProvider } from '../../../providers/catelouge/catelouge';
import { TravelMonthPage } from '../travel-month/travel-month';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { THROW_IF_NOT_FOUND } from '@angular/core/src/di/injector';

@IonicPage()
@Component({

    selector: 'page-travel-detail-modal',
    templateUrl: 'travel-detail-modal.html',
})

export class TravelDetailModalPage {

  basicForm: FormGroup;

  data:any = {};
  planArray:any = [];
  travelStatusType:any = '';

  stateList:any = [];
  districtList:any = [];
  cityList:any = [];

  travelPlanID:any;
  travelPlanItemId:any;
  travelData:any;

  parentIndex:any;
  childIndex:any;

  planDateForView:any;
  isMultipleSelection:any = true;

  salesActivityArr:any = [{typeId: 1, name: 'Mechanic get together'},
                          {typeId: 2, name: 'Retailer get together'},
                          {typeId: 3, name: 'Van Campaign'},
                          {typeId: 4, name: 'Stall Campaign'},
                          {typeId: 5, name: 'Exhibition Participation'},
                          {typeId: 6, name: 'Signboard'},
                          {typeId: 7, name: 'Wall/Shop Painting'},
                          {typeId: 8, name: 'GiveAways'},
                          {typeId: 9, name: 'Printing Of Lesafelts,banners, posters etc.'}
                        ];
  
  constructor(public service: CatelougeProvider, 
              public loadingCtrl:LoadingController,
              public toastCtrl: ToastController, 
              public navCtrl: NavController, 
              public alertCtrl: AlertController,
              public navParams: NavParams, 
              public formBuilder:FormBuilder,
              public viewCtrl: ViewController) {

      this.parentIndex = this.navParams.get('parentIndex');
      this.childIndex = this.navParams.get('childIndex');

      console.log(this.parentIndex);
      console.log(this.childIndex);

      console.log(this.navParams.get('parentIndex'), this.navParams.get('childIndex'));
      
      if((this.parentIndex || this.parentIndex == 0) && (this.childIndex || this.childIndex==0)) {
            this.isMultipleSelection = false;
      } else {
            this.isMultipleSelection = true;
      }

      console.log(this.isMultipleSelection);
      console.log(this.navParams);

      this.onApplyValidationInputHandler();
      this.onResetInputDataHandler();
      
      this.data.planDate=this.navParams.get("planDate");
      this.planDateForView = moment(this.data.planDate).format('DD MMMM YYYY');

      this.travelPlanID=this.navParams.get("travelPlanID");
      this.travelData=this.navParams.get("travelData");

      if(this.travelPlanID) {

          if(this.travelData['status'] == 1) {
              this.travelStatusType = 'Draft';
          }
      }

      console.log(this.travelData);

      this.getStateList();

      const itemData = this.navParams.get('itemData');
      
      if(itemData) {

            if(itemData['travelDetailId']) {

                this.travelPlanItemId = itemData['travelDetailId'];
            }

            if(itemData['state']) {

                if(this.isMultipleSelection) {

                    this.data.state = [{'name':itemData['state']}];

                } else {

                    this.data.state = {'name':itemData['state']};
                }

                this.getDistrictList(1);
            }

            if(itemData['district']) {

                if(this.isMultipleSelection) {

                    this.data.district = [{'districtName': itemData['district']}];
                } else {
                    this.data.district = {'districtName': itemData['district']};              
                }
        
                this.getCityList(1);
            }


            if(itemData['city']) {

                if(this.isMultipleSelection) {

                    this.data.city = [{districtName: itemData['district'], city:itemData['city']}];

                    } else {

                    this.data.city = {districtName: itemData['district'], city:itemData['city']};           
                    }
            }


            if(itemData['isSalesActivity']) {

                this.data.isSalesActivity = itemData['isSalesActivity'];
            }

            if(itemData['activityType']) {

                this.data.activityType = itemData['activityType'];
            }

            if(itemData['salesBudget']) {
                this.data.salesBudget = itemData['salesBudget'];
            }    
      }
      
  }
  
  
  ionViewDidLoad() {
     console.log('ionViewDidLoad TravelDetailModalPage');
  }


  onApplyValidationInputHandler() {

        
        if(this.isMultipleSelection) {
 
              this.basicForm =this.formBuilder.group({

                  state: ['', Validators.compose([Validators.required])],
                  district: ['', Validators.compose([Validators.required])],
                  city: ['', Validators.compose([Validators.required])]
              });

        } else {

            this.basicForm = this.formBuilder.group({

                  state: ['', Validators.compose([Validators.required])],
                  district: ['', Validators.compose([Validators.required])],
                  city: ['', Validators.compose([Validators.required])],
                  isSalesActivity: ['', Validators.compose([Validators.required])],
                  activityType: [''],
                  salesBudget: ['']
            });

            this.onUpdateValidationHandler();
        }
  }


  onUpdateValidationHandler() {

      const activityType = this.basicForm.get('activityType');
      const salesBudget = this.basicForm.get('salesBudget');

      if(this.data.isSalesActivity == 'Yes') {

          activityType.setValidators([Validators.required]);
          salesBudget.setValidators([Validators.required, Validators.minLength(3)]);

      } else {

          activityType.clearValidators();
          salesBudget.clearValidators();
      }

      activityType.updateValueAndValidity();
      salesBudget.updateValueAndValidity();
  }


  onAddToListHandler()
  {
        console.log(this.data);

        if(this.basicForm.invalid)
        {
              console.log(this.basicForm);
              this.basicForm.get('state').markAsTouched();
              this.basicForm.get('district').markAsTouched();
              this.basicForm.get('city').markAsTouched();

              return;
        }

        let cityData = [];

        if(this.isMultipleSelection) {
             cityData = JSON.parse(JSON.stringify(this.data.city));
        } else {
             cityData.push(JSON.parse(JSON.stringify(this.data.city)));
        }

        console.log(cityData);

        for (let index = 0; index < cityData.length; index++) {

             const isExist = this.districtList.findIndex(row => row.districtName == cityData[index].districtName);

             if(isExist !== -1) {

                 let isSalesActivity = 'No';
                 let salesBudget = 0;
                 let activityType = '';
                 if(!this.isMultipleSelection) {

                      isSalesActivity = this.data.isSalesActivity;
                      salesBudget = this.data.salesBudget;
                      activityType = this.data.activityType;
                 }

                 this.planArray.push({planDate:this.data.planDate, state:this.districtList[isExist].stateName, district:cityData[index].districtName, city:cityData[index].city,isSalesActivity:isSalesActivity , activityType: activityType, salesBudget: salesBudget});

             }
        }

        console.log(this.planArray);

        this.onResetInputDataHandler();
        this.districtList = [];
        this.cityList = [];
  }


  onConfirmSaveHandler() {

        if(this.isMultipleSelection) {

              for( var i=0;i<this.planArray.length;i++)
              {
                    console.log(this.planArray[i].isSalesActivity);
                    console.log(this.planArray[i].activityType);
        
                      if((this.planArray[i].isSalesActivity=='Yes' && this.planArray[i].salesBudget==0) || this.planArray[i].isSalesActivity=='Yes' && this.planArray[i].salesBudget=='') {
                          
                          this.presentToast('Fill Required Data!!');
                          return;
                      }
        
                      if(this.planArray[i].isSalesActivity=='Yes' && (!this.planArray[i].activityType || this.planArray[i].activityType=='')) {
        
                          this.presentToast('Fill Required Data!!');
                          return;
                      }
              }

        } else {


               console.log(this.basicForm.invalid);
               if(this.basicForm.invalid) {

                  this.basicForm.get('state').markAsTouched();
                  this.basicForm.get('district').markAsTouched();
                  this.basicForm.get('city').markAsTouched();
                  this.basicForm.get('isSalesActivity').markAsTouched();
                  this.basicForm.get('activityType').markAsTouched();
                  this.basicForm.get('salesBudget').markAsTouched();  
                  return;
               }
        }


        let alert = this.alertCtrl.create({
          title: 'Confirm',
          message: 'Are you sure?',
          buttons: [
              {
                  text: 'No',
                  handler: () => {
                     this.presentToast('You are not sure, Plan not saved!!');
                  }
              },
              {
                  text: 'Yes',
                  handler: () => {

                      if(!this.travelPlanID) {
                            this.lodingPersent();
                      }

                      if(!this.isMultipleSelection) {
                          this.onAddToListHandler(); 
                      }

                      setTimeout(() => {
                         this.savePlanHandler();
                      }, 1000);
                  }
              }
          ]
      })

      alert.present();    
  }


  savePlanHandler() {

      console.log(this.planArray);
      
        if(this.travelPlanID) {

            console.log(this.travelData);
            console.log(this.planArray);
            
            let planData = [];

            for(let i=0;i < this.planArray.length;i++)
            {
                    this.planArray[i].planDate=moment(this.planArray[i].planDate).format('YYYY-MM-DD');

                    if(this.planArray[i].isSalesActivity=='Yes')
                    {
                            this.travelData.salesBudget = this.travelData.salesBudget+parseInt(this.planArray[i].salesBudget);
                            this.planArray[i].isSalesActivity = true;

                            planData.push({

                                planDate:this.planArray[i].planDate,
                                district:this.planArray[i].district,
                                city:this.planArray[i].city,
                                isSalesActivity:this.planArray[i].isSalesActivity,
                                state:this.planArray[i].state,
                                salesBudget:this.planArray[i].salesBudget,
                                travelDetailId:this.travelPlanItemId,
                                travelPlanID:this.travelPlanID,
                                activityType:this.planArray[i].activityType

                            });


                    } else {

                            this.planArray[i].isSalesActivity = false;

                            planData.push({

                                planDate:this.planArray[i].planDate,
                                district:this.planArray[i].district,
                                city:this.planArray[i].city,
                                isSalesActivity:this.planArray[i].isSalesActivity,
                                state:this.planArray[i].state,
                                salesBudget:this.planArray[i].salesBudget,
                                travelDetailId:this.travelPlanItemId,
                                travelPlanID:this.travelPlanID

                            });
                    }
            }


            if(this.travelPlanItemId) {

                   this.travelData = planData[0];
               
            } else {

                    if(!this.travelData.travelDetails) {
                        this.travelData.travelDetails = [];
                    } else {
        
                        for (let index = 0; index < this.travelData.travelDetails.length; index++) {
                            
                                if(this.travelData.travelDetails[index].isSalesActivity == 'Yes') {     
                                    this.travelData.travelDetails[index].isSalesActivity = true;
                                } else {
                                    this.travelData.travelDetails[index].isSalesActivity = false;
                                }
                        }
                    }
        
                    this.travelData.travelDetails = this.travelData.travelDetails.concat(planData);
                    console.log(this.travelData);
            }

            console.log(this.travelData);
            console.log(planData);

            let loading = this.loadingCtrl.create({
                spinner:'hide',
                content:`<img src="assets/imgs/loader.png"  class="rotate h45"/>`,
            });
      
            loading.present();

            let travelApiURL;

            if(this.travelPlanItemId) {

                travelApiURL = 'traveldetail/update';

            } else {  

                travelApiURL = 'travelplan/update';                  
            }

            console.log(this.travelData);
            console.log(travelApiURL);
            
            this.service.getData(this.travelData, travelApiURL).then((result)=>{

                console.log(result);

                loading.dismiss();

                if(result['status']=='Success')
                {
                        planData=[];

                        let travelToastMsg;
                        if(this.travelStatusType == 'Draft') {
                              travelToastMsg = 'Travel Plan Draft Updated!';
                        } else {
                              travelToastMsg = 'Travel Plan Updated!';
                        }
                        this.presentToast(travelToastMsg);
                        this.viewCtrl.dismiss({travelPlanID:this.travelPlanID});

                } else {

                    this.presentToast('Something Went Wrong ,Travel Plan Not Updated!');
                }

            });

        } else {

              
              let loading = this.loadingCtrl.create({
                 spinner:'hide',
                 content:`<img src="assets/imgs/loader.png"  class="rotate h45"/>`,
              });
    
              loading.present();

              for (let index = 0; index < this.planArray.length; index++) {

                    if(this.planArray[index].isSalesActivity == 'Yes') {

                        const isExist = this.salesActivityArr.findIndex(row => row.typeId == this.planArray[index].activityType);

                        if(isExist !== -1) {

                            this.planArray[index].activityTypeName = this.salesActivityArr[isExist].name;
                        }

                    } else {

                        this.planArray[index].activityTypeName = '';
                    }
              }


              setTimeout(() => {
                 loading.dismiss();
              }, 1000);

              this.viewCtrl.dismiss({'planArray': this.planArray, 'planDate':this.data.planDate, parentIndex: this.parentIndex, childIndex: this.childIndex});
        }
  }


  
  onSaleActivityChangeHandler(index) {

        if(this.isMultipleSelection) {

            console.log(this.planArray[index].isSalesActivity);

            if(this.planArray[index].isSalesActivity == 'No') {
  
                this.planArray[index].activityType = '';
                this.planArray[index].salesBudget = 0;
            }

        } else {

              if(this.data.isSalesActivity == 'No') {
      
                  this.data.activityType = '';
                  this.data.salesBudget = 0;
              }
              
              this.onUpdateValidationHandler();
        }
  }


  getStateList()
  {

        let loading = this.loadingCtrl.create({
            spinner:'hide',
            content:`<img src="assets/imgs/loader.png"  class="rotate h45"/>`,
        });

        loading.present();

        this.service.getValue("","state/list").then((r)=>
        {
              this.stateList = r['data'];
              console.log(this.stateList);

              loading.dismiss();
              
              const stateData = [];
              
              for (let index = 0; index < this.stateList.length; index++) 
              {
                  stateData.push({name: this.stateList[index]});
              }
              
              this.stateList = stateData;
              console.log(this.stateList);
        })
  }
  
  
  getDistrictList(requestSrc)
  {

        if(requestSrc == 2) {

            if(this.isMultipleSelection) {
 
                this.data.district = [];
                this.data.city = [];
                
            } else {
                
                this.data.district = '';
                this.data.city = '';
            }
        }

        console.log(this.data);

        this.districtList = [];
        this.cityList=[];

        console.log(this.data);

        const stateData = [];


        if(this.isMultipleSelection) {

            for (let index = 0; index < this.data.state.length; index++) {
               stateData.push(this.data.state[index].name);
            }

        } else {

              stateData.push(this.data.state.name);
        }
    

        let apiURLData={states: stateData};
        console.log(apiURLData);


        let loading = this.loadingCtrl.create({
          spinner:'hide',
          content:`<img src="assets/imgs/loader.png"  class="rotate h45"/>`,
        });

        loading.present();
        
        this.service.getData(apiURLData,"districtinstate/list").then((r)=>
        {
              console.log(r)
              this.districtList=r['data'];

              loading.dismiss();

              const districtData = [];

              for (let index = 0; index < this.districtList.length; index++) {

                   const isExist = districtData.findIndex(row => row.districtName == this.districtList[index].districtName);

                   if(isExist === -1) {
                       districtData.push(this.districtList[index]);
                   }
              }

              this.districtList = districtData;
              console.log(this.districtList);
        });
  }

  
  getCityList(requestSrc)
  {
        if(requestSrc == 2) {

            if(this.isMultipleSelection) {
               this.data.city = []
            } else {
                this.data.city = '';
            }
        }
        
        this.cityList=[];

        const districtData = [];


        if(this.isMultipleSelection) {

            for (let index = 0; index < this.data.district.length; index++) {
               districtData.push(this.data.district[index].districtName);
            }

        } else {
              districtData.push(this.data.district.districtName);
        }

        let apiURLData={districts: districtData};
        console.log(apiURLData);

        let loading = this.loadingCtrl.create({
          spinner:'hide',
          content:`<img src="assets/imgs/loader.png"  class="rotate h45"/>`,
        });
        
        loading.present();
        
        this.service.getData(apiURLData, 'citiesindistrict/list').then((r)=>{

              console.log(r);
              this.cityList= r['data'];

              loading.dismiss();

              const cityData = [];

              for (let index = 0; index < this.cityList.length; index++) {

                  const isExist = cityData.findIndex(row => row.city == this.cityList[index].city); 

                  if(isExist === -1) {
                        cityData.push(this.cityList[index]);
                  }
              }

              this.cityList = cityData;
        });
  }
  

  onResetInputDataHandler() {

      if(this.isMultipleSelection) {

          this.data.state=[];
          this.data.district=[];
          this.data.city=[];

      } else {
            
          this.data.state = '';
          this.data.district = '';
          this.data.city = '';
      }

      this.basicForm.get('state').markAsUntouched();
      this.basicForm.get('district').markAsUntouched();
      this.basicForm.get('city').markAsUntouched();
  }

  
  dismiss() {
    
    let data = { 'foo': 'bar' };
    this.viewCtrl.dismiss(data);    
  }
  
  
  planDetail:any=[];
  traveldetail:any=[];
  selectedcity:any=[];
  
  
  sendData:any={};
  cityData:any=[];
  MyArrayToBeUpdate:any=[];
  one:any=[];
  
  
  removePlan(i,index) {

          let alert = this.alertCtrl.create({
            title: 'Confirm',
            message: 'Are you sure?',
            buttons: [
                {
                    text: 'No',
                    handler: () => {
                        this.presentToast('Sorry, You Are not Sure !!');
                    }
                },
                {
                    text: 'Yes',
                    handler: () => {
                        console.log(this.planArray[index]);
                        console.log(index)
                        this.planArray.splice(index,1);
                        this.presentToast('Travel Plan Is Removed !!');
                    }
                }
            ]
        })

        alert.present(); 
  }
  
  
  
  presentToast(msg) {

        let toast = this.toastCtrl.create({
            message: msg,
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

}
