import { IonicPage, NavController, NavParams, ToastController,LoadingController, App, PopoverController, Content } from 'ionic-angular';
import { CatelougeProvider } from '../../../providers/catelouge/catelouge';
import {Storage} from '@ionic/storage';
import { TravelPlanDetailPage } from '../travel-plan-detail/travel-plan-detail';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { TravelMonthPage } from '../travel-month/travel-month';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { TravelpopoverComponent } from '../../../components/travelpopover/travelpopover';

import { Component,ViewChild,ElementRef,OnInit,NgZone  } from '@angular/core';
import { IfObservable } from 'rxjs/observable/IfObservable';

/**
* Generated class for the TravelPlanListPage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/

@IonicPage()
@Component({
    selector: 'page-travel-plan-list',
    templateUrl: 'travel-plan-list.html',
})
export class TravelPlanListPage {
    
    @ViewChild(Content) content: Content;
    
    filter:any;
    data:any={};
    statusBar:any=2;
    class:any;
    div:any=false;
    userId:any;
    trvelPlanLIst:any=[];
    forApprovel:any;
    a:any={};
    travelStatus:any;
    travelPlanType:any;
    userRole:any;
    user:any;
    saveOriginalData:any=[];
    
    isRequestInProcess:any = false;
    
    monthArr:any = [{typeId:1, name: 'January'},
    {typeId:2, name: 'February'},
    {typeId:3, name: 'March'},
    {typeId:4, name: 'April'},
    {typeId:5, name: 'May'},
    {typeId:6, name: 'June'},
    {typeId:7, name: 'July'},
    {typeId:8, name: 'August'},
    {typeId:9, name: 'September'},
    {typeId:10, name: 'October'},
    {typeId:11, name: 'November'},
    {typeId:12, name: 'December'}];
    
    
    constructor(public navCtrl: NavController,public popoverCtrl: PopoverController,public toastCtrl: ToastController, public navParams: NavParams,public service:CatelougeProvider, private zone: NgZone,public storage:Storage,public loadingCtrl:LoadingController, public app: App) {
        
        this.travelPlanType=1;
        this.travelStatus=2;
        
        this.storage.get('userId').then((userId) => 
        { 
            console.log(userId);
            this.userId=userId;
            
            if(this.navParams.get('planStatus')) {
                this.travelStatus = this.navParams.get('planStatus');
            }
            
            if(userId)
            {
                this.getStatusWiseList(this.travelStatus,this.travelPlanType);
            }
        })
        
        
        this.storage.get('role').then((data)=>{
            
            console.log(data);
            this.userRole= data;
            if(this.userRole==10)
            {
                this.forApprovel=1;
                
            } else {
                
                this.forApprovel=2;
            }
        })
        
        
        this.storage.get("user").then((r)=>{
            
            console.log(r);
            this.user=r.salesUser.role;
            console.log(this.user)
        })
        
    }
    
    ionViewDidLoad() {
        console.log('ionViewDidLoad TravelPlanListPage');
    }
    
    status:boolean= false;
    clickEvent()
    {
        this.status = !this.status; 
    }
    
    
    status2:boolean= false;
    clickEvent2()
    {
        this.status2 = !this.status2; 
    }
    
    
    
    status3:boolean= false;
    clickEvent3()
    {
        this.status3 = !this.status3; 
    }
    
    
    status4:boolean= false;
    clickEvent4()
    {
        this.status4 = !this.status4; 
    }
    
    
    goaddPage(travelid) {
        
        console.log(travelid)
        console.log("wlcm to add page");
        this.a.travelPlanID=travelid;
        this.a.travelPlanType=this.travelPlanType;
        this.navCtrl.push(TravelMonthPage,{"data":this.a});
        
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
    
    goOnDetailPage(id)
    {
        this.navCtrl.push(TravelPlanDetailPage,{travelPlanID:id});
    }
    
    alltravelPlanList:any={}
    select_any:any={}
    
    presentPopover(myEvent) {
        
        let popover = this.popoverCtrl.create(TravelpopoverComponent);
        
        popover.present({
            ev: myEvent
        });
        
        
        popover.onDidDismiss(data => {
            
            let loading = this.loadingCtrl.create({
                spinner:'hide',
                content:`<img src="assets/imgs/loader.png"  class="rotate h45"/>`,
            });
            
            console.log('Hello Data 1');
            
            loading.present();
            
            setTimeout(() => {
                
                console.log('Hello Data 2');
                loading.dismiss();
                
            }, 800);
            
            this.filter= data['data'];
            
            console.log(this.filter);
            
            this.travelPlanType=this.filter.travelPlanType;
            
            this.travelStatus=this.filter.status;
            
            this.getStatusWiseList(this.travelStatus,this.travelPlanType);
            
            console.log('Hello Data 3');
            
        });
        
    }
    
    
    
    getStatusWiseList(status,travelPlanType)
    {
        

        console.log( this.statusBarVar)
        console.log( this.travelPlanTypeVar )
        this.statusBarVar = status;
        this.travelPlanTypeVar = travelPlanType
        
        this.trvelPlanLIst=[];
        console.log(status);
        console.log(travelPlanType);
        this.statusBar = status;
        this.travelPlanType =  travelPlanType;
        
        if(travelPlanType == 1) 
        {  
            
            this.alltravelPlanList= {currentPage: this.currentPage, pageSize: this.service.pagesize, createdById:this.userId, status:status, salesApprover:undefined};
            
            console.log(this.alltravelPlanList);
            
        } else if (travelPlanType == 2 )  { 
            
            if(this.userRole == 4 && status == 2)
            {
                status =3;
                
                console.log(status);
                
            } else {
                
                status = status;
                
                console.log(status);
            }
            
            this.alltravelPlanList= {currentPage: this.currentPage,pageSize: this.service.pagesize,status:status,salesApprover:undefined};
        }
        
        console.log(this.alltravelPlanList);
        
        this.isRequestInProcess = true;
        
        let loading = this.loadingCtrl.create({
            spinner:'hide',
            content:`<img src="assets/imgs/loader.png"  class="rotate h45"/>`,
        });
        
        loading.present();
        
        this.service.getData(this.alltravelPlanList,"travelplan/list").then((result)=>{
            
            console.log(result);
            
            this.isRequestInProcess = false;
            
            setTimeout(() => {
                loading.dismiss();
            }, 2000);
            
            if(result['status']=='Success')
            {
                this.trvelPlanLIst=result['data'];
                
                console.log(this.trvelPlanLIst);
                
                this.saveOriginalData=this.trvelPlanLIst;
                
                if(this.trvelPlanLIst.length!=0)
                {
                    this.div=false;
                    
                } else {
                    
                    this.div=true;
                    
                }
                
                if(travelPlanType == 2) 
                {
                    const travelArray=this.trvelPlanLIst.filter(row=>row.createBy != this.userId);
                    
                    this.trvelPlanLIst=travelArray;
                    
                    console.log( this.trvelPlanLIst);
                    
                    this.saveOriginalData=this.trvelPlanLIst;
                    
                    if(this.trvelPlanLIst.length!=0) {
                        
                        this.div=false;
                        
                    } else {
                        
                        this.div=true;
                        
                    }
                }
            }
            
            if (travelPlanType == 1 || travelPlanType == 2)
            {
                if(this.statusBar==2)
                {
                    this.getTravelApproverList(3)
                }
                
                if(this.statusBar==6)
                {
                    this.getTravelApproverList(4)
                }
            }
            
            if(result['status']=='Failed')
            {
                this.div=true;
                
                this.trvelPlanLIst=[];
            }
        })
        
    }
    statusBarVar:any;
    travelPlanTypeVar:any ; 
    currentPage:any = 1 ;
    myTravelData:any = [];

    travelData:any = [];
    variableForScroll:any=false
    doInfinite(infiniteScroll)
    {
        this.currentPage = this.currentPage + 1;
        console.log(this.statusBarVar);
        console.log(this.travelPlanTypeVar);    
        
        this.statusBar = status;
        this.travelPlanType ;
        
        if(this.travelPlanTypeVar == 1) 
        {  
            this.alltravelPlanList= {currentPage:this.currentPage, pageSize: this.service.pagesize, createdById:this.userId, status:this.statusBar, salesApprover:undefined};
            
            console.log(this.alltravelPlanList);
            
        } else if (this.travelPlanTypeVar == 2 )  { 
            
            if(this.userRole == 4 && this.statusBarVar == 2)
            {
                this.statusBarVar  =3;
                
                console.log(status);
                
            } else {
                
                status = status;
                
                console.log(status);
            }
            
            this.alltravelPlanList= {currentPage: this.currentPage,pageSize: this.service.pagesize,status:this.statusBar,salesApprover:undefined};
        }
        
        console.log(this.alltravelPlanList);
        this.service.getData(this.alltravelPlanList,"travelplan/list").then((result)=>{
            
          
            console.log(result);

            console.log(this.trvelPlanLIst)
              
       
            if (this.travelPlanTypeVar == 1 || this.travelPlanTypeVar == 2)
            {
                if(this.statusBar==2)
                {
                    this.getTravelApproverList(3)
                }
                
                if(this.statusBar==6)
                {
                    this.getTravelApproverList(4)
                }
            }
            
            if(result['status']=='Failed')
            {
                this.div=true;
                
                // this.trvelPlanLIst=[];
            }


            if(result['status']=='Success')

            {

                this.myTravelData = result['data'];

                if( this.myTravelData.length > 0  && this.myTravelData.length <= this.service.pagesize )

                {

                    for(let p = 0; p < this.myTravelData.length;p++)
                    {
                            this.trvelPlanLIst.push(this.myTravelData[p])
                    }

                }

                else {
                    console.log("else BLOAK")
                    infiniteScroll.complete();
                    
                }
                    infiniteScroll.complete();

                    this.saveOriginalData=this.trvelPlanLIst;
            }
            else if(result['status']=='Failed' ) {

                console.log("result['status']=='Failed'")                // this.trvelPlanLIst=[]
                infiniteScroll.complete();
                // this.variableForScroll= true;


            }
            




            console.log(this.trvelPlanLIst)
        })
        
    }
    
    
    onSearchChangeHanlder() {
        
        setTimeout(() => {
            
            console.log(this.data.search);
            
            if(this.data.search) {
                
                console.log("I Am  Working");
                
                const filterColumnArr = ['budget', 'userName', 'year'];
                
                console.log(this.saveOriginalData);
                
                this.trvelPlanLIst =  this.service.onListSearchFilterCatalogue(this.saveOriginalData, this.data.search, filterColumnArr);
                
            } else {
                
                this.trvelPlanLIst = JSON.parse(JSON.stringify(this.saveOriginalData));
                
            }
            
            if(this.trvelPlanLIst.length==0) {
                
                this.div=true;
                
            } else {
                
                this.div=false;
            }
            
        }, 500);
    }
    
    
    onClearSearchHandler() {
        
        setTimeout(() => {
            
            if(!this.data.search) {
                
                console.log("i m  working in if condition");
                
                let loading = this.loadingCtrl.create({
                    spinner:'hide',
                    content:`<img src="assets/imgs/loader.png"  class="rotate h45"/>`,
                });
                
                loading.present();
                
                this.trvelPlanLIst = JSON.parse(JSON.stringify(this.saveOriginalData));
                
                if(this.trvelPlanLIst.length==0) {
                    
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
    
    
    tmpTravelList:any=[];
    getTravelApproverList(status)
    {
        
        console.log(status);
        this.tmpTravelList=[];
        let travelApiData= {};
        
        if(this.travelPlanType==2) {
            
            console.log('if part');
            travelApiData = {currentPage: 1,pageSize: this.service.pagesize,createdById:undefined,status:status,salesApprover:undefined};
            
        } else {
            
            console.log('else part');
            travelApiData = {currentPage: 1,pageSize: this.service.pagesize,createdById:this.userId,status:status,salesApprover:undefined}
        }
        
        console.log(travelApiData);
        
        this.service.getData(travelApiData,"travelplan/list").then((result)=>{
            
            console.log(result);
            
            if(result['status']=='Success')
            {
                console.log(this.travelStatus);
                if(this.travelPlanType == 2)
                {
                    const tavelListArray=result['data'];
                    
                    const travelArray=tavelListArray.filter(row=>row.createBy!=this.userId);
                    
                    console.log(travelArray);
                    
                    if(travelArray.length!=0 && this.trvelPlanLIst.length!=0)
                    {
                        for(let i=0;i<travelArray.length;i++)
                        {
                            const isIndexExist = this.trvelPlanLIst.findIndex(row => row.travelPlanID == travelArray[i].travelPlanID);
                            
                            if(isIndexExist === -1) {
                                this.tmpTravelList.push(travelArray[i])
                            }
                        }
                        
                        console.log(this.tmpTravelList);
                        
                    } else {
                        
                        this.tmpTravelList=travelArray;
                    }
                    
                    this.trvelPlanLIst=this.trvelPlanLIst.concat(this.tmpTravelList);
                    console.log(this.tmpTravelList);
                    
                    this.saveOriginalData=this.trvelPlanLIst;
                    
                    if(this.trvelPlanLIst.length==0)
                    {
                        this.div=true;
                        
                    } else {
                        
                        this.div=false;
                    }
                    
                } else {
                    
                    console.log(result['data']);
                    
                    this.trvelPlanLIst=this.trvelPlanLIst.concat(result['data']);
                    
                    console.log(this.tmpTravelList);
                    
                    console.log(this.trvelPlanLIst);
                    
                    this.saveOriginalData=this.trvelPlanLIst;
                    
                    console.log(this.saveOriginalData);
                    
                    console.log("data inserted in saveporiginal data");
                    
                    if(this.trvelPlanLIst.length==0)
                    {
                        this.div=true;
                        
                    } else {
                        
                        this.div=false;
                        
                    }
                }
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
