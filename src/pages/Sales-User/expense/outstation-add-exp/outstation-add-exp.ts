import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { OutstationAddListPage } from '../outstation-add-list/outstation-add-list';
import { Validators, FormBuilder, FormGroup, NgForm } from '@angular/forms';
import * as moment from 'moment';
import { CatelougeProvider } from '../../../../providers/catelouge/catelouge';
import { Storage } from '@ionic/storage';
import {Content} from 'ionic-angular';
import { ExpenseProvider } from '../../../../providers/expense/expense';

/**
 * Generated class for the OutstationAddExpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-outstation-add-exp',
  templateUrl: 'outstation-add-exp.html',
})
export class OutstationAddExpPage {

  @ViewChild(Content) content: Content;

   outstationType:any = 1;
   todayDate:any;
   designation:any;
   allowanceList:any = [];

   travelForm:FormGroup;
   hotelForm:FormGroup;
   foodForm:FormGroup;
   convenceForm:FormGroup;
   miscForm:FormGroup;

   modeTravelArr:any = [{typeId: 1 ,name: 'BUS'},
                        {typeId: 2 ,name: 'TRAIN'},
                        {typeId: 3 ,name: 'AIRLINE'},
                        {typeId: 4 ,name: 'TAXI'} ];

   modeLocalTravelArr:any = [{typeId: 10 ,name: 'AUTO'},
                             {typeId: 1 ,name: 'BUS'},
                             {typeId: 6 ,name: 'AC TAXI'},
                             {typeId: 7 ,name: 'NON-AC TAXI'},
                             {typeId: 8 ,name: 'TWO WHEELER'},
                             {typeId: 5 ,name: 'METRO'} ];

    miscActivityTypeArr:any = [{typeId: 1 ,name: 'Entertainment Expenses'},
                             {typeId: 2 ,name: 'Gift To Dealers'},
                             {typeId: 3 ,name: 'Lunch/Dinner With Team'},
                             {typeId: 4 ,name: 'Training Program'},
                             {typeId: 5 ,name: 'Other'}];


   travelData:any = {};
   hotelData:any = {};
   foodData:any = {};
   localData:any = {};

   expenseData:any = {};
   expenseCartArr:any = {};


   outstationTypeArr:any = [{typeId: 1, name: 'Travel Entitlement'},
                            {typeId: 2, name: 'Hotel'},
                            {typeId: 3, name: 'Food'},
                            {typeId: 4, name: 'Local Convence'},
                            {typeId: 5, name: 'Misc Expense'} ];

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public formBuilder:FormBuilder,
              public service: CatelougeProvider,
              public store: Storage,
              public toastCtrl: ToastController,
              public expenseCtrl: ExpenseProvider) {
       
            this.travelForm = formBuilder.group({

               modeOfTravel: ['', Validators.compose([Validators.required])],
               class: ['', Validators.compose([Validators.required])],
               departureDate: ['', Validators.compose([Validators.required])],
               departureStation: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
               departureTime: ['', Validators.compose([Validators.required])],
               arrivalDate: ['', Validators.compose([Validators.required])],
               arrivalStation: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
               arrivalTime: ['', Validators.compose([Validators.required])],
               ticketNo: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
               amount: ['', Validators.compose([Validators.required, Validators.minLength(2)])],
               tax: ['']
            });
      
            this.hotelForm =formBuilder.group({
                city: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
                checkInDate: ['', Validators.compose([Validators.required])],
                checkOutDate: ['', Validators.compose([Validators.required])],
                hotelName: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
                billAmount: ['', Validators.compose([Validators.required, Validators.minLength(2)])],
                tax: [''],
                remarks: ['']
            });

            this.foodForm = formBuilder.group({
              city: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
              date: ['', Validators.compose([Validators.required])],
              billAmount: ['', Validators.compose([Validators.required])],
              tax: [''],
              remarks: ['']
            });
    
            this.convenceForm =formBuilder.group({
                modeOfTravel: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
                date: ['', Validators.compose([Validators.required])],
                from: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
                to: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
                fare: ['', Validators.compose([Validators.required, Validators.minLength(2)])],
            });

            this.miscForm =formBuilder.group({
               miscActivityType: ['', Validators.compose([Validators.required])],
               date: ['', Validators.compose([Validators.required])],
               placeOfExpense: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
               nameOfBeneficiary: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
               amount: ['', Validators.compose([Validators.required, Validators.minLength(2)])],
               tax: [''],
               remarks: [''],
            });

            this.todayDate = moment().format('YYYY-MM-DD');
  }

  ionViewDidLoad() {

      console.log('ionViewDidLoad OutstationAddExpPage');

      this.store.get('user').then((user)=>{
           console.log(user);
           this.designation = 1;
           this.getAllowanceList();
      });

  }


  onSaveHandler() {

      if(this.outstationType == 1) {

          if(this.travelForm.invalid)
          {
                console.log(this.travelForm);
                this.travelForm.get('modeOfTravel').markAsTouched();
                this.travelForm.get('class').markAsTouched();
                this.travelForm.get('departureDate').markAsTouched();
                this.travelForm.get('departureStation').markAsTouched();
                this.travelForm.get('departureTime').markAsTouched();
                this.travelForm.get('arrivalDate').markAsTouched();
                this.travelForm.get('arrivalStation').markAsTouched();
                this.travelForm.get('arrivalTime').markAsTouched();
                this.travelForm.get('ticketNo').markAsTouched();
                this.travelForm.get('amount').markAsTouched();
                this.travelForm.get('tax').markAsTouched();
                return;

          } else {

               const indexExist = this.outstationTypeArr.findIndex(row => row.typeId == this.outstationType);

               this.travelData['typeId'] = this.outstationTypeArr[indexExist].tyepId;

               const modeIndex = this.modeTravelArr.findIndex(row=> row.typeId == this.travelData.modeOfTravel);
               this.travelData['modeOfTravelName'] = this.modeTravelArr[modeIndex].name;

               this.expenseCartArr = this.expenseCtrl.addToCart(JSON.parse(JSON.stringify(this.travelData)), this.outstationTypeArr[indexExist].name);

               this.travelForm.reset();
               this.onResetValidationHandler();
               this.content.scrollToTop();

          }
      }


      if(this.outstationType == 2) {

          if(this.hotelForm.invalid)
          {
                console.log(this.hotelForm);
                this.hotelForm.get('city').markAsTouched();
                this.hotelForm.get('checkInDate').markAsTouched();
                this.hotelForm.get('checkOutDate').markAsTouched();
                this.hotelForm.get('hotelName').markAsTouched();
                this.hotelForm.get('billAmount').markAsTouched();
                this.hotelForm.get('tax').markAsTouched();
                this.hotelForm.get('remarks').markAsTouched();
                return;

          } else {

            const indexExist = this.outstationTypeArr.findIndex(row => row.typeId == this.outstationType);

            this.hotelData['typeId'] = this.outstationTypeArr[indexExist].tyepId;

            this.expenseCartArr = this.expenseCtrl.addToCart(JSON.parse(JSON.stringify(this.hotelData)), this.outstationTypeArr[indexExist].name);

             this.hotelForm.reset();

             this.onResetValidationHandler();
             this.content.scrollToTop();

          }
      }

      if(this.outstationType == 3) {

          if(this.foodForm.invalid)
          {
                console.log(this.foodForm);
                this.foodForm.get('city').markAsTouched();
                this.foodForm.get('date').markAsTouched();
                this.foodForm.get('billAmount').markAsTouched();
                this.foodForm.get('tax').markAsTouched();
                this.foodForm.get('remarks').markAsTouched();
                return;

          } else {

                const indexExist = this.outstationTypeArr.findIndex(row => row.typeId == this.outstationType);

                this.foodData['typeId'] = this.outstationTypeArr[indexExist].tyepId;

                this.expenseCartArr = this.expenseCtrl.addToCart(JSON.parse(JSON.stringify(this.foodData)), this.outstationTypeArr[indexExist].name);

                this.foodForm.reset();
                this.onResetValidationHandler();
                this.content.scrollToTop();

          }
      }


      if(this.outstationType == 4) {

          if(this.convenceForm.invalid)
          {
                console.log(this.convenceForm);
                this.convenceForm.get('modeOfTravel').markAsTouched();
                this.convenceForm.get('date').markAsTouched();
                this.convenceForm.get('from').markAsTouched();
                this.convenceForm.get('to').markAsTouched();
                this.convenceForm.get('fare').markAsTouched();
                return;

          } else {

                const indexExist = this.outstationTypeArr.findIndex(row => row.typeId == this.outstationType);

                this.localData['typeId'] = this.outstationTypeArr[indexExist].tyepId;

                const modeIndex = this.modeLocalTravelArr.findIndex(row=> row.typeId == this.localData.modeOfTravel);
                this.localData['modeOfTravelName'] = this.modeLocalTravelArr[modeIndex].name;

                this.expenseCartArr = this.expenseCtrl.addToCart(JSON.parse(JSON.stringify(this.localData)), this.outstationTypeArr[indexExist].name);

                this.convenceForm.reset();
                this.onResetValidationHandler();
                this.content.scrollToTop();

          }
      }


      if(this.outstationType == 5) {

          if(this.miscForm.invalid)
          {
                console.log(this.miscForm);
                this.miscForm.get('miscActivityType').markAsTouched();
                this.miscForm.get('date').markAsTouched();
                this.miscForm.get('placeOfExpense').markAsTouched();
                this.miscForm.get('nameOfBeneficiary').markAsTouched();
                this.miscForm.get('amount').markAsTouched();
                this.miscForm.get('tax').markAsTouched();
                this.miscForm.get('remarks').markAsTouched();
                return;

          } else {

                const indexExist = this.outstationTypeArr.findIndex(row => row.typeId == this.outstationType);

                this.expenseData['typeId'] = this.outstationTypeArr[indexExist].tyepId;

                const modeIndex = this.miscActivityTypeArr.findIndex(row=> row.typeId == this.expenseData.miscActivityType);
                this.expenseData['miscActivityTypeName'] = this.miscActivityTypeArr[modeIndex].name;

                this.expenseCartArr = this.expenseCtrl.addToCart(JSON.parse(JSON.stringify(this.expenseData)), this.outstationTypeArr[indexExist].name);

                this.miscForm.reset();
                this.onResetValidationHandler();
                this.content.scrollToTop();
          }
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

        this.travelForm.get('modeOfTravel').markAsUntouched();
        this.travelForm.get('class').markAsUntouched();
        this.travelForm.get('departureDate').markAsUntouched();
        this.travelForm.get('departureStation').markAsUntouched();
        this.travelForm.get('departureTime').markAsUntouched();
        this.travelForm.get('arrivalDate').markAsUntouched();
        this.travelForm.get('arrivalStation').markAsUntouched();
        this.travelForm.get('arrivalTime').markAsUntouched();
        this.travelForm.get('ticketNo').markAsUntouched();
        this.travelForm.get('amount').markAsUntouched();
        this.travelForm.get('tax').markAsUntouched();

        this.hotelForm.get('city').markAsUntouched();
        this.hotelForm.get('checkInDate').markAsUntouched();
        this.hotelForm.get('checkOutDate').markAsUntouched();
        this.hotelForm.get('hotelName').markAsUntouched();
        this.hotelForm.get('billAmount').markAsUntouched();
        this.hotelForm.get('tax').markAsUntouched();
        this.hotelForm.get('remarks').markAsUntouched();

        this.foodForm.get('city').markAsUntouched();
        this.foodForm.get('date').markAsUntouched();
        this.foodForm.get('billAmount').markAsUntouched();
        this.foodForm.get('tax').markAsUntouched();
        this.foodForm.get('remarks').markAsUntouched();

        this.convenceForm.get('modeOfTravel').markAsUntouched();
        this.convenceForm.get('date').markAsUntouched();
        this.convenceForm.get('from').markAsUntouched();
        this.convenceForm.get('to').markAsUntouched();
        this.convenceForm.get('fare').markAsUntouched();

        this.miscForm.get('miscActivityType').markAsUntouched();
        this.miscForm.get('date').markAsUntouched();
        this.miscForm.get('placeOfExpense').markAsUntouched();
        this.miscForm.get('nameOfBeneficiary').markAsUntouched();
        this.miscForm.get('amount').markAsUntouched();
        this.miscForm.get('tax').markAsUntouched();
        this.miscForm.get('remarks').markAsUntouched(); 
  }


  getAllowanceList() {

        console.log(this.designation);
        this.service.getData({designation:this.designation},"allowance/list").then((result) => {
            console.log(result);   
            this.allowanceList=result['data'][0];
        })
  }

  goToTypeHanlder(type) {

      this.outstationType = type;
  }


  goToOutStationAddListPage() {

      console.log();
      this.navCtrl.push(OutstationAddListPage);
  }


  localFareError:any=0;
  checkValidLocalFare()
  {
        this.localFareError=0;

        const modeType = this.localData.modeOfTravel;

        if(modeType=='1')
        {
            if(this.allowanceList.localAuto!=true)
            {
                this.localFareError=1
            }
        }

        if(modeType=='2')
        {
            if(this.allowanceList.localBus!=true)
            {
              this.localFareError=1
            }
        }

        if(modeType=='3')
        {
            if(this.allowanceList.localTaxiAC!=true)
            {
                this.localFareError=1
            }
        }

        if(modeType=='4')
        {
            if(this.allowanceList.localTaxiNonAC!=true)
            {
                this.localFareError=1
            }
        }
        
        if(modeType=='5')
        {
            if(this.allowanceList.localTwoWheeler!=true)
            {
                this.localFareError=1
            }
        }
  }

}
