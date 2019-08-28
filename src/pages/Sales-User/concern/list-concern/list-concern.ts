import { Component,ViewChild,ElementRef,OnInit,NgZone  } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, Content } from 'ionic-angular';
import { DetailConcernPage } from '../detail-concern/detail-concern';
import { LeadpopoverComponent } from '../../../../components/leadpopover/leadpopover';
import { CatelougeProvider } from '../../../../providers/catelouge/catelouge';
import { ConcernpopupPage } from '../../../../components/concernpopup/concernpopup';
import { PopoverController } from 'ionic-angular/components/popover/popover-controller';



import { Storage} from '@ionic/storage'
import * as moment from 'moment';
import { DistributorConcernListPageModule } from '../../distribution-network/distributor-concern-list/distributor-concern-list.module';
import { IfObservable } from 'rxjs/observable/IfObservable';

/**
* Generated class for the ListConcernPage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/

@IonicPage()
@Component({
  selector: 'page-list-concern',
  templateUrl: 'list-concern.html',
})
export class ListConcernPage {

  @ViewChild(Content) content: Content;

  
  userId:any;
  
  concernStatus:any=[];
  responseconcernData:any= {};
  isRequestInProcess =true;
  constructor(public toastCtrl: ToastController, public serve : CatelougeProvider,  public loadingCtrl:LoadingController, public store:Storage,public popoverCtrl: PopoverController,public navCtrl: NavController, 
    private zone: NgZone
    ,public navParams: NavParams) {
    this.store.get("userId").then((userId)=>{
      this.userId= userId;
    })
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad ListConcernPage');
     this.concernListFunction(5);
  }
  
  
  goOnDetailPage()
  {
    this.navCtrl.push(DetailConcernPage);
  }
  
  statuss:any=[];
  
  ListStatus =5;
  leadPopover(myEvent)
  {
    
    let popover = this.popoverCtrl.create(ConcernpopupPage);
    popover.present({
      ev: myEvent
    });
    popover.onDidDismiss((pageData)=>{
      console.log(pageData);
      this.ListStatus= pageData
      this.statuss = [pageData];
    
      // this.statuss.push(pageData);
      console.log(this.statuss);
      setTimeout(()=>
      {
        this.concernListFunction(this.statuss);
      },1000)
      
    });
    
    
    // 
    
    
    // this.navCtrl.push(ConcernpopupPage)
  }
  concernFinelList:any=[];
  concernType:any=5;
  TypeConcern:any;
  concernListFunction(concernType)
  {

    this.TypeConcern  =  concernType;

    let loading = this.loadingCtrl.create({
      spinner:'hide',
      content:`<img src="assets/imgs/loader.png"  class="rotate h45"/>`,
    });

    loading.present();

    this.isRequestInProcess = true;


    console.log(concernType)
    
    
    if(concernType == 1  )
    {
      this.concernStatus =[1];
      // apiData['createdBy']= this.userId;
    }
    else if(concernType ==2)
    {
      this.concernStatus =[2]
      console.log("a1");
      
    }
    else if(concernType == 3)
    {
      this.concernStatus =[3]
      console.log("a2");
      
    }
    
    else if(concernType == 4)
    {
      this.concernStatus =[4]
      console.log("a3");
    }
    
    else if(concernType == 5)
    {
      this.concernStatus =[5,7,8,9]
      console.log("a4");
    }
    
    else if(concernType == 6)
    {
      this.concernStatus =[6]
      console.log("a5");
    }
    
    
    let apiData={};
    if( concernType == 1  )
    {
      apiData= {  "createdBy":this.userId ,"currentPage": 1,"concernStatuses": this.concernStatus,
      "pageSize": this.serve.pagesize
    };
      
    }
    else{
      apiData= {"currentPage": 1,  "concernStatuses": this.concernStatus,
      "pageSize": this.serve.pagesize};
      
    }
    console.log(this.concernStatus);
    this.serve.getData( apiData,'concern/list').then((response)=>{
      console.log(response);
      this.isRequestInProcess = false ;

      setTimeout(()=>{
        loading.dismiss();
      }, 2000)
 
      this.concernFinelList =  response['data'];
      
      console.log(this.concernFinelList);

     

      // if(  this.ListStatus != 0)
      // {
      //   this.listLength = this.concernFinelList.length;
      // }
      // else{
      //   this.listLength == 0;
        
      // }
      // console.log(this.listLength);
      this.saveOriginalData = this.concernFinelList;
    });
    
  }
  listLength:any;
  data:any={};
ExpenseList:any=[];
saveOriginalData:any = [];

  onSearchChangeHanlder() {
    
    setTimeout(() => {
      
      if(this.data.search) {
        console.log(this.data.search);
        const filterColumnArr = ['claimNo', 'createdByName','networkEstablishment' , 'productConcernTypeName'];
        
        this.concernFinelList =  this.serve.onListSearchFilterCatalogue(this.saveOriginalData, this.data.search, filterColumnArr);
        
      } else {
        
        this.concernFinelList = JSON.parse(JSON.stringify(this.saveOriginalData));
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
        
        this.concernFinelList = JSON.parse(JSON.stringify(this.saveOriginalData));
        console.log(this.concernFinelList);
        setTimeout(() => {  
          loading.dismiss(); 
        }, 500);
      }
      
    }, 500);
}



gotodetail(concernId)
{
  console.log(concernId)
  this.navCtrl.push(DetailConcernPage,{"concernId" : concernId});
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







show:any='';
variableForScroll:any =false;
    
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


currentPage:any = 2;
myData:any = [];
doInfiniteScroll(doInfiniteScroll)
{
    
  console.log(this.TypeConcern)
    
    
  if(this.TypeConcern == 1  )
  {
    this.concernStatus =[1];
    // apiData['createdBy']= this.userId;
  }
  else if(this.TypeConcern ==2)
  {
    this.concernStatus =[2]
    console.log("a1");
    
  }
  else if(this.TypeConcern == 3)
  {
    this.concernStatus =[3]
    console.log("a2");
    
  }
  
  else if(this.TypeConcern == 4)
  {
    this.concernStatus =[4]
    console.log("a3");
  }
  
  else if(this.TypeConcern == 5)
  {
    this.concernStatus =[5,7,8,9]
    console.log("a4");
  }
  
  else if(this.TypeConcern == 6)
  {
    this.concernStatus =[6]
    console.log("a5");
  }
  
  
  let apiData={};
  if( this.TypeConcern == 1  )
  {
    apiData= {  "createdBy":this.userId ,"currentPage": this.currentPage,"concernStatuses": this.concernStatus,
    "pageSize": this.serve.pagesize};
    
  }
  else{
    apiData= {"currentPage": this.currentPage,  "concernStatuses": this.concernStatus,
    "pageSize": this.serve.pagesize};
    
  }
  console.log(this.concernStatus);
  this.serve.getData( apiData,'concern/list').then((response)=>{
    console.log(response);

    this.currentPage =    this.currentPage  +  1; 
    console.log(this.currentPage);

    if(response['status']=='Success')
    {
      this.myData = response['data'];
      if(this.myData)
      { 
        for (var i = 0 ; i<this.myData.length; i++)
        {
          this.concernFinelList.push(this.myData[i]);
        }
        console.log(this.concernFinelList);
      }
      else{
        doInfiniteScroll.complete();
        this.variableForScroll = true;

      }
    }
    else {
      doInfiniteScroll.complete();
    }




  

    // this.concernFinelList =  response['data'];
    
    // console.log(this.concernFinelList);

    // if(  this.ListStatus != 0)
    // {
    //   this.listLength = this.concernFinelList.length;
    // }
    // else{
    //   this.listLength == 0;
      
    // }




    console.log(this.concernFinelList);




    this.saveOriginalData = this.concernFinelList;







  });









}


}
