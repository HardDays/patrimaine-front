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
    createError = false;
    isLoading = true;
    errorMsg:string = "";
    isOkEnabled = false;
    image:string = "";
    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private service: MainService)
    {
    }

    ngOnInit() {
        this.isLoading = false;
    }

    changeListener($event: any) : void {
        this.isOkEnabled = false;
        this.readThis($event.target);
    }

    readThis(inputValue: any): void {
        var file:File = inputValue.files[0];
        var myReader:FileReader = new FileReader();

        myReader.onloadend = (e) => {
            this.image = myReader.result;
            this.isOkEnabled = true;
        }
        myReader.readAsDataURL(file);
    }

    OncreateNewsButtonClick(title:string,subtitle:string,description:string,ncategory:string,ntype:string,links:string){
        this.isLoading = true;
        if(!title || !description){
            this.errorMsg = "Input valid data!";
            this.createError = true;
            this.isLoading = false;
            return;
        }
        let annonce = {
            title:title,
            subtitle:subtitle,
            base64:this.image,
            links:links,
            ncategory:ncategory,
            ntype:ntype,
            description:description
        };
        this.service.CreateNews(annonce)
            .subscribe((result:NewsModel)=>{
                this.router.navigate(['news',result.id]);
            },
            (err)=>{
                if(err.status == 401){
                    this.errorMsg = "You have to be logged in! We will reddirect you to login page soon!";
                    setTimeout(()=> this.router.navigate(["/login"]),3000);
                }
                else{
                    this.errorMsg = "Something went wrong! Try again!";
                }
                this.createError = true;
                this.isLoading = false;
            },
        ()=>this.isLoading = false);
    }
}