import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { IProduct } from './product';
import { ProductService } from "./product.service";

@Component({
  selector: 'stock-filtering',
  templateUrl: './stock-status-filtering.component.html',
  styleUrls: ['./stock-status-filtering.component.css']
})
export class StockStatusFiltering implements OnChanges{
    imageWidth: number = 15;
    outOfStockChecked: boolean = false;
    fewInStockChecked: boolean = false;
    manyInStockChecked: boolean = false;

    @Input() products: IProduct[] = [];
    @Input() checkboxesDisabled: boolean;
    SelectedProducts: IProduct[] = [];
    @Output() checkboxClicked: EventEmitter<IProduct[]> = new EventEmitter<IProduct[]>();

    constructor(){} 

    ngOnChanges(): void {

    }

    Checked(type: string){
        let changed: boolean = false;

        if(type == "outOfStockChecked" && !this.outOfStockChecked && !changed){
            this.outOfStockChecked = true;
            changed = true;
            this.products.forEach(product => {
                if(product.quantity == 0){
                    this.SelectedProducts.push(product);
                }
            });
        }
        if(type == "fewInStockChecked" && !this.fewInStockChecked && !changed){
            this.fewInStockChecked = true;
            changed = true;
            this.products.forEach(product => {
                if(product.quantity > 0  && product.quantity < 30){
                    this.SelectedProducts.push(product);
                }
            });
        }
        if(type == "manyInStockChecked" && !this.manyInStockChecked && !changed){
            this.manyInStockChecked = true;
            changed = true;
            this.products.forEach(product => {
                if(product.quantity >= 100){
                    this.SelectedProducts.push(product);
                }
            });
        }
        if(type == "outOfStockChecked" && this.outOfStockChecked && !changed){
            this.outOfStockChecked = false;
            changed = true;
            this.SelectedProducts = this.SelectedProducts.filter(product => {
                let condition = product.quantity == 0;
                return !condition;
            })
        }
        if(type == "fewInStockChecked" && this.fewInStockChecked && !changed){
            this.fewInStockChecked = false;
            changed = true;
            this.SelectedProducts = this.SelectedProducts.filter(product => {
                let condition = product.quantity > 0  && product.quantity < 30;
                return !condition;
            })
        }
        if(type == "manyInStockChecked" && this.manyInStockChecked && !changed){
            this.manyInStockChecked = false;
            changed = true;
            this.SelectedProducts = this.SelectedProducts.filter(product => {
                let condition = product.quantity >= 100;
                return !condition;

            })
        }
        this.checkboxClicked.emit(this.SelectedProducts);
    }
}
