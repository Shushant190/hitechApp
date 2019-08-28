import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { CatelougeProvider } from '../../../providers/catelouge/catelouge';
// import { LeadDetailPage } from '../leads/lead-detail/lead-detail';
import {Storage} from '@ionic/storage';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { LeadlistPage } from '../leads/leadlist/leadlist';
import { IonicSelectableModule } from 'ionic-selectable';
import { formArrayNameProvider } from '@angular/forms/src/directives/reactive_directives/form_group_name';
import * as $ from 'jquery';
// import { SessionProvider } from '../../../providers/session/session';

/**
 * Generated class for the AddLeadPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-lead',
  templateUrl: 'add-lead.html',
})
export class AddLeadPage {
  data:any={};
  step1:any=true;
  step2:any=false;
  step3:any=false;
  step4:any=false;
  process1:any='step process';
  process2:any='step';
  process3:any='step';
  process4:any='step';
  statelist:any=[];
  districtlist:any=[];
  citylist:any=[];
  areas:any=[];
  contact_person:any={};
  token:any;

  isNetworkType:boolean=false;
  isBasicInfo:boolean=false;
  isAddressInfo:boolean= false;
  isContactSegment:boolean=false;

  contactData:any = [];

  userTypelist=[];
  segmentList:any=[];
  validateForm: FormGroup;
  basicForm:FormGroup;
  addressForm:FormGroup;
  contactForm:FormGroup;
  assignedForm:FormGroup;

  isSegmentSelected:any = false;

  stateData:any = [];

  constructor(public formBuilder:FormBuilder,public navCtrl: NavController, public navParams: NavParams,public service:CatelougeProvider,public alertCtrl: AlertController,public loadingCtrl:LoadingController,public storage:Storage) {

        this.stateData = [
            { id: 1, name: 'Tokai' },
            { id: 2, name: 'Vladivostok' },
            { id: 3, name: 'Navlakhi' }
        ];

          this.get_state();
          this.getuserTypeList();
          this.getSegmentList();
          this.lodingPersent();
          this.data['country']="India";
          this.data.userType=12;

          this.storage.get('userId').then((userId) => 
          { 
              console.log(userId);
              this.data['userId']=userId;
          })


          this.validateForm =formBuilder.group({
              userType: ['', Validators.compose([Validators.required])],
          });

          this.basicForm =formBuilder.group({
                  companyName: ['', Validators.compose([Validators.required, Validators.minLength(9)])],
                  landline: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(13)])],
                  email: ['', Validators.compose([Validators.required, Validators.email])],
                  mobile: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])],
                  gst: ['', Validators.compose([Validators.minLength(15), Validators.maxLength(15)])],
                  source: ['', Validators.compose([Validators.required])],
          });


          this.addressForm =formBuilder.group({
            
                country: ['', Validators.compose([Validators.required])],
                street: ['', Validators.compose([Validators.minLength(15)])],
                state: ['', Validators.compose([Validators.required])],
                districtName: ['', Validators.compose([Validators.required])],
                cityName: ['', Validators.compose([Validators.required])],
                pin: ['', Validators.compose([Validators.required])]
          });


          this.contactForm =formBuilder.group({

                contactName: ['', Validators.compose([Validators.minLength(4)])],
                mobile1: ['', Validators.compose([Validators.minLength(10), Validators.maxLength(10)])],
                mobile2: ['', Validators.compose([Validators.minLength(10), Validators.maxLength(10)])]
          });

          console.log(this.isNetworkType,this.isBasicInfo,this.isContactSegment);
    }

  ionViewDidLoad() {

      console.log('ionViewDidLoad AddLeadPage');
  }


  submitType() {

        if(this.validateForm.invalid)
        {
            console.log(this.data.userType);
            console.log(this.validateForm);
            this.validateForm.get('userType').markAsTouched();
            return true;

        } else {

            console.log(this.data.userType);
            this.isNetworkType=true;
            console.log(this.isNetworkType);
            $('.show-back-button').hide();
        }
  }


  submitBasic() {

      if(this.basicForm.invalid)
      {
            console.log(this.basicForm);
            this.basicForm.get('companyName').markAsTouched();
            this.basicForm.get('email').markAsTouched();
            this.basicForm.get('mobile').markAsTouched();
            this.basicForm.get('landline').markAsTouched();
            this.basicForm.get('gst').markAsTouched();
            this.basicForm.get('source').markAsTouched();
            return;

      } else {

          this.isBasicInfo=true;
          console.log(this.isBasicInfo);
      }
  }


  submitAddress() {

        if(this.addressForm.invalid)
        {
              console.log(this.addressForm);
              this.addressForm.get('country').markAsTouched();
              this.addressForm.get('street').markAsTouched();
              this.addressForm.get('state').markAsTouched();
              this.addressForm.get('district').markAsTouched();
              this.addressForm.get('city').markAsTouched();
              this.addressForm.get('pin').markAsTouched();
              return;

        } else {

            this.isAddressInfo=true;
            console.log(this.isAddressInfo);
        }
  }



    submitContact() {


        if(this.contactForm.invalid)
        {
                console.log(this.addressForm);
                this.contactForm.get('contactName').markAsTouched();
                this.contactForm.get('mobile1').markAsTouched();
                this.contactForm.get('mobile2').markAsTouched();
                return;

        } else {

            if(!this.data.mobile2 || this.data.mobile2 == null) {
                this.data.mobile2='';
            }
        
            this.contactData.push({ name: this.data.contactName, mobile1: this.data.mobile1, mobile2: this.data.mobile2 });
        
            this.data.contactName = '';
            this.data.mobile1 = '';
            this.data.mobile2 = '';

            this.contactForm.get('contactName').markAsUntouched();
            this.contactForm.get('mobile1').markAsUntouched();
            this.contactForm.get('mobile2').markAsUntouched();
        }
    }


    deleteContact(index) {
        this.contactData.splice(index, 1);
    }



   contactChangeHandler(target) {

        const contactName = this.validateForm.get('contactName');
        const mobile1 = this.validateForm.get('mobile1');
        const mobile2 = this.validateForm.get('mobile2');

        if(target == 'name') {

                if(this.data.contactName) {

                    contactName.setValidators([Validators.required, Validators.minLength(4)]);

                    mobile1.setValidators([Validators.required, Validators.minLength(10), Validators.maxLength(10)]);

                    mobile1.updateValueAndValidity();

                } else {

                    if(this.data.mobile1) {

                        contactName.setValidators([Validators.required, Validators.minLength(4)]);
                        contactName.updateValueAndValidity();

                    } else {

                        mobile1.clearValidators();
                        mobile1.updateValueAndValidity();
                    }
                } 
        }


        if(target == 'mobile1') {

            if(this.data.mobile1) {

                mobile1.setValidators([Validators.required, Validators.minLength(10), Validators.maxLength(10)]);

                contactName.setValidators([Validators.required, Validators.minLength(4)]);

            } else {

                if(this.data.contactName) {

                    mobile1.setValidators([Validators.required, Validators.minLength(10), Validators.maxLength(10)]);

                    mobile1.updateValueAndValidity();
                      

                } else {

                    contactName.clearValidators();
                    contactName.updateValueAndValidity();
                }
            }
        }
        

        if(target == 'mobile2') {

            if(this.data.mobile2) {

                mobile2.setValidators([Validators.required, Validators.minLength(10), Validators.maxLength(10)]);

            } else {

                mobile2.clearValidators();
            }

            mobile2.updateValueAndValidity();
        }

    }

    next1()
    {
            console.log(this.data);
            this.step1=false;
            this.step2=true;
            this.process1='step complete'
            this.process2='step process'
    }


    MobileNumber(event: any) 
  {
        const pattern = /[0-9\+\-\ ]/;
        let inputChar = String.fromCharCode(event.charCode);
        if (event.keyCode != 8 && !pattern.test(inputChar)) 
        {event.preventDefault(); }
   }

    back1()
    {
            console.log("hello");
            this.step1=true;
            this.step2=false;
            this.process1='step process';
            this.process2='step';
    }


   backButtonHandler(pageType) {

       if(pageType == 'Basic') {
           this.isNetworkType = false;
           $('.show-back-button').show();
       }

       if(pageType == 'Address') {

           this.isNetworkType = true;
           this.isBasicInfo = false;
       }

       if(pageType == 'ContactSegment') {

           this.isBasicInfo = true;  
           this.isAddressInfo = false;
       }
  }

  networkSegments:any=[];

  next2()
  { 
      this.step2=false;
      this.step3=true;
      this.process2='step complete';
      this.process3='step process';
  }

  back2()
  {
      console.log("hello2");
      this.step2=true;
      this.step3=false;
      this.process2='step process';
      this.process3='step';
  }

  next3()
  {

      for(let i=0;i<this.segmentList.length;i++)
      {
          for(let j=0;j<this.data['segment'].length;j++)
          {
            if(this.segmentList[i]['value']==this.data['segment'][j])
            {
              this.networkSegments.push({"segmentCode":this.segmentList[i]['value'],"segment":this.segmentList[i]['text']});
            }
          }
      }

      console.log(this.networkSegments);

      console.log("hello3");
      this.step3=false;
      this.step4=true;
      // this.previous3=true;
      this.process3='step complete';
      this.process4='step process'
  }

  back3()
  {
      console.log("hello3");
      this.step3=true;
      this.step4=false;
      this.process3='step process';
      this.process4='step';
  }
  
  saveLeadData()
  {
        this.lodingPersent();

        if(this.contactForm.invalid)
        {
              console.log(this.contactForm);
              this.contactForm.get('contactName').markAsTouched();
              this.contactForm.get('mobile1').markAsTouched();
              this.contactForm.get('mobile2').markAsTouched();
              return;

        } else {

            if(!this.data.mobile2 || this.data.mobile2 == null) {
              this.data.mobile2='';
            }
      
            this.contactData.push({ name: this.data.contactName, mobile1: this.data.mobile1, mobile2: this.data.mobile2 });
      
            this.data.contactName = '';
            this.data.mobile1 = '';
            this.data.mobile2 = '';

            this.contactForm.get('contactName').markAsUntouched();
            this.contactForm.get('mobile1').markAsUntouched();
            this.contactForm.get('mobile2').markAsUntouched();
        }


        const segmentSelectedList = [];

        for (let index = 0; index < this.segmentList.length; index++) {
          
             if(this.segmentList[index].checked) {
                 segmentSelectedList.push({segmentCode: this.segmentList[index].name, segment: this.segmentList[index].name});    
             }
        }

        if(segmentSelectedList.length == 0) {
            this.isSegmentSelected = false; 
            return;
        } else {
            this.isSegmentSelected = true; 
        }


        console.log(this.data);
        console.log(this.contactData);
        let  apiData = {
                "landline": this.data.landline,
                "email": this.data.email,
                "mobile": this.data.mobile,
                "leadType": this.data.userType,
                "establishment": this.data.companyName,
                "gst": this.data.gst,
                "street": this.data.street,
                "state": this.data.state.name,
                "district": this.data.districtName.districtName,
                "city": this.data.cityName.cityName,
                "pin": this.data.pin.pin,
                "country": this.data.country,
                "source": this.data.source,
                "leadSegments": segmentSelectedList,
                "leadContacts": this.contactData
        }
        console.log(apiData);
        this.service.getData(apiData,"lead/add").then((result) => {
              console.log(result);    
              if(result['status']=='Success')
              {
                  this.showSuccess("Lead Created!");

                  this.navCtrl.pop();
              }
              else
              {
                 this.showError("Somthing wrong")
              }
        })
  }
 
  
  onSegmentChangeHandler() {

        let isSegmentSelected = false;

        for (let index = 0; index < this.segmentList.length; index++) {
            
            if(this.segmentList[index].checked) {
                    isSegmentSelected = true;
            }
        }

       this.isSegmentSelected  = isSegmentSelected;
   }
  
  

   get_state()
   {
        console.log('hii');
        this.service.getValue('','state/list/').then((response)=>{
              console.log(response);
              if(response['status']=='Success')
              {
                  this.statelist=response['data'];

                  const stateData = [];

                  for (let index = 0; index < this.statelist.length; index++) {
                      
                      stateData.push({name: this.statelist[index]});
                      
                  }

                  this.statelist = stateData;

              }
        });
   }


   tmp_distributorlist:any=[];

  get_district(state)
  {
      console.log(state)
      this.lodingPersent();
      let state_list=Array(state.name)
      console.log(state_list);
      this.service.getData(state_list,'district/list/').then((response)=>{
          console.log(response);
          this.districtlist=response['data'][0]['distrcits'];
          console.log(this.districtlist);
      });
  }


  get_city(state,districtName)
  {
      console.log(state);
      console.log(districtName);
      this.lodingPersent();
      this.service.getData(Array({"stateName":state.name,"distrcits":Array({"districtName":districtName.districtName})}),'city/list').then((response)=>{
            console.log(response);
            this.citylist=response['data'][0]['distrcits'][0]['cities'];
            console.log(this.citylist);
      });
  }


  get_pincode(stateMasterId)
  {
      console.log(stateMasterId.stateMasterId);
      this.lodingPersent();
      let cityarray=[];
      cityarray[0]=stateMasterId.stateMasterId;
      this.service.getData({"stateMasterIds":cityarray},'city/pincodes').then((response)=>{
        console.log(response);
        this.areas=response['data'][0]['pinCodes'];
        console.log(this.areas);
        const areaData = [];
        for (let index = 0; index < this.areas.length; index++) {
            areaData.push({pin: this.areas[index]});
        }
        this.areas = areaData;
        console.log(this.areas);
         });
    //   let filterpincode= this.citylist.filter(x => x.cityName==city.cityName);
    //   this.areas=filterpincode[0].pinCodes;
    //   console.log(this.areas);
  }

  tmp_list:any=[];
   getuserTypeList()
   {
      this.service.getValue('',"usertype/list").then((result)=>{
          console.log(result['data'][2]['roles']);
          this.userTypelist=result['data'][2]['roles'];
          console.log(this.userTypelist);
      })
   }

   getSegmentList()
   {
        // this.service.getValue('',"segment/list").then((result=>{
        //     console.log(result['data']);
        //     this.segmentList=result['data'];
        // }))

        this.segmentList = [{name: '2W', checked:false}, {name: '3W', checked:false}, {name: '4W', checked:false}, {name: '6W', checked:false}];
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
