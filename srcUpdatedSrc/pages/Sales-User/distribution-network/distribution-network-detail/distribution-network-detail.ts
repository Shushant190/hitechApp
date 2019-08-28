import { Component } from '@angular/core';
import { IonicPage, NavController,ToastController, NavParams,LoadingController, App } from 'ionic-angular';
import { PopoverController } from 'ionic-angular/components/popover/popover-controller'
import { CatelougeProvider } from '../../../../providers/catelouge/catelouge';
import { NetworkDetailPopoverPage } from '../../../../components/network-detail-popover/network-detail-popover';


@IonicPage()
@Component({
  selector: 'page-distribution-network-detail',
  templateUrl: 'distribution-network-detail.html',
})
export class DistributionNetworkDetailPage {
  data:any;
  leadId:any;
  distributorDetail:any=[];
  userId:any;
  constructor(public navCtrl: NavController,public toastCtrl: ToastController,public loadingCtrl:LoadingController, public navParams: NavParams, public popoverCtrl: PopoverController,public service:CatelougeProvider, public app: App) {
    this.leadId=this.navParams.get('networkId');
    this.userId=this.navParams.get('userId');
    this.data='Details';
    if(this.leadId)
    {
      this.getDistributorDetail();
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DistributionNetworkDetailPage');
  }


  tag:any;
  networkLimits:any=[];
  networkContacts:any=[];
  getDistributorDetail()
  {
    console.log(this.leadId);
    this.service.getData({"currentPage": 1,"networkId": this.leadId,"pageSize": 50},"network/list").then((result)=>{
      console.log(result);
      this.distributorDetail=result['data'][0];
      this.networkLimits = result['data'][0]['networkLimits'][0];
      this.networkContacts = result['data'][0]['networkContacts'];
      console.log(this.networkContacts);
      this.tag=this.distributorDetail['establishment'][0];
    })
  }


  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(NetworkDetailPopoverPage,{'networkId': this.leadId,'userId':this.userId});
    popover.present({
      ev: myEvent
    });
    popover.onDidDismiss(pagedata => {
      let loading = this.loadingCtrl.create({
          spinner:'hide',
          content:`<img src="assets/imgs/loader.png"  class="rotate h45"/>`,
      });
      loading.present();
       setTimeout(() => {
          loading.dismiss();
       }, 800);
       this.data=pagedata['data'];
        if(this.data=='Details'){
          this.getDistributorDetail();
        }
        if(this.data=='Orders'){
          this.OrderData();
        }
        if(this.data=='Concerns'){
          this.ConcernData();
        }
        if(this.data=='Pop & Gifts'){
          this.PopGiftData()
        }
        if(this.data=='Image & Documents'){
          this.ImageDocumentData()
        }
    });
  }


  doRefresh(event) {
    setTimeout(() => {
      event.complete();
    }, 3000);
    setTimeout(() => {
      this.presentToast(' Refreshed Successfully');
    }, 3500);
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message:msg,
      duration: 3000,
      position: 'bottom'
    });
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
    toast.present();
  }


  orderlist:any=[];
  senddata:any=[];
  OrderData(){
      this.senddata={"networkId":this.leadId,"currentPage": 1,"pageSize": 50};
      this.service.getData(this.senddata,'order/list').then((response)=>{
      console.log(response);
      if(response['status']=='Success')
      {
        this.orderlist = response['data'];
      }else{
        this.orderlist = [];
      }
    });
  }


  concernList:any=[];
  ConcernData(){
    this.senddata={"networkId":this.leadId,"currentPage": 1,"pageSize": 500};
    console.log(this.senddata);
    this.service.getData(this.senddata,'concern/list').then((response)=>{
      console.log(response)
      if(response['status']=='Success')
      {
        this.concernList=response['data'];
      }else{
        this.concernList=[];
      }
  })
  }



  deletedoc(documentId){
    console.log("document id is "+documentId);
  }



  popOrderData:any=[];
  PopGiftData(){
    this.service.getData({"networkId":this.leadId,'currentPage': 1, 'pageSize': 200},'poporder/list').then((response)=>{
          console.log(response);
          if(response['status']=='Success')
          {
            this.popOrderData = response['data'];
          }
          else
          {
            this.popOrderData =[];
          }
    });
  }


  documentListData:any=[];
  ImageDocumentData(){
      this.service.getValue('','network/document/'+this.leadId).then((response)=>{
        console.log(response)
        if(response['status']=='Success')
      {
        this.documentListData = response['data'];
      }
      else
      {
        this.documentListData=[];
      }
    })
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


}
