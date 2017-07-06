import { Component,OnInit }      from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { HttpService} from '../../services/http.service';

import {AdsModel} from './../index';
import {MainService} from "./../../services/main.service";

@Component({
    selector: "ads",
    templateUrl: "app/Pages/ads/ads.component.html",
    providers: [HttpService]
})

export class AdsComponent implements OnInit{
    
    Ads: AdsModel[];

    constructor(private router: Router,
        private mainService: MainService){}
    ngOnInit(){
        this.mainService
            .GetAllAds("")
            .subscribe((data) => {this.Ads = data});
    }
    OnSelectAd(sel:AdsModel)
    {
        this.router.navigate(["ads",sel.id]);
    }
}