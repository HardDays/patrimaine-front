import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpService} from '../../services/http.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MainService } from '../../services/main.service';
import { FormsModule } from '@angular/forms';
import { NewsModel } from '../../models/news.model';
import { AdsModel } from '../../models/ads.model';
import { AllNewsModel } from '../../models/allnews.model';
import { AllAdsModel } from '../../models/allads.model';
import { UserModel } from '../../models/user.model';
import { Base64ImageModel } from '../../models/base64image.model';
import { CheckboxModel } from '../../models/checkbox.model';
import { ReviewModel } from '../../models/review.model';

@Component({
    moduleId:module.id,
    selector: "index",
    templateUrl: "./index.component.html"
})

export class IndexComponent implements OnInit{
    isLoading = true;
    lastAnnonces:NewsModel[] = [];
    premiumAnnonces:NewsModel[] = [];
    offresAds:AdsModel[] = [];
    images:string[] = [];
    Reviews:ReviewModel[] = [];
    review:ReviewModel = new ReviewModel();
    Access:string[]=[];
    Ncategory:CheckboxModel[]=[
        new CheckboxModel("Finance","finance",false),
        new CheckboxModel("Ecologique","ecologique",false),
        new CheckboxModel("Immobilier","immobilier",false),
        new CheckboxModel("Plaisir","plaisir",false)
    ];
    Subcategory:CheckboxModel[]=[
        new CheckboxModel("Classique","classique",false),
        new CheckboxModel("E-brooker","e_brooker",false),
        new CheckboxModel("Fintech","fintech",false),
        new CheckboxModel("Crowdfunding","crowdfunding",false),
        new CheckboxModel("Lendfunding","lendfunding",false),
        new CheckboxModel("Institutionnels","institutionnels",false)
    ];
    search={
        title:"",
        description:"",
        c_type:"",
        subcategory:"",
        ntype:""
    }
    constructor(private router: Router,
        private mainService: MainService,
        private params: ActivatedRoute){
            this.mainService.ChangePage('index');
        }
    ngOnInit(){
        this.isLoading = true;
        if(this.mainService.IsLogedIn()){
            this.mainService.GetMyAccess()
            .subscribe((result:string[])=>{
                this.Access = [];
                for(let i of result){
                    this.Access[i] = true;
                }
            });
        }
        this.mainService.onAuthChange$.subscribe((bool:boolean)=>{
            if(!bool)
                this.Access = [];
            else{
                this.mainService.GetMyAccess()
                .subscribe((result:string[])=>{
                    this.Access = [];
                    for(let i of result){
                        this.Access[i] = true;
                    }
                });
            }
        })
        this.mainService.GetAllNews({limit:3})
            .subscribe((resLast:AllNewsModel)=>{
                this.lastAnnonces = resLast.news;
                for(let i in this.lastAnnonces)
                {
                    if(this.lastAnnonces[i].description.length > 101){
                        let desc = this.lastAnnonces[i].description.slice(0,98);
                        let index = desc.lastIndexOf(" ");
                        this.lastAnnonces[i].description = (index>0?desc.slice(0,index):desc) + "...";
                    }
                    if(this.lastAnnonces[i].title.length > 53)
                    {
                        let title = this.offresAds[i].title.slice(0,50);
                        let index = title.lastIndexOf(" ");
                        this.lastAnnonces[i].title = (index>0?title.slice(0,index):title) + "...";
                    }
                    this.lastAnnonces[i].ncategory = this.mainService.GetCheckboxNamesFromCheckboxModel([this.lastAnnonces[i].ncategory],this.Ncategory)[0];
                }

                
                this.mainService.GetAllReviews(null)
                    .subscribe((reviews:ReviewModel[])=>{
                        this.Reviews = reviews;
                        this.review = this.Reviews[0];
                    });
                this.mainService.GetAllNews({limit:3,ntype:['premium']})
                    .subscribe((resPrem:AllNewsModel)=>{
                        this.premiumAnnonces = resPrem.news;
                        for(let i in this.premiumAnnonces)
                        {
                            if(this.premiumAnnonces[i].description.length > 101){
                                let desc = this.premiumAnnonces[i].description.slice(0,98);
                                let index = desc.lastIndexOf(" ");
                                this.premiumAnnonces[i].description = (index>0?desc.slice(0,index):desc) + "...";
                            }
                            if(this.premiumAnnonces[i].title.length > 53)
                            {
                                let title = this.premiumAnnonces[i].title.slice(0,50);
                                let index = title.lastIndexOf(" ");
                                this.premiumAnnonces[i].title = (index>0?title.slice(0,index):title) + "...";
                            }

                            this.premiumAnnonces[i].ncategory = this.mainService.GetCheckboxNamesFromCheckboxModel([this.premiumAnnonces[i].ncategory],this.Ncategory)[0];
                        }
                        this.mainService.GetAllAds({limit:4})
                            .subscribe((resAds:AllAdsModel)=>{
                                this.offresAds = resAds.ads;
                                let current = 0;
                                for(let i in this.offresAds)
                                {
                                    if(this.offresAds[i].description.length > 101){
                                        let desc = this.offresAds[i].description.slice(0,98);
                                        let index = desc.lastIndexOf(" ");
                                        this.offresAds[i].description = (index>0?desc.slice(0,index):desc)+"...";
                                    }
                                    if(this.offresAds[i].title.length > 17)
                                    {
                                        let title = this.offresAds[i].title.slice(0,16);
                                        let index = title.lastIndexOf(" ");
                                        this.offresAds[i].title = (index>0?title.slice(0,index):title) + "...";
                                    }
                                    this.offresAds[i].sub_category = this.mainService.GetCheckboxNamesFromCheckboxModel([this.offresAds[i].sub_category],this.Subcategory)[0];
                                    this.mainService.GetUserById(this.offresAds[i].user_id)
                                        .subscribe((resUser:UserModel)=>{
                                            if(resUser.company && resUser.company.image_id){
                                                this.mainService.GetImageById(resUser.company.image_id)
                                                    .subscribe((res:Base64ImageModel)=>{
                                                        this.images[this.offresAds[i].user_id] = res.base64?res.base64:"images/demo/patrimoineLogo.png";
                                                        current += 1;
                                                        if(current == 4){ 
                                                            this.isLoading = false;
                                                            scrollTo(0,0);
                                                        }
                                                    });
                                            }
                                            else{
                                                this.images[this.offresAds[i].user_id] = "images/demo/patrimoineLogo.png";
                                                current += 1;
                                                if(current == 4){ 
                                                    this.isLoading = false;
                                                    scrollTo(0,0);
                                                }
                                            }
                                        })
                                }
                            });
                    });
            });
     }
    SearchAnnonces()
    {
        this.mainService.ChangePage('news');
        this.router.navigate(['news_list',this.search]);
    }
}