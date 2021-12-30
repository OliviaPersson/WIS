import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';

import { AlertService } from '../services/alert.service';
import { AuthenticationService } from '../services/authentication.service';
import { RegistrationService } from '../services/registration.service';
import { UserService } from '../services/user.service';

@Component({
selector: 'app-registration',
  templateUrl: './registration.component.html',
})

export class RegistrationComponent implements OnInit {

  loading = false;
  submitted = false;

  constructor(
    public service: RegistrationService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router, 
    private userService: UserService,
    private authenticationService: AuthenticationService,
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
          this.alertService.success('Registration successful', true);
          this.loading = false;
          this.service.formModel.reset();
          this.router.navigate(['../registration'], { relativeTo: this.route });
      },
      error: error => {
          this.alertService.error(error);
          this.loading = false;
      }
    });
  }    
}
  