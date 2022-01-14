import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { IProduct } from "./product";
import { ProductService } from "./product.service";
import { AlertService } from "../services/alert.service";

@Component({
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy{
    pageTitle: string = 'Product List';
    imageWidth: number = 15;
    imageMargin: number = 2;
    showImage: boolean = false;
    errorMessage: string = '';
    sub!: Subscription;
    checkboxesDisabled: boolean;
    seachboxDisabled: boolean;
    productClicked: boolean = false;

    private _listFilter: string = '';

    get listFilter(): string {
        return this._listFilter;
    }
    set listFilter(value: string) {
        this._listFilter = value;
        console.log('In setter:', value);
        this.filteredProducts = this.performFilter(value);
    }
    filteredProducts: IProduct[] = [];
    products: IProduct[] = [];

    constructor(private productService: ProductService,
                private alertService: AlertService) {}

    performFilter(filterBy: string): IProduct[] {
        filterBy = filterBy.toLocaleLowerCase();
        return this.products.filter((product: IProduct) => product.productName.toLocaleLowerCase().includes(filterBy))
    }

    toggleImage(): void {
        this.showImage = !this.showImage;
    }

    ngOnInit(): void {
        this.alertService.clear();
        this.sub = this.productService.getProducts().subscribe({
            next: products => {
                this.products = products;
                this.filteredProducts = this.products;
                this.sortProducts();
            },
            error: err => this.errorMessage = err
        });

    }

    sortProducts() {
        if(!this.productClicked) {
            this.filteredProducts.sort(function(a, b){
                if(a.productName.toLowerCase() < b.productName.toLowerCase()) { return -1; }
                if(a.productName.toLowerCase() > b.productName.toLowerCase()) { return 1; }
                return 0;
            })
            this.productClicked = true;
        } else {
            this.filteredProducts.sort(function(a, b){
                if(a.productName.toLowerCase() > b.productName.toLowerCase()) { return -1; }
                if(a.productName.toLowerCase() < b.productName.toLowerCase()) { return 1; }
                return 0;
            })
            this.productClicked = false;
        }
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    onRatingClicked(message: string): void {
        this.pageTitle = 'Product List: ' + message;
    }

    onCheckboxClicked(array: IProduct[]): void {
        if(array.length == 0){
            this.filteredProducts = this.products;
            this.seachboxDisabled = false;
        } else {
            this.filteredProducts = array;
            this.seachboxDisabled = true;
        }
    }
}