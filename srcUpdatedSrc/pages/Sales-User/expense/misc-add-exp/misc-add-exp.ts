import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, NgForm } from '@angular/forms';
import * as moment from 'moment';
import { CatelougeProvider } from '../../../../providers/catelouge/catelouge';
import { Storage } from '@ionic/storage';
import {Content} from 'ionic-angular';
import { ExpenseProvider } from '../../../../providers/expense/expense';
import { MiscAddListPage } from '../misc-add-list/misc-add-list';
import { OutstationAddListPage } from '../outstation-add-list/outstation-add-list';

/**
* Generated class for the MiscAddExpPage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/

@IonicPage()
@Component({
  selector: 'page-misc-add-exp',
  templateUrl: 'misc-add-exp.html',
})
export class MiscAddExpPage {
  
  @ViewChild(Content) content: Content;
  
  miscForm:FormGroup;
  todayDate:any;
  
  outstationTypeArr:any = [{typeId: 1, name: 'Misc Expense'}];
  
  natureExpenseArr:any =  [ {typeId: 1 ,name: 'Entertainment Expenses'},
                            {typeId: 2 ,name: 'Gift To Dealers'},
                            {typeId: 3 ,name: 'Lunch/Dinner With Team'},
                            {typeId: 4 ,name: 'Training Program'},
                            {typeId: 5 ,name: 'Other'} ];
  
  miscData:any = {};
  expenseCartArr:any = {};
  
  
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder:FormBuilder,
    public service: CatelougeProvider,
    public loadingCtrl: LoadingController,
    public store: Storage,
    public toastCtrl: ToastController,
    public expenseCtrl: ExpenseProvider) {
      
      
      this.miscForm = formBuilder.group({
        
          miscActivityType: ['', Validators.compose([Validators.required])],
          date: ['', Validators.compose([Validators.required])],
          placeOfExpense: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
          nameOfBeneficiary: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
          amount: ['', Validators.compose([Validators.required, Validators.minLength(1)])],
          tax: [''],
          remarks: ['']
      });

      this.todayDate = moment().format('YYYY-MM-DD');

    }
    
    ionViewDidLoad() {
      console.log('ionViewDidLoad MiscAddExpPage');
    }
    
    
    onSaveHandler() {
      
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
        
          const indexExist = this.outstationTypeArr.findIndex(row => row.typeId == 1);
          
          const modeIndex = this.natureExpenseArr.findIndex(row=> row.typeId == this.miscData.miscActivityType);

          this.miscData['natureExpeneTypeName'] = this.natureExpenseArr[modeIndex].name;
          
          this.miscData['date'] = moment(this.miscData['date']).format('YYYY-MM-DD');
          
          if(!this.miscData['tax']) {
            this.miscData['tax'] = 0;
          }
          
          if(!this.miscData['remarks']) {
            this.miscData['remarks'] = 0;
          }
          
          
          const totalAmount = parseInt(this.miscData['amount']) + parseInt(this.miscData['tax']);
          
          this.miscData['total'] = totalAmount;
          
          this.expenseCartArr = this.expenseCtrl.addToCart(JSON.parse(JSON.stringify(this.miscData)), this.outstationTypeArr[indexExist].name);
          
          console.log(this.expenseCartArr);
          
          this.miscForm.reset();
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

        this.miscForm.get('miscActivityType').markAsUntouched();
        this.miscForm.get('date').markAsUntouched();
        this.miscForm.get('placeOfExpense').markAsUntouched();
        this.miscForm.get('nameOfBeneficiary').markAsUntouched();
        this.miscForm.get('amount').markAsUntouched();
        this.miscForm.get('tax').markAsUntouched();
        this.miscForm.get('remarks').markAsUntouched();
    }

    
    MiscAddList()
    {
        console.log();
        this.navCtrl.push(OutstationAddListPage);
    }
    
  }
  