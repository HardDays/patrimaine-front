import { NgModule }      from '@angular/core';
import { CommonModule } from "@angular/common";
import { HttpService} from '../services/http.service';
import { FormsModule }   from '@angular/forms';

import { AdsComponent, IndexComponent, UsersComponent, AdsDetailComponent, UserDetailComponent, LoginComponent, RegisterComponent} from './index';

@NgModule({
    imports:      [ CommonModule,FormsModule ],
    declarations: [AdsComponent, IndexComponent, UsersComponent, AdsDetailComponent, UserDetailComponent, LoginComponent, RegisterComponent],
    exports: [AdsComponent, IndexComponent, UsersComponent, AdsDetailComponent, UserDetailComponent, LoginComponent, RegisterComponent],
    providers: [HttpService]
})

export class PageModule { }