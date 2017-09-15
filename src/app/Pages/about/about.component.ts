import { Component,OnInit }      from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import {Subscription} from 'rxjs/Subscription';
import { HttpService} from '../../services/http.service';
@Component({
    moduleId:module.id,
    selector: "about",
    templateUrl: "./about.component.html",
    providers: [HttpService]

})

export class AboutComponent{
}