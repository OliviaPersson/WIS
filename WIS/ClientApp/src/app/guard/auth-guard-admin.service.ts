import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class AuthGuardAdminService implements CanActivate {
  
  constructor(
    public auth: AuthenticationService,
    public router: Router) {}

  canActivate(): boolean {
    if (this.auth.currentUserValue[0].role != "Admin") {
      this.router.navigate(['/products']);
      return false;
    }
    return true;
  }

  
}