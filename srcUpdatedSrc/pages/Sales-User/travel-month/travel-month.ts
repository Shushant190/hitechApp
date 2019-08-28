import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController,LoadingController, AlertController } from 'ionic-angular';
import * as M from '../../../assets/materialize/js/materialize.min.js';
import * as moment from 'moment';
import { Storage } from '@ionic/storage';
import { CatelougeProvider } from '../../../providers/catelouge/catelouge';
import { TravelPlanListPage } from '../travel-plan-list/travel-plan-list';
import { ModalController } from 'ionic-angular';
import { TravelDetailModalPage } from '../travel-detail-modal/travel-detail-modal';
import { THROW_IF_NOT_FOUND } from '@angular/core/src/di/injector';

@IonicPage()
@Component({
    selector: 'page-travel-month',
    templateUrl: 'travel-month.html',
})

export class TravelMonthPage {

    options = {};

    numberofMonth:any;
    monthDayWisePlanArr:any=[];

    selectedMonthName:any;
    monthNamesArr:any = [];

    travelPlanID:any;
    travelPlanType:any;

    data:any={};
    updateStatusData:any={};

    seniors:any=[];

    totalPlanDayRequired:any = 0;

    planRequestedWithSunday = 0;
    planRequestedWithoutSunday = 0;

    salesActivityArr:any = [{typeId: 1, name: 'Mechanic get together'},
                            {typeId: 2, name: 'Retailer get together'},
                            {typeId: 3, name: 'Van Campaign'},
                            {typeId: 4, name: 'Stall Campaign'},
                            {typeId: 5, name: 'Exhibition Participation'},
                            {typeId: 6, name: 'Signboard'},
                            {typeId: 7, name: 'Wall/Shop Painting'},
                            {typeId: 8, name: 'GiveAways'},
                            {typeId: 9, name: 'Printing Of Lesafelts,banners, posters etc.'}];

    user:any;
    userId:any;
    userType:any;
    
    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public service:CatelougeProvider,
                public storage:Storage,
                public alertCtrl: AlertController,
                public loadingCtrl:LoadingController,
                public toastCtrl: ToastController,
                public modalCtrl: ModalController) {

            let febDays;

            if(parseInt(this.data.year)%4==0)
            {
                febDays=29;

            } else {

                febDays=28;
            }

            this.monthNamesArr = [
                                    {typeId:1, name: 'January', days: 31},
                                    {typeId:2, name: 'February', days: febDays},
                                    {typeId:3, name: 'March', days: 31},
                                    {typeId:4, name: 'April', days: 30},
                                    {typeId:5, name: 'May', days: 31},
                                    {typeId:6, name: 'June', days: 30},
                                    {typeId:7, name: 'July', days: 31},
                                    {typeId:8, name: 'August', days: 31},
                                    {typeId:9, name: 'September', days: 30},
                                    {typeId:10, name: 'October', days: 31},
                                    {typeId:11, name: 'November', days: 30},
                                    {typeId:12, name: 'December', days: 31}
                                ];
            
            this.storage.get('user').then((r)=>
            {
                    console.log(r);
                    this.user=r;
                    if(this.user) {
                        console.log(this.user);
                        this.userType=this.user.user.userType;
                    }

                    this.storage.get('userId').then((userId) => 
                    { 
                        console.log(userId);
                        this.userId = userId;
                    })
            })
            
            console.log(this.navParams);
            
            if(this.navParams.data !='') {
                
                this.data = this.navParams.get("data");
                console.log(this.data);
                
                if( this.data && this.data.month)
                {
                    this.initializeTravelMonthHandler(this.data.month);
                    this.onCalculateTravelDaysHandler();
                }

                if(this.data && this.data.travelPlanID) {
    
                    this.travelPlanID=this.data.travelPlanID;
                    this.travelPlanType=this.data.travelPlanType;

                    this.getTravelDetail();
                }
                
                if(this.data && this.data.travelApprover) {

                    this.getSenior(this.data.travelApprover);
                    this.getMarketingUserList();
                }
            }
        }
        
        
        ngOnInit() {

            var elems = document.querySelectorAll('.collapsible');
            var instances1 = M.Collapsible.init(elems, this.options);
        }

        ionViewDidLoad() {
            console.log('ionViewDidLoad TravelMonthPage');
        }
        
        
        initializeTravelMonthHandler(selectedMonthName)
        {

            console.log(selectedMonthName);
            this.numberofMonth = moment().month(selectedMonthName).format("M");
            this.monthDayWisePlanArr=[];

            const monthIndex = this.monthNamesArr.findIndex(row => row.name == selectedMonthName);

            if(monthIndex !== -1) {

                console.log(monthIndex);

                console.log(this.monthNamesArr[monthIndex]['days']);

                for (let index = 1; index <= this.monthNamesArr[monthIndex]['days']; index++) {
                    
                    let planDate = moment(selectedMonthName+"/"+index+"/"+this.data.year).format('YYYY-MM-DD hh:mm:ss a Z');

                    this.monthDayWisePlanArr.push({planDate:planDate, details: [],salesactivity:'No'});

                }
            }
            
            console.log(this.monthDayWisePlanArr);
        }
        
        
        travelDetailData:any={};
        
        getTravelDetail() {
            
            this.lodingPersent();

            this.service.getData({"travelPlanID":this.travelPlanID},"travelplan/list").then((result)=>{
                
                console.log(result);
                
                if(result['status']=='Success')
                {

                    this.data=result['data'][0];

                    console.log(this.data);

                    this.travelDetailData = this.data;
                    
                    if(this.data.travelApprover){
                        this.getSenior(this.data.travelApprover);
                    }
                    
                    const monthIndex = this.monthNamesArr.findIndex(row => row.typeId == this.data.month);
                    
                    if(monthIndex !== -1) {
                        this.selectedMonthName = this.monthNamesArr[monthIndex].name;
                    }
                    
                    this.initializeTravelMonthHandler(this.selectedMonthName);

                    setTimeout(() => {

                         this.onCalculateTravelDaysHandler();

                    }, 2000);
                    
                    for(var i=0;i<this.data.travelDetails.length;i++) {
                        
                        if(this.data.travelDetails[i].isSalesActivity==false) {
                            
                            this.data.travelDetails[i].isSalesActivity='No';
                            
                        } else {
                            
                            this.data.travelDetails[i].isSalesActivity='Yes';

                            const indexFound = this.salesActivityArr.findIndex(row=> row.typeId == this.data.travelDetails[i].activityType);
                           
                            this.data.travelDetails[i].activityTypeName = this.salesActivityArr[indexFound].name;
                        }
                    }
                    
                    console.log(this.data.travelDetails);
                    
                    console.log(this.monthDayWisePlanArr);
                    
                    for(let i = 0; i<this.monthDayWisePlanArr.length; i++) {

                        for(let j=0;j<this.data.travelDetails.length;j++) {
                            
                            if(moment(this.monthDayWisePlanArr[i].planDate).format('YYYY-MM-DD') == moment(this.data.travelDetails[j].planDate).format('YYYY-MM-DD')) {

                                this.monthDayWisePlanArr[i].details.push(this.data.travelDetails[j]);

                            }
                        }
                    }

                    console.log(this.monthDayWisePlanArr);
                    console.log(this.data);
                }
            })
        }

        
        onDateAddPlanHandler(planDate,travelPlanID) {
            
            console.log(planDate,travelPlanID);
            
            const modal = this.modalCtrl.create(TravelDetailModalPage, {planDate:planDate,travelPlanID:travelPlanID, travelData:this.travelDetailData });
            
            console.log(modal);
            modal.present();
            
            modal.onDidDismiss(pagedata => {
                
                let loading = this.loadingCtrl.create({
                    spinner:'hide',
                    content:`<img src="assets/imgs/loader.png"  class="rotate h45"/>`,
                });
                
                loading.present();
                
                setTimeout(() => {
                    loading.dismiss();
                }, 800);
                
                const planDate = pagedata['planDate'];
                const planArray = pagedata['planArray'];
                this.travelPlanID = pagedata['travelPlanID'];
 
                if(this.travelPlanID) {
                    
                    this.getTravelDetail();
                    
                } else  {
                    
                    if(planArray) {
                        
                        for( let i=0;i<this.monthDayWisePlanArr.length;i++)
                        {
                            if(this.monthDayWisePlanArr[i].planDate == planDate)
                            {
                                if(this.monthDayWisePlanArr[i].details!='') {
                                    this.monthDayWisePlanArr[i].details.concat(planArray);
                                } else {
                                    this.monthDayWisePlanArr[i].details = planArray;
                                }
                            }
                        }
                        
                        for(let i=0;i < planArray.length;i++)
                        {
                                if(planArray[i].isSalesActivity=='Yes')
                                {
                                    this.data.salesBudget = parseInt(this.data.salesBudget) + parseInt(planArray[i].salesBudget);
                                }
                        }
                    }


                    setTimeout(() => {

                        this.onCalculateTravelDaysHandler();
                        
                    }, 2000);
                }
                
            });
        }

        
        saveTravelPlanHandler() {

            if((this.planRequestedWithSunday == 0) || (this.data.status == 2 &&  this.planRequestedWithoutSunday < this.totalPlanDayRequired)) {

                let alertMsg;

                if(this.planRequestedWithSunday == 0) {
                    alertMsg = 'No Plan Added!';
                } else {
                    alertMsg = 'To Process Travel Request, Full Month Plan Required!';
                }

                let alert = this.alertCtrl.create({
                    title: 'Error',
                    message: alertMsg,
                    buttons: [
                        {
                            text: 'Ok',
                            handler: () => {
                               console.log('Ok Clicked!');
                            }
                        }
                    ]
                })

                alert.present(); 
                
                return;
            }

            
            let alert = this.alertCtrl.create({
                title: 'Confirm',
                message: 'Are you sure?',
                buttons: [
                    {
                        text: 'No',
                        handler: () => {
                            this.presentToast('You are not sure!!');
                        }
                    },
                    {
                        text: 'Yes',
                        handler: () => {
                            
                            console.log(this.data.status);

                            let apiURLData;
                            let apiURL;

                            if(!this.travelPlanID) {

                                 this.onTravelArrHandler();
                                 apiURL = 'travelplan/add';
                                 apiURLData = this.data;

                            } else {

                                apiURL = 'travelplan/travelapproval';
                                apiURLData = { travelPlanID: this.travelPlanID,
                                               status: this.data.status};
                            }
        
                            console.log(this.data.travelDetails);
                                
                            let loading = this.loadingCtrl.create({
                                spinner:'hide',
                                content:`<img src="assets/imgs/loader.png"  class="rotate h45"/>`,
                            });
                            
                            loading.present();
                            
                            this.service.getData(apiURLData, apiURL).then((result)=>{
                                
                                    console.log(result);
                                    
                                    setTimeout(() => {
                                        loading.dismiss();
                                    }, 2000);
                                    
                                    if(result['status']=="Success")
                                    {
                                        if(this.data.status==1)
                                        {
                                            this.presentToast('Draft Saved Successfully!');
                                            
                                        } else {
                                            
                                            this.presentToast('Travel Plan Saved Successfully!!');
                                        }

                                        this.navCtrl.push(TravelPlanListPage,{ planStatus:this.data.status });
                                        
                                    } else {
                                        
                                        this.presentToast(result['message']+" of this Month");
                                    }
                            })

                        }
                    }
                ]
            });
            
            alert.present();
        }


        onTravelArrHandler() {

            const travelApiData = [];

            for(let i=0;i<this.monthDayWisePlanArr.length;i++)
            {
                if(this.monthDayWisePlanArr[i].details.length != 0)
                {
                    for(let j=0;j<this.monthDayWisePlanArr[i].details.length;j++)
                    {
                            let salesBudget = 0;
                            let isSalesActivity = false;

                            const temPlanArr = this.monthDayWisePlanArr[i].details;

                            if(this.monthDayWisePlanArr[i].details[j].isSalesActivity=='Yes') {
                                
                                salesBudget = temPlanArr[j].salesBudget;
                                isSalesActivity = true;
                            }

                            const planDate = moment(this.monthDayWisePlanArr[i].planDate).format('YYYY-MM-DD');
                                
                            travelApiData.push({ 

                                planDate: planDate,
                                state: temPlanArr[j].state,
                                district: temPlanArr[j].district,
                                city: temPlanArr[j].city,
                                isSalesActivity: isSalesActivity,
                                salesBudget: salesBudget,
                                activityType: temPlanArr[j].activityType
                            });
                    }
                }
            }

            console.log(travelApiData);
            console.log(this.monthDayWisePlanArr);

            this.data.month=this.numberofMonth;
            this.data.userId=this.userId;
            this.data.travelDetails=travelApiData;
            
            if(this.seniors.length==0)
            {
                this.data.travelApprover=1;
            }
        }

        
        onUpdateDatePlanHandler(parentIndex, childIndex, travelPlanID, planDate, itemData) {
            
            console.log(parentIndex, childIndex,planDate, travelPlanID);
            
            const modal = this.modalCtrl.create(TravelDetailModalPage, {parentIndex: parentIndex, childIndex:childIndex ,travelPlanID:travelPlanID ,planDate:planDate, travelData: this.travelDetailData, itemData:itemData});
            
            console.log(modal);
            
            modal.present();
            
            modal.onDidDismiss(resultData => {
                
                let loading = this.loadingCtrl.create({
                    spinner:'hide',
                    content:`<img src="assets/imgs/loader.png"  class="rotate h45"/>`,
                });
                
                loading.present();
                
                setTimeout(() => {
                    loading.dismiss();
                }, 800);


                if(this.travelPlanID) {

                    this.getTravelDetail();
                      
                } else {
 
                    console.log(resultData);
                    const updatedPlanData = resultData.planArray[0];
                    const childIndex = updatedPlanData.childIndex;
                    
                    for( let i=0;i<this.monthDayWisePlanArr.length;i++)
                    {
                        if(this.monthDayWisePlanArr[i].planDate == updatedPlanData.planDate)
                        {
                            this.monthDayWisePlanArr[i].details[childIndex].state = updatedPlanData.state;
                            
                            this.monthDayWisePlanArr[i].details[childIndex].district = updatedPlanData.district;
                            
                            this.monthDayWisePlanArr[i].details[childIndex].city = updatedPlanData.city;
                            
                            this.monthDayWisePlanArr[i].details[childIndex].isSalesActivity = updatedPlanData.isSalesActivity;
                                   
                            this.monthDayWisePlanArr[i].details[childIndex].salesBudget = updatedPlanData.salesBudget;
                            
                            this.monthDayWisePlanArr[i].details[childIndex].activityType = updatedPlanData.activityType;
                            
                            this.monthDayWisePlanArr[i].details[childIndex].activityTypeName = updatedPlanData.activityTypeName;
                        }
                    }
    
                    this.onCalculateSalesBudget();

                    setTimeout(() => {

                         this.onCalculateTravelDaysHandler();

                    }, 2000);

                }
                
            });
        }


        onCalculateSalesBudget() {

            this.data.salesBudget = 0;
            
            for (let index = 0; index < this.monthDayWisePlanArr.length; index++) {
                
                for (let index1 = 0; index1 < this.monthDayWisePlanArr[index]['details'].length; index1++) {
                    
                    if(this.monthDayWisePlanArr[index]['details'][index1]['isSalesActivity'] == 'Yes')  {
                        
                        this.data.salesBudget += parseInt(this.monthDayWisePlanArr[index]['details'][index1]['salesBudget']);
                    }                        
                }
            }  
        }
         
        
        updatestatus() {
            
            let alert = this.alertCtrl.create({
                title: 'Confirm',
                message: 'Are you sure?',
                buttons: [
                    {
                        text: 'No',
                        handler: () => {
                            this.presentToast('You are not sure, Plan not saved!!');
                        }
                    },
                    {
                        text: 'Yes',
                        handler: () => {
                            
                            console.log(this.updateStatusData);
                            
                            if(this.updateStatusData.status==4)
                            {
                                this.updateStatusData.travelRejectedBy=this.userId;
                            }
                            
                            if(this.updateStatusData.status==3)
                            {
                                this.updateStatusData.travelApprovedBy=this.userId;
                            }
                            
                            this.updateStatusData.travelPlanID=this.travelPlanID;
                            console.log(this.updateStatusData);
                            
                            this.service.getData(this.updateStatusData,"travelplan/travelapproval").then((result)=>{
                                
                                console.log(result);
                                
                                if(result['status']=='Success')
                                {
                                    if(this.updateStatusData.status==3)
                                    {
                                        this.service.getData({travelPlanID:this.travelPlanID,status:3,salesApprover:this.financeUserList[0].userId},"travelplan/salesapproval").then((result)=>{
                                            
                                            console.log(result);
                                            if(result['status']=='Success')
                                            {
                                                this.presentToast('Travel Plan Status Updated');
                                                this.navCtrl.push(TravelPlanListPage,{planststus:this.updateStatusData.status,travelPlanType:this.travelPlanType});
                                            }
                                        })
                                    }
                                    
                                    if(this.updateStatusData.status==4)
                                    {
                                        this.presentToast('Travel Plan Status Updated');
                                        
                                        this.navCtrl.push(TravelPlanListPage,{planststus:this.updateStatusData.status,travelPlanType:this.travelPlanType});
                                    }
                                }
                            })
                        }
                    }
                ]
            })
            
            alert.present(); 
        }

        
        Re_SubmitPlan(travelPlanID,status) {
            
            console.log(travelPlanID);
            console.log(status);
            
            
            let alert = this.alertCtrl.create({
                title: 'Confirm',
                message: 'Are you sure?',
                buttons: [
                    {
                        text: 'No',
                        handler: () => {
                            this.presentToast('Sorry, You are not sure!!');
                        }
                    },
                    {
                        text: 'Yes',
                        handler: () => {
                            
                            if(status ==4){
                                this.data.status=2;
                            }
                            if(status==6){
                                this.data.status=3;
                            }
                            
                            let loading = this.loadingCtrl.create({
                                spinner:'hide',
                                content:`<img src="assets/imgs/loader.png"  class="rotate h45"/>`,
                            });
                            
                            loading.present();
                            
                            this.service.getData({"travelPlanID":travelPlanID,"status": this.data.status},"travelplan/travelapproval").then((result)=>{
                                
                                console.log(result);
                                
                                loading.dismiss();
                                
                                if(result['status']==['Success'])
                                {
                                    this.presentToast('Travel Plan Re-Submitted');
                                    this.navCtrl.push(TravelPlanListPage,{planststus:this.data.status});
                                } else {
                                    this.presentToast('Travel Plan Is Not Saved');
                                }
                            })
                        }
                    }
                ]
            })
            
        }
        
        
        DraftToSave() {
            
            console.log(this.data.travelPlanID);
            console.log(this.data.status);
            
            this.service.getData({"travelPlanID":this.data.travelPlanID,"status":2 },"travelplan/travelapproval").then((result)=>{
                
                console.log(result);
                if(result['status']==['Success'])
                {
                    this.presentToast('Travel Plan Saved');
                    this.navCtrl.push(TravelPlanListPage,{planststus:this.data.status});
                    
                } else {
                    
                    this.presentToast('Travel Plan Is Not Saved');
                }
            })
        }
        
        
        financeUserList:any=[];
        getMarketingUserList()
        {
            this.service.getData({role:4, "currentPage": 1,"pageSize": 50},"user/list").then((result)=>{
                console.log(result);
                if(result['status']=='Success')
                {
                    this.financeUserList=result['data'];
                }
            })
        }
        
        
        removePlan(parentIndex,index,travelDetailID) {
            
            let alert = this.alertCtrl.create({
                title: 'Confirm',
                message: 'Are you sure?',
                buttons: [
                    {
                        text: 'No',
                        handler: () => {
                            this.presentToast('You are not sure!!');
                        }
                    },
                    {
                        text: 'Yes',
                        handler: () => {
                            
                            if(travelDetailID) {
                                
                                let loading = this.loadingCtrl.create({
                                    spinner:'hide',
                                    content:`<img src="assets/imgs/loader.png"  class="rotate h45"/>`,
                                });
                                
                                loading.present();
                                
                                this.service.getValue("","traveldetail/delete/"+travelDetailID).then((result)=>{
                                    loading.dismiss();
                                    
                                    console.log(result);
                                    if(result['status']=="Success")
                                    {
                                        this.presentToast('Travel Plan Deleted !!');
                                        
                                        this.data.salesBudget = parseInt(this.data.salesBudget) - parseInt(this.monthDayWisePlanArr[parentIndex].details[index].salesBudget);
                                        
                                        this.monthDayWisePlanArr[parentIndex].details.splice(index,1);
                                        
                                    }  else {
                                        
                                        this.presentToast('Travel Plan Not Deleted !!');
                                    }
                                });
                                
                            } else {
                                
                                this.data.salesBudget = parseInt(this.data.salesBudget) - parseInt(this.monthDayWisePlanArr[parentIndex].details[index].salesBudget);
                                
                                this.monthDayWisePlanArr[parentIndex].details.splice(index,1);
                                console.log(travelDetailID);
                            }
                        }
                    }
                ]
            })
            
            alert.present();    
            
        } 
        
        
        seniorapprover:any=[];
        getSenior(check)
        {
            console.log(check);
            this.service.getValue(" ",'getseniors/list').then((response)=>{
                
                    console.log(response);
                    if(response['status']=='Success')
                    {
                        this.seniors=response['data'];
                        console.log(this.seniors);
                        let senior= this.seniors.filter(x => x.userId==check);
                        this.seniorapprover=senior[0];
                        console.log(this.seniorapprover);
                    }
            });
        }



        onCalculateTravelDaysHandler() {

               this.totalPlanDayRequired = 0;

               this.planRequestedWithoutSunday = 0;
               this.planRequestedWithSunday = 0;

               for (let index = 0; index < this.monthDayWisePlanArr.length; index++) {

                        const year = parseInt(moment(this.monthDayWisePlanArr[index]['planDate']).format('YYYY'));
                        const month = parseInt(moment(this.monthDayWisePlanArr[index]['planDate']).format('MM'));
                        const day = parseInt(moment(this.monthDayWisePlanArr[index]['planDate']).format('DD'));

                        console.log(year, month, day);

                        let myDate = new Date();
                        myDate.setFullYear(year);
                        myDate.setMonth(month);
                        myDate.setDate(day);

                        if(myDate.getDay() != 0) {
                            this.totalPlanDayRequired += 1;                                  
                        }

                        if (this.monthDayWisePlanArr[index].details && this.monthDayWisePlanArr[index].details.length > 0) {

                              if(myDate.getDay() == 0) {

                                   this.planRequestedWithSunday += 1;
                                   
                              } else {

                                  this.planRequestedWithSunday += 1;
                                  this.planRequestedWithoutSunday += 1;
                              }
                        }
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
        
    }
    