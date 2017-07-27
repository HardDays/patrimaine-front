import {NewsModel} from "./../models/news.model";

export class AllNewsModel{
    constructor(
        public ads: NewsModel[]
    ){}
}