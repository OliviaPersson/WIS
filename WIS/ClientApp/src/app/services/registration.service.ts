import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';

@Injectable({ providedIn: 'root' })

export class RegistrationService {
    constructor(private fb:FormBuilder, private http:HttpClient){}
    
    formModel = this.fb.group({
        FirstName: ['', Validators.required],
        LastName: ['', Validators.required],
        UserName: ['', Validators.required],
        Password: ['', [Validators.required, Validators.minLength(6)]]
    });
    register() {
        var body = {
            FirstName: this.formModel.value.FirstName,
            LastName: this.formModel.value.LastName,
            UserName: this.formModel.value.UserName,
            Password: this.formModel.value.Password,
            Role: "User"
        };
        return this.http.post<any>('/User/Registration', body);    
    }   
}