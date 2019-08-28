// import { Component } from '@angular/core';
import { IonicPage,ToastController, NavController, NavParams, LoadingController, App, Content } from 'ionic-angular';
import { DistributionNetworkDetailPage } from '../distribution-network-detail/distribution-network-detail';
import { PopoverController } from 'ionic-angular/components/popover/popover-controller';
import { LeadpopoverComponent } from '../../../../components/leadpopover/leadpopover';
import { LeadDetailPage } from '../../leads/lead-detail/lead-detail';
import { CatelougeProvider } from '../../../../providers/catelouge/catelouge';
import {Storage} from '@ionic/storage';
import { jsonpFactory } from '@angular/http/src/http_module';
import * as moment from 'moment';
import { Component,ViewChild,ElementRef,OnInit,NgZone  } from '@angular/core';

/**
* Generated class for the DistributionNetworkListPage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/

@IonicPage()
@Component({
  selector: 'page-distribution-network-list',
  templateUrl: 'distribution-network-list.html',
})
export class DistributionNetworkListPage {
  
  @ViewChild(Content) content: Content;
  
  
  leadList:any=[];
  div:any=false;
  networkList:any=[];
  distributorList:any=[];
  leadTab:any=false;
  distributorTab:any=true;
  userId:any;
  
  data:any = {};
  saveOriginalData:any = [];
  letters:any;
  constructor(public navCtrl: NavController,
    public toastCtrl: ToastController, 
    public navParams: NavParams, 
    public popoverCtrl: PopoverController,
    public service:CatelougeProvider,
    public storage:Storage,
    public app: App,
    public loadingCtrl:LoadingController,
    private zone: NgZone,
    ) {
      
      
      //     var a = this.letters.toLowerCase().split(' ');
      // console.log( a);
      
      // for (var i = 0; i < a.length; i++) {
      //   a[i] = a[i].charAt(0).toUpperCase() + a[i].substring(1);     
      // }
      // console.log(a.join(' '));
      //     this.letters.toLowerCase().split(" ").map(this.letters.charAt(0).toUpperCase() + this.letters.slice(1));
      //     console.log(this.letters);  
      
      
      
      this.storage.get('userId').then((userId) => 
      { 
        console.log(userId);
        this.userId=userId;
        this.distributionList();
        
        // this.getLeadList();
        this.lodingPersent();
        // this.userTypeList();
        this.segment_list();
        this.capitalLetterFunction();
      })
    }
    
    ionViewDidLoad() {
      console.log('ionViewDidLoad DistributionNetworkListPage');
    }
    
    
    capitalLetterFunction()
    {
      
      
      
    }
    seeDistDetail(){
      this.navCtrl.push(DistributionNetworkDetailPage)
    }
    
    leadPopover(myEvent,id) {
      let popover = this.popoverCtrl.create(LeadpopoverComponent,{leadId:id});
      popover.present({
        ev: myEvent
      });
      popover.onDidDismiss(popoverData => {
        console.log(popoverData);
      })
    }
    
    distributorDetail(id,userId)
    {
      console.log(id);
      this.lodingPersent();
      this.navCtrl.push(DistributionNetworkDetailPage,{'leadId':id,'userId':userId})
    }
    
    
    goToDdetail(networkId,userId){
      console.log(networkId);
      
      // this.data.search = '';
      // this.onClearSearchHandler();
      this.navCtrl.push(DistributionNetworkDetailPage, {'networkId': networkId,'userId':userId});
    }
    
    leadDetail(id,userId) {
      
      console.log(id);
      this.lodingPersent();
      
      this.data.search = '';
      this.onClearSearchHandler();
      
      this.navCtrl.push(LeadDetailPage,{'leadId':id,'userId':userId});
    }
    
    
    getDistributorList()
    {
      
      let loading = this.loadingCtrl.create({
        spinner:'hide',
        content:`<img src="assets/imgs/loader.png"  class="rotate h45"/>`,
      });
      
      loading.present();
      
      this.service.getData({"role": this.distribotur_roleId,"salesUserId":this.userId,"currentPage": 1,"pageSize": 50,},"network/list").then((result)=>{
        
        console.log(result);
        
        setTimeout(() => {
          
          loading.dismiss();
          
        }, 1000);
        
        if(result['status']=='Success')
        {
          this.distributorList=result['data'];
        } else {
          this.distributorList = [];
        }
        
        
        for (let index = 0; index < this.distributionList.length; index++) {
          
          let segmentStr = '';
          
          if(this.distributionList[index]['networkSegments']) {
            
            for (let index1 = 0; index1 < this.distributionList[index]['networkSegments'].length; index1++) {
              
              if(segmentStr) {
                
                segmentStr += ', ' + this.distributionList[index]['networkSegments'][index1]['segmentCode'];
                
              } else {
                
                segmentStr = this.distributionList[index]['networkSegments'][index1]['segmentCode']
              }
            }
          }
          
          this.distributionList[index]['segmentStr'] = segmentStr;
          
        }
        
        this.saveOriginalData = JSON.parse(JSON.stringify(this.distributorList));
        
      })
    }
    
    
    onSearchChangeHanlder() {
      
      setTimeout(() => {
        
        if(this.data.search) {
          
          const filterColumnArr = ['establishment', 'mobile', 'nameOfApplicant', 'state', 'district', 'pin', 'segmentStr' , 'createdOnDateText'];
          
          this.DistriButionList =  this.service.onListSearchFilterCatalogue(this.saveOriginalData, this.data.search, filterColumnArr);
          if(this.DistriButionList.length==0) {
            this.div=true;
          } else {
            this.div=false;
          }
          
        } else {
          
          this.DistriButionList = JSON.parse(JSON.stringify(this.saveOriginalData));
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
          
          this.DistriButionList = JSON.parse(JSON.stringify(this.saveOriginalData));
          
          if(this.DistriButionList.length==0) {
            this.div=true;
          } else {
            this.div=false;
          }
          
          setTimeout(() => {  
            loading.dismiss(); 
          }, 500);
        }
        
      }, 500);
    }
    
    
    distributor_class:any="active";
    lead_class:any="";
    
    distributorTabs()
    {
      this.leadTab=false;
      this.distributorTab=true;
      this.distributor_class="active";
      this.lead_class="";
    }
    
    lead_Tab()
    {
      this.leadTab=true;
      this.distributorTab=false;
      this.distributor_class=" ";
      this.lead_class="active";
    }
    
    userList:any=[];
    tmp_userList:any=[];
    distribotur_roleId:any;
    
    
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
    
    segmentlist:any=[];
    segment_list(){
      this.service.getValue('','segment/list/').then((response)=>{
        console.log(response);
        this.segmentlist=response['data'];
      });
    }
    DistriButionList:any=[];
    distributionList()
    {
      
      let loading = this.loadingCtrl.create({
        spinner:'hide',
        content:`<img src="assets/imgs/loader.png"  class="rotate h45"/>`,
      });
      
      loading.present();
      
      this.service.getData({ "role": 12, "currentPage": 1, "pageSize": this.service.pagesize, "isActive": true,
      "salesUserId": this.userId},'mynetwork/detail').then((r)=>{
        
        setTimeout(() => {
          
          loading.dismiss();
          
        }, 1000);
        
        console.log(r);
        
        //  bunny testing pgase
        
        
        
        
        //  var a = ;
        // for (var i = 0; i < a.length; i++) {
        //     a[i] = a[i].charAt(0).toUpperCase() + a[i].substring(1);     
        //   }
        //   console.log(a.join(' '));
        //       this.letters.toLowerCase().split(" ").map(this.letters.charAt(0).toUpperCase() + this.letters.slice(1));
        //       console.log(this.letters);  
        
        
        
        // bunny Testing pPHase
        
        
        
        
        
        
        
        
        if(r['data']) {
          this.DistriButionList = r['data'];
          this.div=false;
        } else {
          this.DistriButionList = [];
          this.div=true;
        }


        this.onDistributorSegmentHandler();
        
        //  for (let index = 0; index < this.DistriButionList.length; index++) {
        
        //       let segmentStr = '';
        
        //       if(this.DistriButionList[index]['networkSegments']) {
        
        //           for (let index1 = 0; index1 < this.DistriButionList[index]['networkSegments'].length; index1++) {
        
        //                 if(segmentStr) {
        
        //                     segmentStr += ', ' + this.DistriButionList[index]['networkSegments'][index1]['segmentCode'];
        
        //                 } else {
        
        //                     segmentStr = this.DistriButionList[index]['networkSegments'][index1]['segmentCode']
        //                 }
        //           }
        //       }
        
        //       console.log(segmentStr);
        
        //       this.DistriButionList[index]['segmentStr'] = segmentStr;
        
        // }
        
        //  this.saveOriginalData = JSON.parse(JSON.stringify(this.DistriButionList));
        
        //  this.onSetExtraValHandler();
        
      })
    }
    
    
    onDistributorSegmentHandler()
    {
      
      
          for (let index = 0; index < this.DistriButionList.length; index++) {
            
            let segmentStr = '';
            
            if(this.DistriButionList[index]['networkSegments']) {
              
              for (let index1 = 0; index1 < this.DistriButionList[index]['networkSegments'].length; index1++) {
                
                if(segmentStr) {
                  
                  segmentStr += ', ' + this.DistriButionList[index]['networkSegments'][index1]['segmentCode'];
                  
                } else {
                  
                  segmentStr = this.DistriButionList[index]['networkSegments'][index1]['segmentCode']
                }
              }
            }
            
            console.log(segmentStr);
            
            this.DistriButionList[index]['segmentStr'] = segmentStr;
            
          }
          
          this.saveOriginalData = JSON.parse(JSON.stringify(this.DistriButionList));
          
          this.onSetExtraValHandler();
      
    }
    
    
    onSetExtraValHandler() {
      
      for (let index = 0; index < this.saveOriginalData.length; index++) {
        
        this.saveOriginalData[index]['createdOnDateText'] =  moment(this.saveOriginalData[index].createdOn).format('DD MMM YYYY'); 
        
      }
    }
    
    
    doRefresh(event) {
      
      
      console.log('Begin async operation');
      
      this.data.search = '';
      this.distributionList();
      
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
      
      console.log(activeView);
      console.log('its leaving');
      
      if(activeView == 'SalesHomePage' || activeView == 'DistributionNetworkListPage' || activeView == 'OrderListPage' || activeView == 'SalesMenuPage') {
        this.navCtrl.popToRoot();
      }
    }
    
   
    
    
    variable:boolean=false;
    myScrolledDataList:any=[];
    currentPageValue = 2
    apple:any=[];
    pageSize = this.service.pagesize;
    // data:any=[];
    myData:any=[]
    DistriButionList2:any=[];
    myNewArray:any=[];
    variableForScroll:any = false;

    
    doInfinite(infiniteScroll:any) { 

      console.log("THIS IS doInfinite fUNCTION");
      this.service.getData({'pageSize':this.pageSize,"currentPage":this.currentPageValue},'mynetwork/detail').then(result=>
        {

              console.log(result);
              if(result['data']){
                    this.myData=result['data'];
                    this.currentPageValue = this.currentPageValue+1; 
                    if(this.myData!="")
                    {
                          for(var i=0;i<this.myData.length;i++)
                          {
                            this.DistriButionList.push(this.myData[i])
                          }
                          this.onDistributorSegmentHandler();
                          this.saveOriginalData = JSON.parse(JSON.stringify(this.distributorList));

                         



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
  