import { Component,OnInit }      from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import {Subscription} from 'rxjs/Subscription';
import { HttpService} from '../../services/http.service';

import {MainService} from "./../../services/main.service";
import { AllNewsModel } from '../../models/allnews.model';
import { UserModel } from '../../models/user.model';
import { NewsModel } from '../../models/news.model';

@Component({
    moduleId:module.id,
    selector: "myNews",
    templateUrl: "./myNews.component.html",
    providers: [HttpService]
})

export class MyNewsComponent implements OnInit{
    User : UserModel = new UserModel(null,"","","","",null,null,null,null,null);
    myNews:NewsModel[];
    IsLoading = true;
    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private service: MainService)
    {
        this.service.ChangePage('my_news');
    }
    ngOnInit() {
        this.activatedRoute.params.forEach((params:Params) => {
            this.service.GetMe()
                .subscribe((data:UserModel) => {
                    if(data.id){
                        this.User = data;
                        // TODO: create getting my news
                        this.service.GetAllNews({user_id:data.id})
                            .subscribe((result:AllNewsModel)=>{
                                
                                this.myNews = result.news;
                                for(let k in this.myNews ){
                                    if(this.myNews[k].title && this.myNews[k].title.length > 40){
                                        this.myNews[k].title = this.myNews[k].title.slice(0,40) +"...";
                                    }
                                }
                                this.IsLoading = false;
                                
                            });
                    }
                });
        });
        
    }
    OnDeleteAd(ad: NewsModel){
        this.service.DeleteNews(ad.id)
            .subscribe(result =>{
                this.service.GetAllNews({user_id:this.User.id})
                    .subscribe((result:AllNewsModel)=>{this.myNews = result.news;});
            });
    }

    OnEditAd(ad : NewsModel){
        this.router.navigate(['edit_news',ad.id]);
    }
}