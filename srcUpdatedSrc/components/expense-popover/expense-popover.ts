import { Component } from '@angular/core';

// import { ExpensePopoverComponent } from '../../../../components/expense-popover/expense-popover';
// import { ExpensesDetailsPage } from '../../expense/expenses-details/expenses-details';
import { PopoverController } from 'ionic-angular/components/popover/popover-controller';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Storage} from '@ionic/storage'
import * as moment from 'moment';
// import { NavParams } from 'ionic-angular/umd/navigation/nav-params';
// import { NavController } from 'ionic-angular/navigation/nav-controller';
import { CatelougeProvider } from '../../providers/catelouge/catelouge';
import { ViewController } from 'ionic-angular/navigation/view-controller';



/**
* Generated class for the ExpensePopoverComponent component.
*
* See https://angular.io/api/core/Component for more info on Angular
* Components.
*/
@Component({
  selector: 'expense-popover',
  templateUrl: 'expense-popover.html'
})
export class ExpensePopoverComponent {

  

  selectedTab:any=1;
  userId:any
  role:any;
  expenseStatus:any=2;
  expenseList:any=[];
  // expenseStatus:any=2;
  filterData:any={}
  filter:any={}
  pageSize:any=50;
  tmpExpenseList:any=[];
  text: string;
  mystatus:any;
  


  constructor(public viewCtrl:ViewController,public serve :CatelougeProvider, public store:Storage, public navCtrl: NavController, public navParams: NavParams, public popoverCtrl: PopoverController)
   {
    console.log('Hello ExpensePopoverComponent Component');
    this.store.get('userId').then((r)=>{
      this.userId= r;
      console.log(this.userId);
    });
    this.store.get('role').then((r)=>{
      console.log(r);
      this.role= r;
    });
    
    this.mystatus= this.navParams.get('status');
     console.log(this.role);
    console.log(this.userId);
    if(this.userId)
    {
      this.filter.expense=1;
      this.getExpenseList(this.filter.expense,this.expenseStatus);
    }
    
  }
  
  
  
  
  salesUserList:any={};
  getSalesUserList()
  {
    // this.div=false
    // this.loader=true;
    console.log(this.userId);
    this.serve.getData({ "createById":this.userId,"currentPage": 1,"pageSize": 100},"user/list").then((result)=>{
      console.log(result);
      // this.loader=false;
      if(result['status']=='Success')
      {
        this.salesUserList=result['data'];
      }
      if(result['status']=='Failed')
      {
        // this.div=true;
      }
    })
  }
  
  
  
  getExpenseList(status,expenseStatus)
  {
   
    console.log(this.userId);
    console.log(status);
    console.log(this.mystatus); // my expence or Team Expense 
    console.log(expenseStatus);  // orignal status 
    if(this.filterData.createdOn)
    {
      this.filterData.createdOn=moment(this.filterData.createdOn).format('YYYY-MM-DD')
    }
    this.expenseList=[];
    this.expenseStatus=expenseStatus;
    console.log(status);
    if(this.role!=17)
    { 
      if(status==1)
      {
        
        this.filterData.createById=this.userId;
        this.filterData.currentPage=1
        this.filterData.pageSize=this.pageSize
        this.filterData.status=expenseStatus;
        
      }
      else{
        this.filterData.currentPage=1
        this.filterData.pageSize=this.pageSize
        this.filterData.createById=undefined;
        this.filterData.status=expenseStatus
      }
    }
    else{
      this.filterData.currentPage=1
      this.filterData.pageSize=this.pageSize
      this.filterData.status=3
    }
    
    console.log(this.filterData);
    
    this.serve.getData(this.filterData,"expense/list").then((result)=>{
      console.log(result);
      // this.loader=false;
      if(this.role!=17)
      {
        if(status==1)
        {
          if(expenseStatus==2)
          {
            this.getSenctionerPendingList(3)
          }
          if(expenseStatus==6)
          {
            this.getSenctionerPendingList(4)
          }
        }
        if(result['status']=='Success')
        {
          this.expenseList=result['data'];
          this.tmpExpenseList=result['data'];
          // this.userName=this.expenseList[0]['userName'];
          if(status==2)
          {
            const expenseArray=this.tmpExpenseList.filter(row=>row.createdBy!=this.userId && row.status!=1);
            
            console.log(expenseArray);
            
            this.expenseList=expenseArray;
          }
          
        }
      }
      else if(result['status']=='Success')
      {
        this.expenseList=result['data'];
      }
      if(result['status']=='Failed')
      {
        // this.div=true;
      }
    })
  }
  
  
  
  pendingExpenseList:any;
  getSenctionerPendingList(status)
  {
    this.filterData.createById=this.userId;
    this.filterData.currentPage=1
    this.filterData.pageSize=this.pageSize
    this.filterData.status=status;
    
    this.serve.getData(this.filterData,"expense/list").then((result)=>{
      console.log(result);
      
      if(result['status']=='Success')
      {
        this.pendingExpenseList=result['data'];
        this.expenseList=this.expenseList.concat(this.pendingExpenseList);
        console.log(this.expenseList);
        
      }
    })
  }
  

  
  
  
  
  
  
  
  offPopup(item,a)
  {
    console.log(item);
    this.viewCtrl.dismiss({ 'status': this.mystatus,'main_status': this.expenseStatus, data:item});
  }
  
  
  

  offPopupfun(tabStatus)
  {
  this.viewCtrl.dismiss({ 'TabStatus': tabStatus});
  }



  
  
  
}
