import { Component,OnInit,NgModule }      from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { HttpService} from '../../services/http.service';

import {AllAdsModel} from './../../models/allads.model';
import {MainService} from "./../../services/main.service";
import { SearchUserParamsModel } from '../../models/searchUserParams.model';
import { SearchAdsParamsModel } from '../../models/searchAdsParams.model';
import { AdsModel } from '../../models/ads.model';
import { CheckboxModel } from '../../models/checkbox.model';

@Component({
    moduleId:module.id,
    selector: "ads",
    templateUrl: "./ads.component.html",
    providers: [HttpService]
})

export class AdsComponent implements OnInit{
    AdsObservable: AdsModel[];
    Category: string = "";
    Page: number=1;
    Pages: number[] = [];
    Images: string[] = [];
    IsLoading = true;
    Params: SearchAdsParamsModel = new SearchAdsParamsModel(0,null,null,null,null,null,null,null,null);
    Expertises: CheckboxModel[] = [
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
    Agreements:CheckboxModel[]=[
        new CheckboxModel("CJA","CJA",false),
        new CheckboxModel("CIF","CIF",false),
        new CheckboxModel("Courtier","Courtier",false),
        new CheckboxModel("IOSB","IOSB",false),
        new CheckboxModel("Carte-T","Carte_T",false)
    ];
    Subcategory:CheckboxModel[]=[
        new CheckboxModel("Classique","classique",false),
        new CheckboxModel("E-brooker","e_brooker",false),
        new CheckboxModel("Fintech","fintech",false),
        new CheckboxModel("Crowdfunding","crowdfunding",false),
        new CheckboxModel("Lendfunding","lendfunding",false),
        new CheckboxModel("Institutionnels","institutionnels",false)
    ];

    constructor(private router: Router,
        private mainService: MainService,
        private params: ActivatedRoute){}
    ngOnInit(){
        let category = this.params.params.forEach((params:Params) => {
            if(params["category"]){
                this.Params.sub_categories = [];
                this.Params.sub_categories.push(params["category"]);
                this.Subcategory = this.mainService.GetCheckboxesFromChecked(this.Params.sub_categories,this.Subcategory);
            }
            this.GetAllAds();
        });


    }

    GetAllAds(){
        window.scrollTo(0,0);
        this.Params.limit = 10;
        this.Params.offset = (this.Page - 1)*10;
        this.mainService.GetAllAds(this.Params)
            .subscribe((res:AllAdsModel)=>{
                this.AdsObservable = res.ads;
                for(let k in this.AdsObservable){
                    if(this.AdsObservable[k].title && this.AdsObservable[k].title.length > 40){
                        this.AdsObservable[k].title = this.AdsObservable[k].title.slice(0,40) +"...";
                    }
                }
                let i = 0;
                this.Pages = [];
                while(i<res.total_count){
                    this.Pages.push(i/10+1);
                    i+=10;
                }
                if(this.Pages.length == 1)this.Pages = [];
                this.IsLoading = false;
            });
    }

    
    OnSearchSubmit(){
        window.scrollTo(0,0);
        this.IsLoading = true;
        this.Page = 1;
        this.Params.expertises = this.mainService.GetCheckedCheckboxes(this.Expertises);
        this.Params.agrements = this.mainService.GetCheckedCheckboxes(this.Agreements);
        this.Params.sub_categories = this.mainService.GetCheckedCheckboxes(this.Subcategory);
        if(this.Params.address)
            this.Params.address = this.Params.address.toLowerCase();
        if(this.Params.description)
            this.Params.description = this.Params.description.toLowerCase();
        if(this.Params.title)
            this.Params.title = this.Params.title.toLowerCase();
        console.log(this.Params);
        this.GetAllAds();
    }
    ChangePageNumber(page:number){
        this.IsLoading = true;
        this.Page = page;
        this.GetAllAds();
    }
    PrevOrNextPage(next:boolean)
    {
        this.IsLoading = true;
        this.Page += next?1:-1;
        this.GetAllAds();
    }

}