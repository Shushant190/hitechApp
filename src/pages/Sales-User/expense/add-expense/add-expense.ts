import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OutstationAddExpPage } from '../outstation-add-exp/outstation-add-exp';
import { PromotionAddExpPage } from '../promotion-add-exp/promotion-add-exp';
import { MiscAddExpPage } from '../misc-add-exp/misc-add-exp';
import { LocalconvanceAddExpPage } from '../localconvance-add-exp/localconvance-add-exp';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { ExpenseProvider } from '../../../../providers/expense/expense';
/**
 * Generated class for the AddExpensePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@IonicPage()
@Component({
  selector: 'page-add-expense',
  templateUrl: 'add-expense.html',
})

export class AddExpensePage {

  validateForm: FormGroup;
  basicForm:FormGroup;

  currentStage:any = 1;
  data:any = {};

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public formBuilder:FormBuilder,
              public storage: Storage,
              public expService: ExpenseProvider) {

      this.data.expenseType = 2;
      this.data.advanceAmount = 0;

      this.validateForm = formBuilder.group({
          expenseType: ['', Validators.compose([Validators.required])],
      });

      this.basicForm =formBuilder.group({
          purposeOfVisit: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
          advanceAmount: ['', Validators.compose([Validators.required])]
      });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddExpensePage');
     this.expService.emptyCartStorageData();
  } 


  onStepChangeValidationHandler() {

        const purposeOfVisit = this.basicForm.get('purposeOfVisit');

        if(this.data.expenseType == 2 || this.data.expenseType == 4) {
            purposeOfVisit.setValidators([Validators.required, Validators.minLength(3)]);
        } 

        if(this.data.expenseType == 3) {
            purposeOfVisit.clearValidators();
        } 

        purposeOfVisit.updateValueAndValidity();
  }

  goToExpenseTypeHandler() {

      console.log(this.data.expenseType);

      if(this.currentStage == 1) {

          if(this.data.expenseType == 2 || this.data.expenseType == 3 || this.data.expenseType == 4) {

              this.currentStage = 2;
              this.onStepChangeValidationHandler();

          } else {

              this.data.purposeOfVisit = '';
              this.data.advanceAmount = 0;

              this.storage.set('expenseBasicStorage', JSON.parse(JSON.stringify(this.data)));
              this.navCtrl.push(LocalconvanceAddExpPage);
          }

          return;
      } 


      if(this.currentStage == 2) {

          if(this.data.expenseType == 2 || this.data.expenseType == 3 || this.data.expenseType == 4) {

                if(this.basicForm.invalid)
                {
                      console.log(this.basicForm);
                      this.basicForm.get('purposeOfVisit').markAsTouched();
                      this.basicForm.get('advanceAmount').markAsTouched();
                      return;
                }

                this.storage.set('expenseBasicStorage', JSON.parse(JSON.stringify(this.data)));


                if(this.data.expenseType == 2) {
                   this.navCtrl.push(OutstationAddExpPage);
                }

                if(this.data.expenseType == 3) {
                    this.navCtrl.push(PromotionAddExpPage);
                }

                if(this.data.expenseType == 4) {
                    this.navCtrl.push(MiscAddExpPage);
                }
          }
      }
  }

  Outstationadd()
  {
        console.log('hellooo');
        this.navCtrl.push(OutstationAddExpPage);
  }
  Promotionadd()
  {
        // console.log();
        this.navCtrl.push(PromotionAddExpPage);
  }

  Miscadd()
  {
      // console.log();
     this.navCtrl.push(MiscAddExpPage);
  }

  onGoBackHandler() {
      this.currentStage = 1;
  }

}
