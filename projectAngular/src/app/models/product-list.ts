export class ProductList {

    id : number;
    name : string;
    category : string;
    type : string;
    price : number;

    constructor( id : number,name : string,category : string,type : string,price : number)
    {
        this.id=id;
        this.name=name;
        this.category=category;
        this.type=type;
        this.price=price;
    }


}
