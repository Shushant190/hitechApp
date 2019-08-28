import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, LoadingController } from 'ionic-angular';
import {Storage} from '@ionic/storage';
import { CatelougeProvider } from '../../../../providers/catelouge/catelouge';
import * as moment from 'moment';

/**
 * Generated class for the ExpensesDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-expenses-details',
  templateUrl: 'expenses-details.html',
})
export class ExpensesDetailsPage {


  id:any;
userId:any;
mystatus:any;

isRequestInProcess =true;


  constructor(public loadingCtrl: LoadingController, public storage:Storage, public serv:CatelougeProvider,public navCtrl: NavController, public navParams: NavParams) {

    this.getUserList();
    this.id=this.navParams.get('id');
    console.log(this.id);
    this.mystatus = this.navParams.get('status');
  this.storage.get('userId').then((userId)=>{
      this.userId= userId;
      
    });
    this.getExpenseDetailNEW();


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ExpensesDetailsPage');
  }


  expenseList:any=[];
  userName:any;
  
  // getExpenseDetail()
  // {
  //   // this.div=false;
  //   //   this.loader=true;


    
  //   let loading = this.loadingCtrl.create({
  //     spinner:'hide',
  //     content:`<img src="assets/imgs/loader.png"  class="rotate h45"/>`,
  //  });
   
  //  loading.present();



  //   console.log("============");
  //   console.log(this.userId);
  //   console.log(this.id);
  //     this.serv.getData({"userId": this.userId,"expenseId":this.id,"currentPage": 1,"pageSize": 50},"expense/list").then((result)=>{
  //       console.log(result);

  //       this.isRequestInProcess = false;


  //       setTimeout(() => {
                  
  //         loading.dismiss();
          
  //       }, 1000);


  //     this.expenseList = result['data'][0];
  //     console.log(this.expenseList);



  //     // ..  this.loader=false;


  //     // console.log(this.expenseList= result.data);
  //       // if(result['status']=='Success')
  //       // {
  //       //   this.expenseList=result['data'];
  //       //   this.userName=this.expenseList[0]['userName'];
  //       //  }
  //       // //  console.log(this.expenseList);
 
  //       // if(result['status']=='Failed')
  //       // {
  //       //   // this.div=true;
  //       // }
  //     })
  // }



data:any= {};

  // changeStatus()
  // {
  //   // this.data={};
  //   if(this.data.status==6)
  //   {
  //     this.data.expenseId=this.expenseId;
  //     this.data.expenseApprovedRejectedBy=this.userId;
  //     this.data.expenseApprovedRejectedOn=moment().format('YYYY-MM-DD')

  //   }
  //   else{
  //     this.data.expenseId=this.expenseId;
  //     this.data.expenseApprovedBy=this.userId;
  //     this.data.expenseApprovedOn=moment().format('YYYY-MM-DD')
  //   }
  //   this.service.fetchData(this.data,"expense/approve").subscribe((result)=>{
  //     console.log(result);
  //     if(result['status']=='Success')
  //     {
  //       this.getExpenseDetail();
  //     }
      
  //   })
  // }
  financeUserList:any=[];
  getUserList()
  {
    // this.loader=true;
    this.serv.getData({role:17, "currentPage": 1,"pageSize": 50},"user/list").then((result)=>{
      console.log(result);
      // this.loader=false;
      if(result['status']=='Success')
      {
        this.financeUserList=result['data'];
        console.log(this.financeUserList);
      }
    })
  }










  statusUpdate()
  {

      
      this.data.expenseId= this.expenseList.expenseId;
      console.log(this.data)
      if(this.data.status==4)
    {
      this.data.expenseSanctionRejectedBy=this.userId
    }

    if(this.data.status==3)
    {
      this.data.expenseSanctionedBy=this.financeUserList[0].userId;
    }



    this.data.expenseId=this.data.expenseId
    // this.data.expenseSanctionedBy=this.userId
    this.data.expenseSanctionedOn=moment().format('YYYY-MM-DD');
   console.log(this.data);
   this.serv.getData(this.data,"expense/sanction").then((result)=>{
     console.log(result);
    //  if(result['status']=='Success')
    //  {
       this.getExpenseDetailNEW();

    //  }
     
   })
    this.navCtrl.pop();
  }

  url:any;
  requestfn:any;
  api:any;
  expenseDetailList:any=[];
  expenseDate:any;
  localConveyances:any=[];
  salesPromotionExpense:any=[];
  outStationExpense:any=[];
  miscExpense:any=[];
  foodExpenses:any=[];
  miscExpenses:any=[];
  outStationHotelExp:any=[];
  outStationLocalExp:any=[];
  outStationTravelExp:any=[];
  localExp:any=[];
  salesProExp:any=[];



  foodLength:any;
  miscLength:any;
hotelLength:any;
localLength:any;
travelLength:any;
expLength:any;
localExpLength:any;
salesProExpLength:any;
  getExpenseDetailNEW()
  {
    // this.loader=true;
    this.serv.getValue("","expense/detail/"+this.id).then((result)=>{
      console.log(result);
      // this.loader=false;
      this.getUserList();
      if(result['status']=='Success')
      {
        
        this.expenseDetailList=result['data'];
        this.miscExpense= result['data']['miscExpense']['miscExp'];
        this.localExp= result['data']['localHQExpense']['localConveyances'];
        this.salesProExp= result['data']['salesPromotionExpense']['salesPromotionExps'];

        this.foodExpenses= result['data']['outStationExpense']['foodExpenses'] ;
        this.miscExpenses= result['data']['outStationExpense']['miscExpenses'] ;
        this.outStationHotelExp= result['data']['outStationExpense']['outStationHotelExp'] ;
        this.outStationLocalExp= result['data']['outStationExpense']['outStationLocalExp'] ;
        this.outStationTravelExp= result['data']['outStationExpense']['outStationTravelExp'] ;

        this.foodLength=this.foodExpenses.length;
        this.miscLength=this.miscExpenses.length;
        this.hotelLength=this.outStationHotelExp.length;
        this.localLength=this.outStationLocalExp.length;
        this.travelLength=this.outStationTravelExp.length;
        this.expLength =  this.miscExpense.length;
        this.localExpLength = this.localExp.length;
        this.salesProExpLength = this.salesProExp.length;
        
    
        console.log(this.expenseDetailList);

        this.localConveyances=this.expenseDetailList.localHQExpense.localConveyances;
        this.salesPromotionExpense=this.expenseDetailList.salesPromotionExpense.salesPromotionExps;
        this.outStationExpense=this.expenseDetailList.outStationExpense;
        this.miscExpense=this.expenseDetailList.miscExpense.miscExp;

        console.log( this.outStationExpense);
        this.url = this.serv.url;
        this.requestfn = 'download/document/';
        this.api = this.url+this.requestfn;
       
      }
    })
  }




}
