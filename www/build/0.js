webpackJsonp([0],{

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

/***/ 1023:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ImageDocumentsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__visiting_card_iages_visiting_card_iages__ = __webpack_require__(1021);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_popover_popover__ = __webpack_require__(54);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ImageDocumentsPage = /** @class */ (function () {
    function ImageDocumentsPage(navCtrl, navParams, popoverCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.popoverCtrl = popoverCtrl;
    }
    ImageDocumentsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ImageDocumentsPage');
    };
    ImageDocumentsPage.prototype.visitingCardImage = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__visiting_card_iages_visiting_card_iages__["a" /* VisitingCardIagesPage */]);
    };
    ImageDocumentsPage.prototype.presentPopover = function (myEvent) {
        var popover = this.popoverCtrl.create(__WEBPACK_IMPORTED_MODULE_3__components_popover_popover__["a" /* PopoverComponent */]);
        popover.present({
            ev: myEvent
        });
        popover.onDidDismiss(function (popoverData) {
            console.log(popoverData);
        });
    };
    ImageDocumentsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-image-documents',template:/*ion-inline-start:"E:\LATESTKENSIA\kensianApp\kenshin_app\src\pages\Sales-User\distribution-network\image-documents\image-documents.html"*/'<ion-header class="catalogue-header">\n	<ion-navbar>\n		<ion-title>Pawan Sharma / Documents</ion-title>\n		<!-- <ion-buttons end class="login-btn">\n			<button ion-button>\n			 </button>\n		</ion-buttons> -->\n		<ion-buttons end class="login-btn" (click)="presentPopover($event)">\n				<button ion-button>\n					<img class="w4 h16" src="assets/icons/more-option-ic.svg" alt="">\n				</button>\n			</ion-buttons>\n	</ion-navbar>\n</ion-header>\n\n<ion-content padding>\n	\n	<p class="heading-text mb0">Upload Documents</p>\n	\n	<ion-list class="sales-seltion-field m0">\n		<ion-item>\n			<ion-label>Title</ion-label>\n			<ion-select>\n				<ion-option value="f">Visiting Card</ion-option>\n				<ion-option value="m">Visiting Card</ion-option>\n			</ion-select>\n		</ion-item>\n		<ion-item style="display: none;"></ion-item>\n	</ion-list>\n	\n	<div class="heading-text mt16 mb5">\n		<h2 class="font16">Upload Picture</h2>\n	</div>\n	\n	<div class="img-uplode">\n		<ul>\n			<li>\n				<div class="outer">\n					<div class="innear">\n						<img src="assets/img/pens.svg" alt="">\n					</div>\n				</div>\n			</li>\n			<li class="add-img">\n				<label>\n					<input type="file" style="display: none;" multiple>\n					<div class="outer">\n						<div class="innear">\n							<i class="material-icons upload-ic">add</i>\n						</div>\n					</div>\n				</label>\n			</li>\n		</ul>\n	</div>\n	\n	<div class="cs-btn border-none m32 mr0 right-btn">\n		<button ion-button class="pr30" color="secondary" round>SAVE</button>\n	</div>\n\n	<div class="img-and-text" (click)="visitingCardImage()">\n		<div class="outer">\n			<div class="innear">\n				<img src="assets/imgs/visiting-card.png" alt="">\n				<div class="subject">Visiting Card</div>\n			</div>\n		</div>\n	</div>\n	\n</ion-content>\n'/*ion-inline-end:"E:\LATESTKENSIA\kensianApp\kenshin_app\src\pages\Sales-User\distribution-network\image-documents\image-documents.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* PopoverController */]])
    ], ImageDocumentsPage);
    return ImageDocumentsPage;
}());

//# sourceMappingURL=image-documents.js.map

/***/ }),

/***/ 963:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ImageDocumentsPageModule", function() { return ImageDocumentsPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__image_documents__ = __webpack_require__(1023);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ImageDocumentsPageModule = /** @class */ (function () {
    function ImageDocumentsPageModule() {
    }
    ImageDocumentsPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__image_documents__["a" /* ImageDocumentsPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__image_documents__["a" /* ImageDocumentsPage */]),
            ],
        })
    ], ImageDocumentsPageModule);
    return ImageDocumentsPageModule;
}());

//# sourceMappingURL=image-documents.module.js.map

/***/ })

});
//# sourceMappingURL=0.js.map