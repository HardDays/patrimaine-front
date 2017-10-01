import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from "@angular/router";
import {Http, HttpModule} from "@angular/http";
import { FormsModule }   from '@angular/forms';

import { AppComponent }   from './app.component';
//TODO import another components
import { OwlModule } from 'angular-owl-carousel';

import {MainService} from "./services/main.service";
import { PageModule } from './Pages/pages.module';
import { routs } from './Pages/pages.route';
import { CookieService } from 'ng2-cookies';
import { TinymceModule} from 'angular2-tinymce';

@NgModule({
    imports:      [ 
        BrowserModule,
        RouterModule.forRoot(routs),
        PageModule,
        HttpModule,
        FormsModule,
        TinymceModule.withConfig({
            skin_url: "/assets/skins/lightgray",
            menubar:false
        })
    ],
    declarations: [ AppComponent],
    providers: [ MainService, HttpModule, CookieService],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }