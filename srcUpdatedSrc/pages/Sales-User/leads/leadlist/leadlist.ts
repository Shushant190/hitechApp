// import { Component } from '@angular/core';
import { IonicPage, NavController,ToastController, NavParams, LoadingController, Loading, App, PopoverController, Content } from 'ionic-angular';
import { LeadDetailPage } from '../lead-detail/lead-detail';
import { CatelougeProvider } from '../../../../providers/catelouge/catelouge';
import { fn, applySourceSpanToExpressionIfNeeded, THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import {Storage} from '@ionic/storage';
import * as moment from 'moment';
import { LeadpopoverComponent } from '../../../../components/leadpopover/leadpopover';
import { LeaveDetailPage } from '../../leave-detail/leave-detail';

import { Component,ViewChild,ElementRef,OnInit,NgZone  } from '@angular/core';

// import { Storage, IonicStorageModule } from '@ionic/storage';
/**
* Generated class for the LeadlistPage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/

@IonicPage()
@Component({
  selector: 'page-leadlist',
  templateUrl: 'leadlist.html',
})
export class LeadlistPage {

  @ViewChild(Content) content: Content;
  [x: string]: any;
  storage: any;
  userId;
  leadList:any=[];
  url;
  filter:any=2;
  leadtype:any='';
  status: boolean = false;
  
  data:any = {};
  saveOriginalData:any = [];
  isRequestInProcess:any = false;
  
  clickEvent(){
    this.status = !this.status;       
  }
  
  
  constructor(public toastCtrl: ToastController,
              public navCtrl: NavController, 
              public navParams: NavParams, 
              public serve : CatelougeProvider,
              public store:Storage,
              public loadingCtrl:LoadingController,
              public app: App,
              public popoverCtrl: PopoverController,
              private zone: NgZone,
  ) {
    
    this.store.get('userId').then((userId)=>{
      console.log(userId);
      this.userId = userId;
      this.lead_list();
    });
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad LeadlistPage');
  }
  leadId:any;
  goToLdetail(leadId) {
    
    // this.data.search = '';
    // this.onClearSearchHandler();
    
    this.navCtrl.push(LeadDetailPage,{leadId})
  }
  
  lead_list()
  {
    
    this.currentPageValue = 1;
    console.log(this.filter);
    if(this.filter == 1)
    {
      this.url={'currentPage': 1,'leadType': this.leadtype, 'pageSize':this.serve.pagesize,'userId':this.userId,'status':2, 'filterOnAssignTo':true };
    }
    
    if(this.filter == 2)
    {
      this.url={'currentPage': 1,'leadType': this.leadtype, 'pageSize':this.serve.pagesize,'createdBy':this.userId, 'filterOnAssignTo':false };
    }
    
    let loading = this.loadingCtrl.create({
      spinner:'hide',
      content:`<img src="assets/imgs/loader.png"  class="rotate h45"/>`,
    });
    
    loading.present();
    
    this.isRequestInProcess = true;
    
    this.serve.getData(this.url,"lead/list").then((r:any)=>{
      console.log(r);
      this.leadList=r['data'];
      
      this.isRequestInProcess = false;

      if(!this.leadList || this.leadList == null) {
          this.leadList = [];
      }
      
      this.saveOriginalData = JSON.parse(JSON.stringify(this.leadList));

      this.setIntValToTextHandler();
      
      setTimeout(() => {
        
        loading.dismiss();
        
      }, 1000);
    });
  }


  setIntValToTextHandler() {
        
        for (let index = 0; index < this.saveOriginalData.length; index++) {

              this.saveOriginalData[index]['createdTextDate'] =  moment(this.saveOriginalData[index].createdOn).format('DD MMM YYYY'); 

              if(this.saveOriginalData[index].leadContacts && this.saveOriginalData[index].leadContacts[0]) {

                    if(this.saveOriginalData[index].leadContacts[0].name) {

                        this.saveOriginalData[index]['contactName'] = this.saveOriginalData[index].leadContacts[0].name;  

                    } else {
                         this.saveOriginalData[index]['contactName'] = '';   
                    }


                    if(this.saveOriginalData[index].leadContacts[0].mobile1) {

                      this.saveOriginalData[index]['mobile1'] = this.saveOriginalData[index].leadContacts[0].mobile1;  

                    } else {

                        this.saveOriginalData[index]['mobile1'] = '';   
                    }


                    if(this.saveOriginalData[index].leadContacts[0].mobile2) {

                      this.saveOriginalData[index]['mobile2'] = this.saveOriginalData[index].leadContacts[0].mobile2;  

                    } else {

                        this.saveOriginalData[index]['mobile2'] = '';   
                    }

              } else {

                    this.saveOriginalData[index]['contactName'] = '';  
                    this.saveOriginalData[index]['mobile1'] = '';   
                    this.saveOriginalData[index]['mobile2'] = '';
              }


              if(this.saveOriginalData[index]['leadType'] == '11') {

                    this.saveOriginalData[index]['leadTypeText'] = 'Wholesaler';

              } else if(this.saveOriginalData[index]['leadType'] == '12') {

                   this.saveOriginalData[index]['leadTypeText'] = 'Distributer';

              }  else if(this.saveOriginalData[index]['leadType'] == '13') {

                   this.saveOriginalData[index]['leadTypeText'] = 'Retailer';

              }  else if(this.saveOriginalData[index]['leadType'] == '14') {

                  this.saveOriginalData[index]['leadTypeText'] = 'Mechanic';

              }  else if(this.saveOriginalData[index]['leadType'] == '15') {

                  this.saveOriginalData[index]['leadTypeText'] = 'Reconditioner';

              } else {

                  this.saveOriginalData[index]['leadTypeText'] = '';
              }
        }  
  }
  
  
  onSearchChangeHanlder() {
    
      setTimeout(() => {
        
        if(this.data.search) {
          
          const filterColumnArr = ['createdTextDate', 'establishment', 'mobile', 'contactName', 'mobile1', 'mobile2', 'leadTypeText', 'state', 'district', 'pin'];
          
          this.leadList =  this.serve.onListSearchFilterCatalogue(this.saveOriginalData, this.data.search, filterColumnArr);
          
        } else {
          
          this.leadList = JSON.parse(JSON.stringify(this.saveOriginalData));
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
          
          this.leadList = JSON.parse(JSON.stringify(this.saveOriginalData));
          
          setTimeout(() => {  
            loading.dismiss(); 
          }, 500);
        }
        
      }, 500);
  }
  
  
  doRefresh(event) {
    console.log('Begin async operation');
    
    this.data.search = '';
    this.lead_list();
    
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



  onClickLeadTypeHandler(leadType)
  {
      this.leadtype = leadType;

      this.lead_list();
  }

   presentPopover(myEvent) {

    let popover = this.popoverCtrl.create(LeadpopoverComponent);
    popover.present({
      ev: myEvent
    });
    popover.onDidDismiss(data => {
      let loading = this.loadingCtrl.create({
          spinner:'hide',
          content:`<img src="assets/imgs/loader.png"  class="rotate h45"/>`,
      });
      loading.present();
       setTimeout(() => {
          loading.dismiss();
       }, 800);
        console.log(data);
        this.filter=data['data'];
       
        this.lead_list();
        console.log('Hello Data 3');
    });


  }
  

  goToLeaveDetail()
  {
    this.navCtrl.push(LeaveDetailPage);
  }

  
    
    
  variable:boolean=false;
  myScrolledDataList:any=[];
  currentPageValue = 2
  apple:any=[];
  pageSize = this.serve.pagesize;
  // data:any=[];
  myData:any=[]
  DistriButionList2:any=[];
  myNewArray:any=[];
  variableForScroll:any = false;

  
  doInfinite(infiniteScroll:any) { 


    if(this.filter == 1)
    {
      this.url={'currentPage': this.currentPageValue,'leadType': this.leadtype, 'pageSize':this.pageSize,'userId':this.userId,'status':2, 'filterOnAssignTo':true };
    }
    
    if(this.filter == 2)
    {
      this.url={'currentPage': this.currentPageValue,'leadType': this.leadtype,'pageSize':this.pageSize,'createdBy':this.userId, 'filterOnAssignTo':false };
    }




    console.log("THIS IS doInfinite fUNCTION");
    console.log(this.pageSize);
    console.log(this.currentPageValue);
    // {'pageSize':this.pageSize,"currentPage":this.currentPageValue}, 
    this.serve.getData(   this.url,'lead/list').then(result=>
      {
        console.log("1")
            console.log(result);
            if(result['data']){
                  this.myData=result['data'];
                  
                  this.currentPageValue = this.currentPageValue+1; 
                  console.log(this.myData);
                  console.log(this.currentPageValue)

                  
                  if(this.myData!="")
                  {
                        for(var i=0;i<this.myData.length;i++)
                        {
                          this.leadList.push(this.myData[i])
                        }
                        console.log(this.leadList);

                        this.saveOriginalData = JSON.parse(JSON.stringify(this.leadList));

                        this.setIntValToTextHandler();

                        
                        // this.onDistributorSegmentHandler();
                        infiniteScroll.complete();
                  }
                  
                  else
                  {
                    infiniteScroll.complete();
                  }
            }
            
            else
            {
              this.variableForScroll=true;
              infiniteScroll.complete();
            }
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
  


  
}
