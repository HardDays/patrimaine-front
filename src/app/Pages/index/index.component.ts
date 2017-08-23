import { Component, OnInit } from '@angular/core';
import { HttpService} from '../../services/http.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MainService } from '../../services/main.service';
import { FormsModule } from '@angular/forms';

@Component({
    moduleId:module.id,
    selector: "index",
    templateUrl: "./index.component.html"
})

export class IndexComponent implements OnInit{
    search={
        title:"",
        description:"",
        c_type:"",
        subcategory:""
    }
    constructor(private router: Router,
        private mainService: MainService,
        private params: ActivatedRoute){}
    ngOnInit(){ }
    SearchAnnonces()
    {
        console.log(this.search);
        this.router.navigate(['news_list',this.search]);
    }
}