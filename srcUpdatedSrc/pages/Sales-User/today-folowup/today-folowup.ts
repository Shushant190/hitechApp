import { Component,ViewChild,ElementRef,OnInit,NgZone  } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController, ActionSheetController, LoadingController, AlertController, App, Content, InfiniteScroll } from 'ionic-angular';
import { PopoverController } from 'ionic-angular/components/popover/popover-controller';
import { CatelougeProvider } from '../../../providers/catelouge/catelouge';
import {Storage} from '@ionic/storage';
import { FollowupDetailPage } from '../followup-detail/followup-detail';
import * as moment from 'moment';
import { FollowupPopoverPage } from '../../../components/followup-popover/followup-popover';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { AddPaymentsPage } from '../add-payments/add-payments';

@IonicPage()
@Component({
  selector: 'page-today-folowup',
  templateUrl: 'today-folowup.html',
})
export class TodayFolowupPage {
  followupList:any=[];
  
  
  senddata:any=[];
  userdata:any=[];
  status:boolean= false;
  userId:any;
  check1:any;
  followupstatus:any;
  div:any=false;
  data:any = {};
  selectedTab:any = 1;
  saveOriginalData:any = [];
  isRequestInProcess:any = false;

  currentPage:any = 1;
  
  @ViewChild(Content) content: Content;
  constructor(public alert:AlertController,
              public toastCtrl: ToastController,
              public popoverCtrl: PopoverController,
              public store:Storage,
              public navCtrl: NavController, 
              public navParams: NavParams, 
              public actionsheetCtrl: ActionSheetController,
              public service:CatelougeProvider,
              public storage:Storage,
              public loadingCtrl:LoadingController,
              public app: App,
              private zone: NgZone,
               ) {   
    
    
    this.store.get('userId').then((userId)=>{
      console.log(userId);
      this.userId = userId;
    });
    
    if(this.navParams.get("data"))
    {
      this.followupstatus=this.navParams.get("data");
      console.log(this.followupstatus);
    }else{
      this.followupstatus=false;
    }
    this.todayFollowUpList(this.selectedTab);
  }
  
  
  clickEvent()
  {
    this.status = !this.status;
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad TodayFolowupPage');
  }
  
  
  presentPopover(myEvent) {
    // alert("this is testing");
    let popover = this.popoverCtrl.create(FollowupPopoverPage);
    popover.present({
      ev: myEvent
    });
  }
  
  
  
  lodingPersent()
  {
    let loading = this.loadingCtrl.create({
      spinner:'hide',
      content:`<img src="assets/imgs/loader.png"  class="rotate h45"/>`,
    });
    loading.present();
    
    setTimeout(() => {
      loading.dismiss();
    }, 1500);
  }
  
  goToDetail(followUpId)
  {
    
    // this.data.search = '';
    // this.onClearSearchHandler();
    console.log(followUpId);
    this.navCtrl.push(FollowupDetailPage,{'followUpId':followUpId});
  }
  
  
  followUpChekValue:any;
  currdate=new Date();
  todayFollowUpList(check)
  {


    this.followUpChekValue = check
      console.log(this.followupstatus);
      console.log("follow-up check status");
      
      this.followupList=[];
      let curntDate =moment(this.currdate).format('YYYY-MM-DD');
      if(check==1)
      {
        this.selectedTab = 1;
        this.senddata={"userId":this.userId,"isClosed":this.followupstatus,'followUpABeferDate':curntDate,'currentPage': this.currentPage,'pageSize': this.service.pagesize};
      }
      if(check==2)
      {
        this.selectedTab  =2;
        this.senddata={"userId":this.userId,"isClosed":this.followupstatus,'followUpAfterDate':curntDate,'currentPage': this.currentPage,'pageSize': this.service.pagesize};
      }
    
    
      let loading = this.loadingCtrl.create({
          spinner:'hide',
          content:`<img src="assets/imgs/loader.png"  class="rotate h45"/>`,
      });
    
      loading.present();
      
       this.isRequestInProcess = true;
      
       console.log(this.senddata);
       console.log("this is user id At list page"+this.userId)
       this.service.getData(this.senddata,"followup/list").then((result)=>{
        console.log(result);
        
        this.isRequestInProcess = false;
        
        setTimeout(() => {
          
          loading.dismiss();
          
        }, 1000);
        
        if(result['status']=='Success')
        {
          this.followupList=result['data'];
          this.div=false;
          console.log(this.followupList);
        } else {
          this.followupList = [];
          this.div=true;
        }


        this.saveOriginalData = JSON.parse(JSON.stringify(this.followupList));
        this.onSetExtraValToTextHandler();

    });
  }
  


  myData:any =[];
  doInfiniteScroll(doInfiniteScroll)
{
  console.log(doInfiniteScroll);
  this.followupList=[];
  let curntDate =moment(this.currdate).format('YYYY-MM-DD');
        if(this.followUpChekValue == 1)
        {
          this.selectedTab = 1;
          this.senddata={"userId":this.userId,"isClosed":this.followupstatus,'followUpABeferDate':curntDate,'currentPage': this.currentPage,'pageSize': this.service.pagesize};

        }
        if(this.followUpChekValue == 2){

          this.selectedTab  =2;
          this.senddata={"userId":this.userId,"isClosed":this.followupstatus,'followUpAfterDate':curntDate,'currentPage': this.currentPage,'pageSize': this.service.pagesize};

        }


          this.service.getData(this.senddata,"followup/list").then((result)=>{
          console.log(result);
          this.myData = result['data'];
          console.log(this.myData);
          
          
          this.currentPage = this.currentPage + 1 ;
          console.log(this.currentPage);
              if(this.myData !="" )
              {
                  console.log("================IF BLOCK==============")
                  for( var i =0; i<this.myData.length; i++)
                  {
                    console.log("1");
                    this.followupList.push(this.myData[i])
                  }
                  console.log(this.followupList);
                  doInfiniteScroll.complete();
                  
              }
              else{
                  this.followupList = [];
                  doInfiniteScroll.complete();
              }
        });
        console.log(this.followupList);
        

        this.saveOriginalData = JSON.parse(JSON.stringify(this.followupList));
        this.onSetExtraValToTextHandler();

}



  
  onSetExtraValToTextHandler() {
      
    for (let index = 0; index < this.saveOriginalData.length; index++) {
      
        this.saveOriginalData[index]['followUpDateText'] =  moment(this.saveOriginalData[index].followUpDate).format('DD MMM YYYY'); 

        if(!this.saveOriginalData[index].isClosed) {
            this.saveOriginalData[index].statusText = 'Open';
        }

        if(this.saveOriginalData[index].isClosed) {

            this.saveOriginalData[index].statusText = 'Closed';
        }

        if(this.saveOriginalData[index].followUpType == 1) {

            this.saveOriginalData[index].followUpTypeText = 'Call';

        } else if(this.saveOriginalData[index].followUpType == 2) {

            this.saveOriginalData[index].followUpTypeText = 'Mail';  

        } else if(this.saveOriginalData[index].followUpType == 3) {

            this.saveOriginalData[index].followUpTypeText = 'Meeting'; 
        }
    }

  }
  
  
  onSearchChangeHanlder() {
    
    setTimeout(() => {
      
      if(this.data.search) {
        
        const filterColumnArr = ['networkEstablishement', 'leadEstablishement', 'otherCustomer', 'activityModuleName', 'userName', 'remarks', 'followUpDateText', 'followUpTypeText', 'statusText'];
        
        this.followupList =  this.service.onListSearchFilterCatalogue(this.saveOriginalData, this.data.search, filterColumnArr);
        if(this.followupList.length==0){
          this.div=true;
        }else{
          this.div=false;
        }
        
      } else {
        
        this.followupList = JSON.parse(JSON.stringify(this.saveOriginalData));
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
        
        this.followupList = JSON.parse(JSON.stringify(this.saveOriginalData));
        if(this.followupList.length==0){
          this.div=true;
        }else{
          this.div=false;
        }
        
        setTimeout(() => {  
          loading.dismiss(); 
        }, 500);
      }
      
    }, 500);
  }
  
  
  doRefresh(event) {
    console.log('Begin async operation');
    
    this.data.search = '';
    this.status = false;
    this.todayFollowUpList(this.selectedTab);
    
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

  ionViewDidLeave() {

    let nav = this.app.getActiveNav();
    let activeView = nav.getActive().name;

    let previuosView = '';
    if(nav.getPrevious() && nav.getPrevious().name) {
       previuosView = nav.getPrevious().name;
    }
   
    console.log(previuosView);


    console.log(activeView);
    console.log('its leaving');

    if((activeView == 'SalesHomePage' || activeView == 'DistributionNetworkListPage' || activeView == 'OrderListPage' || activeView == 'SalesMenuPage') && (previuosView != 'SalesHomePage' && previuosView != 'DistributionNetworkListPage'  && previuosView != 'OrderListPage' && previuosView != 'SalesMenuPage')) {

        console.log(previuosView);
        this.navCtrl.popToRoot();
    }
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
