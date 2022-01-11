import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { AuthenticationService } from '../services/authentication.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit{
  isExpanded = false;
  isAdmin: boolean;

  constructor(private authenticationService: AuthenticationService,
              private router: Router,
              private dialog: MatDialog){}

  ngOnInit() {
    if(this.authenticationService.currentUserValue[0].role == "Admin"){
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
    }
  }

  onSubmit() {
    const confirmDialog = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Confirm Log Out',
        message: 'Are you sure you want to log out' 
      }
    });
    confirmDialog.afterClosed().subscribe(result => {
      if (result === true) {
        this.authenticationService.logout()
        this.router.navigate(['/']); 
      }
    });
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}
