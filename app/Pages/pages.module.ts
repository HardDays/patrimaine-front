import { NgModule }      from '@angular/core';
import { CommonModule } from "@angular/common";

import { AdsComponent, IndexComponent, UsersComponent, AdsDetailComponent, UserDetailComponent} from './index';

@NgModule({
    imports:      [ CommonModule ],
    declarations: [AdsComponent, IndexComponent, UsersComponent, AdsDetailComponent, UserDetailComponent],
    exports: [AdsComponent, IndexComponent, UsersComponent, AdsDetailComponent, UserDetailComponent]
})

export class PageModule { }