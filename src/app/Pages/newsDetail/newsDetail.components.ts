import { Component,OnInit }      from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import {Subscription} from 'rxjs/Subscription';
import { HttpService} from '../../services/http.service';

import {MainService} from "./../../services/main.service";
import { UserModel } from '../../models/user.model';
import { NewsModel } from '../../models/news.model';
import { Base64ImageModel } from '../../models/base64image.model';
import { CheckboxModel } from '../../models/checkbox.model';

@Component({
    moduleId:module.id,
    selector: "newsDetail",
    templateUrl: "./newsDetail.component.html",
    providers: [HttpService]

})

export class NewsDetailComponent implements OnInit{
    News : NewsModel = new NewsModel(null,"","",null,null,null,null,null,null,null,null,null,null,null,null,null,null);
    Image:string = "";
    IsLoading = true;
    ExpertisesCB: CheckboxModel[] = [
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
    AgreementsCB:CheckboxModel[]=[
        new CheckboxModel("CJA","CJA",false),
        new CheckboxModel("CIF","CIF",false),
        new CheckboxModel("Courtier","Courtier",false),
        new CheckboxModel("IOSB","IOSB",false),
        new CheckboxModel("Carte-T","Carte_T",false)
    ];
    SubcategoryCB:CheckboxModel[]=[
        new CheckboxModel("Classique","classique",false),
        new CheckboxModel("E-brooker","e_brooker",false),
        new CheckboxModel("Fintech","fintech",false),
        new CheckboxModel("Crowdfunding","crowdfunding",false),
        new CheckboxModel("Lendfunding","lendfunding",false),
        new CheckboxModel("Institutionnels","institutionnels",false)
    ];
    NcategoryCB:CheckboxModel[]=[
        new CheckboxModel("Finance","finance",false),
        new CheckboxModel("Ecologique","ecologique",false),
        new CheckboxModel("Immobilier","immobilier",false),
        new CheckboxModel("Plaisir","plaisir",false)
    ]
    Agreements:string[] = [];
    Expertises:string[] = [];
    SubCategory: string[] = [];
    Ncategory:string[] = [];
    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private service: MainService)
    {
        this.service.ChangePage('news_detail');
    }


    ngOnInit() {
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.
        this.IsLoading = true;
        this.activatedRoute.params.forEach((params:Params) => {
            window.scrollTo(0,0);
            let newsId = params["id"];
            this.service.GetNewsById(newsId)
                .subscribe((data) => {
                    this.News = data;

                    this.Agreements = this.service.GetCheckboxNamesFromCheckboxModel(this.News.agrements,this.AgreementsCB);
                    this.Expertises = this.service.GetCheckboxNamesFromCheckboxModel(this.News.expertises,this.ExpertisesCB);
                    this.SubCategory = this.service.GetCheckboxNamesFromCheckboxModel([this.News.sub_category],this.SubcategoryCB);
                    this.Ncategory = this.service.GetCheckboxNamesFromCheckboxModel([this.News.ncategory],this.NcategoryCB);
                    if(this.News.image_id){
                        this.service.GetImageById(this.News.image_id)
                            .subscribe((res:Base64ImageModel)=>{
                                this.Image = res.base64?res.base64:"images/demo/patrimoineLogo.png";
                                 this.IsLoading = false;
                            });
                    }
                    else{
                        this.Image = "images/demo/patrimoineLogo.png";
                        this.IsLoading = false;
                    }
                });
        });
        
    }
}

