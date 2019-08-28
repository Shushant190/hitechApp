import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, NgForm } from '@angular/forms';
import * as moment from 'moment';
import { CatelougeProvider } from '../../../../providers/catelouge/catelouge';
import { Storage } from '@ionic/storage';
import {Content} from 'ionic-angular';
import { ExpenseProvider } from '../../../../providers/expense/expense';
import { OutstationAddListPage } from '../outstation-add-list/outstation-add-list';


/**
* Generated class for the PromotionAddExpPage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/


@IonicPage()
@Component({
  selector: 'page-promotion-add-exp',
  templateUrl: 'promotion-add-exp.html',
})
export class PromotionAddExpPage {
  @ViewChild(Content) content: Content;
  
  promotionForm:FormGroup;
  todayDate:any;
  
  salesActivityArr:any =  [ {typeId: 1 ,name: 'Mechanic get together'},
                            {typeId: 2 ,name: 'Retailer get together'},
                            {typeId: 3 ,name: 'Van Campaign'},
                            {typeId: 4 ,name: 'Stall Campaign'},
                            {typeId: 5 ,name: 'Exhibition Participation'},
                            {typeId: 6 ,name: 'Signboard'},
                            {typeId: 7 ,name: 'Wall/Shop Painting'},
                            {typeId: 8 ,name: 'GiveAways'},
                            {typeId: 9 ,name: 'Printing Of Lesafelts,banners, posters etc.'}];
  
  
  outstationTypeArr:any = [{typeId: 1, name: 'Sales Promotion'}];
  promotionData:any = {};
  expenseCartArr:any = {};
  
  stateList:any = [];
  districtList:any = [];
  cityList:any = [];
  
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder:FormBuilder,
    public service: CatelougeProvider,
    public loadingCtrl: LoadingController,
    public store: Storage,
    public toastCtrl: ToastController,
    public expenseCtrl: ExpenseProvider) {
      
      this.promotionForm = formBuilder.group({
        
          date: ['', Validators.compose([Validators.required])],
          salesActivityType: ['', Validators.compose([Validators.required])],
          state: ['', Validators.compose([Validators.required])],
          district: ['', Validators.compose([Validators.required])],
          city: ['', Validators.compose([Validators.required])],
          placeOfActivity: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
          noOfAttendees: ['', Validators.compose([Validators.required, Validators.minLength(1)])],
          rentalExpenses: ['', Validators.compose([Validators.required, Validators.minLength(1)])],
          foodExpense: ['', Validators.compose([Validators.required])],
          avAidsExpense: [''],
          giftsExpense: [''],
          miscExpense: [''],
          approvedAmount: [''],
          tax: [''],
          remarks: ['']
      });
      
      this.todayDate = moment().format('YYYY-MM-DD');
    }
    
    ionViewDidLoad() {
        console.log('ionViewDidLoad PromotionAddExpPage');
        this.getStateList();
    }
    
    
    onSaveHandler() {
      
      if(this.promotionForm.invalid)
      {
            console.log(this.promotionForm);
            this.promotionForm.get('date').markAsTouched();
            this.promotionForm.get('salesActivityType').markAsTouched();
            this.promotionForm.get('state').markAsTouched();
            this.promotionForm.get('district').markAsTouched();
            this.promotionForm.get('city').markAsTouched();
            this.promotionForm.get('placeOfActivity').markAsTouched();
            this.promotionForm.get('noOfAttendees').markAsTouched();
            this.promotionForm.get('rentalExpenses').markAsTouched();
            this.promotionForm.get('foodExpense').markAsTouched();
            this.promotionForm.get('avAidsExpense').markAsTouched();
            this.promotionForm.get('giftsExpense').markAsTouched();
            this.promotionForm.get('miscExpense').markAsTouched();
            this.promotionForm.get('approvedAmount').markAsTouched();
            this.promotionForm.get('tax').markAsTouched();
            this.promotionForm.get('remarks').markAsTouched();
            return;
        
      } else {
        
          const indexExist = this.outstationTypeArr.findIndex(row => row.typeId == 1);
          
          const modeIndex = this.salesActivityArr.findIndex(row=> row.typeId == this.promotionData.salesActivityType);
          this.promotionData['salesActivityTypeName'] = this.salesActivityArr[modeIndex].name;

          this.promotionData['date'] = moment(this.promotionData['date']).format('YYYY-MM-DD');

          if(!this.promotionData['rentalExpenses']) {
              this.promotionData['rentalExpenses'] = 0;
          }

          if(!this.promotionData['foodExpense']) {
            this.promotionData['foodExpense'] = 0;
          }

          if(!this.promotionData['avAidsExpense']) {
             this.promotionData['avAidsExpense'] = 0;
          }

          if(!this.promotionData['giftsExpense']) {
             this.promotionData['giftsExpense'] = 0;
          }

          if(!this.promotionData['miscExpense']) {
            this.promotionData['miscExpense'] = 0;
          }

          if(!this.promotionData['approvedAmount']) {
            this.promotionData['approvedAmount'] = 0;
          }

          if(!this.promotionData['tax']) {
            this.promotionData['tax'] = 0;
          }

          this.promotionData['state'] = this.promotionData['state']['name'];
          this.promotionData['district'] = this.promotionData['district']['districtName'];
          this.promotionData['city'] = this.promotionData['city']['cityName'];

          const totalAmount = parseInt(this.promotionData['rentalExpenses']) + parseInt(this.promotionData['foodExpense']) + parseInt(this.promotionData['avAidsExpense']) + parseInt(this.promotionData['giftsExpense']) + parseInt(this.promotionData['miscExpense']) + parseInt(this.promotionData['tax']);

          this.promotionData['total'] = totalAmount;
          
          this.expenseCartArr = this.expenseCtrl.addToCart(JSON.parse(JSON.stringify(this.promotionData)), this.outstationTypeArr[indexExist].name);
          
          console.log(this.expenseCartArr);
          
          this.promotionForm.reset();
          this.onResetValidationHandler();
          this.content.scrollToTop();
      }
      
      console.log(this.expenseCartArr);
      
      let toast = this.toastCtrl.create({
         message: ' Item Updated Into Cart!',
         duration: 3000,
         position: 'bottom'
      });
      
      toast.onDidDismiss(() => {
        console.log('Dismissed toast');
      });
      
      toast.present();
    }
    
    
    onResetValidationHandler() {
      
        this.promotionForm.get('date').markAsUntouched();
        this.promotionForm.get('salesActivityType').markAsUntouched();
        this.promotionForm.get('state').markAsUntouched();
        this.promotionForm.get('district').markAsUntouched();
        this.promotionForm.get('city').markAsUntouched();
        this.promotionForm.get('placeOfActivity').markAsUntouched();
        this.promotionForm.get('noOfAttendees').markAsUntouched();
        this.promotionForm.get('rentalExpenses').markAsUntouched();
        this.promotionForm.get('foodExpense').markAsUntouched();
        this.promotionForm.get('avAidsExpense').markAsUntouched();
        this.promotionForm.get('giftsExpense').markAsUntouched();
        this.promotionForm.get('miscExpense').markAsUntouched();
        this.promotionForm.get('approvedAmount').markAsUntouched();
        this.promotionForm.get('tax').markAsUntouched();
        this.promotionForm.get('remarks').markAsUntouched();
    }
    
    
    getStateList()
    {
        console.log('calling');
        
        this.service.getValue('','state/list/').then((response)=>{
          console.log(response);
          if(response['status']=='Success')
          {
            this.stateList=response['data'];
            
            const stateData = [];
            
            for (let index = 0; index < this.stateList.length; index++) {
              stateData.push({name: this.stateList[index]});
            }
            
            this.stateList = stateData;
            
          }
        });
    }
    
    
    getDistrictList(state)
    {
        console.log(state)

        let loading = this.loadingCtrl.create({
          spinner:'hide',
          content:`<img src="assets/imgs/loader.png"  class="rotate h45"/>`,
        });

        loading.present();

        this.promotionData.district = '';
        this.promotionData.city = '';

        let state_list=Array(state.name)
        console.log(state_list);

        this.service.getData(state_list,'district/list/').then((response)=>{

            console.log(response);
            loading.dismiss();

            this.districtList=response['data'][0]['distrcits'];
            console.log(this.districtList);

        });
    }


    getCityList(state,districtName)
    {
        console.log(state);
        console.log(districtName);
        
        let loading = this.loadingCtrl.create({
           spinner:'hide',
           content:`<img src="assets/imgs/loader.png"  class="rotate h45"/>`,
        });

        loading.present();

        this.promotionData.city = '';

        this.service.getData(Array({"stateName":state.name,"distrcits":Array({"districtName":districtName.districtName})}),'city/list').then((response)=>{

              console.log(response);
              loading.dismiss();

              this.cityList = response['data'][0]['distrcits'][0]['cities'];
              console.log(this.cityList);

        });
    }
    
    goToExpenseListPage() {
        console.log();
        this.navCtrl.push(OutstationAddListPage);
    }
    
  }
  