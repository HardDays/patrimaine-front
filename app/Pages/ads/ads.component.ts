import { Component,OnInit,NgModule }      from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { HttpService} from '../../services/http.service';

import {AdsModel,CheckboxModel} from './../index';
import {AllAdsModel} from './../../models/allads.model';
import {MainService} from "./../../services/main.service";
import { AllAdsModel } from '../../models/allads.model';

@Component({
    selector: "ads",
    templateUrl: "app/Pages/ads/ads.component.html",
    providers: [HttpService]
})

export class AdsComponent implements OnInit{
    Ads: AdsModel[];
    Category: string = "";
    /*ExpertisesCheckboxes: CheckboxModel[] = [
        new CheckboxModel("Credit","credit",false),
        new CheckboxModel("Retraite","retraite",false),
        new CheckboxModel("Placement","placement",false),
        new CheckboxModel("Allocation","allocation",false),
        new CheckboxModel("Epargne","epargne",false),
        new CheckboxModel("Investissement","investissement",false),
        new CheckboxModel("Defiscalisation","defiscalisation",false),
        new CheckboxModel("Immobilier","immobilier",false),
        new CheckboxModel("Assurance","assurance",false),
        new CheckboxModel("Investissement plaisir","investissement_plaisir",false)
    ];
    AgrementsCheckboxes: CheckboxModel[] = [
        new CheckboxModel("CJA","CJA",false),
        new CheckboxModel("CIF","CIF",false),
        new CheckboxModel("Courtier","Courtier",false),
        new CheckboxModel("IOSB","IOSB",false),
        new CheckboxModel("Carte_T","Carte_T",false)
    ];*/
    constructor(private router: Router,
        private mainService: MainService,
        private params: ActivatedRoute){}
    ngOnInit(){
        let category = this.params.params.forEach((params:Params) => {
            this.Category = params["category"]?params["category"]:"";
            this.mainService
                .GetAllAds({sub_category:this.Category})
                .subscribe((data: AllAdsModel) => {
                    this.Ads = data.ads;
                    console.log(this.Ads);
                });
        });


    }
    OnSelectAd(sel:AdsModel)
    {
        this.router.navigate(["ads",sel.id]);
    }
    SearchAdMyName(descr:string)
    {
        let params = {
            description:descr,
            sub_category:this.Category
        };
        this.mainService.GetAllAds({description:descr, sub_category:this.Category})
            .subscribe((data: AllAdsModel) => {
                this.Ads = data.ads;
                console.log(this.Ads);
            });
    }

}