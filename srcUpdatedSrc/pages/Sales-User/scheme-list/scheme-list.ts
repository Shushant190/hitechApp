import { Component,ViewChild,ElementRef,OnInit,NgZone  } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,App, Content } from 'ionic-angular';
import { CatelougeProvider } from '../../../providers/catelouge/catelouge';
import { SchemeDetailPage } from '../scheme-detail/scheme-detail';
import * as moment from 'moment';
/**
 * Generated class for the SchemeListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-scheme-list',
  templateUrl: 'scheme-list.html',
})
export class SchemeListPage {

  @ViewChild(Content) content: Content;

  
  schemeList:any=[];
  lengthMeasure:any=[];

  
  
  data:any = {};
  saveOriginalData:any = [];
  

  constructor(public app: App,public loadingCtrl:LoadingController,public service:CatelougeProvider ,public navCtrl: NavController, public navParams: NavParams  ,  private zone: NgZone,) {

    this.productSchemeList();
  }

  announcementList:any=[];
  


  ionViewDidEnter()
  {
    console.log(this.saveOriginalData);
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




  onSearchChangeHanlder() {
        
    setTimeout(() => {
      
      if(this.data.search) {
        console.log(this.data.search);
        

        const filterColumnArr = ['title', 'schemeDescription', 'schemeCode',  'createdTextDate' , 'validFromDate',  'validToDate'] ;
        
        this.schemeList =  this.service.onListSearchFilterCatalogue(this.saveOriginalData, this.data.search, filterColumnArr);
        
      } else {
        
        this.schemeList = JSON.parse(JSON.stringify(this.saveOriginalData));
      }
      
    }, 500);
  }
  
  onClearSearchHandler() {
    console.log("THIS IS CLEAR FUNCTION");
    
    setTimeout(() => {
      
      if(!this.data.search) {
        
        let loading = this.loadingCtrl.create({
          spinner:'hide',
          content:`<img src="assets/imgs/loader.png"  class="rotate h45"/>`,
        });
        
        loading.present();
        
        this.schemeList = JSON.parse(JSON.stringify(this.saveOriginalData));
        console.log(this.schemeList)
        setTimeout(() => {  
          loading.dismiss(); 
        }, 500);
      }
      
    }, 500);
  }
  


  

  goToSchemedetail(schemeCode)
  {
      this.navCtrl.push(SchemeDetailPage,{schemeCode:schemeCode});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SchemeListPage');
  }

  
  productSchemeList()
  {


    let loading = this.loadingCtrl.create({
      spinner:'hide',
      content:`<img src="assets/imgs/loader.png"  class="rotate h45"/>`,
  });

  loading.present();

    this.service.getData({isActive:2},"getallscheme").then((result)=>{
      console.log(result);
      loading.dismiss();
      // this.loader=false;
      if(result['message']=='Success')
      {
        this.schemeList=result['data'];
        console.log(this.schemeList);
        this.saveOriginalData=this.schemeList;
        console.log(this.saveOriginalData);
        this.setOrderStatusTextHandler();
        this.lengthMeasure=this.schemeList.length;
      }
      else{
        // this.setOrderStatusTextHandler();
      }
    })
  }



  
  setOrderStatusTextHandler() {

    console.log("setOrderStatusTextHandler");
    for (let index = 0; index < this.saveOriginalData.length; index++) {
      
      console.log("FOR LOOP");
         this.saveOriginalData[index]['createdTextDate'] =  moment(this.saveOriginalData[index].createdOn).format('DD MMM YYYY'); 
         this.saveOriginalData[index]['validFromDate'] =  moment(this.saveOriginalData[index].validFrom).format('DD MMM YYYY'); 
         this.saveOriginalData[index]['validToDate'] =  moment(this.saveOriginalData[index].validTill).format('DD MMM YYYY'); 



         if(this.saveOriginalData[index].dealerStatus == 1) {

              this.saveOriginalData[index].dealerTextStatus = 'Draft';
           
         } else if(this.saveOriginalData[index].dealerStatus == 2) {
             
              this.saveOriginalData[index].dealerTextStatus = 'Pending';
             
           
         } else if(this.saveOriginalData[index].dealerStatus == 3) {

               this.saveOriginalData[index].dealerTextStatus = 'Approved';
         } 


         if(this.saveOriginalData[index].companyStatus == 1) {

             this.saveOriginalData[index].companyTextStatus = 'Pending';
       
         } else if(this.saveOriginalData[index].companyStatus == 2) {
             
             this.saveOriginalData[index].companyTextStatus = 'Approved';
             
         } else if(this.saveOriginalData[index].companyStatus == 3) {

             this.saveOriginalData[index].companyTextStatus = 'Hold';
         }
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

  
  



currentpage:any = 2; 
myData:any = [];
variableForScroll:any = false;

doInfinite(infiniteScroll)
{

  this.service.getData({isActive:2, "currentPage": this.currentpage,"pageSize":this.service.pagesize},"getallscheme").then((result)=>{
    console.log(result);
    // this.loader=false;
    if(result['message']=='Success')
    {
      this.myData = result['data'] 
        if(this.myData)
        {
          for(var i= 0; i<this.myData.length; i++)
          {
            this.schemeList.push(this.myData[i]);
          }
          infiniteScroll.complete();
        }
        else{
          infiniteScroll.complete();
          this.variableForScroll= true;

        }
        this.setOrderStatusTextHandler();
        this.lengthMeasure=this.schemeList.length

      this.schemeList=result['data'];
    }
    else{
      // this.setOrderStatusTextHandler();
    }
  })


}



}
