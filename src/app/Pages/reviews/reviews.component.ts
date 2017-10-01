import { Component,OnInit }      from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import {Subscription} from 'rxjs/Subscription';
import { HttpService} from '../../services/http.service';

import {MainService} from "./../../services/main.service";
import { ReviewModel } from '../../models/review.model';

@Component({
    moduleId:module.id,
    selector: "reviews",
    templateUrl: "./reviews.component.html",
    providers: [HttpService]
})

export class ReviewsComponent implements OnInit{
    Reviews:ReviewModel[] = [];
    IsLoading = true;
    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private service: MainService)
    {
        this.service.ChangePage('reviews');
    }
    ngOnInit() {
            this.LoadReviews();
        
    }

    LoadReviews(){
        this.service.GetAllReviews(null)
        .subscribe((res:ReviewModel[])=>{
            this.Reviews = res;
            this.IsLoading = false;
        })
    }

    OnDeleteReview(rev: ReviewModel){
        this.IsLoading = true;
        this.service.DeleteReview(rev.id)
            .subscribe(()=>{
                this.LoadReviews();
            })
    }

    OnEditReview(rev:ReviewModel){
        this.router.navigate(['edit_review',rev.id]);
    }
}