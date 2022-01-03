import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { LoginComponent } from './login/login.component';
import { AlertComponent } from './alert/alert.component';
import { AuthGuardService } from './guard/auth-guard.service';
import { ProductListComponent } from './Products/product-list.component';
import { ConvertToSpacesPipe } from './Products/convert-to-spaces.pipe';
import { RegistrationComponent } from './registration/registration.component';
import { RegistrationService } from './services/registration.service';
import { StockStatusFiltering } from './Products/stock-status-filtering.component';


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    LoginComponent,
    AlertComponent,
    ProductListComponent,
    ConvertToSpacesPipe,
    RegistrationComponent,
    StockStatusFiltering
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: LoginComponent, pathMatch: 'full' },
      { path: 'home', component: HomeComponent, pathMatch: 'full', canActivate: [AuthGuardService] },
      { path: 'products', component: ProductListComponent, pathMatch: 'full', canActivate: [AuthGuardService] },
      { path: 'counter', component: CounterComponent },
      { path: 'registration', component: RegistrationComponent },
      { path: 'fetch-data', component: FetchDataComponent },
    ])
  ],
  providers: [AuthGuardService, RegistrationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
