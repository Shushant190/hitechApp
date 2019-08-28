import { Component,ViewChild,ElementRef,OnInit,NgZone  } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, Content } from 'ionic-angular';
import { ExpensesDetailsPage } from '../../expense/expenses-details/expenses-details';
import { PopoverController } from 'ionic-angular/components/popover/popover-controller';


import { Storage} from '@ionic/storage'
import * as moment from 'moment';
import { CatelougeProvider } from '../../../../providers/catelouge/catelouge';
import { registerModuleFactory } from '@angular/core/src/linker/ng_module_factory_loader';
import { ExpensePopoverComponent } from '../../../../components/expense-popover/expense-popover';
/**
 * Generated class for the ExpensesListsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-expenses-lists',
  templateUrl: 'expenses-lists.html',
})
export class ExpensesListsPage {
  @ViewChild(Content) content: Content;
selectedTab:any=1;
userId:any
role:any;
expenseStatus:any=2;
isRequestInProcess =true;

  constructor( public toastCtrl: ToastController,  public loadingCtrl:LoadingController, public serve :CatelougeProvider, public store:Storage, public navCtrl: NavController, public navParams: NavParams, public popoverCtrl: PopoverController, private zone: NgZone) {
    this.store.get('userId').then((userId)=>{
      this.userId= userId;
      console.log(this.userId);
    });
    this.store.get('role').then((role)=>{
      console.log(role);
      this.role= role;
    });

setTimeout(() => {
  console.log(this.role);
    console.log(this.userId);
    if(this.userId)
    {
      this.filter.expense=1;
      this.getExpenseList(this.filter.expense,this.expenseStatus);
    }
},1000);
    
  }


  doRefresh(event) {
    console.log('Begin async operation');
    setTimeout(() => {
      console.log('Async operation has ended');
      event.complete();
    }, 3000);
    setTimeout(() => {
      this.presentToast();
    }, 3500);
  }
  presentToast() {
    let toast = this.toastCtrl.create({
      message: ' Refreshed Successfully',
      duration: 3000,
      position: 'bottom'
    });
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
    toast.present();
  }





  ionViewDidLoad() {
    console.log('ionViewDidLoad ExpensesListsPage');
  }

  // selectedTabFun()
  // {
  //   this.selectedTab =! this.selectedTab;
  // }
  goOnDetailPage(){
      this.navCtrl.push(ExpensesDetailsPage);
  }

  mainStatus:any = 2;
  tabStatus:any ;
  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(ExpensePopoverComponent , {'status' : this.mystatus});
    popover.present({
      ev: myEvent
    });

    popover.onDidDismiss(pagedata => {
    console.log("=================");
      console.log(pagedata);
// bunny Code
      this.tabStatus = pagedata['TabStatus'];
      this.listingFunction("", 2);

    // buny Code




      // this.mainStatus =  pagedata['main_status'];
      // this.getExpenseList(pagedata['status'],pagedata['main_status']);
    })
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


  expenseList:any=[];
  // expenseStatus:any=2;
  filterData:any={}
  filter:any={}
  pageSize:any=50;
  tmpExpenseList:any=[];
  mystatus:any;
  getExpenseList(status,expenseStatus)
  {
    console.log(status)
    console.log(expenseStatus);
    this.expenseList=[];
  //   let loading = this.loadingCtrl.create({
  //     spinner:'hide',
  //     content:`<img src="assets/imgs/loader.png"  class="rotate h45"/>`,
  //  });
  //  loading.present();
   
  //  this.isRequestInProcess = true;




  //   console.log(this.userId);
    console.log(status); // myexpence 1 
    this.mystatus = status;
    console.log(expenseStatus); //final status


    if(this.filterData.createdOn)
    {
      this.filterData.createdOn=moment(this.filterData.createdOn).format('YYYY-MM-DD')
    }
    this.expenseList=[];
    this.expenseStatus=expenseStatus;
    
    if(this.role!=17)
    { 
      if(status==1)
      {
        
        this.filterData.createById=this.userId;
        this.filterData.currentPage=1
        this.filterData.pageSize=this.serve.pagesize
        this.filterData.status=expenseStatus;
        
      }
      else{
        this.filterData.currentPage=1
        this.filterData.pageSize=this.serve.pagesize
        this.filterData.createById=undefined;
        this.filterData.status=expenseStatus
      }
    }
    else{
      this.filterData.currentPage=1
      this.filterData.pageSize=this.serve.pagesize
      this.filterData.status=3
    }
    
    this.serve.getData(this.filterData,"expense/list").then((result)=>{
      console.log(result);

      this.isRequestInProcess = false;
   
      // setTimeout(() => {
                  
      //   loading.dismiss();
        
      // }, 1000);

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
          // this.saveOriginalData = JSON.parse(JSON.stringify(this.expenseList));
          this.tmpExpenseList=result['data'];

          this.isRequestInProcess = false;
          // this.userName=this.expenseList[0]['userName'];
          if(status==2)
          {
            const expenseArray=this.tmpExpenseList.filter(row=>row.createdBy!=this.userId && row.status!=1);
            
            console.log(expenseArray);
            this.isRequestInProcess = false;
            this.expenseList=expenseArray;
            this.saveOriginalData = JSON.parse(JSON.stringify(this.expenseList));
          }
          
        }
      }
      else if(result['status']=='Success')
      {
        this.expenseList=result['data'];
        this.saveOriginalData = JSON.parse(JSON.stringify(this.expenseList));
        this.isRequestInProcess = false;
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
        this.filterData.createdById=this.userId; //mintu
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
  getExpensedetail(id)
  {
    console.log(id);
    this.navCtrl.push(ExpensesDetailsPage,{'id':id,'status': this.mystatus });
  }





data:any={};
ExpenseList:any=[];
saveOriginalData:any = [];

  onSearchChangeHanlder() {
    
    setTimeout(() => {
      
      if(this.data.search) {
        console.log(this.data.search);
        const filterColumnArr = ['expenseSanctionerName', 'department', 'createdOn','expenseTypeName' , 'ecNumber'];
        
        this.expenseList =  this.serve.onListSearchFilterCatalogue(this.saveOriginalData, this.data.search, filterColumnArr);
        
      } else {
        
        this.expenseList = JSON.parse(JSON.stringify(this.saveOriginalData));
      }
      
    }, 500);
}

onClearSearchHandler() {
  
    setTimeout(() => {
      
      if(!this.data.search) {
        
        let loading = this.loadingCtrl.create({
          spinner:'hide',
          content:`<img src="assets/imgs/loader.png"  class="rotate h45"/>`,
        });
        
        loading.present();
        
        this.expenseList = JSON.parse(JSON.stringify(this.saveOriginalData));
        console.log(this.expenseList);
        setTimeout(() => {  
          loading.dismiss(); 
        }, 500);
      }
      
    }, 500);
}


doInfiniteScroll(infiniteScroll)
{
  
}






show:any='';
scrollToTop() {
  this.content.scrollToTop();
}


ngAfterViewInit() {
  this.content.ionScroll.subscribe((data)=>{
    this.zone.run(() => {
      if(data.scrollTop > 180){
        this.show=true;
      }else{
        this.show=false;
      }
    });
  });
}


// shushant Mangla LISTINGCODE
allStatusType:any = 2;
listingFunction(a,allStatusType)
{

  console.log("this is my pending removed Status",allStatusType);
  console.log( "this is my tab button statuts",this.tabStatus);


  if(this.filterData.createdOn)
    {
      this.filterData.createdOn=moment(this.filterData.createdOn).format('YYYY-MM-DD')
    }
    this.expenseList=[];
    this.expenseStatus=allStatusType;
    
    if(this.role!=17)
    { 
      if(this.tabStatus==1)
      {
        
        // this.filterData.createById=this.userId;
        this.filterData.currentPage=1
        this.filterData.pageSize=this.serve.pagesize
        this.filterData.status=allStatusType;
        
      }
      else{
        this.filterData.currentPage=1
        this.filterData.pageSize=this.serve.pagesize
        this.filterData.createById=undefined;
        this.filterData.status=allStatusType
      }
    }
    else{
      this.filterData.currentPage=1
      this.filterData.pageSize=this.serve.pagesize
      this.filterData.status=3
    }
    
    console.log(this.filterData);
    this.serve.getData(this.filterData,"expense/list").then((result)=>{
      console.log(result);

      if(this.role!=17)
      {
        if(this.tabStatus==1)
        {
          if(allStatusType==2)
          {
            this.getSenctionerPendingList(3)
          }
          if(allStatusType==6)
          {
            this.getSenctionerPendingList(4)
          }
        }
        if(result['status']=='Success')
        {
          this.expenseList=result['data'];
          // this.saveOriginalData = JSON.parse(JSON.stringify(this.expenseList));
          this.tmpExpenseList=result['data'];

          this.isRequestInProcess = false;
          // this.userName=this.expenseList[0]['userName'];
          if(this.tabStatus==2)
          {
            const expenseArray=this.tmpExpenseList.filter(row=>row.createdBy!=this.userId && row.status!=1);
            
            console.log(expenseArray);
            this.isRequestInProcess = false;
            this.expenseList=expenseArray;
            this.saveOriginalData = JSON.parse(JSON.stringify(this.expenseList));
          }
          
        }
      }
      else if(result['status']=='Success')
      {
        this.expenseList=result['data'];
        this.saveOriginalData = JSON.parse(JSON.stringify(this.expenseList));
        this.isRequestInProcess = false;
      }
      if(result['status']=='Failed')
      {
        // this.div=true;
      }
    })

    





}












// SHUSHANT MANGLA 




}
