import { Component,OnInit }      from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import {Subscription} from 'rxjs/Subscription';
import { HttpService} from '../../services/http.service';


import {MainService} from "./../../services/main.service";
import { NewsModel } from '../../models/news.model';

@Component({
    moduleId: module.id,
    selector: "createNews",
    templateUrl: "./createNews.component.html",
    providers: [HttpService]
})

export class CreateNewsComponent implements OnInit{
    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private service: MainService)
    {
    }

    ngOnInit() {
    }

    OncreateNewsButtonClick(title:string,description:string){
        this.service.CreateNews(title,description)
            .subscribe((result:NewsModel)=>{
                console.log("Result of creation: " + JSON.stringify(result));
                this.router.navigate(['news',result.id]);
            });
    }
}