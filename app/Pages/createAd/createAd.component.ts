import { Component,OnInit }      from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import {Subscription} from 'rxjs/Subscription';
import { HttpService} from '../../services/http.service';

import { UserModel, AdsModel} from "./../index";

import {MainService} from "./../../services/main.service";

@Component({
    selector: "createAd",
    templateUrl: "app/Pages/createAD/createAd.component.html",
    providers: [HttpService]
})

export class CreateAdComponent implements OnInit{
    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private service: MainService)
    {
    }

    ngOnInit() {
    }

    OnCreateAdButtonClick(title:string,description:string){
        this.service.CreateAd(title,description)
            .then(result =>{
                this.service.GetAllAds(description,"")
                    .then((result:AdsModel[])=>{
                        this.router.navigate(["ads",result[0].id]);
                    });
            });
    }
}