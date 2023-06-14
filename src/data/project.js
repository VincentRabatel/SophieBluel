import { Category } from "./category";

export class Project  {
    constructor(id, title, imageURL, categoryId, userId, category ) {
        this.id = id;
        this.title = title;
        this.imageURL = imageURL;
        this.categoryId = categoryId;
        this.useId = userId
        this.category = new Category;
    }

    stringify(){
        const str = JSON.stringify(this);
        return str;
    }
}