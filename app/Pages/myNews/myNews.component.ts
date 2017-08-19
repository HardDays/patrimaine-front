import { Component,OnInit }      from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import {Subscription} from 'rxjs/Subscription';
import { HttpService} from '../../services/http.service';

import {MainService} from "./../../services/main.service";
import { UserModel, NewsModel } from "../index";
import { AllNewsModel } from '../../models/allnews.model';

@Component({
    selector: "myNews",
    templateUrl: "app/Pages/myAds/myAds.component.html",
    providers: [HttpService]
})

export class MyNewsComponent implements OnInit{
    User : UserModel = new UserModel(null,"","","","",null,null,null);
    myNews:NewsModel[];
    IsLoading = true;
    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private service: MainService)
    {
    }
    ngOnInit() {
        this.activatedRoute.params.forEach((params:Params) => {
            this.service.GetMe()
                .subscribe((data:UserModel) => {
                    if(data.id){
                        this.User = data;
                        console.log(this.User);
                        // TODO: create getting my news
                        this.service.GetAllNews({user_id:data.id})
                            .subscribe((result:NewsModel[])=>{
                                this.myNews = result;
                                this.IsLoading = false;
                            });
                    }
                });
        });
        
    }
    OnDeleteAd(ad: NewsModel){
        console.log(ad);
        this.service.DeleteNews(ad.id)
            .subscribe(result =>{
                this.service.GetAllNews({user_id:this.User.id})
                    .subscribe((result:AllNewsModel)=>{this.myNews = result.news;});
            });
    }
}