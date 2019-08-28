import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
// import { SessionProvider } from '../session/session';
import {Storage} from '@ionic/storage';
import 'rxjs/add/operator/map';
import { AlertController, LoadingController, Loading } from 'ionic-angular';
import { Network } from '@ionic-native/network';
import 'rxjs/add/operator/timeout'
// import { NavController } from 'ionic-angular/navigation/nav-controller';
// import { TabsPage } from '../../pages/Product-catelouge/tabs/tabs';

/*
Generated class for the CatelougeProvider provider.

See https://angular.io/guide/dependency-injection for more info on providers
and Angular DI.
*/
@Injectable()
export class CatelougeProvider {
  tokenData:any;
  backButton:any=0;
  pagesize:any = 2  ;
  
  url:any = "http://13.234.72.162/api/";
  // url:any = "http://13.234.72.162:8084/api/";
  getTaskListData:any={};
  previousStatus:any;
  
  constructor(public network:Network,public http: Http,public storage:Storage,public alertCtrl: AlertController,
    public loadingCtrl:LoadingController ) {
      console.log('Hello CatelougeProvider Provider');
      console.log(this.getTaskListData);
    }
    

  CallStaticVersion(data,fn)
  {
        return new Promise((resolve, reject) => {
          
          this.storage.get('token').then((token) => 
          {  
                  let header = new Headers();
                  header.append('Content-Type',"application/json");
                  header.append('Authorization','Bearer '+token);
                  console.log(token);
                  return this.http.post(this.url+fn,JSON.stringify(data),{headers:header})
                                  .map(res=>res.json())
                                  .timeout(10000)
                                  .subscribe(response=> {

                      console.log(response);
                      resolve(response);

                  }, (err) => {
                    
                      console.log(err);
                      reject(err);
                  });
          });
          
        });
    }

    showInternetError() {

        let alert = this.alertCtrl.create({
          title: 'Error!',
          subTitle: "Internet Connection Not Available!",
          buttons: ['OK']
        });

        alert.present();
    }
    
    public catelougeList()
    {
          let header = new Headers();
          header.append('Content-Type','application/json');
          return this.http.get(this.url+"segment/list",{headers:header});
    }

    val:any={}; 

    public getSubSegmentList(code)
    {
        this.val={"segmentCode":code}
        let header = new Headers();
        header.append('Content-Type','application/json');
        return this.http.post(this.url+"subsegment/list",this.val,{headers:header});
    }
    
    public getProductList(val)
    {
        console.log(val);
        let header = new Headers();
        header.append('Content-Type', 'application/json');
        return this.http.post(this.url+"product/list", val,{headers:header});
    }


    public getProductDetail(prodId)
    {
          let header = new Headers();
          header.append('Content-Type','application/x-www-form-urlencoded');
          return this.http.get(this.url+'product/detail/'+prodId,{headers:header});
    }

    public getCategory()
    {

        let header = new Headers();
        header.append('Content-Type','application/x-www-form-urlencoded');
        return this.http.get(this.url+'category/list',{headers:header});
   
    }

    public getOemList()
    {
        let header = new Headers();
        header.append('Content-Type','application/x-www-form-urlencoded');
        return this.http.get(this.url+'oem/list',{headers:header});
    }
    
    
    public Login(data,fn)
    {

      return new Promise((resolve, reject) => {
        
        this.storage.get('token').then((token) => 
        {  
            let header = new Headers();
            header.append('Content-Type',"application/json");
            //   header.append('Authorization','Bearer '+token);
            console.log(token);
            return this.http.post(this.url+fn,JSON.stringify(data),{headers:header})
                            .map(res=>res.json())
                            .timeout(10000)
                            .subscribe(response=> {
              
                console.log(response);
                resolve(response);
              
            }, (err) => {
              
                  console.log(err);
                  
                  if(err.type == 2) {
                    
                    resolve(err);
                    
                  } else {
                    
                    reject(err); 
                  }
            });
        });

      });
    }
    
    public getData(data,fn)
    {
      console.log(data);
      console.log(fn)
         return new Promise((resolve, reject) => {
        
          this.storage.get('token').then((token) => 
          {  
                  let header = new Headers();
                  header.append('Content-Type',"application/json");
                  header.append('Authorization','Bearer '+token);
                  console.log(token);
                  return this.http.post(this.url+fn,JSON.stringify(data),{headers:header})
                                        .timeout(10000)
                                        .map(res=>res.json())
                                        .subscribe(response=> {

                        console.log(response);
                        resolve(response);

                  }, (err) => {
                    
                        console.log(err);
                        reject(err);
                  });
           });

         });
    }

    
    public getValue(data,fn)
    {
            return new Promise((resolve, reject) => {
            
            this.storage.get('token').then((token) => 
            {  
                  let header = new Headers();
                  header.append('Content-Type',"application/json");
                  header.append('Authorization','Bearer '+token);
                  console.log(token);
                  return this.http.get(this.url+fn+data,{headers:header})
                                    .timeout(10000)
                                    .map(res=>res.json())
                                    .subscribe(response=> {
                    console.log(response);
                    resolve(response);
                    
                  }, (err) => {
                      console.log(err);
                      reject(err);
                  });
            });
          });
    }
    
    
    setSession(token)
    {
      this.tokenData=token;
      console.log(this.tokenData);
    }
    
    getSession()
    {
      return this.storage.get('token');
    }
    
    showError(msg) {
      
      let alert = this.alertCtrl.create({
        title: 'Error!',
        subTitle: 'Please enter '+msg,
        buttons: ['OK']
      });
      
      alert.present();
    }
    
    public uploadFile(data,fn)
    {
        return new Promise((resolve, reject) => {
          
              this.storage.get('token').then((token) => 
              {  
                    let header = new Headers();
                    header.append('Content-Type',"application/json");
                    header.append('Authorization','Bearer '+token);
                    console.log(token);
                    return this.http.post(this.url+fn,data,{headers:header})
                                          .map(res=>res.json())
                                          .timeout(15000)
                                          .subscribe(response=> {

                          console.log(response);
                          resolve(response);

                    }, (err) => {

                          console.log(err);
                          reject(err);
                    });
              });
        });
    }
    
    
    
    onListSearchFilterCatalogue(items, searchFor, filterColNameArr) {
      
      const filterResultArr = items.filter(item => {
        
        let isMatchFound = false;
        for (let index = 0; index < filterColNameArr.length; index++) {
          
          const colName = filterColNameArr[index];
          
          if(item[colName] && item[colName] != null) {
            
            const colTempValue = (item[colName].toString()).toLowerCase();
            const isExist = colTempValue.indexOf(searchFor.toLowerCase()) != -1;
            
            if(isExist) {
              isMatchFound = true; 
            } 
          }
        }
        
        return isMatchFound;
      })
      
      return filterResultArr;
    }
    
    



    // public networConnectionPopUp()
    // {

    //   this.network.onConnect().subscribe(()=>{
    //     this.alertCtrl.create({
    //       message:'Network Connected',
    //       buttons: ['OK']
    //     }).present();
    //   });
    //   this.network.onDisconnect().subscribe(()=>{
    //     this.alertCtrl.create({
    //       message:'Network Not Connected',
    //       buttons: ['OK']
    //     }).present();
    //   });
    // }
    
  }
  