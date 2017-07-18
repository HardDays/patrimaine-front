import { Input, Component} from '@angular/core';

import { HttpService} from '../services/http.service';
import {UserModel} from '../models/user.model';

import {MainService} from "../services/main.service";
      
@Component({
    selector: 'logreg-comp',
    template: `<div class="fl_center">
                    <a *ngIf="!isLoggedIn" routerLink="/login">Login</a> | <a routerLink="/register">Register</a>
                    <a *ngIf="isLoggedIn" routerLink="/me">{{me.first_name + " " + me.last_name}}</a>
                </div>`
})
export class LogRegComponent{ 
    @Input() isLoggedIn: boolean;
    @Input() me: UserModel;
}