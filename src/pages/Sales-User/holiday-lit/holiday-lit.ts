import { Component,ViewChild,ElementRef,OnInit,NgZone  } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController, Content, InfiniteScroll } from 'ionic-angular';
import { CatelougeProvider } from '../../../providers/catelouge/catelouge';
import { LeaveDetailPage } from '../leave-detail/leave-detail';
import { LeaveRuleDetailPage } from '../leave-rule-detail/leave-rule-detail';

/**
 * Generated class for the HolidayLitPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-holiday-lit',
  templateUrl: 'holiday-lit.html',
})
export class HolidayLitPage {

  @ViewChild(Content) content: Content;

  
  leavelist:any=[];
  holidaylist:any=[];
  holidays:any=[];
  leaves:any=[];
  check:any;
  status:boolean=false;

  currentPgaeSize= 2;


  constructor(public loadingCtrl:LoadingController,public navCtrl: NavController, public navParams: NavParams, public service : CatelougeProvider , private zone: NgZone) {
    this.leaveHolidayLists(1);
  }
  clickEvent()
  {
    this.status = !this.status; 
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad HolidayLitPage');
  }
 

url : any  ;
apiData:any;
  leaveHolidayLists(check){
    this.check=check;
    // let loading = this.loadingCtrl.create({
    //   spinner:'hide',
    //   content:`<img src="assets/imgs/loader.png"  class="rotate h45"/>`,
    // });
    // loading.present();


    if(  this.check  == 1)
    {
      
        this.apiData  =  {"currentPage":1, "pageSize": this.service.pagesize};
        this.url = "leave/list/";

        this.service.getData(this.apiData,this.url).then((response)=>{
          console.log(response)
          if(response['status']=='Success')
          {
            this.leavelist=response;
            this.leaves=this.leavelist.data;
            console.log("IF BLOCK " , this.leaves)
          }
          else{
            this.leavelist= [];
          }


          // this.leavelist=response;
          // this.leaves=this.leavelist.data;
          // console.log(this.leaves);


        });


    } 

    else{

      this.apiData  =  {"currentPage": 1, "pageSize": this.service.pagesize};
      this.url = "holiday/list/";
      this.service.getValue(this.apiData,this.url).then((response)=>{

        if(response['status']=='Success')
      {
        this.holidaylist=response;
        this.holidays=this.holidaylist.data;
      }
      if(response['status']=='Failed')
      {
        this.holidays =[];
      }
      // this.holidaylist=response;
      // this.holidays=this.holidaylist.data;
      // console.log(this.holidays);
      });

    }

 }

 
 variableForScroll : any =false;
myData:any =[];

 doInfinite(infinteScroll)
 {
  // this.currentPgaeSize = this.currentPgaeSize + 1;



   console.log(this.check);

   if(  this.check  == 1)
   {
       this.apiData  =  {"currentPage": this.currentPgaeSize, "pageSize": this.service.pagesize};
       this.url = "leave/list/";

       this.service.getData(this.apiData,this.url).then((response)=>{
       
        console.log(response);

        this.currentPgaeSize = this.currentPgaeSize + 1;
        if(response["message"] == "Success")
          {
            this.myData = response["data"];

            
            if( this.myData)
              {
                for( var i = 0 ; i= this.myData.length; i++)
                {
                    this.holidaylist.push(this.myData[i]);
                }
                infinteScroll.complete()
              }
            else{
              infinteScroll.complete();
              this.variableForScroll = true;
            }   


          }
        else{
          this.holidaylist= []
          infinteScroll.complete();
          this.variableForScroll = true;

        }
        // console.log(this.currentPgaeSize);
        // infinteScroll.complete();
        //  console.log("LEAVES ARRAY",this.leaves);
       });
   } 

   else{

     this.apiData  =  {"currentPage": this.currentPgaeSize, "pageSize": this.service.pagesize};
     this.url = "holiday/list/";
     this.service.getValue(this.apiData,this.url).then((response)=>{
      this.holidaylist=response['data'];
       if(response['status']=='Success')
     {
       for(var j = 0 ; j<this.holidaylist.length;j++)
       {
         this.holidays.push(this.holidaylist[j])
       }

       this.currentPgaeSize = this.currentPgaeSize + 1;


       
     }
     if(response['status']=='Failed')
     {
       this.holidays =[];
       infinteScroll.complete();
     }
     console.log( "====holiday Array",this.holidays);
     });

   }











}








// testing MAIN

// leaveHolidayLists(check){
//   this.check=check;
//   let loading = this.loadingCtrl.create({
//     spinner:'hide',
//     content:`<img src="assets/imgs/loader.png"  class="rotate h45"/>`,
//   });
//   loading.present();
//   if(check==1){



//   this.service.getData({"currentPage": 1, "pageSize": this.service.pagesize},'leave/list/').then((response)=>{

//        console.log("IF BLOCK",response);
//        loading.dismiss();
//        if(response['status']=='Success')
//        {
//          this.leavelist=response;
//          this.leaves=this.leavelist.data;
//        }
       
//        if(response['status']=='Failed')
//        {
//          this.leaves =[];
//        }
//        this.leavelist=response;
//        this.leaves=this.leavelist.data;
//        console.log(this.leaves);
//  });
// }
// else{

//   this.service.getValue({"currentPage": this.currentPgaeSize, "pageSize": this.service.pagesize},'holiday/list/').then((response)=>{
//     console.log( "ELSE BLOCK" ,response);
//     loading.dismiss();
//     if(response['status']=='Success')
//     {
//       this.holidaylist=response;
//       this.holidays=this.holidaylist.data;
//     }
//     if(response['status']=='Failed')
//     {
//       this.holidays =[];
//     }
//     this.holidaylist=response;
//     this.holidays=this.holidaylist.data;
//     console.log(this.holidays);
//   });
// }
// }



// 




 




 goToDetails(ruleId)
 {
   this.navCtrl.push(LeaveRuleDetailPage,{"ruleId":ruleId});
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




}
