import { Component } from "@angular/core";

import {AdsModel} from './../index';

@Component({
    selector: "ads",
    templateUrl: "app/Pages/ads/ads.component.html"
})

export class AdsComponent{
    Ads: AdsModel[] = [
        {
        Id:1,
        Title: "Title1",
        Description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ullamcorper urna nec est eleifend, sed lacinia ex commodo. Aliquam ullamcorper vestibulum leo in lacinia. Sed auctor magna at orci tempus, at commodo erat imperdiet. Maecenas dignissim faucibus aliquam.",
        UserId: 1,
        SubCategory:"fintech",
        CreatedDate: new Date("2017-06-04T18:31:44.671Z")
    },
    {
        Id:2,
        Title: "Title2",
        Description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ullamcorper urna nec est eleifend, sed lacinia ex commodo. Aliquam ullamcorper vestibulum leo in lacinia. Sed auctor magna at orci tempus, at commodo erat imperdiet. Maecenas dignissim faucibus aliquam.",
        UserId: 1,
        SubCategory:"fintech",
        CreatedDate: new Date("2017-06-04T18:31:44.671Z")
    },
    {
        Id:3,
        Title: "Title3",
        Description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ullamcorper urna nec est eleifend, sed lacinia ex commodo. Aliquam ullamcorper vestibulum leo in lacinia. Sed auctor magna at orci tempus, at commodo erat imperdiet. Maecenas dignissim faucibus aliquam.",
        UserId: 1,
        SubCategory:"fintech",
        CreatedDate: new Date("2017-06-04T18:31:44.671Z")
    },
    {
        Id:4,
        Title: "Title4",
        Description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ullamcorper urna nec est eleifend, sed lacinia ex commodo. Aliquam ullamcorper vestibulum leo in lacinia. Sed auctor magna at orci tempus, at commodo erat imperdiet. Maecenas dignissim faucibus aliquam.",
        UserId: 1,
        SubCategory:"fintech",
        CreatedDate: new Date("2017-06-04T18:31:44.671Z")
    },
    {
        Id:5,
        Title: "Title5",
        Description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ullamcorper urna nec est eleifend, sed lacinia ex commodo. Aliquam ullamcorper vestibulum leo in lacinia. Sed auctor magna at orci tempus, at commodo erat imperdiet. Maecenas dignissim faucibus aliquam.",
        UserId: 1,
        SubCategory:"fintech",
        CreatedDate: new Date("2017-06-04T18:31:44.671Z")
    }
    ];

}