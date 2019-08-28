import { Component,ViewChild,ElementRef,OnInit,NgZone  } from '@angular/core';
import { IonicPage, NavController, PopoverController, NavParams, Content } from 'ionic-angular';
import { CatelougeProvider } from '../../../providers/catelouge/catelouge';
import {Storage} from '@ionic/storage';
import { LeaveDetailPage } from '../leave-detail/leave-detail';
import { LeavePopoverComponent } from '../../../components/leave-popover/leave-popover';
/**
 * Generated class for the LeaveListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-leave-list',
  templateUrl: 'leave-list.html',
})
export class LeaveListPage {

  @ViewChild(Content) content: Content;

  
userId:any;
activeTab:any=1;
status:any=0;

myAndJuniorLeaveStatus:any  = 1;




  constructor(public storage : Storage,  private zone: NgZone,public popoverCtrl: PopoverController, public navCtrl: NavController, public navParams: NavParams, public service :CatelougeProvider ) {
   this.storage.get('userId').then((userId)=>{
     this.userId= userId;
     console.log(this.userId);
     this.LeaveListPage(0,1); // pending Task = 0,, 1 for Active Tab
  // this.getJuniorList();

 
   })
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad LeaveListPage');
  }
// pending:any={};
AllLeaveList:any=[];
url:any={};
data:any={};
penAppRejStatusForScroll:any ;
clickValue:any;
ActiveTabValue:any=1 ; 
saveOriginalData:any = [];

  LeaveListPage( penAppRejStatus,a)
  {
      this.ActiveTabValue  = a;
      console.log(this.ActiveTabValue);
    console.log(penAppRejStatus, this.myAndJuniorLeaveStatus);

    this.penAppRejStatusForScroll = penAppRejStatus;

      if(this.myAndJuniorLeaveStatus == 1)
      {
       this.data= {'userId':this.userId, 'approvalStatus':penAppRejStatus , "currentPage":1, "pageSize": this.service.pagesize};
       this.url="getAllLeaves";
      }
      else if(this.myAndJuniorLeaveStatus == 2)
      {
        this.data= {'userId':this.userId, 'approvalStatus':penAppRejStatus, "currentPage":1, "pageSize": this.service.pagesize};
        this.url="GetAllAssignedLeaveRequests";
      }

      console.log(this.data);
      this.service.getData( this.data,this.url).then((r)=>
    {
      console.log(r);
      this.AllLeaveList= r['data'];
      console.log(this.AllLeaveList);
    });

    this.saveOriginalData = JSON.parse(JSON.stringify(this.AllLeaveList));
  }
  goToLeaveDetail(leaveApplicationId)
  {
    console.log(leaveApplicationId);
    this.navCtrl.push(LeaveDetailPage,{'lpa_id':leaveApplicationId,'myJunList':2});
  }

//   getCountUserLeave(userId)
// {
     
//   this.serve.getData({'userId':userId},'getUserRemainingLeaves').then((r)=>{
//   console.log("this is the type wise count");
//   console.log(r);
//   // this.loader=false
//   this.leaveCountLeft= r['data'];
//   this.currentyear = r['data'][0]['year'];
//   // this.currentyear = moment().format('MM YYYY');
//   console.log(this.currentyear);
//   console.log("this is the type wise count",this.leaveCountLeft);
//   for (var i=0;i<this.leaveCountLeft.length;i++)
//   {
//     if(this.leaveCountLeft[i].year==this.currentyear)
//     {
//       this.myLeavLeft.push(this.leaveCountLeft[i]);
//     }
//   }
//   console.log("this is remaining leaves",this.myLeavLeft);
//   });
  
// }

// penAppRejStatus:any = 1;


presentPopover(myEvent) {
  let popover = this.popoverCtrl.create(LeavePopoverComponent);
  popover.present({
    ev: myEvent
  });

  popover.onDidDismiss(data => {
    console.log(data);
    this.myAndJuniorLeaveStatus = data.status;
    console.log(this.myAndJuniorLeaveStatus);
      this.LeaveListPage('','');
  });
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



 currentPage:any =2;
 myData:any =[];

 variableForScroll:any =false;
 

 doInfinite(doInfinite)
 {

    if(this.myAndJuniorLeaveStatus == 1)
    {
     this.data= {'userId':this.userId, 'approvalStatus':this.penAppRejStatusForScroll , "currentPage":this.currentPage, "pageSize": this.service.pagesize};
     this.url="getAllLeaves";
    }
    else if(this.myAndJuniorLeaveStatus == 2)
    {
      this.data= {'userId':this.userId, 'approvalStatus':this.penAppRejStatusForScroll, "currentPage":this.currentPage, "pageSize": this.service.pagesize};
      this.url="GetAllAssignedLeaveRequests";
    }

    console.log(this.data);
    this.service.getData( this.data,this.url).then((r)=>
  {
    console.log(r);

    this.currentPage = this.currentPage +1;

  
    

    if(r['status']=="Success")
    {

      this.myData= r['data'];
    

      if(this.myData )
      {
        
        console.log(this.myData)
        for(var i =0; i< this.myData.length ; i++)
        {
          this.AllLeaveList.push(this.myData[i]);
        }
      }
      else{
        doInfinite.complete();
        this.AllLeaveList = []
        // this.variableForScroll = true;
      }

      this.variableForScroll = true;
      doInfinite.complete();

    }


    else{
      this.variableForScroll = true;
      doInfinite.complete();
    }



    console.log( "This Is My Main List For GUI",this.AllLeaveList);
  });




 }



 onSearchChangeHanlder() {
        
  setTimeout(() => {
    
    if(this.data.search) {
      
      const filterColumnArr = ['userName', 'subject', 'createdOn', 'endDate', 'startDate', 'leaveTypeName' ];
      
      this.AllLeaveList =  this.service.onListSearchFilterCatalogue(this.saveOriginalData, this.data.search, filterColumnArr);
      
    } else {
      
      this.AllLeaveList = JSON.parse(JSON.stringify(this.saveOriginalData));
    }
    
  }, 500);
}







onClearSearchHandler() {
        
  setTimeout(() => {
    
    if(!this.data.search) {
      
      this.AllLeaveList = JSON.parse(JSON.stringify(this.saveOriginalData));
      
      setTimeout(() => {  
      }, 500);
    }
    
  }, 500);
}





}
