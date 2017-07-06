import { NgModule }      from '@angular/core';
import { CommonModule } from "@angular/common";
import { HttpService} from '../services/http.service';

import { AdsComponent, IndexComponent, UsersComponent, AdsDetailComponent, UserDetailComponent} from './index';

@NgModule({
    imports:      [ CommonModule ],
    declarations: [AdsComponent, IndexComponent, UsersComponent, AdsDetailComponent, UserDetailComponent],
    exports: [AdsComponent, IndexComponent, UsersComponent, AdsDetailComponent, UserDetailComponent],
    providers: [HttpService]
})

export class PageModule { }