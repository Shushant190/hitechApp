import { Component,ViewChild,ElementRef,OnInit,NgZone  } from '@angular/core';
import { IonicPage, NavController,ToastController, NavParams, LoadingController, ModalController, App, Content } from 'ionic-angular';

import { CatelougeProvider } from '../../../providers/catelouge/catelouge';
import { Storage} from '@ionic/storage';
import { AnnouncementModelPage } from '../announcement-model/announcement-model';
import * as moment from 'moment';
import { IfObservable } from 'rxjs/observable/IfObservable';

// import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
// import { File } from '@ionic-native/file';


// import { File } from '@ionic-native/file';
/**
* Generated class for the AnnouncementPage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/

@IonicPage()
@Component({
  selector: 'page-announcement',
  templateUrl: 'announcement.html',
})
export class AnnouncementPage {
  

  @ViewChild(Content) content: Content;

  
  announcementList:any=[];
  userId:any;
  items:any[];
  
  
  data:any = {};
  saveOriginalData:any = [];
  
  
  constructor(public toastCtrl: ToastController,
    public mdlCtrl:ModalController,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public service:CatelougeProvider,
    public loadingCtrl:LoadingController, 
    public store:Storage, 
    public modalCtrl: ModalController,
    public app: App,
     private zone: NgZone,
   
    
    )
    
    {
      
      // filetransfer: FileTransferObject = this.transfer.create();
      this.store.get('userId').then((userId)=>{
        this.userId = userId;
        console.log(this.userId);
        this.getAnnouncementList(this.userId);
      });    
    }
    
    
    
    
      
      
      filterItems(searchData)
      {
        console.log("this is  filterItems");
        console.log("Testing_Data");
        console.log(searchData);
        console.log(this.announcementList);
        
        var Data = this.getSearchResult(searchData,this.announcementList);
      }
      getSearchResult(searchData,announcementList)
      {
        console.log("this is  getSearchResult");
        var myArr=[];
        for (var i = 0; i <this.announcementList.length; i++ )
        {
          console.log(this.announcementList[i].getSearchResult.toLowerCase().search(searchData.toLowerCase())! == -1); 
          // if(this.announcementList[i].getSearchResult.toLowerCase().search(searchData.toLowerCase())! == -1)
          // {
          
          //   this.announcementList.push(this.announcementList[i]);
          //   console.log(this.announcementList);
          // }
        }
      }
      
      
      
      ionViewDidLoad() {
        console.log('ionViewDidLoad AnnouncementPage');
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
      fileNameData:any;
      
      getAnnouncementList(userId)
      {
        this.lodingPersent();
        console.log(userId);
        
        let loading = this.loadingCtrl.create({
          spinner:'hide',
          content:`<img src="assets/imgs/loader.png"  class="rotate h45"/>`,
        });
        
        loading.present();
        
        this.service.getData({"currentPage":1,"pageSize":this.service.pagesize,"userId":userId},"announcement/list").then((result)=>{
          console.log(result);
          
          loading.dismiss();
          if(result['status']=="Success")
          {
            this.announcementList=result['data'];
            this.fileNameData= this.announcementList[0].documents[0].documentId;
            console.log(this.fileNameData);  
          }
          if(!result['data']) {
            this.announcementList = [];
          }
          
          this.saveOriginalData = JSON.parse(JSON.stringify(this.announcementList));
          
          this.onSetExtraValHandler();
        })
      }
      


      currentPage:any = 2;
      myData:any=[];
      variableForScroll:any= false
      doInfinite(infinteScroll)
      {
          console.log(this.userId);
        this.service.getData({"currentPage":this.currentPage,"pageSize":this.service.pagesize,"userId":this.userId},"announcement/list").then((result)=>{
          console.log(result);
          
          if(result['status']=="Success")
          {
            this.myData = result['data'];
            console.log(this.myData);
            // this.announcementList=result['data'];
            // this.fileNameData= this.announcementList[0].documents[0].documentId;
              if(this.myData)
                {
                  for(var i= 0; i <this.myData.length;i++)
                  {
                    this.announcementList.push(this.myData[i]);
                  }
                }
                else
                {
                  infinteScroll.complete();
                  this.announcementList= [];
                }  
                this.variableForScroll = true;
                infinteScroll.complete();
          }

          else
          {
            this.variableForScroll = true;
            infinteScroll.complete();
          }
          if(!result['data']) {
            this.announcementList = [];
          }
          
          this.saveOriginalData = JSON.parse(JSON.stringify(this.announcementList));
          
          this.onSetExtraValHandler();
        })




      }
      
      onSetExtraValHandler() {
        
        for (let index = 0; index < this.saveOriginalData.length; index++) {
          
          this.saveOriginalData[index]['createdTextDate'] =  moment(this.saveOriginalData[index].createdOn).format('DD MMM YYYY'); 
          
          if(this.saveOriginalData[index]['sendEmail']) {
            this.saveOriginalData[index]['sendEmailText'] = 'Email';
          } else {
            this.saveOriginalData[index]['sendEmailText'] = '';
          }
          
          if(this.saveOriginalData[index]['sendSMS']) {
            this.saveOriginalData[index]['sendSMSText'] = 'SMS';
          } else {
            this.saveOriginalData[index]['sendSMSText'] = '';
          }
        }
      }
      
      
      onSearchChangeHanlder() {
        
        setTimeout(() => {
          
          if(this.data.search) {
            
            const filterColumnArr = ['createdTextDate', 'subject', 'message', 'sendEmailText', 'sendSMSText'];
            
            this.announcementList =  this.service.onListSearchFilterCatalogue(this.saveOriginalData, this.data.search, filterColumnArr);
            
          } else {
            
            this.announcementList = JSON.parse(JSON.stringify(this.saveOriginalData));
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
            
            this.announcementList = JSON.parse(JSON.stringify(this.saveOriginalData));
            
            setTimeout(() => {  
              loading.dismiss(); 
            }, 500);
          }
          
        }, 500);
      }
      
      
      
      
      ReadMore(announcementId,message)
      {
        console.log(announcementId,message);
        
        
        const modal = this.mdlCtrl.create(AnnouncementModelPage,{'announcementId':announcementId,'message':message});
        modal.present();
        
        // this.navCtrl.push(AnnouncementModelPage);
        
        
      }
      doRefresh(event) {
        console.log('Begin async operation');
        
        this.data.search = '';
        this.getAnnouncementList(this.userId);
        
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
      


path:any;
      viewpdf(url)
     {
        console.log(url);
        setTimeout(() => {
          this.loadingStrart();
        }, 3500);

        
        this.path = this.service.url+"download/document/";
        var pdf_url = this.path+url;
        window.open(pdf_url,'_self','location=no')
   
     }



     loadingStrart() {
      let toast = this.toastCtrl.create({
        message: ' Downloading Start',
        duration: 3000,
        position: 'top'
      });
      toast.onDidDismiss(() => {
        console.log('Dismissed toast');
      });
      
      toast.present();
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
    



    

// in ts file


   
 
    
  