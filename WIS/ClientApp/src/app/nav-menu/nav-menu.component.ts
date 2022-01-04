import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit{
  isExpanded = false;
  isAdmin: boolean;

  constructor(private authenticationService: AuthenticationService,
              private router: Router){}

  ngOnInit() {
    if(this.authenticationService.currentUserValue[0].role == "Admin"){
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
    }
  }

  onSubmit() {
    this.authenticationService.logout()
    this.router.navigate(['/']); 
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}
