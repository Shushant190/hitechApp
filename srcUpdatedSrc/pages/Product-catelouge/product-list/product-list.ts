import { IonicPage, NavController, NavParams, LoadingController, App, Content } from 'ionic-angular';
import { ProductDetailPage } from '../product-detail/product-detail';
import { CatelougeProvider } from '../../../providers/catelouge/catelouge';
import { Storage } from '@ionic/storage';


import { Component,ViewChild,ElementRef,OnInit,NgZone  } from '@angular/core';


/**
 * Generated class for the ProductListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-product-list',
  templateUrl: 'product-list.html',
})
export class ProductListPage {

  @ViewChild(Content) content: Content;

  api:any;
  subSegCode:any;
  totRecords:any;
  products:any=[];
  catList:any=[];
  subSegment:any=[];
  totSeg:any;
  totSubSeg:any;
  oemList=Array();
  checkMe:any=false;
  // checkCat:any=false;
  // checkOem:any=false;
  tempProdList = Array();
  segVal: any;
  subSegVal: any;
  doc:any=[];
  doc1:any;

  filterArr:any=[];
  data:any = {};
  saveOriginalData:any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,public loadingCtrl:LoadingController, public serv: CatelougeProvider, public storage:Storage, public app:App,private zone: NgZone) {

      this.categoryList();
      this.getOemList();
      this.segVal = navParams.get('SegCode');
      this.subSegVal = navParams.get('subSegCode');
      this.subSegCode = {'segmentCode': this.segVal,'subSegmentCode':this.subSegVal};
      console.log(this.subSegCode);  

      this.productList(this.subSegCode, 1);

  }

  checkFilter:any;
  clearFilter(check){

    if(check=='Oem') {

        this.productList(this.subSegCode, 1);  
        for(let i=0;i<this.oemList.length;i++){
          this.oemList[i].checkOem=false;
          // console.log(this.checkOem);
        }  

    } else {

        this.productList(this.subSegCode, 1);
        for(let i=0;i<this.catList.length;i++){
          this.catList[i].checkCat=false;
          // console.log(this.checkCat);
        }
    }
   
  }
  check(checkFilter){
    console.log(checkFilter); 
   this.checkFilter=checkFilter;
  }


  doInfinite()
  {
    console.log(this.filterData);
    console.log(this.src);
  }

  filterData:any = [];
  src:any ; 
  productList(filterData, src)
  {

    this.filterData = filterData;
    this.src = src;
    console.log(filterData);
    console.log(src);

        // this.products = []; 

        // let loading = this.loadingCtrl.create({
        //     spinner:'hide',
        //     content:`<img src="assets/imgs/loader.png"  class="rotate h45"/>`,
        // });
        // loading.present();

        this.serv.getData(filterData,'product/list').then((resp)=>{

          // loading.dismiss();
          console.log(resp);
          this.totRecords = resp['recordsFound'];
          console.log(this.totRecords);
          console.log(this.filterArr);

          if(src == 1 && resp['data']) {
              this.products = resp['data'];  
          }

          if(src == 2) {

              if(this.filterArr.length == 1) {
                  this.products = [];
              }

              if(resp['data']) {

                  for (let index = 0; index < resp['data'].length; index++) {
                      
                      const productExistIndex = this.products.findIndex(productRow => productRow.productId === resp['data'][index].productId);

                      if(productExistIndex === -1) {
                        this.products = this.products.concat(resp['data'][index]);
                      }
                  }
              }
          }

          this.saveOriginalData = JSON.parse(JSON.stringify(this.products));

          console.log(this.products); 
          this.tempArr=this.products;
          console.log(this.tempArr);
        });
        // loading.present();
        this.api=this.serv.url+"download/document/"
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductListPage');
  }
  
  categoryList()
  {

      this.serv.getValue('',"category/list").then((result)=>{
        console.log(result);
        this.totSeg = result['recordsFound'];
        this.catList = result['data'];
      });
   
  }

  getOemList()
  {    
   
    this.serv.getValue('','oem/list').then((res)=>{
      console.log(res);
      this.oemList=res['data'];
    
    });    
  }


  tempCval:any;
  tempArr=Array();
  FilterProd(type,action,code,index)
  {
      var data={};
      if(type=='category')
      {
          this.tempCval=code;
          console.log(action);
          data={'segmentCode': this.segVal,'subSegmentCode':this.subSegVal,"categoryCode":code};
          if(action==true)
          {
            this.filterArr.push(data);
            this.productList(data, 2);
            
          }

          if(action==false)
          {


              const findOccurrenceArr = this.filterArr.filter(productRow => {
                  return (productRow.segmentCode==this.segVal && productRow.subSegmentCode==this.subSegVal && productRow.categoryCode==code);
              });

              for (let index = 0; index < this.filterArr.length; index++) {
                  
                    if(this.filterArr.segmentCode==this.segVal && this.filterArr.subSegmentCode==this.subSegVal && this.filterArr.categoryCode==code) {
                          this.filterArr.splice(index, 1);
                          break;
                    }
              }

              if(findOccurrenceArr && findOccurrenceArr.length === 1) {

                  this.products = this.products.filter(productRow => {
                        return !(productRow.segmentCode==this.segVal && productRow.subSegmentCode==this.subSegVal && productRow.categoryCode==code);
                  });
              }

              console.log(this.products);
                
              console.log("thanku");
          } 

        //  this.checkCat = false;
      }

      if(type=='Oem')
      {
            data={'segmentCode': this.segVal,'subSegmentCode':this.subSegVal,"oemCode":code};
            console.log(data);
            
            if(action==true)
            {
              this.filterArr.push(data);
              this.productList(data, 2);
              console.log(this.products);
            }
            
            if(action==false)
            {

                const findOccurrenceArr = this.filterArr.filter(productRow => {
                    return (productRow.segmentCode==this.segVal && productRow.subSegmentCode==this.subSegVal && productRow.oemCode==code);
                });

                console.log(findOccurrenceArr);

                console.log(this.filterArr);

                for (let index = 0; index < this.filterArr.length; index++) {

                      if(this.filterArr.segmentCode==this.segVal && this.filterArr.subSegmentCode==this.subSegVal && this.filterArr.oemCode==code) {
                            this.filterArr.splice(index, 1);
                            break;
                      }
                }

                console.log(this.filterArr);

                if(findOccurrenceArr && findOccurrenceArr.length === 1) {

                    this.products = this.products.filter(productRow => {
                        return !(productRow.segmentCode==this.segVal && productRow.subSegmentCode==this.subSegVal && productRow.oemCode==code);
                    });
                }

                console.log(this.products);
                console.log("thanku");
            } 
    }


      if(this.filterArr.length === 0) {
          this.productList(this.subSegCode, 1);
      }
  }


  doRefresh(event)
  {
        this.data.search = '';
        this.productList(this.subSegCode, 1);

        setTimeout(() => {
              console.log('Async operation has ended');
              event.complete();
        }, 2000);
  }


  onSearchChangeHanlder() {

    setTimeout(() => {

       if(this.data.search) {

            const filterColumnArr = ['productName', 'partNumber', 'mrp'];

            this.products =  this.serv.onListSearchFilterCatalogue(this.saveOriginalData, this.data.search, filterColumnArr);

       } else {

           this.products = JSON.parse(JSON.stringify(this.saveOriginalData));
       }
      
    }, 500);
  }

  onClearSearchHandler() {   
   
      setTimeout(() => {

          if(!this.data.search) {

              let loading = this.loadingCtrl.create({
                  spinner:'hide',
                  content:`<img src="assets/imgs/loader.png"  class="rotate h45"/>`,
              });

              loading.present();

              this.products = JSON.parse(JSON.stringify(this.saveOriginalData));

              setTimeout(() => {  
                  loading.dismiss(); 
              }, 500);
          }
        
      }, 500);
  }


  productDetail(id){

    // this.data.search = '';
    // this.onClearSearchHandler();

    this.navCtrl.push(ProductDetailPage,{id:id});
  }

  g_view:boolean=false;

  changeView()
  {
    console.log("change view");  
    this.g_view = !this.g_view;
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

    if((activeView == 'HomePage' || activeView == 'CatelougeListPage' || activeView == 'ContactPage' || activeView == 'EnquiryFormPage') && (previuosView != 'HomePage' && previuosView != 'CatelougeListPage'  && previuosView != 'ContactPage' && previuosView != 'EnquiryFormPage')) {

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
