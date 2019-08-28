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
 * Generated class for the LocalconvanceAddExpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-localconvance-add-exp',
  templateUrl: 'localconvance-add-exp.html',
})
export class LocalconvanceAddExpPage {

  @ViewChild(Content) content: Content;

  localForm:FormGroup;
  todayDate:any;

  designation:any;
  allowanceList:any = [];

  isAllowanceAmountReadOnly:any = false;
  
  outstationTypeArr:any = [{typeId: 1, name: 'Local Expense'}];

  modeTypeArr:any =  [ {typeId: 1 ,name: 'Self Vechicle'},  
                       {typeId: 2 ,name: 'Public Transport'} ];
  
  modeArr:any =  [ {typeId: 10 ,name: 'AUTO', modeType: 2},
                       {typeId: 1 ,name: 'BUS', modeType: 2},
                       {typeId: 6 ,name: 'AC TAXI', modeType: 2},
                       {typeId: 7 ,name: 'NON-AC TAXI', modeType: 2},
                       {typeId: 5 ,name: 'METRO', modeType: 2},
                       {typeId: 9 ,name: 'CAR', modeType: 1},
                       {typeId: 8 ,name: 'BIKE', modeType: 1} ];
  
  localData:any = {};
  expenseCartArr:any = {};

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder:FormBuilder,
    public service: CatelougeProvider,
    public loadingCtrl: LoadingController,
    public store: Storage,
    public toastCtrl: ToastController,
    public expenseCtrl: ExpenseProvider) {

      this.localForm = formBuilder.group({
          
          visitDate: ['', Validators.compose([Validators.required])],
          from: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
          to: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
          modeType: ['', Validators.compose([Validators.required])],
          mode: ['', Validators.compose([Validators.required])],
          vehicleNumber: [''],
          distanceKMS: [''],
          amount: [''],
          otherExpense: [''],
          tax: [''],
          remarks: ['']
      });

      this.todayDate = moment().format('YYYY-MM-DD');
  }

  ionViewDidLoad() {
      console.log('ionViewDidLoad LocalAddExpPage');
      
      this.store.get('user').then((user)=>{
          console.log(user);
          this.designation = 1;
          this.getAllowanceList();
      });

  }


  getAllowanceList() {

      console.log(this.designation);
      this.service.getData({designation:this.designation},"allowance/list").then((result) => {
          console.log(result);   
          this.allowanceList=result['data'][0];
      })
  }

  onModeTypeChangeHandler() {

       if(this.localData.modeType == 1) {
            this.isAllowanceAmountReadOnly = true;
       }

       if(this.localData.modeType == 2) {
           this.isAllowanceAmountReadOnly = false;
       }
  }


  onCalculateAmountHandler() {
     
      console.log(this.allowanceList);
      if(this.localData.mode==9)
      {
          this.localData.amount=parseFloat(this.allowanceList.selfCarPerKM)*parseFloat(this.localData.distanceKMS);
        
          console.log(this.allowanceList);
      }

      if(this.localData.mode==8)
      {
         this.localData.amount = parseFloat(this.allowanceList.selfBikePerKM)*parseFloat(this.localData.distanceKMS);
        
      }

      console.log(this.localData.amount);
  }
  
  
  onSaveHandler() {
    
    if(this.localForm.invalid)
    {
        console.log(this.localForm);
        this.localForm.get('visitDate').markAsTouched();
        this.localForm.get('from').markAsTouched();
        this.localForm.get('to').markAsTouched();
        this.localForm.get('modeType').markAsTouched();
        this.localForm.get('mode').markAsTouched();
        this.localForm.get('vehicleNumber').markAsTouched();
        this.localForm.get('distanceKMS').markAsTouched();
        this.localForm.get('amount').markAsTouched();
        this.localForm.get('otherExpense').markAsTouched();
        this.localForm.get('tax').markAsTouched();
        this.localForm.get('remarks').markAsTouched();
        return;
      
    } else {
      
        const indexExist = this.outstationTypeArr.findIndex(row => row.typeId == 1);
        

        const modeTypeIndex = this.modeTypeArr.findIndex(row=> row.typeId == this.localData.modeType);
        this.localData['modeTypeName'] = this.modeTypeArr[modeTypeIndex].name;
        
        const modeIndex = this.modeArr.findIndex(row=> row.typeId == this.localData.mode);
        this.localData['modeName'] = this.modeArr[modeIndex].name;
        
        this.localData['visitDate'] = moment(this.localData['visitDate']).format('YYYY-MM-DD');
        
        if(!this.localData['tax']) {
           this.localData['tax'] = 0;
        }
        
        if(!this.localData['remarks']) {
           this.localData['remarks'] = '';
        }
        
        
        const totalAmount = parseInt(this.localData['amount']) + parseInt(this.localData['tax']);
        
        this.localData['total'] = totalAmount;
        
        this.expenseCartArr = this.expenseCtrl.addToCart(JSON.parse(JSON.stringify(this.localData)), this.outstationTypeArr[indexExist].name);
        
        console.log(this.expenseCartArr);
        
        this.localForm.reset();
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

      this.localForm.get('visitDate').markAsUntouched();
      this.localForm.get('from').markAsUntouched();
      this.localForm.get('to').markAsUntouched();
      this.localForm.get('modeType').markAsUntouched();
      this.localForm.get('mode').markAsUntouched();
      this.localForm.get('vehicleNumber').markAsUntouched();
      this.localForm.get('distanceKMS').markAsUntouched();
      this.localForm.get('amount').markAsUntouched();
      this.localForm.get('otherExpense').markAsUntouched();
      this.localForm.get('tax').markAsUntouched();
      this.localForm.get('remarks').markAsUntouched();
  }



  ConvenceAddList()
  {
      console.log();
      this.navCtrl.push(OutstationAddListPage);
  }

}
