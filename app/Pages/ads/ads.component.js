"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var AdsComponent = (function () {
    function AdsComponent() {
        this.Ads = [
            {
                Id: 1,
                Title: "Title1",
                Description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ullamcorper urna nec est eleifend, sed lacinia ex commodo. Aliquam ullamcorper vestibulum leo in lacinia. Sed auctor magna at orci tempus, at commodo erat imperdiet. Maecenas dignissim faucibus aliquam.",
                UserId: 1,
                SubCategory: "fintech",
                CreatedDate: new Date("2017-06-04T18:31:44.671Z")
            },
            {
                Id: 2,
                Title: "Title2",
                Description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ullamcorper urna nec est eleifend, sed lacinia ex commodo. Aliquam ullamcorper vestibulum leo in lacinia. Sed auctor magna at orci tempus, at commodo erat imperdiet. Maecenas dignissim faucibus aliquam.",
                UserId: 1,
                SubCategory: "fintech",
                CreatedDate: new Date("2017-06-04T18:31:44.671Z")
            },
            {
                Id: 3,
                Title: "Title3",
                Description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ullamcorper urna nec est eleifend, sed lacinia ex commodo. Aliquam ullamcorper vestibulum leo in lacinia. Sed auctor magna at orci tempus, at commodo erat imperdiet. Maecenas dignissim faucibus aliquam.",
                UserId: 1,
                SubCategory: "fintech",
                CreatedDate: new Date("2017-06-04T18:31:44.671Z")
            },
            {
                Id: 4,
                Title: "Title4",
                Description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ullamcorper urna nec est eleifend, sed lacinia ex commodo. Aliquam ullamcorper vestibulum leo in lacinia. Sed auctor magna at orci tempus, at commodo erat imperdiet. Maecenas dignissim faucibus aliquam.",
                UserId: 1,
                SubCategory: "fintech",
                CreatedDate: new Date("2017-06-04T18:31:44.671Z")
            },
            {
                Id: 5,
                Title: "Title5",
                Description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ullamcorper urna nec est eleifend, sed lacinia ex commodo. Aliquam ullamcorper vestibulum leo in lacinia. Sed auctor magna at orci tempus, at commodo erat imperdiet. Maecenas dignissim faucibus aliquam.",
                UserId: 1,
                SubCategory: "fintech",
                CreatedDate: new Date("2017-06-04T18:31:44.671Z")
            }
        ];
    }
    return AdsComponent;
}());
AdsComponent = __decorate([
    core_1.Component({
        selector: "ads",
        templateUrl: "app/Pages/ads/ads.component.html"
    })
], AdsComponent);
exports.AdsComponent = AdsComponent;
//# sourceMappingURL=ads.component.js.map