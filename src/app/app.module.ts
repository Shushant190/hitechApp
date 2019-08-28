import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import "materialize-css";
import { MaterializeModule } from 'angular2-materialize';
import { StatusBar } from '@ionic-native/status-bar';
import { SocialSharing } from '@ionic-native/social-sharing';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AboutPage } from '../pages/Product-catelouge/about/about';
import { ContactPage } from '../pages/Product-catelouge/contact/contact';
import { HomePage } from '../pages/Product-catelouge/home/home';
import { CatelougeListPage } from '../pages/Product-catelouge/catelouge-list/catelouge-list';
import { EnquiryFormPage } from '../pages/Product-catelouge/enquiry-form/enquiry-form';
import { SearchPage } from '../pages/Product-catelouge/search/search';
import { NewArrivalListPage } from '../pages/Product-catelouge/new-arrival-list/new-arrival-list';
import { SubCategoryListPage } from '../pages/Product-catelouge/sub-category-list/sub-category-list';
import { ProductListPage } from '../pages/Product-catelouge/product-list/product-list';
import { ProductDetailPage } from '../pages/Product-catelouge/product-detail/product-detail';
import { CatelougeProvider } from '../providers/catelouge/catelouge';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';
import { SalesTabsPage } from '../pages/Sales-User/sales-tabs/sales-tabs';
import { TabsPage } from '../pages/Product-catelouge/tabs/tabs';
import { SalesLoginPage } from '../pages/Sales-User/sales-login/sales-login';
import { SalesOtpPage } from '../pages/Sales-User/sales-otp/sales-otp';
import { SalesHomePage } from '../pages/Sales-User/sales-home/sales-home';
import { DistActivitiesListPage } from '../pages/Sales-User/distribution-network/dist-activities-list/dist-activities-list';
import { AddLeadPage } from '../pages/Sales-User/add-lead/add-lead';
import { DistributionNetworkListPage } from '../pages/Sales-User/distribution-network/distribution-network-list/distribution-network-list';
import { OrderListPage } from '../pages/Sales-User/order/order-list/order-list';
import { SalesMenuPage } from '../pages/Sales-User/sales-menu/sales-menu';
import { CreatFolowupPage } from '../pages/Sales-User/creat-folowup/creat-folowup';
import { LeadDetailPage } from '../pages/Sales-User/leads/lead-detail/lead-detail';
import { DistributionNetworkDetailPage } from '../pages/Sales-User/distribution-network/distribution-network-detail/distribution-network-detail';
import { LeadpopoverComponent } from '../components/leadpopover/leadpopover';
import { LeaddetailpopoverComponent } from '../components/leaddetailpopover/leaddetailpopover';
import { CallLogsListPage } from '../pages/Sales-User/leads/call-logs-list/call-logs-list';
import { TodayFolowupPage } from '../pages/Sales-User/today-folowup/today-folowup';
import { TasklistPage } from '../pages/Sales-User/task/tasklist/tasklist';
import { TaskdetailPage } from '../pages/Sales-User/task/taskdetail/taskdetail';
import { IonicSelectableModule } from 'ionic-selectable';
import { PopoverComponent } from '../components/popover/popover';
import { ActivityagainstPage } from '../pages/Sales-User/activityagainst/activityagainst';
import { OrderDetailPage } from '../pages/Sales-User/order/order-detail/order-detail';
import { AnnouncementPage } from '../pages/Sales-User/announcement/announcement';
import { TravelPlanListPage } from '../pages/Sales-User/travel-plan-list/travel-plan-list';
import { TravelPlanDetailPage } from '../pages/Sales-User/travel-plan-detail/travel-plan-detail';
import { EditModelPage } from '../pages/Sales-User/edit-model/edit-model';
import { ProductPage } from '../pages/Sales-User/product/product';
import { DetailProductPage } from '../pages/Sales-User/detail-product/detail-product';
import { LeadlistPageModule } from '../pages/Sales-User/leads/leadlist/leadlist.module';
import { AdddistributorPageModule } from '../pages/Sales-User/adddistributor/adddistributor.module';
import { SchemePopupPageModule } from '../pages/Sales-User/scheme-popup/scheme-popup.module';
import { OrderDetailModelPageModule } from '../pages/Sales-User/order-detail-model/order-detail-model.module';
import { AddToCartPage } from '../pages/Sales-User/add-to-cart/add-to-cart';
import { AnnouncementModelPage } from '../pages/Sales-User/announcement-model/announcement-model';
import { AddTaskPageModule } from '../pages/Sales-User/task/add-task/add-task.module';
import { TasktypePopoverComponent } from '../components/tasktype-popover/tasktype-popover';
import { LeaveListPage } from '../pages/Sales-User/leave-list/leave-list';
import { HolidayLitPage } from '../pages/Sales-User/holiday-lit/holiday-lit';
import { LeaveRuleDetailPage } from '../pages/Sales-User/leave-rule-detail/leave-rule-detail';
import { LeaveDetailPage } from '../pages/Sales-User/leave-detail/leave-detail';
import { AddLeavePage } from '../pages/Sales-User/add-leave/add-leave';
import { FollowupDetailPage } from '../pages/Sales-User/followup-detail/followup-detail';
import { AddFollowupPage } from '../pages/Sales-User/add-followup/add-followup';
import { DvrListPage } from '../pages/Sales-User/dvr/dvr-list/dvr-list';
import { DvrAddPage } from '../pages/Sales-User/dvr/dvr-add/dvr-add';
import { AddConcernPage } from '../pages/Sales-User/concern/add-concern/add-concern';
import { DvrDetailPage } from '../pages/Sales-User/dvr/dvr-detail/dvr-detail';
import { UserprofilePage } from '../pages/Sales-User/userprofile/userprofile';
import { CreatOrderPage } from '../pages/Sales-User/order/creat-order/creat-order';
import { OrderProvider } from '../providers/order/order';

import { MyFilterPipe } from './pipes/my-filter.pipe';
import { KeysPipe } from './pipes/my-filter-key.pipe';
import { CategoryActionPophoverComponent } from '../components/category-action-pophover/category-action-pophover';
import { OrderStatusPophoverComponent } from '../components/order-status-pophover/order-status-pophover';
import { DistributorDetailPophoverComponent } from '../components/distributor-detail-pophover/distributor-detail-pophover';
import { DistributorConcernListPage } from '../pages/Sales-User/distribution-network/distributor-concern-list/distributor-concern-list';
import { DistributorImageEndDocumentListPage } from '../pages/Sales-User/distribution-network/distributor-image-end-document-list/distributor-image-end-document-list';
import { DistributorOrderListPage } from '../pages/Sales-User/distribution-network/distributor-order-list/distributor-order-list';
import { DistributorPopEndGiftListPage } from '../pages/Sales-User/distribution-network/distributor-pop-end-gift-list/distributor-pop-end-gift-list';

import "materialize-css";
import { RemarkUpdatePage } from '../pages/Sales-User/task/remark-update/remark-update';
import { NetworkDetailPopoverPage } from '../components/network-detail-popover/network-detail-popover';
import { NetwrokTabDataPage } from '../pages/Sales-User/distribution-network/netwrok-tab-data/netwrok-tab-data';
import { AddTravelPlanPage } from '../pages/Sales-User/add-travel-plan/add-travel-plan';
import { TravelMonthPage } from '../pages/Sales-User/travel-month/travel-month';
import { OtherAddressModalPage } from '../pages/Sales-User/other-address-modal/other-address-modal';
import { TravelDetailModalPage } from '../pages/Sales-User/travel-detail-modal/travel-detail-modal';

import { SchemeListPage } from '../pages/Sales-User/scheme-list/scheme-list';
import { SchemeDetailPage } from '../pages/Sales-User/scheme-detail/scheme-detail';

import { Network} from '@ionic-native/network';
import { NoInternetPage } from '../pages/Sales-User/no-internet/no-internet';
import { AppVersion } from '@ionic-native/app-version';
import { TravelpopoverComponent } from '../components/travelpopover/travelpopover';

import { AddExpensePage } from '../pages/Sales-User/expense/add-expense/add-expense';
import { ExpensesListsPage } from '../pages/Sales-User/expense/expenses-lists/expenses-lists';
import { ExpensesDetailsPage } from '../pages/Sales-User/expense/expenses-details/expenses-details';
import { OutstationAddExpPage } from '../pages/Sales-User/expense/outstation-add-exp/outstation-add-exp';
import { PromotionAddExpPage } from '../pages/Sales-User/expense/promotion-add-exp/promotion-add-exp';
import { MiscAddExpPage } from '../pages/Sales-User/expense/misc-add-exp/misc-add-exp';
import { LocalconvanceAddExpPage } from '../pages/Sales-User/expense/localconvance-add-exp/localconvance-add-exp';
import { OutstationAddListPage } from '../pages/Sales-User/expense/outstation-add-list/outstation-add-list';
import { ExpenseProvider } from '../providers/expense/expense';


import { Camera } from '@ionic-native/camera';
import { FileTransfer } from '@ionic-native/file-transfer';
import { ImagePicker } from '@ionic-native/image-picker';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { Diagnostic } from '@ionic-native/diagnostic';
import { Base64 } from '@ionic-native/base64';
import { ExpensePopoverComponent } from '../components/expense-popover/expense-popover';
import { ConcernpopupPage } from '../components/concernpopup/concernpopup';
import { ListConcernPage } from '../pages/Sales-User/concern/list-concern/list-concern';
import { DetailConcernPage } from '../pages/Sales-User/concern/detail-concern/detail-concern';
import { ConcernDetailModelPage } from '../pages/Sales-User/concern/concern-detail-model/concern-detail-model';
import { LeavePopoverComponent } from '../components/leave-popover/leave-popover';
import { BackgroundGeolocation, BackgroundGeolocationConfig, BackgroundGeolocationResponse } from '@ionic-native/background-geolocation';
import { Geolocation } from '@ionic-native/geolocation';
// import { AppVersion } from '@ionic-native/app-version';
import { AppUpdate } from '@ionic-native/app-update';

@NgModule({
  declarations: [
    
    MyApp,
    AboutPage,
    HomePage,
    ContactPage,
    LeaveRuleDetailPage,
    CatelougeListPage,
    EnquiryFormPage,
    NewArrivalListPage,
    DistActivitiesListPage,
    SearchPage,
    AddConcernPage,
    SubCategoryListPage,
    ProductListPage,
    UserprofilePage,
    ProductDetailPage,
    SalesLoginPage,
    SalesOtpPage,
    SalesTabsPage,
    TabsPage,
    SalesHomePage,
    AddLeadPage,
    DistributionNetworkListPage,
    OrderListPage,
    SalesMenuPage,
    CreatFolowupPage,
    LeadDetailPage,
    DistributionNetworkDetailPage,
    LeadpopoverComponent,
    LeaddetailpopoverComponent,
    CallLogsListPage,
    TodayFolowupPage,
    TasklistPage,
    TaskdetailPage,
    CreatOrderPage,
    PopoverComponent,
    ActivityagainstPage,
    OrderDetailPage,
    AnnouncementPage,
    TravelPlanListPage,
    TravelPlanDetailPage,
    EditModelPage,
    ProductPage,
    DetailProductPage,
    AddToCartPage,
    AnnouncementModelPage,
    TasktypePopoverComponent,
    LeaveListPage,
    HolidayLitPage,
    LeaveDetailPage,
    FollowupDetailPage,
    AddFollowupPage,
    AddLeavePage,
    DvrListPage,
    DvrAddPage,
    DvrDetailPage,
    UserprofilePage,
    MyFilterPipe,
    CategoryActionPophoverComponent,
    OrderStatusPophoverComponent,
    DistributorDetailPophoverComponent,
    DistributorOrderListPage,
    DistributorConcernListPage,
    DistributorPopEndGiftListPage,
    DistributorImageEndDocumentListPage,
    RemarkUpdatePage,
    NetworkDetailPopoverPage,
    NetwrokTabDataPage,
    AddTravelPlanPage,
    TravelMonthPage,
    OtherAddressModalPage,
    TravelDetailModalPage,
    SchemeListPage,
    SchemeDetailPage,
    NoInternetPage,
    TravelpopoverComponent,
    ExpensePopoverComponent,
    ConcernpopupPage,
    AddExpensePage,
    ExpensesListsPage,
    ExpensesDetailsPage,
    OutstationAddExpPage,
    PromotionAddExpPage,
    MiscAddExpPage,
    LocalconvanceAddExpPage,
    OutstationAddListPage,
    ListConcernPage,
    DetailConcernPage,
    ConcernDetailModelPage,
    LeavePopoverComponent

  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicStorageModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    MaterializeModule,
    IonicSelectableModule,
    LeadlistPageModule,
    AdddistributorPageModule,
    SchemePopupPageModule,
    OrderDetailModelPageModule,
    AddTaskPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    HomePage,
    UserprofilePage,
    TabsPage,
    CatelougeListPage,
    EnquiryFormPage,
    ContactPage,
    AddConcernPage,
    NewArrivalListPage,
    SearchPage,
    SubCategoryListPage,
    ProductListPage,
    ProductDetailPage,
    SalesLoginPage,
    SalesOtpPage,
    SalesTabsPage,
    SalesHomePage,
    AddLeadPage,
    DistActivitiesListPage,
    DistributionNetworkListPage,
    OrderListPage,
    SalesMenuPage,
    CreatFolowupPage,
    LeaveRuleDetailPage,
    LeadDetailPage,
    DistributionNetworkDetailPage,
    LeadpopoverComponent,
    LeaddetailpopoverComponent,
    ExpensePopoverComponent,
    ConcernpopupPage,
    PopoverComponent,
    CallLogsListPage,
    TodayFolowupPage,
    TasklistPage,
    TaskdetailPage,
    CreatOrderPage,
    ActivityagainstPage,
    OrderDetailPage,
    AnnouncementPage,
    TravelPlanListPage,
    TravelPlanDetailPage,
    EditModelPage,
    ProductPage,
    DetailProductPage,
    AddToCartPage,
    AnnouncementModelPage,
    TasktypePopoverComponent,
    LeaveListPage,
    HolidayLitPage,LeaveDetailPage,
    AddLeavePage,
    FollowupDetailPage,
    AddFollowupPage,
    DvrAddPage,
    DvrDetailPage,
    DvrListPage,
    CategoryActionPophoverComponent,
    OrderStatusPophoverComponent,
    DistributorDetailPophoverComponent,
    DistributorOrderListPage,
    DistributorConcernListPage,
    DistributorPopEndGiftListPage,
    DistributorImageEndDocumentListPage,
    RemarkUpdatePage,
    NetworkDetailPopoverPage,
    NetwrokTabDataPage,
    AddTravelPlanPage,
    TravelMonthPage,
    OtherAddressModalPage ,
    SchemeDetailPage,
    SchemeListPage,
    NoInternetPage,
    TravelDetailModalPage,
    TravelpopoverComponent,
    AddExpensePage,
    ExpensesListsPage,
    ExpensesDetailsPage,
    OutstationAddExpPage,
    PromotionAddExpPage,
    MiscAddExpPage,
    LocalconvanceAddExpPage,
    OutstationAddListPage,
    ListConcernPage,
    DetailConcernPage,
    ConcernDetailModelPage,
    LeavePopoverComponent
  ],
  providers: [
    StatusBar,
    SocialSharing,
    SplashScreen,
    Camera,
    FileTransfer,
    ImagePicker,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CatelougeProvider,
    OrderProvider,
    ExpenseProvider,
    AndroidPermissions,
    Diagnostic,
    Base64,
    Network,
    AppVersion,
    Geolocation,
    BackgroundGeolocation,
    AppUpdate
  ]
})
export class AppModule {}
