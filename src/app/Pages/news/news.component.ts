import { Component,OnInit }      from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { RouterModule } from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import { HttpService} from '../../services/http.service';

import { NewsModel} from "./../../models/news.model";
import { AllNewsModel} from "./../../models/allnews.model";

import {MainService} from "./../../services/main.service";
import { CheckboxModel } from '../../models/checkbox.model';
import { SearchNewsParamsModel } from '../../models/searchNewsParams.model';
import { Base64ImageModel } from '../../models/base64image.model';

@Component({
    moduleId:module.id,
    selector: "news",
    templateUrl: "./news.component.html",
    providers: [HttpService]
})

export class NewsComponent implements OnInit{
    News: NewsModel[];
    Category: string = "";
    Page: number=1;
    Pages: number[] = [];
    Images: string[] = [];
    IsLoading = true;
    Params: SearchNewsParamsModel = new SearchNewsParamsModel(0,null,null,null,null,null,null,null,null,null,null);
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
    Ncategory:CheckboxModel[]=[
        new CheckboxModel("Toutes","toutes",false),
        new CheckboxModel("Finance","finance",false),
        new CheckboxModel("Ecologique","ecologique",false),
        new CheckboxModel("Immobilier","immobilier",false),
        new CheckboxModel("Plaisir","plaisir",false)
    ]

    constructor(private router: Router,
        private mainService: MainService,
        private params: ActivatedRoute){}
    ngOnInit(){
        let category = this.params.params.forEach((params:Params) => {
            this.Subcategory=[
                new CheckboxModel("Classique","classique",false),
                new CheckboxModel("E-brooker","e_brooker",false),
                new CheckboxModel("Fintech","fintech",false),
                new CheckboxModel("Crowdfunding","crowdfunding",false),
                new CheckboxModel("Lendfunding","lendfunding",false),
                new CheckboxModel("Institutionnels","institutionnels",false)
            ];
            if(params["category"]){
                
                this.Params.sub_categories = [];
                this.Params.sub_categories.push(params["category"]);
                this.Subcategory = this.mainService.GetCheckboxesFromChecked(this.Params.sub_categories,this.Subcategory);
            }
            if(params["title"])
                this.Params.title = params["title"];
            if(params["description"])
                this.Params.description = params["description"];
            if(params["c_type"])
                this.Params.c_type = params["c_type"];
            if(params["ntype"])
                this.Params.ntype = params["ntype"];
            if(params["ncategory"])
                this.Params.ncategory = params["ncategory"];
            this.GetAllNews();
        });


    }

    GetAllNews(){
        window.scrollTo(0,0);
        this.Params.limit = 10;
        this.Params.offset = (this.Page - 1)*10;
        this.mainService.GetAllNews(this.Params)
            .subscribe((res:AllNewsModel)=>{
                this.News = res.news;
                for(let k in this.News){
                    if(this.News[k].title && this.News[k].title.length > 40){
                        this.News[k].title = this.News[k].title.slice(0,40) +"...";
                    }
                }
                let i = 0;
                this.Pages = [];
                while(i<res.total_count){
                    this.Pages.push(i/10+1);
                    i+=10;
                }
                if(this.Pages.length == 1)this.Pages = [];
                let total=0;
                let current = 0;
                for(let item of this.News){
                    total+=1;
                    if(item && item.image_id){
                        
                        this.mainService.GetImageById(item.image_id)
                            .subscribe((result:Base64ImageModel)=>{
                                this.Images[item.id] = result.base64;
                                current+=1;
                                if(total == current)this.IsLoading = false;
                            });
                    }
                    else {
                        this.Images[item.id]="images/demo/patrimoineLogo.png";
                        current+=1;
                        if(total == current)this.IsLoading = false;
                    }
                }
            });
    }

    
    OnSearchSubmit(){
        window.scrollTo(0,0);
        this.IsLoading = true;
        this.Page = 1;
        this.Params.expertises = this.mainService.GetCheckedCheckboxes(this.Expertises);
        this.Params.agrements = this.mainService.GetCheckedCheckboxes(this.Agreements);
        this.Params.sub_categories = this.mainService.GetCheckedCheckboxes(this.Subcategory);
        this.Params.ncategory = this.mainService.GetCheckedCheckboxes(this.Ncategory);

        if(this.Params.description)
            this.Params.description = this.Params.description.toLowerCase();
        if(this.Params.title)
            this.Params.title = this.Params.title.toLowerCase();
        if(this.Params.subtitle)
            this.Params.subtitle = this.Params.subtitle.toLowerCase();

        let url:string = this.router.url.substring(0,this.router.url.indexOf(";"));
        if(url)
            this.router.navigateByUrl(url);
        console.log(this.Params);
        this.GetAllNews();
    }
    ChangePageNumber(page:number){
        this.IsLoading = true;
        this.Page = page;
        this.GetAllNews();
    }
    PrevOrNextPage(next:boolean)
    {
        this.IsLoading = true;
        this.Page += next?1:-1;
        this.GetAllNews();
    }

}