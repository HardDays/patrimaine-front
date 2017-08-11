import { Component,OnInit }      from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { RouterModule } from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import { HttpService} from '../../services/http.service';

import { NewsModel} from "./../../models/news.model";
import { AllNewsModel} from "./../../models/allnews.model";

import {MainService} from "./../../services/main.service";

@Component({
    selector: "news",
    templateUrl: "app/Pages/news/news.component.html",
    providers: [HttpService]
})

export class NewsComponent implements OnInit{
    News: NewsModel[];
    Category: string = "";
    Page: number;
    IsLoading = true;
    constructor(private router: Router,
        private service: MainService,
        private params: ActivatedRoute){}

    ngOnInit(){

        this.service.GetAllNews({})
            .subscribe((data)=>{
                console.log("All news ctrl");
                console.log(data);
                this.News = data;
                this.IsLoading = false;
            });
        /*this.params.params.forEach((params:Params) => {
            this.Category = params["category"]?params["category"]:"";
            this.Page = params["page"]?(params["page"]):1;
           
        });
        */
            
    }
}