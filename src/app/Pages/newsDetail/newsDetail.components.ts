import { Component,OnInit }      from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import {Subscription} from 'rxjs/Subscription';
import { HttpService} from '../../services/http.service';

import {MainService} from "./../../services/main.service";
import { UserModel } from '../../models/user.model';
import { NewsModel } from '../../models/news.model';
import { Base64ImageModel } from '../../models/base64image.model';

@Component({
    moduleId:module.id,
    selector: "newsDetail",
    templateUrl: "./newsDetail.component.html",
    providers: [HttpService]

})

export class NewsDetailComponent implements OnInit{
    News : NewsModel = new NewsModel(null,"","",null,null,null,null,null,null,null,null);
    Author: UserModel = new UserModel(null,"","","","",null,null,null,null,null);
    Image:string = "";
    IsLoading = true;
    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private service: MainService)
    {
    }


    ngOnInit() {
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.
        this.IsLoading = true;
        this.activatedRoute.params.forEach((params:Params) => {
            let newsId = params["id"];
            this.service
                .GetNewsById(newsId)
                .subscribe((data:NewsModel) => {
                    this.News = data;
                    let isAuthorLoaded = false;
                    let isImageLoaded = false;
                    if(this.News.user_id){
                        this.service.GetUserById(this.News.user_id)
                            .subscribe((user:UserModel)=>{
                                this.Author = user;
                                isAuthorLoaded = true;
                                if(isImageLoaded)
                                    this.IsLoading = false;
                            });
                    }

                    if(this.News.image_id){
                        this.service.GetImageById(this.News.image_id)
                            .subscribe((res:Base64ImageModel)=>{
                                this.Image = res.base64;
                                isImageLoaded = true;
                                if(isAuthorLoaded)
                                    this.IsLoading = false;
                            });
                    }
                    else{
                        this.Image = "images/demo/patrimoineLogo.png";
                        isImageLoaded = true;
                        if(isAuthorLoaded)
                            this.IsLoading = false;
                    }
                });
        });
        
    }
}

