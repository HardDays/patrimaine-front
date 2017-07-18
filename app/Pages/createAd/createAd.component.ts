import { Component,OnInit }      from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import {Subscription} from 'rxjs/Subscription';
import { HttpService} from '../../services/http.service';

import { UserModel, AdsModel} from "./../index";

import {MainService} from "./../../services/main.service";

@Component({
    moduleId: module.id,
    selector: "createad",
    templateUrl: "./createAd.component.html",
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

    OncreateAdButtonClick(title:string,description:string){
        this.service.CreateAd(title,description)
            .subscribe((result:AdsModel)=>{
                console.log("Result of creation: " + JSON.stringify(result));
                this.router.navigate(['ads',result.id]);
            });
            /*.then(result =>{
                this.service.GetAllAds(description,"")
                    .then((result:AdsModel[])=>{
                        this.router.navigate(["ads",result[0].id]);
                    });
            });*/
    }
}