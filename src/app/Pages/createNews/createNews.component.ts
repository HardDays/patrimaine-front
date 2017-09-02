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
    isOkEnabled:boolean = true;
    image:string = "";
    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private service: MainService)
    {
        this.service.ChangePage('create_news');
    }

    ngOnInit() {
        this.isLoading = false;
        this.isOkEnabled = true;
    }

    changeListener($event: any) : void {
        
        this.readThis($event.target);
    }

    readThis(inputValue: any): void {
        this.isOkEnabled = false;
        var file:File = inputValue.files[0];
        if(!file){
            this.isOkEnabled = true;
             return;
        }
        var myReader:FileReader = new FileReader();

        myReader.onloadend = (e) => {
            this.image = myReader.result;
            this.isOkEnabled = true;
        }
        myReader.readAsDataURL(file);
    }

    OncreateNewsButtonClick(title:string,subtitle:string,description:string,ncategory:string,ntype:string,links:string){
        this.createError = false;
        this.isLoading = true;
        if(!title || !description || !subtitle || !links){

            this.errorMsg = "Input valid data! You have to input: ";
            let len = this.errorMsg.length;
            if(!title)
                this.errorMsg = this.errorMsg + " Title";
            if(!subtitle){
                if(this.errorMsg.length != len)
                    this.errorMsg += ","
                this.errorMsg+=" Subtitle";
            }
            if(!links){
                if(this.errorMsg.length != len)
                    this.errorMsg += ","
                this.errorMsg+=" Links";
            }
            if(!description){
                if(this.errorMsg.length != len)
                    this.errorMsg += ","
                this.errorMsg+=" Description !";
            }
            this.createError = true;
            this.isLoading = false;
            window.scrollTo(0,0);
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
                window.scrollTo(0,0);
                this.router.navigate(['news',result.id]);
            },
            (err)=>{
                console.log(err);
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