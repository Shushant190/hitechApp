import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, App,ToastController } from 'ionic-angular';
import { CatelougeProvider } from '../../../providers/catelouge/catelouge';
import { ModalController } from 'ionic-angular';
import { EditModelPage } from '../edit-model/edit-model';
import { TravelDetailModalPage } from '../travel-detail-modal/travel-detail-modal';
import * as M from '../../../assets/materialize/js/materialize.min.js';
import * as moment from 'moment';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-travel-plan-detail',
  templateUrl: 'travel-plan-detail.html',
})
export class TravelPlanDetailPage {
  stateList:any=[];
  travelPlanID:any;
  data={};
  options = {};
  travelPlanDetail:any=[];
  gAllList:any=[];
  value:any;
  userId:any;
  constructor(public navCtrl: NavController, public storage:Storage,public toastCtrl: ToastController, public navParams: NavParams,public service:CatelougeProvider,public loadingCtrl:LoadingController,public modalCtrl: ModalController, public app: App) {
               
            this.storage.get('userId').then((userId) => 
            { 
                console.log(userId);
                this.userId = userId;
            })
    this.travelPlanID=this.navParams.get("travelPlanID");
    console.log(this.travelPlanID);
    if(this.travelPlanID)
    {
      this.getTravelPlanDetail();
    }
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad TravelPlanDetailPage');
  }

  
  ngOnInit() {
    var elems = document.querySelectorAll('.collapsible');
    var instances1 = M.Collapsible.init(elems, this.options);
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


  travelDetails:any=[];
  planArray:any=[];
  getTravelPlanDetail()
  {
    this.lodingPersent();
    this.service.getData({"travelPlanID":this.travelPlanID},"travelplan/list").then((result)=>{
      console.log(result);
      if(result['status']=="Success")
      {
        this.travelPlanDetail=result['data'][0];
        this.travelDetails = result['data'][0]['travelDetails'];
        console.log(this.travelDetails);
        for(let i=0;i<this.travelPlanDetail.travelDetails.length;i++)
        {
          
          let isActivityExist = true;
          if(this.travelPlanDetail.travelDetails[i].isSalesActivity==false)
          {
            isActivityExist= false;
          }
          
          if(isActivityExist) {
            
            if(this.planArray.length==0)
            {
              this.planArray.push({planDate:this.travelPlanDetail.travelDetails[i].planDate,plandDetail:[{state:this.travelPlanDetail.travelDetails[i].state,district:this.travelPlanDetail.travelDetails[i].district,city:this.travelPlanDetail.travelDetails[i].city,travelDetailId:this.travelPlanDetail.travelDetails[i].travelDetailId,salesActivity:this.travelPlanDetail.travelDetails[i].isSalesActivity,salesBudget:this.travelPlanDetail.travelDetails[i].salesBudget,activityType:this.travelPlanDetail.travelDetails[i].activityType}]})
            }
            else{
              
              let index= this.planArray.findIndex(row=>row.planDate===this.travelPlanDetail.travelDetails[i].planDate);
              if(index!=-1)
              {
                this.planArray[index].plandDetail.push({state:this.travelPlanDetail.travelDetails[i].state,district:this.travelPlanDetail.travelDetails[i].district,city:this.travelPlanDetail.travelDetails[i].city,travelDetailId:this.travelPlanDetail.travelDetails[i].travelDetailId,salesActivity:this.travelPlanDetail.travelDetails[i].isSalesActivity,salesBudget:this.travelPlanDetail.travelDetails[i].salesBudget,activityType:this.travelPlanDetail.travelDetails[i].activityType})
              }
              else{
                this.planArray.push({planDate:this.travelPlanDetail.travelDetails[i].planDate,plandDetail:[{state:this.travelPlanDetail.travelDetails[i].state,district:this.travelPlanDetail.travelDetails[i].district,city:this.travelPlanDetail.travelDetails[i].city,travelDetailId:this.travelPlanDetail.travelDetails[i].travelDetailId,salesActivity:this.travelPlanDetail.travelDetails[i].isSalesActivity,salesBudget:this.travelPlanDetail.travelDetails[i].salesBudget,activityType:this.travelPlanDetail.travelDetails[i].activityType}]})
              }
            }
          }
          
        }
        console.log(this.planArray);














      }
    })
  }
  
  goOnDetailPage(data)
  {
    console.log(data);
    
    const modal = this.modalCtrl.create(EditModelPage,{data:data});
    modal.present();
  }
  
  
  
  
 

  myStateList:any=[];
  myDistrictList:any=[];
  myCityList:any=[];
  FinelArrayList:any=[];
  



      presentTravelDetail(state,district,city,salesBudget,travelDetailId,travelPlanID) {
        console.log(state,district,city);
        console.log(state,district,city);
        const modal = this.modalCtrl.create(TravelDetailModalPage,{state:state,district:district,city:city,budget:salesBudget,travelDetailId:travelDetailId,travelPlanID:travelPlanID});
        console.log(modal)
        modal.present();
      }




      deteletTravelPlan(travelDetailID)
      {
        // {travelDetailID}
        var retVal = confirm("Are You Sure ?");
    if( retVal == false ) {
      this.presentToast('Travel Plan Is Safe !!');
    }
    else 
    {
        console.log(travelDetailID);
        this.lodingPersent()
        this.service.getValue("","traveldetail/delete/"+travelDetailID).then((result)=>{
          console.log(result);
          if(result['status']=="Success")
          {
            this.presentToast('Travel Plan Deleted !!');
            this.getTravelPlanDetail();
          }
            else
            {
              this.presentToast('Travel Plan Not Deleted !!');
            }
        });
      }
      }

      presentToast(msg) {
        let toast = this.toastCtrl.create({
          message: msg,
          duration: 3000,
          position: 'top'
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


}
