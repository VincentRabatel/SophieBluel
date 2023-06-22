export class Project  {
    constructor(id, title, imageUrl, categoryId, userId, category ) {
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.categoryId = categoryId;
        this.userId = userId;
        this.category = category;
    }

    logTitle(){
        console.log(this.title);
    }
}