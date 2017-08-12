import { Component,OnInit}      from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { HttpService} from '../../services/http.service';

import { RegisterUserModel } from './../index';
import { CompanyModel, RegisterCompanyModel } from './../index';

import {MainService} from "./../../services/main.service";
import { UserModel } from '../../models/user.model';
import { CheckboxModel } from '../../models/checkbox.model';

@Component({
    selector: "ads",
    templateUrl: "app/Pages/register/register.component.html",
    providers: [HttpService]
})

export class RegisterComponent implements OnInit{
    isOkEnabled = true;
    isPro = false;
    image:string = "";
    isLoading = false;
    regOk = false;
    Expertises: CheckboxModel[] = [
        new CheckboxModel("Credit","credit",false),
        new CheckboxModel("Retraite","retraite",false),
        new CheckboxModel("Placement","placement",false),
        new CheckboxModel("Allocation","allocation",false),
        new CheckboxModel("Epargne","epargne",false),
        new CheckboxModel("Investissement","investissement",false),
        new CheckboxModel("Defiscalisation","defiscalisation",false),
        new CheckboxModel("Immobilier","immobilier",false),
        new CheckboxModel("Assurance","assurance",false),
        new CheckboxModel("Investissement plaisir","investissement_plaisir",false)
    ];
    Agreements:CheckboxModel[]=[
        new CheckboxModel("CJA","CJA",false),
        new CheckboxModel("CIF","CIF",false),
        new CheckboxModel("Courtier","Courtier",false),
        new CheckboxModel("IOSB","IOSB",false),
        new CheckboxModel("Carte-T","Carte_T",false)
    ]; 
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
                        worktime:string, description:string, links:string, c_type:string, subcategory:string)
    {
        window.scrollTo(0,0);
        this.isLoading = true;
        let user : RegisterUserModel = new RegisterUserModel(email,password,fname,lname,phone);
        let company : RegisterCompanyModel = new RegisterCompanyModel(cname, caddress, coaddress, cemail, cphone, worktime, description, links, c_type, subcategory,this.image);
        console.log('AAAAAAAAAAAAAA');
        console.log(this.Expertises);
        console.log(JSON.stringify(user));
        this.mainService.CreateUserCompany(user, company, this.GetCheckedCheckboxes(this.Expertises), this.GetCheckedCheckboxes(this.Agreements))
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
        GetCheckedCheckboxes(input:CheckboxModel[]): string[]
        {
            let result: string[]= [];
            let checked:CheckboxModel[]=input.filter(x=>x.checked);
            for(let i of checked)
                result.push(i.value);
            console.log(result);
            return result;
        }
        ChangeUserType(){
            this.isPro = !this.isPro;
        }
}