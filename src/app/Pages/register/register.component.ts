import { Component,OnInit}      from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { HttpService} from '../../services/http.service';

import {MainService} from "./../../services/main.service";
import { UserModel } from '../../models/user.model';
import { CheckboxModel } from '../../models/checkbox.model';
import { RegisterUserModel } from '../../models/register.user.model';
import { RegisterCompanyModel } from '../../models/register.company.model';

@Component({
    moduleId:module.id,
    selector: "ads",
    templateUrl: "./register.component.html",
    providers: [HttpService]
})

export class RegisterComponent implements OnInit{
    isOkEnabled = true;
    isPro = false;
    image:string = "";
    isLoading = false;
    regOk = false;
    regError = false;
    regErrorMsg:string = "";
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
        private mainService: MainService){
            this.mainService.ChangePage('register');
        }
    RegisterUser(email:string,password:string,fname:string,lname:string,phone:string,pcategory:string)
    {
        window.scrollTo(0,0);
        if(!email || !password || !fname || !lname || !phone || !pcategory){
            this.OnRegError({status:400});
            return;
        }
        this.isLoading = true;
        let user : RegisterUserModel = new RegisterUserModel(email,password,fname,lname,phone,pcategory);
        this.mainService.CreateUser(user)
            .subscribe(x=>{
                this.AfterRegistration(x);
            },
        (err)=>{
            this.OnRegError(err);
        });
    }

    RegisterUserCompany(email:string,password:string,fname:string,lname:string,phone:string,pcategory:string,
                        cname:string, caddress:string, coaddress:string, cemail:string, cphone:string, 
                        worktime:string, description:string, links:string, c_type:string, subcategory:string)
    {
        window.scrollTo(0,0);
        if(!email || !password || !fname || !lname || !phone || !pcategory ||
            !cname || !caddress || !coaddress || !cemail || !cphone){
            this.OnRegError({status:400});
            return;
        }
        this.isLoading = true;
        let user : RegisterUserModel = new RegisterUserModel(email,password,fname,lname,phone,pcategory);
        let company : RegisterCompanyModel = new RegisterCompanyModel(cname, caddress, coaddress, cemail, cphone, worktime, description, links, c_type, subcategory,this.image);
        
        this.mainService.CreateUserCompany(user, company, this.GetCheckedCheckboxes(this.Expertises), this.GetCheckedCheckboxes(this.Agreements))
            .subscribe(x=>{
                this.AfterRegistration(x);
            },
        (err)=>{
            this.OnRegError(err);
        });
    }

    OnRegError(err:any){
        if(err.status == 400)
        {
            this.regErrorMsg = "Something went wrong! Input correct data!";
        }
        else if(err.status == 422){
            this.regErrorMsg = "Wrondg data: " + err._body;
        }
        else{
            this.regErrorMsg = "Something went wrong! Try again!";
        }

        this.regError = true;
        this.isLoading = false;
    }
        changeListener($event: any) : void {
            this.isOkEnabled = false;
            this.readThis($event.target);
        }

        readThis(inputValue: any): void {
            let file:File = inputValue.files[0];
            if(!file) return;
            let myReader:FileReader = new FileReader();
            myReader.onloadend = (e) => {
                this.image = myReader.result;
                this.isOkEnabled = true;
            }
            myReader.readAsDataURL(file);
        }
        AfterRegistration(user: UserModel){
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
            return result;
        }
        ChangeUserType(){
            this.isPro = !this.isPro;
        }
}