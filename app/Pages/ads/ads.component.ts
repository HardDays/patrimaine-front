import { Component,OnInit,NgModule }      from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { HttpService} from '../../services/http.service';

import {AdsModel,CheckboxModel} from './../index';
import {AllAdsModel} from './../../models/allads.model';
import {MainService} from "./../../services/main.service";

@Component({
    selector: "ads",
    templateUrl: "app/Pages/ads/ads.component.html",
    providers: [HttpService]
})

export class AdsComponent implements OnInit{
    Ads: AdsModel[];
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
        private mainService: MainService){}
    ngOnInit(){
        this.mainService
            .GetAllAds("")
            .then(result => this.Ads = result);
    }
    OnSelectAd(sel:AdsModel)
    {
        this.router.navigate(["ads",sel.id]);
    }
    SearchAdMyName(name:string)
    {
        this.mainService.GetAllAds(name)
            .then(result=> this.Ads = result);
    }

}