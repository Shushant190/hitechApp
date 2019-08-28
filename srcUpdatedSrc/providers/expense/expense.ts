import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { AlertController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ImagePicker } from '@ionic-native/image-picker';

/*
Generated class for the ExpenseProvider provider.

See https://angular.io/guide/dependency-injection for more info on providers
and Angular DI.
*/
@Injectable()
export class ExpenseProvider {
    
    expenseCartObj = {};
    public cameraImage : String
    
    constructor(public http: Http,
        public alertCtrl: AlertController,
        public loadingCtrl:LoadingController,
        public storage: Storage,
        public _CAMERA : Camera, 
        public imagePicker: ImagePicker) {
            
            console.log('Hello ExpenseProvider Provider');
        }
        
        
        public addToCart(expenseArr, expenseType) {
            
            if(!this.expenseCartObj[expenseType]) {
                this.expenseCartObj[expenseType] = [];
            }
            
            this.expenseCartObj[expenseType].push(expenseArr);
            this.setCartStorageData();
            
            return this.expenseCartObj;
        }
        
        
        public cartDropItem(expenseType, itemIndex) {
            
            this.expenseCartObj[expenseType].splice(itemIndex, 1);
            this.setCartStorageData();
            
            return this.expenseCartObj; 
        }
        
        public setCartStorageData() {
            
            console.log(this.expenseCartObj);
            this.storage.set('cartStorage', this.expenseCartObj);
        }
        
        public emptyCartStorageData() {
            
            this.expenseCartObj = {};
            this.setCartStorageData();
            
            console.log(this.expenseCartObj);
        }
        
        
        takePhotograph() {

            return new Promise(resolve => {

                this._CAMERA.getPicture(
                    {
                        destinationType : this._CAMERA.DestinationType.DATA_URL,
                    })
                    .then((data) =>
                    {
                        this.cameraImage  = "data:image/jpeg;base64," + data;
                        resolve(this.cameraImage);
                    });
            });
        }
                
                
        selectPhotograph(maxCount) {

           return new Promise(resolve => {
                
                let options = {
                    maximumImagesCount: maxCount,
                    quality: 100
                }

                        console.log('You Accept Permission');

                        setTimeout(() => {
 
                            this.imagePicker.getPictures(options).then((data)=>{
                                console.log(data);
                                resolve(data);
                            }); 
                            
                        }, 500);

                
            });
        }
        
                    
    }
                