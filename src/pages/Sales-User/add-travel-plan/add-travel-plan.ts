import { Component ,} from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController, LoadingController } from 'ionic-angular';
import { TravelMonthPage } from '../travel-month/travel-month';
import * as moment from 'moment';
import { CatelougeProvider } from '../../../providers/catelouge/catelouge';
import { Storage } from '@ionic/storage';
@IonicPage()
@Component({
  selector: 'page-add-travel-plan',
  templateUrl: 'add-travel-plan.html',
})

export class AddTravelPlanPage {
  data:any={};
  userId:any;
  tmp_month:any=[];
  yearArray:any=[];
  monthArray:any=["January", "February", "March", "April", "May", "June", "July", "August", "September",
  "October", "November", "December"];

  tmpArray=this.monthArray;
  seniors=[];

  constructor(public navCtrl: NavController,
              public storage:Storage,
              public loadingCtrl: LoadingController,
              public alertCtrl: AlertController, 
              public navParams: NavParams,
              public service:CatelougeProvider) {

    this.storage.get('userId').then((userId) => 
    { 
        console.log(userId);
        this.userId = userId;
    })

    this.data.travelBudget = 0;
    this.data.salesBudget = 0;
    this.data.budget = 0;

    let currentyear = moment().format('YYYY');
    this.yearArray.push(currentyear);
    this.yearArray.push(parseInt(currentyear)+1);
    this.yearArray.push(parseInt(currentyear)+2);

    console.log(this.yearArray);

    let month = moment().format('M');
    for(let i=parseInt(month)-1;i<this.monthArray.length;i++)
    {
        this.tmp_month.push(this.monthArray[i]); 
    }
    
    console.log(this.tmp_month);
    this.getSenior();

  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad AddTravelPlanPage');
  }
 

  divmonth(year)
  {
      console.log(year);
      if(year==moment().format('YYYY'))
      {
          console.log(this.tmp_month);
          this.monthArray=[];
          this.monthArray=this.tmp_month;
          console.log("true");

      } else {

          this.monthArray=this.tmpArray;
      }
  }

  getSenior()
  {
      this.service.getValue(" ",'getseniors/list').then((response)=>{

          console.log(response);
          if(response['status']=='Success')
          {
              this.seniors=response['data'];
              console.log(this.seniors);
              if(this.seniors.length!=0)
              {
                 this.data.travelApprover=this.seniors[0].userId;

              } else {
                
                 this.data.travelApprover=1;
              }
          }
      });
  }


  onCheckMonthExistHandler() {
       
        console.log(this.data.year);
        console.log(this.data.month);

        if(this.data.year && this.data.month) {

              let numberofMonth=moment().month(this.data.month).format("M");

              console.log(numberofMonth);

              let loading = this.loadingCtrl.create({
                spinner:'hide',
                content:`<img src="assets/imgs/loader.png"  class="rotate h45"/>`,
              });
              
              loading.present();

              console.log(this.userId, parseInt(moment().month(numberofMonth).format("M")), this.data.year);
      
              this.service.getData({"userId": this.userId,"month":numberofMonth,"year": this.data.year},"travelplan/exists").then((result)=>{
      
                    loading.dismiss();
                    
                    console.log(result);
                    if(result['message']=='TravelPlan already exists' && result['status']!='Success')
                    {
                       // this.showError("This Month TravelPlan already exists");
                        //this.data.month='';
                    }
              })
        }
    }
 
 
    showSuccess(text) {
          let alert = this.alertCtrl.create({
            title: 'Success!',
            subTitle: text,
            buttons: ['OK']
          });
          alert.present();
        }


        showError(text) {
            let alert = this.alertCtrl.create({
                title: 'Error!',
                subTitle: text,
                buttons: ['OK']
            });
            alert.present();
        }
        
    
  

  goToTravelMonthl(){
    this.navCtrl.push(TravelMonthPage,{"data":this.data})
  }
  
}