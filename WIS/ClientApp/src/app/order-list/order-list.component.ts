import { Component, Input, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { IProduct } from "../Products/product";
import { ProductService } from "../Products/product.service";
import { AuthenticationService } from "../services/authentication.service";
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';


@Component({
    selector: 'order-list',
    templateUrl: './order-list.component.html',
    styleUrls: ['./order-list.component.css'],
})

export class OrderListComponent implements OnInit{
    sub!: Subscription;
    imageWidth: number = 15;
    imageMargin: number = 2;
    removeImageWidth: number = 22;
    errorMessage: string = '';
    pageTitle: string = 'Order List';
    isAdmin: boolean;

    products: IProduct[] = [];
    filteredProducts: IProduct[] = [];
    
    constructor(private productService: ProductService,
                private authenticationService: AuthenticationService,
                private dialog: MatDialog) {}

    ngOnInit(): void {
        this.sub = this.productService.getProducts().subscribe({
            next: products => {
                this.products = products;
                this.filterProducts();
            },
            error: err => this.errorMessage = err
        });

        if(this.authenticationService.currentUserValue[0].role == "Admin"){
            this.isAdmin = true;
          } else {
            this.isAdmin = false;
          }
    }

    filterProducts(){
        this.filteredProducts = this.products.filter(product => {
            let condition = product.quantity >= 30;
            return !condition;
        })
    }

    deleteProduct(elem){       
        const confirmDialog = this.dialog.open(ConfirmationDialogComponent, {
            data: {
              title: 'Confirm Remove Product',
              message: 'Are you sure, you want to remove an product: ' + elem.productName
            }
          });
          confirmDialog.afterClosed().subscribe(result => {
            if (result === true) {
                this.filteredProducts = this.filteredProducts.filter(product => {
                    let condition = product.productName == elem.productName;
                    return !condition;
                })
            }
          });
    }

    placeOrder(){
        
    }  
}