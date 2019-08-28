import { Component,ViewChild ,NgZone, Testability} from '@angular/core';
import { Platform, Content, Nav, App,Loading, ToastController,Tabs, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Events } from 'ionic-angular'
import { TabsPage } from '../pages/Product-catelouge/tabs/tabs';
import {Storage} from '@ionic/storage';
// import { SessionProvider } from '../providers/session/session';
import { CatelougeProvider } from '../providers/catelouge/catelouge';
import { SalesTabsPage } from '../pages/Sales-User/sales-tabs/sales-tabs';
import { SalesHomePage } from '../pages/Sales-User/sales-home/sales-home';
import { AddLeadPage } from '../pages/Sales-User/add-lead/add-lead';
import { CreatOrderPage } from '../pages/Sales-User/order/creat-order/creat-order';
import { AddTaskPage } from '../pages/Sales-User/task/add-task/add-task';
import { DvrAddPage } from '../pages/Sales-User/dvr/dvr-add/dvr-add';
import { AddFollowupPage } from '../pages/Sales-User/add-followup/add-followup';
import { AddToCartPage } from '../pages/Sales-User/add-to-cart/add-to-cart';
import { Network } from '@ionic-native/network';
import { NoInternetPage } from '../pages/Sales-User/no-internet/no-internet';
import { CatelougeListPage } from '../pages/Product-catelouge/catelouge-list/catelouge-list';
import { ContactPage } from '../pages/Product-catelouge/contact/contact';
import { EnquiryFormPage } from '../pages/Product-catelouge/enquiry-form/enquiry-form';
// import { NavController } from 'ionic-angular/navigation/nav-controller';
import { BackgroundGeolocation, BackgroundGeolocationConfig, BackgroundGeolocationEvents,BackgroundGeolocationResponse } from '@ionic-native/background-geolocation';
import { HomePage } from '../pages/Product-catelouge/home/home';


@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    versionNumber:any;
    rootPage:any;
    loading:Loading;
    status:any;
    @ViewChild(Nav) nav:Nav;
    @ViewChild('SalesTabsPage') tabref:Tabs;
    tab1Root = SalesHomePage;
    tab2Root = CatelougeListPage;
    tab3Root = ContactPage;
    tab4Root = EnquiryFormPage;
    network_status:any;
    networkType:any;
    
    isReloadActive:any;
    isInternetMsgDivShow:any;
    isConnectionAvailable:any = false;
    
    constructor(public alertMsg:AlertController ,public zone: NgZone, public network:Network ,public events:Events,public toastCtrl:ToastController,public app:App,public platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,private storage:Storage,public service:CatelougeProvider,public backgroundGeolocation: BackgroundGeolocation) {

        platform.ready().then(() => {

            statusBar.styleDefault();
            statusBar.backgroundColorByHexString('#c43657');  
            splashScreen.hide();
            
            this.networkType = this.network.type; 
            console.log(this.networkType);
            this.network.onConnect().subscribe(data => {

                console.log(data);
                this.network_status = data.type;
                this.isInternetMsgDivShow = true;
                this.displayNetworkUpdate(data.type);

            }, error => console.error(error));
            
            
            this.network.onDisconnect().subscribe(data => {

                    console.log(data);
                    this.network_status = data.type;
                    this.isInternetMsgDivShow = true;
                    this.displayNetworkUpdate(data.type); 

            }, error => console.error(error));
            

            if(this.networkType != "none")
            {
                this.isReloadActive=false;
                this.isInternetMsgDivShow = false;
                this.isConnectionAvailable = true;

                this.storage.get('token').then((token) => 
                {
                    console.log(typeof(token));
                    console.log(token);
                    
                    if(token!='')
                    {
                        this.storage.get('user').then((userData) =>
                        {
                            console.log(userData);
                            
                            if(!userData) {
                                userData = [];
                            }
                            
                            const expirationTime = userData['expirationTime'];
                            const currentTime = new Date().getTime();
                            
                            console.log(expirationTime, currentTime);
                            
                            if(!expirationTime || currentTime > expirationTime) {

                                this.storage.remove('token');
                                this.storage.remove('user');
                                this.storage.remove('userId');
                                this.storage.remove('userType');
                                this.storage.remove('role');
                                this.storage.remove('userType');
                                this.storage.remove('segments');
                                console.log("tabpages");
                                this.rootPage=TabsPage;
                                
                            } else {
                                this.rootPage=SalesTabsPage;
                            }
                        });

                    } else {

                        console.log("tabpages");
                        this.rootPage=TabsPage;
                    }

                });

            } else {

                this.isReloadActive = true;
                this.isInternetMsgDivShow = true;
                this.isConnectionAvailable = false;
                this.rootPage = NoInternetPage;
            }
            
        });
        
        
        // ======================================================BACK BUTTON CODE==================== //
        
        platform.registerBackButtonAction(() => {

            const overlayView = this.app._appRoot._overlayPortal._views[0];
            
            if (overlayView && overlayView.dismiss) {
                overlayView.dismiss();
                return;
            }
            
            let view = this.nav.getActive();
            
            let nav = this.app.getActiveNavs()[0];
            let activeView;
            
            if(view.component.name == 'SalesTabsPage' || view.component.name == 'TabsPage') {

                activeView = nav.getActive(); 
                console.log('1st');
                console.log(nav.canGoBack());
                
            } else {

                console.log('2nd');
                activeView = view.component;
                console.log(nav.getActive());
            }
            
            console.log(view.component.name);
            console.log(activeView.name);
            console.log(nav.canGoBack());
            setTimeout(() => {

                if( activeView.name == 'SalesHomePage' ||  activeView.name == 'HomePage' ) //last page 
                {   
                    if(this.service.backButton==0) 
                    {
                        console.log('hello2');
                        this.service.backButton=1;
                        
                        let toast = this.toastCtrl.create(
                        {
                            message: 'Press again to exit!',
                            duration: 2000
                        });

                        toast.present();

                        setTimeout(() => 
                        {
                            this.service.backButton=0;

                        },2500);

                    } else {

                        console.log('hello1');
                        this.platform.exitApp();
                    }

                } else if(nav.canGoBack()) {

                    console.log('ok');
                    nav.pop();

                }  else if(activeView.name == 'DistributionNetworkListPage' || activeView.name == 'OrderListPage' || activeView.name == 'SalesMenuPage'  || activeView.name == 'CatelougeListPage' ||activeView.name == 'ContactPage' ||activeView.name == 'EnquiryFormPage' )  
                {
                    nav.parent.select(0);

                } else if(activeView.name == 'AddLeadPage' || activeView.name == 'CreatOrderPage' || activeView.name == 'AddTaskPage'  || activeView.name == 'DvrAddPage' || activeView.name == 'CreatFolowupPage'  )  
                {
                    this.nav.setRoot(SalesTabsPage);
                }

                else if(activeView.name == AddToCartPage) 
                {
                    this.nav.setRoot(SalesTabsPage);
                }
            }, 500);
        });
        this.events.subscribe('data',(user,time)=>{
            if(user == 1)
            {
                console.log("this is testing data");
                this.nav.setRoot(TabsPage);
            }
        })
    }


        // =============================== network update ========= //
    

        displayNetworkUpdate(connectionState: string) {

                  this.networkType = this.network.type;

                  console.log("You are now ", connectionState,"via ",this.networkType);

                  console.log(this.isReloadActive);

                  if(connectionState == "offline")
                  {

                        this.zone.run(() => {
                            this.isConnectionAvailable = false;
                        });

                  } else {

                        this.zone.run(() => {
                             this.isConnectionAvailable = true;
                        });

                        setTimeout(() => {
                            this.isInternetMsgDivShow = false;
                        }, 2000);

                        if(this.isReloadActive==true)
                        {
                              console.log("Reload True");

                              this.storage.get('token').then((token) => 
                              { 

                                     console.log(token);
                                     this.isReloadActive = false;
                                     if(token != '' && token) {
                                        console.log('saleshomepage');
                                          this.nav.setRoot(SalesHomePage);
                                     } else {
                                          console.log('homepage');
                                          this.nav.setRoot(HomePage);
                                     }
                              })

                        } else {

                              console.log('Reload False');
                        }
                  }
        }


        dbVersion:any;

        async getAppName()
        {
                this.service.CallStaticVersion({},"appFile.php").then(async (r)=>{

                    console.log(r);
                    // console.log(r.version);
                    this.dbVersion = r['version'];
                    if( this.versionNumber< this.dbVersion)
                    {
                        alert("AppVersion Is Small");
                    }
                    else{
                        alert("db Version Is Small");
                    }
               });
        }

 }    