// import { Component } from '@angular/core';
import { IonicPage,ToastController, NavController, NavParams, LoadingController, ViewController, Navbar, App, Content } from 'ionic-angular';
import { CatelougeProvider } from '../../../../providers/catelouge/catelouge';
import { TaskdetailPage } from '../taskdetail/taskdetail';
import {Storage} from '@ionic/storage';
import { TasktypePopoverComponent } from '../../../../components/tasktype-popover/tasktype-popover';
import { PopoverController } from 'ionic-angular/components/popover/popover-controller';
// import { ViewChild } from '@angular/core';
import { SalesHomePage } from '../../sales-home/sales-home';
import { SalesTabsPage } from '../../sales-tabs/sales-tabs';
import { Component,ViewChild,ElementRef,OnInit,NgZone  } from '@angular/core';
@IonicPage()
@Component({
  selector: 'page-tasklist',
  templateUrl: 'tasklist.html',
})
export class TasklistPage {

  @ViewChild(Content) content: Content;
  @ViewChild(Navbar) navBar: Navbar;
  status:any;
  InProcess:any;
  Completed:any;
  Reopen:any;
  isNoDataFound:any=false;
  task_list:any=[];
  data:any = {};
  saveOriginalData:any = [];
  userList:any=[];
  userId:any;
  userRole:any;
  filter:any='AssignedToMe';
  filterarray:any=[];
  task_list1:any={}

  currentPage:any = 1;

  constructor(public viewCtrl:ViewController,public toastCtrl: ToastController,public navCtrl: NavController, public navParams: NavParams,public service:CatelougeProvider,public storage:Storage,public loadingCtrl:LoadingController, public popoverCtrl: PopoverController, public app :App, private zone: NgZone,) {

      this.storage.get('userId').then((r)=>{

            console.log(r);
            this.userId=r;

      })

      console.log(this.filter)
      this.storage.get('role').then((role) => {

          console.log(role)
          this.userRole=role;
          console.log(this.userRole);
          this.taskList(1, "");

      })
  }


  tmp_task:any=[];
  clickEvent(check)
  {
        this.status = check;
        console.log(check);
        console.log(this.filterarray);

        let inprocesscount2= this.filterarray.filter(x => x.taskStatus==check);
        this.tmp_task=inprocesscount2;
        this.task_list=this.tmp_task;
        console.log(this.task_list);


        if(this.task_list.length==0){
           this.isNoDataFound=true;
        } else {
           this.isNoDataFound=false;
        }
        // this.scrollToTop();
  }


  onSearchChangeHanlder() {
      
    setTimeout(() => {
      
      if(this.data.search) {
        
        const filterColumnArr = [ 'establishment', 'establishmentName', 'leadEstablishment','taskPriorityName','createdByName'];
        
        this.task_list =  this.service.onListSearchFilterCatalogue(this.saveOriginalData, this.data.search, filterColumnArr);
        
      } else {
        
        this.task_list = JSON.parse(JSON.stringify(this.saveOriginalData));
        
      }
      if(this.task_list.length==0){
        this.isNoDataFound=true;
      }else{
        this.isNoDataFound=false;
      }
      
    }, 500);
}

onClearSearchHandler() {
    console.log("i m working")
  setTimeout(() => {
    
    if(!this.data.search) {
      console.log("i m  working in if condition")
      let loading = this.loadingCtrl.create({
        spinner:'hide',
        content:`<img src="assets/imgs/loader.png"  class="rotate h45"/>`,
      });
      
      loading.present();
      
      this.task_list = JSON.parse(JSON.stringify(this.saveOriginalData));
      if(this.task_list.length==0){
        this.isNoDataFound=true;
      }else{
        this.isNoDataFound=false;
      }
      
      setTimeout(() => {  
        loading.dismiss(); 
      }, 500);
    }
  }, 500);
}



  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(TasktypePopoverComponent);
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
        console.log(data);
        this.taskList(1, "");
        console.log('Hello Data 3');
    });


  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad TasklistPage');
  }






  onTaskListSharedData()
  {

      console.log("this is TASK LIST FUNCTION ")
      let apiURL:any;
      let sand_data:any=[];

      if(this.filter=='AssignedToMe'){
          sand_data={'currentPage': this.currentPage,'pageSize': this.service.pagesize};
          apiURL="mytask/list";
      }

      if(this.filter=='AssignedByMe'){
        sand_data={'createdBy':this.userId,'currentPage': this.currentPage,'pageSize': this.service.pagesize}
        apiURL="taskbyme/list"
      }

      if(this.filter=='JuniorsTask'){
        sand_data={'currentPage': 1,'pageSize': this.service.pagesize}
        apiURL="juniourstask/list"
      }
    
  }



  taskListData:any={};
  taskList(src, infiniteScroll:any)
  {


    console.log(src)
    console.log(infiniteScroll);
      console.log("this is TASK LIST FUNCTION ")
      let apiURL:any;
      let sand_data:any=[];
      if(this.filter=='AssignedToMe') {
          sand_data={'currentPage': this.currentPage,'pageSize': this.service.pagesize};
          apiURL="mytask/list";
      }

      if(this.filter=='AssignedByMe') {
          sand_data={'createdBy':this.userId,'currentPage': this.currentPage,'pageSize': this.service.pagesize}
          apiURL="taskbyme/list"
      }

      if(this.filter=='JuniorsTask') {
          sand_data={'currentPage': this.currentPage,'pageSize': this.service.pagesize}
          apiURL="juniourstask/list"
      }

      this.isNoDataFound=false;

    this.lodingPersent();


       console.log(sand_data);
       console.log(apiURL);
    this.service.getData(sand_data,apiURL).then((result)=>{

                console.log(result);      
                this.currentPage += 1;

                this.userTypeList();

                if(result["data"] && result["data"].length) {

                     this.task_list = this.task_list.concat(result["data"]);

                     for(let i=0;i<this.task_list.length;i++)
                     {
                            if(this.task_list[i]['taskType']==1)
                            {
                              this.task_list[i]['taskType']='call';
                            }
                            else if(this.task_list[i]['taskType']==2)
                            {
                              this.task_list[i]['taskType']='meeting';
                            }
                            else if(this.task_list[i]['taskType']==3)
                            {
                              this.task_list[i]['taskType']='mail';
                            }
                            else
                            {
                              this.task_list[i]['taskType']='call';
                            }
                      }

                      this.filterarray=this.task_list;

                      let inprocesscount= this.task_list.filter(x => x.taskStatus==1);
                      this.InProcess=inprocesscount.length;
                      let completedcount= this.task_list.filter(x => x.taskStatus==2);
                      this.Completed=completedcount.length;
                      let reopencount= this.task_list.filter(x => x.taskStatus==3);
                      this.Reopen=reopencount.length;

                } else {
                     
                    if(!this.task_list || this.task_list.length == 0) {

                        this.InProcess=0;
                        this.Completed=0;
                        this.Reopen=0;
                        this.isNoDataFound=true;
                    }

                    if(src == 2) {
                       infiniteScroll.complete();
                       this.variableForScroll = true;
                    }
                }

                console.log(this.task_list);

                this.saveOriginalData=this.task_list;
                this.clickEvent(1);
                console.log(this.service.getTaskListData);
            
         
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



  userTypeList()
  {
    this.service.getValue('',"usertype/list").then((result)=>{
      console.log(result);
      this.userList=result['data'];
      for(let i=0;i<this.userList.length;i++)
      {
        for(let j=0;j<this.userList[i]['roles'].length;j++)
        {
          for(let k=0;k<this.task_list.length;k++)
          {
            if(this.task_list[k]['role']==this.userList[i]['roles'][j]['roleId'])
            {
              this.task_list[k].roleName=this.userList[i]['roles'][j]['roleName'];
              console.log(this.task_list[k]['roleName']);
            }
          }
        }
      }
    })
  }



  task_detail(id)
  {
    console.log("hello");
    this.lodingPersent();
    this.navCtrl.push(TaskdetailPage,{taskId:id});
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


  gotopage() {
    console.log("hhhhhhhh");
    

    //  this.navCtrl.setRoot(SalesTabsPage);
     this.navCtrl.popToRoot();
    //  this.app.getRootNav().setRoot(SalesTabsPage);

       
  }

  ionViewDidLeave() {

    let nav = this.app.getActiveNav();

    if(nav && nav.getActive()) {

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


  variable:boolean=false;
  myScrolledDataList:any=[];
  apple:any=[];
  // pageSize = this.service.pagesize;
  // data:any=[];
  myData:any=[]
  DistriButionList2:any=[];
  myNewArray:any=[];
  variableForScroll:any = false;

  


  // doInfinite(infiniteScroll:any)
  // {


  //   // this.service.getData(sand_data,apiURL).then((result)=>{
  //   //   console.log(result);      
  //   //   if(result['status']=='Success')
  //   //   {
  //   //     this.isNoDataFound=false;
  //   //     this.userTypeList();
  //   //     this.myData=result['data'];

  //   //     if(this.myData)
  //   //     {
  //   //       for(let i=0;i<this.myData.length;i++)
  //   //       {
  //   //         if(this.myData[i]['taskType']==1)
  //   //         {
  //   //           this.myData[i]['taskType']='call';
  //   //         }
  //   //         else if(this.myData[i]['taskType']==2)
  //   //         {
  //   //           this.myData[i]['taskType']='meeting';
  //   //         }
  //   //         else if(this.myData[i]['taskType']==3)
  //   //         {
  //   //           this.myData[i]['taskType']='mail';
  //   //         }
  //   //         else
  //   //         {
  //   //           this.myData[i]['taskType']='call';
  //   //         }
  //   //       }
  //   //       let inprocesscount= this.myData.filter(x => x.taskStatus==1);
  //   //       this.InProcess=inprocesscount.length;
  //   //       let completedcount= this.myData.filter(x => x.taskStatus==2);
  //   //       this.Completed=completedcount.length;
  //   //       let reopencount= this.myData.filter(x => x.taskStatus==3);
  //   //       this.Reopen=reopencount.length;


  //   //           for(var i=0;i<this.myData.length;i++)
  //   //           {
  //   //             this.task_list.push(this.myData[i])
  //   //           }
  //   //           console.log(this.task_list);

  //   //           this.saveOriginalData = JSON.parse(JSON.stringify(this.task_list));

  //   //           infiniteScroll.complete();
         
  //   //     }
  //   //     else
  //   //     {
  //   //         this.task_list= [];
  //   //         this.InProcess=0;
  //   //         this.Completed=0;
  //   //         this.Reopen=0;
  //   //     }

  //   //   // this.saveOriginalData=this.task_list;

  //   //   // this.filterarray=this.task_list;
  //   //   // this.clickEvent(1);
  //   //   // console.log(this.service.getTaskListData);
  //   //   }else{
  //   //     // this.isNoDataFound=true;
  //   //     this.task_list= [];
  //   //     infiniteScroll.complete();
  //   //   }
      
  //   // })

  // }




  
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
