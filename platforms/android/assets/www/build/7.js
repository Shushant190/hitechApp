webpackJsonp([7],{

/***/ 1026:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LocalconvencAddListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the LocalconvencAddListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var LocalconvencAddListPage = /** @class */ (function () {
    function LocalconvencAddListPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    LocalconvencAddListPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad LocalconvencAddListPage');
    };
    LocalconvencAddListPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-localconvenc-add-list',template:/*ion-inline-start:"/var/www/html/kenshin_data/kenshin_app/src/pages/Sales-User/expense/localconvenc-add-list/localconvenc-add-list.html"*/'<!--\n  Generated template for the LocalconvencAddListPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header class="catalogue-header">\n\n  <ion-navbar>\n    <ion-title>Local Convence List</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n    <div class="padding16">\n      <div class="list">\n        <div class="box complete">\n          <div class="heading">\n            <div class="order-content">\n              <p class="grey-clr">12-July-2019</p>\n            </div>\n            \n            <div class="wp100 dflex">\n              <h1>₹ 30000</h1>\n            </div>\n          </div>\n          \n          <div class="description pt6">\n            <div class="content-flex center-align">\n              <a class="cust-name">Delhi</a>\n            </div>\n            <div class="content-flex center-align">\n                <a class="cust-name">Faridabad</a>\n              </div>\n          </div>\n          \n          <div class="figure-outer mb6 mt16">\n            <div class="figure-innear dflex white-bg">\n              <div class="cs-figure">\n                <p style="white-space: nowrap;">Type Of Mode</p>\n                <p class="black-clr">Self Vechicle</p>\n              </div>\n              <div class="cs-figure border-left">\n                <p>Mode Of Travel</p>\n                <p class="black-clr">Car</p>\n              </div>\n              <div class="cs-figure border-left">\n                  <p>Vechicle No</p>\n                  <p class="black-clr">HR 26 AH 8687</p>\n                </div>\n            </div>\n            <div class="figure-innear dflex white-bg">\n                <div class="cs-figure">\n                  <p style="white-space: nowrap;">KMS Covered</p>\n                  <p class="black-clr">35 km</p>\n                </div>\n                <div class="cs-figure border-left">\n                  <p>Other Exp.</p>\n                  <p class="black-clr"> &#x20B9; 3000</p>\n                </div>\n              </div>\n            <div class="figure-innear dflex white-bg">\n              <div class="cs-figure">\n                <p>Remark</p>\n                <p class="black-clr">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae deserunt consequatur itaque?</p>\n              </div>\n              \n            </div>\n          </div> \n        </div>\n        \n      </div>\n      \n      <div class="cs-file-multiple mt15">\n        <ul>\n          <li>\n            <label>\n              <img src="assets/imgs/4.jpg">\n              <a  class="close"><i class="material-icons">delete_sweep</i></a>\n            </label>\n          </li>\n          <li>\n            <label>\n              <img src="assets/imgs/5.jpg">\n              <a  class="close"><i class="material-icons">delete_sweep</i></a>\n            </label>\n          </li>\n          <li>\n            <label>\n              <img src="assets/imgs/4.jpg">\n              <a  class="close"><i class="material-icons">delete_sweep</i></a>\n            </label>\n          </li>\n          <li>\n            <div class="cs-file wp100">\n              <label>\n                <input type="file"  style="display:none;" multiple>\n                <i class="material-icons add-file-icon" >add</i>\n              </label>\n            </div>\n          </li>\n        </ul>\n      </div>\n      \n      \n      <div class="sm-table">\n        <table>\n          <tr>\n            <th class="text-right">Local Travel Expense.</th>\n            <th class="w30 text-center">:</th>\n            <td class="w100 text-right">&#x20B9; 2000</td>\n          </tr>\n          <tr>\n            <th class="text-right">Other Type Expense</th>\n            <th class="text-center">:</th>\n            <td class="text-right">&#x20B9; 2000</td>\n          </tr>\n          <tr>\n            <th class="text-right">Total</th>\n            <th class="text-center">:</th>\n            <td class="text-right">&#x20B9; 2000</td>\n          </tr>\n        </table>\n      </div>\n    </div>\n  </ion-content>\n  \n  \n  <ion-footer padding>\n    <div class="cs-btn border-none  text-right">\n      <button ion-button color="secondary" round>Save as draft</button>\n      <button ion-button color="secondary" round>Save for approvel</button>\n    </div>\n  </ion-footer>\n'/*ion-inline-end:"/var/www/html/kenshin_data/kenshin_app/src/pages/Sales-User/expense/localconvenc-add-list/localconvenc-add-list.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* NavParams */]])
    ], LocalconvencAddListPage);
    return LocalconvencAddListPage;
}());

//# sourceMappingURL=localconvenc-add-list.js.map

/***/ }),

/***/ 982:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LocalconvencAddListPageModule", function() { return LocalconvencAddListPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__localconvenc_add_list__ = __webpack_require__(1026);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var LocalconvencAddListPageModule = /** @class */ (function () {
    function LocalconvencAddListPageModule() {
    }
    LocalconvencAddListPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__localconvenc_add_list__["a" /* LocalconvencAddListPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__localconvenc_add_list__["a" /* LocalconvencAddListPage */]),
            ],
        })
    ], LocalconvencAddListPageModule);
    return LocalconvencAddListPageModule;
}());

//# sourceMappingURL=localconvenc-add-list.module.js.map

/***/ })

});
//# sourceMappingURL=7.js.map