import { Component,ViewChild,ElementRef,OnInit,NgZone  } from '@angular/core';
import { DvrDetailPage } from '../dvr-detail/dvr-detail';
import { IonicPage,AlertController,ToastController, NavController, NavParams, LoadingController, Loading, UrlSerializer, App, Content } from 'ionic-angular';
import { CatelougeProvider } from '../../../../providers/catelouge/catelouge';
import {Storage} from '@ionic/storage';
import * as moment from 'moment';


/**
* Generated class for the DvrListPage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/

@IonicPage()
@Component({
  selector: 'page-dvr-list',
  templateUrl: 'dvr-list.html',
})
export class DvrListPage {
  
  @ViewChild(Content) content: Content;
  userId:any;
  currentvalue:any=1;
  dvrList:any=[];
  currentActiveType:any = 1;
  data:any = {};
  saveOriginalData:any = [];
  userName:any;
  div:any=false;

  currentPage:any =1;
  variableForScroll:any = false;

  url:any;
  sendParams:any={};
  
  
  
  constructor(public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public serve : CatelougeProvider,
    public store:Storage, 
    public loadingCtrl:LoadingController,
    public app: App,
    private zone: NgZone,
    ) {
      
      this.store.get('userId').then((userId)=>{
        console.log(userId);
        this.userId = userId;
        this.dvr_list(this.currentvalue, "");
        
      });
      
    }
    status:boolean= false;
    
    
    clickEvent()
    {
      this.status = !this.status; 
    }
    
    ionViewDidLoad() {
      console.log('ionViewDidLoad DvrListPage');
    }
    
    
    dvr_list(status, infiniteScroll) {

      this.currentvalue=status;

      console.log(status, infiniteScroll);
      
      let loading = this.loadingCtrl.create({
        spinner:'hide',
        content:`<img src="assets/imgs/loader.png"  class="rotate h45"/>`,
      });
      
      loading.present();

      if(!infiniteScroll) {

          this.dvrList = [];
          this.variableForScroll = false;
          this.currentPage = 1;
      }
      
      // this.currentActiveType = status;
      this.url = "activity/list"

        if(status == 1)
        {
           this.sendParams = {"currentPage": this.currentPage,"pageSize": this.serve.pagesize,"userId":this.userId};

        }  else {

           this.sendParams=  {"currentPage": this.currentPage,"pageSize":this.serve.pagesize};
        }
      
        this.serve.getData(this.sendParams, this.url ).then((r:any)=>{
          
          console.log(r);

          loading.dismiss();

          if(status == 1) {
            infiniteScroll.complete();
          }
          
          if(!r['data'] || r["data"] == null) {
            
              r['data'] = [];
              // this.div=true;

              if(infiniteScroll) {
                  
                  infiniteScroll.complete();
                  this.variableForScroll = true;
              }
            
          } else {
            
                let dvrData = r['data'];
                for(let i=0; i< dvrData.length;i++)
                {
                    dvrData[i].checkinDuration=moment.utc(moment.duration(moment(dvrData[i].checkOutTime).diff(moment(dvrData[i].checkInTime))).asMilliseconds()).format('HH:mm')
                }

                console.log(dvrData);

                this.dvrList  = this.dvrList.concat(dvrData);
          }

          console.log(this.dvrList)
          
          this.saveOriginalData = JSON.parse(JSON.stringify(this.dvrList));
          
          this.onSetExtraValHandler();

          this.currentPage = this.currentPage + 1;
        
        });
      
    }

    
    
    
    
    
    onSetExtraValHandler() {
      
      for (let index = 0; index < this.saveOriginalData.length; index++) {
        
        this.saveOriginalData[index]['checkInTimeDateText'] =  moment(this.saveOriginalData[index].checkInTime).format('DD MMM YYYY'); 
        
        this.saveOriginalData[index]['checkInTimeText'] =  moment(this.saveOriginalData[index].checkInTime).format('hh:mm:ss a'); 
        
        this.saveOriginalData[index]['checkOutTimeText'] =  moment(this.saveOriginalData[index].checkInTime).format('hh:mm:ss a'); 
        
      }
    }
    
    
    goToDvrdetail(dvrId)
    {
      console.log(dvrId);
      
      // this.data.search = '';
      // this.onClearSearchHandler();
      
      this.navCtrl.push(DvrDetailPage,{dvrId});
      
    }
    
    
    doRefresh(event) {
      
      this.data.search = '';
      this.dvr_list(this.currentvalue,"");
      
      console.log('Begin async operation');
      
      setTimeout(() => {
        console.log('Async operation has ended');
        event.complete();
      }, 3000);
      setTimeout(() => {
        this.presentToast();
      }, 3500);
    }
    
    
    onSearchChangeHanlder() {
      
      setTimeout(() => {
        
        if(this.data.search) {
          
          const filterColumnArr = ['userName', 'establishment', 'establishmentName', 'leadEstablishment', 'otherCustomer', 'activityModuleName', 'checkinDuration', 'location', 'checkInTimeDateText', 'checkInTimeText', 'checkOutTimeText'];
          
          this.dvrList =  this.serve.onListSearchFilterCatalogue(this.saveOriginalData, this.data.search, filterColumnArr);
          if(this.dvrList.length==0){
            this.div=true;
          }else{
            this.div=false;
          }
          
        } else {
          
          this.dvrList = JSON.parse(JSON.stringify(this.saveOriginalData));
          if(this.dvrList.length==0){
            this.div=true;
          }else{
            this.div=false;
          }
        }
        
      }, 500);
    }
    
    onClearSearchHandler() {
      
      console.log("check");
      
      setTimeout(() => {
        
        if(!this.data.search) {
          console.log("i m  working in if condition")
          console.log(this.saveOriginalData);
          
          
          let loading = this.loadingCtrl.create({
            spinner:'hide',
            content:`<img src="assets/imgs/loader.png"  class="rotate h45"/>`,
          });
          
          loading.present();
          
          this.dvrList = JSON.parse(JSON.stringify(this.saveOriginalData));
          if(this.dvrList.length==0){
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
  