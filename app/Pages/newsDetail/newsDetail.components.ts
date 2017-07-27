import { Component,OnInit }      from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import {Subscription} from 'rxjs/Subscription';
import { HttpService} from '../../services/http.service';


import {NewsModel} from './../index';
import {MainService} from "./../../services/main.service";
import { UserModel } from '../../models/user.model';

@Component({
    selector: "newsDetail",
    templateUrl: "app/Pages/newsDetail/newsDetail.component.html",
    providers: [HttpService]

})

export class NewsDetailComponent implements OnInit{
    News : NewsModel = new NewsModel(null,"","",null,null,null);
    Author: UserModel = new UserModel(null,"","","","",null,null,null);
    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private service: MainService)
    {
        
    }


    ngOnInit() {
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.
        this.activatedRoute.params.forEach((params:Params) => {
            let newsId = params["id"];
            this.service
                .GetNewsById(newsId)
                .subscribe((data:NewsModel) => {
                    this.News = data;
                    if(this.News.user_id){
                        this.service.GetUserById(this.News.user_id)
                            .subscribe((user:UserModel)=>{
                                this.Author = user;
                            });
                    }
                });
        });
        /*this.activatedRoute.params.forEach((params: Params)=>{
            let id = params["id"];
            this.service
                .getAdsById(id)
                .then(result => this.Ads = result);
        });*/
        
    }
}

