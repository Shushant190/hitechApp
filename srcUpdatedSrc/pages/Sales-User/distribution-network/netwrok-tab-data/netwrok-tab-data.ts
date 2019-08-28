import { Component } from '@angular/core';
import { IonicPage, NavController,ToastController,LoadingController, NavParams } from 'ionic-angular';
import { Storage } from  '@ionic/storage';
import { CatelougeProvider } from '../../../../providers/catelouge/catelouge';
import { PopoverController } from 'ionic-angular/components/popover/popover-controller'
import { NetworkDetailPopoverPage } from '../../../../components/network-detail-popover/network-detail-popover';
@IonicPage()
@Component({
  selector: 'page-netwrok-tab-data',
  templateUrl: 'netwrok-tab-data.html',
})
export class NetwrokTabDataPage {
  networkId:any;
  userId:any;
  data:any;
  userType:any;

  constructor(public navCtrl: NavController,public toastCtrl: ToastController, public navParams: NavParams,public service : CatelougeProvider, public popoverCtrl: PopoverController,public loadingCtrl:LoadingController,  public storage:Storage) {
    this.networkId=this.navParams.get('networkId');
    this.userId=this.navParams.get('userId');
    this.data=this.navParams.get('data');
    // this.ionViewDidLoad();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NetwrokTabDataPage');
    if(this.data=='Orders'){
      this.OrderData();
    }
    if(this.data=='Concern'){
      this.ConcernData();
    }
    if(this.data=='Pop & Gift'){
      this.PopGiftData()
    }
    if(this.data=='Image & Document'){
      this.ImageDocumentData()
    }
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(NetworkDetailPopoverPage,{'networkId': this.networkId,'userId':this.userId,'pageName':'NetwrokTabDataPage'});
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
       this.networkId=pagedata['networkId'];
       this.userId=pagedata['userId'];
       this.data=pagedata['data'];
        console.log(pagedata);
        if(this.data=='Orders'){
          this.OrderData();
        }
        if(this.data=='Concern'){
          this.ConcernData();
        }
        if(this.data=='Pop & Gift'){
          this.PopGiftData()
        }
        if(this.data=='Image & Document'){
          this.ImageDocumentData()
        }
    });
  }

  orderlist:any=[];
  senddata:any=[];
  OrderData(){
      this.senddata={"networkId":this.networkId,"currentPage": 1,"pageSize": 50};
      console.log(this.senddata);
      this.service.getData(this.senddata,'order/list').then((response)=>{
      console.log(response);
      if(response['status']=='Success')
      {
        this.orderlist = response['data'];
        console.log(this.orderlist);
      }else{
        this.orderlist = [];
        console.log(this.orderlist);
      }
    });
  }


  concernList:any=[];
  ConcernData(){
    this.senddata={"networkId":this.networkId,"currentPage": 1,"pageSize": 500};
    console.log(this.senddata);
    this.service.getData( this.senddata,'concern/list').then((response)=>{
      console.log(response)
      if(response['status']=='Success')
      {
        this.concernList=response['data'];
        console.log(this.concernList);
      }else{
        this.concernList=[];
        console.log("no data found");
      }
     
  })
  }

  
  deletedoc(index){
    console.log(index);
  }

  popOrderData:any=[];
  PopGiftData(){
    this.service.getData({"networkId":this.networkId,'currentPage': 1, 'pageSize': 200},'poporder/list').then((response)=>{
          console.log(response);
          if(response['status']=='Success')
          {
            this.popOrderData = response['data'];
            console.log(this.popOrderData);
          }
          else
          {
            this.popOrderData =[];
            console.log("no data found");
          }
    });
  }





  documentListData:any=[];
  ImageDocumentData(){
      this.service.getValue('','network/document/'+this.networkId).then((response)=>{
        console.log(response)
        if(response['status']=='Success')
      {
        this.documentListData = response['data'];
        console.log(this.documentListData);
      }
      else
      {
        this.documentListData=[];
        console.log("no data found");
      }
    })
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

}
