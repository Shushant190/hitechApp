webpackJsonp([10],{

/***/ 1021:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VisitingCardIagesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_popover_popover__ = __webpack_require__(54);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var VisitingCardIagesPage = /** @class */ (function () {
    function VisitingCardIagesPage(navCtrl, navParams, popoverCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.popoverCtrl = popoverCtrl;
    }
    VisitingCardIagesPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad VisitingCardIagesPage');
    };
    VisitingCardIagesPage.prototype.presentPopover = function (myEvent) {
        var popover = this.popoverCtrl.create(__WEBPACK_IMPORTED_MODULE_2__components_popover_popover__["a" /* PopoverComponent */]);
        popover.present({
            ev: myEvent
        });
        popover.onDidDismiss(function (popoverData) {
            console.log(popoverData);
        });
    };
    VisitingCardIagesPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-visiting-card-iages',template:/*ion-inline-start:"E:\LATESTKENSIA\kensianApp\kenshin_app\src\pages\Sales-User\distribution-network\visiting-card-iages\visiting-card-iages.html"*/'<ion-header class="catalogue-header">\n	<ion-navbar>\n		<ion-title>Documents</ion-title>\n		<!-- <ion-buttons end class="login-btn">\n			<button ion-button>\n			 </button>\n		</ion-buttons> -->\n		<ion-buttons end class="login-btn" (click)="presentPopover($event)">\n			<button ion-button>\n				<img class="w4 h16" src="assets/icons/more-option-ic.svg" alt="">\n			</button>\n		</ion-buttons>\n	</ion-navbar>\n</ion-header>\n\n<ion-content>\n	\n	<div class="camera-btn mb0">\n		<div class="outer">\n			<div class="innear">\n				<img src="assets/icons/camera-btn.svg" alt="">\n			</div>\n		</div>\n	</div>\n	\n	<div class="cs-heading dflex">\n		<p class="subject">VISITING CARD</p>\n		<p class="date">22.09.2016</p>\n	</div>\n	\n	<div class="vertical-img multiple-img">\n		<ul>\n			<li><img src="assets/imgs/home-img.png" alt=""></li>\n			<li><img src="assets/imgs/home-img.png" alt=""></li>\n			<li><img src="assets/imgs/slider-1.png" alt=""></li>\n			<li><img src="assets/imgs/visiting-card.png" alt=""></li>\n			<li><img src="assets/imgs/slider-1.png" alt=""></li>\n			<li><img src="assets/imgs/home-img.png" alt=""></li>\n			<li><img src="assets/imgs/visiting-card.png" alt=""></li>\n			<li><img src="assets/imgs/slider-1.png" alt=""></li>\n			<li><img src="assets/imgs/home-img.png" alt=""></li>\n			<li><img src="assets/imgs/home-img.png" alt=""></li>\n			<li><img src="assets/imgs/slider-1.png" alt=""></li>\n			<li><img src="assets/imgs/home-img.png" alt=""></li>\n			<li><img src="assets/imgs/home-img.png" alt=""></li>\n			<li><img src="assets/imgs/slider-1.png" alt=""></li>\n			<li><img src="assets/imgs/home-img.png" alt=""></li>\n		</ul>\n	</div>\n	\n</ion-content>\n'/*ion-inline-end:"E:\LATESTKENSIA\kensianApp\kenshin_app\src\pages\Sales-User\distribution-network\visiting-card-iages\visiting-card-iages.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* PopoverController */]])
    ], VisitingCardIagesPage);
    return VisitingCardIagesPage;
}());

//# sourceMappingURL=visiting-card-iages.js.map

/***/ }),

/***/ 966:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VisitingCardIagesPageModule", function() { return VisitingCardIagesPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__visiting_card_iages__ = __webpack_require__(1021);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var VisitingCardIagesPageModule = /** @class */ (function () {
    function VisitingCardIagesPageModule() {
    }
    VisitingCardIagesPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__visiting_card_iages__["a" /* VisitingCardIagesPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__visiting_card_iages__["a" /* VisitingCardIagesPage */]),
            ],
        })
    ], VisitingCardIagesPageModule);
    return VisitingCardIagesPageModule;
}());

//# sourceMappingURL=visiting-card-iages.module.js.map

/***/ })

});
//# sourceMappingURL=10.js.map