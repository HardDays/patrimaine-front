import { Component,OnInit}      from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { HttpService} from '../../services/http.service';

import { RegisterUserModel } from './../index';
import { CompanyModel, RegisterCompanyModel } from './../index';

import {MainService} from "./../../services/main.service";
import { UserModel } from '../../models/user.model';

@Component({
    selector: "ads",
    templateUrl: "app/Pages/register/register.component.html",
    providers: [HttpService]
})

export class RegisterComponent implements OnInit{
    isOkEnabled = true;
    image:string = "";
    isLoading = false;
    regOk = false;
    ngOnInit(): void {
    }
    constructor(private router: Router,
        private mainService: MainService){}
    RegisterUser(email:string,password:string,fname:string,lname:string,phone:string)
    {
        window.scrollTo(0,0);
        this.isLoading = true;
        let user : RegisterUserModel = new RegisterUserModel(email,password,fname,lname,phone);
        console.log(JSON.stringify(user));
        this.mainService.CreateUser(user)
            .then(x=>{
                this.AfterRegistration(x);
            });
    }

    RegisterUserCompany(email:string,password:string,fname:string,lname:string,phone:string,
                        cname:string, caddress:string, coaddress:string, cemail:string, cphone:string, 
                        worktime:string, description:string, links:string, c_type:string, subcategory:string,
                        expertises:string[], agrements:string[])
    {
        window.scrollTo(0,0);
        this.isLoading = true;
        let user : RegisterUserModel = new RegisterUserModel(email,password,fname,lname,phone);
        let company : RegisterCompanyModel = new RegisterCompanyModel(cname, caddress, coaddress, cemail, cphone, worktime, description, links, c_type, subcategory,this.image);
        console.log('AAAAAAAAAAAAAA');
        console.log(expertises);
        console.log(JSON.stringify(user));
        this.mainService.CreateUserCompany(user, company, expertises, agrements)
            .then(x=>{
                this.AfterRegistration(x);
            });
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
        AfterRegistration(user: UserModel){
            console.log(user);
            if(user && user.id){
                this.isLoading = false;
                this.regOk = true;
            }
        }
}