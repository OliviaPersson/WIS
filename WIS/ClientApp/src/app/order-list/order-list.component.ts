import { Component, Input, OnInit } from "@angular/core";
import { pipe, Subscription } from "rxjs";
import { IProduct } from "../Products/product";
import { ProductService } from "../Products/product.service";
import { AlertService } from "../services/alert.service";
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
    orderSuccess: boolean = false;
    loading = false;

    order: { Id: any, OrderAmount: number } [] = [];  

    products: IProduct[] = [];
    filteredProducts: IProduct[] = [];
    
    constructor(private productService: ProductService,
                private authenticationService: AuthenticationService,
                private dialog: MatDialog,
                private alertService: AlertService) {}

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

    placeOrder(filteredProducts){
        //console.log(filteredProducts);
/*         this.loading = true;
        filteredProducts.forEach(product => {
            let order = {
                Id: product.id,
                OrderAmount: product.orderAmount * 1
            }
            this.productService.orderProducts(order)
            .subscribe()
        });
        this.loading = false; */

        this.loading = true;
        filteredProducts.forEach(product => {
            this.order.push({
                "Id":  product.id,
                "OrderAmount": product.orderAmount * 1
            })
        });
        console.log(this.order);
        this.productService.orderProducts(this.order)
        .subscribe({
            next: () => {
                this.alertService.success('Order successful', true);
                this.loading = false;
            },
            error: error => {
                this.alertService.error('Something went wrong with your order');
                this.loading = false;
            }
          });
        this.order = [];
        this.loading = false;  
    }  
}