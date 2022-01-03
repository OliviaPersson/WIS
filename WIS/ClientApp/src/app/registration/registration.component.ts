import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AlertService } from '../services/alert.service';
import { RegistrationService } from '../services/registration.service';

@Component({
selector: 'app-registration',
  templateUrl: './registration.component.html',
})

export class RegistrationComponent implements OnInit {

  loading = false;
  submitted = false;

  constructor(
    public service: RegistrationService,
    private route: ActivatedRoute,
    private router: Router, 
    private alertService: AlertService,
  ){
  }
  
  ngOnInit(): void {
    this.service.formModel.reset();
  }

// convenience getter for easy access to form fields
get f() { return this.service.formModel.controls; }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.service.formModel.invalid) {
        return;
    }

    this.loading = true;
    this.service.register()
    .pipe(first())
    .subscribe({
      next: () => {
          this.service.formModel.reset();
          this.submitted = false;
          this.loading = false;
          this.alertService.success('Registration successful', true);        
          this.router.navigate(['../registration']);
          
      },
      error: error => {
          this.alertService.error(error);
          this.loading = false;
      }
    });
  }    
}
  