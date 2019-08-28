import { Component, ɵConsole } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController,AlertController} from 'ionic-angular';
import { CatelougeProvider } from '../../../../providers/catelouge/catelouge';
import { Storage} from '@ionic/storage';
import * as moment from 'moment';
import { TasklistPage } from '../tasklist/tasklist';
import * as $ from 'jquery';
import {NgForm} from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-add-task',
  templateUrl: 'add-task.html',
})
export class AddTaskPage {
  
  userRole:any;
  userType:any;
  user:any=[];
  form:any=[];
  saleuserdatalist:any=[];
  currentDate:any;
  TodayDate:any;
  userId:any;
  constructor(public store:Storage,
    public alertCtrl: AlertController,
    public serve:CatelougeProvider,
    public navCtrl: NavController,
    public toastCtrl: ToastController, 
    public navParams: NavParams) {
      
      this.TodayDate = moment(this.currentDate).format('YYYY-MM-DD'); 
      this.store.get('role').then((r)=>{
        this.userRole= r;
        console.log(this.userRole);
        this.rolelist();
      });
      
      this.store.get('userType').then((r)=>{
        this.userType= r;
        console.log(this.userType);
      });    
      this.store.get('user').then((r)=>{
        this.user= r;
        console.log(this.user);
        this.userId =this.user.userId;
        console.log( this.userId);
      });
      
    }
    
    ionViewDidLoad() {
      console.log('ionViewDidLoad AddTaskPage');
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
    
    
    rolelisttask1:any=[];
    AllUserList:any=[];
    rolelisttask:any=[];
    rolelists:any=[];
    rolelist() {
      this.serve.getValue('','usertype/list').then((response)=>{
        console.log(response);
        this.rolelists=response['data'];
        let systemuser= this.rolelists.filter(x => x.userTypeId==1);
        this.rolelisttask1=systemuser[0].roles;
        let filterrolelead= this.rolelists.filter(x => x.userTypeId==2);
        this.rolelisttask=filterrolelead[0].roles;
        this.AllUserList=this.rolelisttask.concat(this.rolelisttask1);
        console.log(this.AllUserList);
        console.log(this.rolelisttask1);
        console.log(this.AllUserList);
        console.log(this.rolelisttask);
        
        
        if(this.userRole==6) {
          const filterArray=this.AllUserList.filter(row=>row.roleId ==7 || row.roleId ==8 || row.roleId ==10);
          console.log(filterArray);
          this.AllUserList=filterArray;
        }
        if(this.userRole==7) {
          const filterArray=this.AllUserList.filter(row=>row.roleId ==8 || row.roleId ==10);
          console.log(filterArray);
          this.AllUserList=filterArray;
        }
        if(this.userRole==8) {
          const filterArray=this.AllUserList.filter(row=> row.roleId ==10);
          console.log(filterArray);
          this.AllUserList=filterArray;
        }
        console.log(this.AllUserList);
      });
    }
    
    
    
    
    
    
    
    
    rsm:any=[];
    asm:any=[];
    ti:any=[];
    finalsalesuser:any=[];
    tmpUserList:any=[];
    saleslist:any=[];
    
    userList(role)
    {
      console.log(role);
      this.saleslist=[];
      console.log(role);
      console.log(this.userType)
      if(this.userType==1){
        console.log(role);
        this.serve.getData( {"role":role,"currentPage": 1,"pageSize": 50},"user/list").then((result)=>{
          console.log(result);
          if(result['status']=='Success')
          {
            this.saleslist=result['data'];
            this.tmpUserList=this.saleslist;
          }
        })
      }else{
        console.log(this.user);
        // this.saleuserdatalist=this.user.user.data.salesUser.staffWithJuniors.juniors;
        this.saleuserdatalist=this.user.user.salesUser.staffWithJuniors.juniors;
        if(this.userRole==6 && role==10) {
          for(var i=0;i < this.saleuserdatalist.length;i++)
          {           
            if(this.saleuserdatalist[i].role== role){
              this.ti.push(this.saleuserdatalist[i]);
            }
            
            if(this.saleuserdatalist[i].role == role - 3){
              this.rsm.push(this.saleuserdatalist[i]);
            }
            
            if(this.saleuserdatalist[i].role == role - 2){
              this.asm.push(this.saleuserdatalist[i]);
            }
          }
          
          
          for(var k=0;k < this.rsm.length;k++)
          {
            for(var q=0;q<this.rsm[k].juniors.length;q++)
            {
              if(this.rsm[k].juniors[q].role== role -2){
                this.asm.push(this.rsm[k].juniors[q]);
              }
              if(this.rsm[k].juniors[q].role== role){
                this.ti.push(this.rsm[k].juniors[q]);
              }
            }
          }
          
          for(var j=0;j < this.asm.length;j++)
          { 
            for(var z=0;z<this.asm[j].juniors.length;z++)
            {
              if(this.asm[j].juniors[z].role == role){
                this.ti.push(this.asm[j].juniors[z]);
              }
            }
          }
          
        }
        
        if(this.userRole==6 && role==8) {
          
          for(var i=0;i < this.saleuserdatalist.length;i++)
          {           
            if(this.saleuserdatalist[i].role == role){
              this.asm.push(this.saleuserdatalist[i]);
            }
            if(this.saleuserdatalist[i].role == role-1){
              this.rsm.push(this.saleuserdatalist[i]);
            }
          }
          
          for(var k=0;k < this.rsm.length;k++)
          {
            for(var q=0;q<this.rsm[k].juniors.length;q++)
            {
              if(this.rsm[k].juniors[q].role==role){
                this.asm.push(this.rsm[k].juniors[q]);
              }
            }
          }
          
        }
        
        if(this.userRole==6 && role==7) {
          
          for(var i=0;i < this.saleuserdatalist.length;i++)
          {        
            if(this.saleuserdatalist[i].role == role)
            {
              this.rsm.push(this.saleuserdatalist[i]);
            }
          }
        }
        
        
        if(this.userRole==7 && role==10) {
          for(var i=0;i < this.saleuserdatalist.length;i++)
          {  
            if(this.saleuserdatalist[i].role == role-2)
            {
              this.asm.push(this.saleuserdatalist[i]);
            }
            if(this.saleuserdatalist[i].role== role){
              this.ti.push(this.saleuserdatalist[i]);
            }
          }
          
          for(var k=0;k < this.asm.length;k++)
          {
            for(var q=0;q<this.asm[k].juniors.length;q++)
            {
              if(this.asm[k].juniors[q].role== role){
                this.ti.push(this.asm[k].juniors[q]);
              }
            }
          }
        }
        if(this.userRole==7 && role==8) {
          
          for(var i=0;i < this.saleuserdatalist.length;i++)
          {           
            if(this.saleuserdatalist[i].role== role){
              this.asm.push(this.saleuserdatalist[i]);
            }
          }
        }
        
        if(this.userRole==7 && role==10) {
          
          for(var i=0;i < this.saleuserdatalist.length;i++)
          { 
            if(this.saleuserdatalist[i].role== role){
              this.asm.push(this.saleuserdatalist[i]);
            }
            if(this.saleuserdatalist[i].role== role){
              this.ti.push(this.saleuserdatalist[i]);
            }
          }
          for(var k=0;k < this.asm.length;k++)
          {
            for(var q=0;q<this.asm[k].juniors.length;q++)
            {
              if(this.asm[k].juniors[q].role== role){
                this.ti.push(this.asm[k].juniors[q]);
              }
            }
          }
        }
        if(this.userRole==8 && role==10) {
          
          for(var i=0;i < this.saleuserdatalist.length;i++)
          {           
            if(this.saleuserdatalist[i].role== role)
            {
              this.ti.push(this.saleuserdatalist[i]);
            }
          }
        }
        
        if(role==10) {
          for(var a=0;a< this.ti.length;a++) {
            const indexExist = this.saleslist.findIndex(row => row.userId == this.ti[a].userId);
            if(indexExist == -1) {
              this.saleslist.push(this.ti[a]);
            }
          }
          
        }  else if(role==8) {
          for(var a=0;a< this.asm.length;a++) {
            
            const indexExist = this.saleslist.findIndex(row => row.userId == this.asm[a].userId);
            
            if(indexExist == -1) {
              
              this.saleslist.push(this.asm[a]);
            }
          }
        }  else  {
          for(var a=0;a< this.rsm.length;a++) {
            
            const indexExist = this.saleslist.findIndex(row => row.userId == this.rsm[a].userId);
            
            if(indexExist == -1) {
              
              this.saleslist.push(this.rsm[a]);
            }
          }
        }
      }
      console.log(this.saleslist);
    }
    
    
    taskValue:any={};
    userIds:any=[];
    roles:any=[];
    allUserId:any=[];
    userIdList:any=[];
    saveTask()
    {
      console.log(this.form.user);
      this.userIdList.push({'userName':this.form.user,'userId':this.userId});
      this.form.push(this.userIdList);
      console.log(this.form);
      
      if (this.form.invalid) 
      {
        console.log("*****invalid data*****");
        console.log(this.form);
        return;
      }
      else
      {
        
        console.log(this.userId,"hello ");  
        for(var i=0;i<this.form.user.length;i++){
          this.userIds.push(parseInt(this.form.user[i].userId));
          this.roles.push(parseInt(this.form.role));
        }
        
        
        if(this.form.other!='')
        {
          this.taskValue={"deadline":moment(this.form.date).format('YYYY-MM-DD '),"taskPriority":parseInt(this.form.taskPriority),"userIds":this.userIds,"roles":this.roles,"remarks":this.form.remark}
        }
        else{
          this.taskValue={"userIds":this.userIds,"roles":this.roles,"deadline":moment(this.form.deadline).format('YYYY-MM-DD '),"remarks":this.form.remarks,"taskPriority":parseInt(this.form.taskPriority)}
        }
        console.log(this.form);
        console.log(this.taskValue);
        this.serve.getData(this.taskValue,"task/add").then((result)=>{
          console.log(result);
          if(result['status']=='Success')
          {
            this.presentToast("Task  Added Successfully !!");
            this.navCtrl.push(TasklistPage).then(() => {
              const index = this.navCtrl.getActive().index;
              this.navCtrl.remove(0, index);
            });
          }else{
            this.presentToast("Task Not Added !!");
          }
        })
      }
    }
    
    
  }
  