import {NewsModel} from "./../models/news.model";

export class AllNewsModel{
    constructor(
        public news: NewsModel[],
        public total_count: number
    ){}
}