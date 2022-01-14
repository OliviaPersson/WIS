import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AddProductService } from '../services/add-product.service';
import { AlertService } from '../services/alert.service';
import { AuthenticationService } from '../services/authentication.service';
import { UserService } from '../services/user.service';

@Component({
selector: './add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})

export class AddProductComponent implements OnInit {

  loading = false;
  submitted = false;
  

  constructor(
    private productService: AddProductService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router, 
    private userService: UserService,
    private authenticationService: AuthenticationService,
    private alertService: AlertService,
  ){
  }
  
  ngOnInit(): void {
    this.alertService.clear();
    this.productService.productForm.reset();
  }

// convenience getter for easy access to form fields
get f() { return this.productService.productForm.controls; }



  onSubmit() {
    this.submitted = true;
    
    // reset alerts on submit
    this.alertService.clear();
    console.log("Stop1");
    // stop here if form is invalid
    if (this.productService.productForm.invalid) {
        return;
    }
    console.log("Stop1");
    this.loading = true;
    this.productService.postProduct()
    .pipe(first())
    .subscribe({
      next: () => {
          this.alertService.success('Adding Product successful', true);
          this.loading = false;
          this.productService.productForm.reset();
          this.submitted = false;
          this.router.navigate(['../addproduct'], { relativeTo: this.route });
      }, 
      error: error => {
        this.alertService.error(error.error);
        this.loading = false;
      }
    });
  }   
}
  