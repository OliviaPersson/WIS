import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Injectable({ providedIn: 'root' })

export class AddProductService {
    constructor(private fb:FormBuilder, private http:HttpClient){}
    
    productForm = this.fb.group({
        ProductName: ['', Validators.required],
        ProductCode: ['', Validators.required],
        Quantity: ['', Validators.required],              
        OrderAmount : ['', Validators.required],
        Description : ['', Validators.required]
    });
   
    postProduct() {
        var body = {
            ProductName: this.productForm.value.ProductName,
            ProductCode: this.productForm.value.ProductCode,
            Quantity: this.productForm.value.Quantity,
            OrderAmount: this.productForm.value.OrderAmount,
            Description: this.productForm.value.Description,
            OrderDate: "2022-01-12T13:34:00.000"           
        };
        console.log("body", body);
        return this.http.post<any>('/Product/AddProduct', body);    
    }
}