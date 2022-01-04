import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Injectable({ providedIn: 'root' })

export class RegistrationService {
    constructor(private fb:FormBuilder, private http:HttpClient){}
    
    formModel = this.fb.group({
        FirstName: ['', Validators.required],
        LastName: ['', Validators.required],
        UserName: ['', Validators.required],              
        Password : ['', [Validators.required, Validators.minLength(4)]],
        ConfirmPassword : ['', Validators.required]
    }, { validator : this.comparePasswords });
   

    comparePasswords(fb:FormGroup){
        let confirmPswrdCtrl = fb.get('ConfirmPassword');
        if(confirmPswrdCtrl.errors == null || 'passwordMismatch' in confirmPswrdCtrl.errors){
            if(fb.get('Password').value != confirmPswrdCtrl.value)
                confirmPswrdCtrl.setErrors({passwordMismatch: true});
            else
                confirmPswrdCtrl.setErrors(null);
        }
    }   
    
    register() {
        var body = {
            FirstName: this.formModel.value.FirstName,
            LastName: this.formModel.value.LastName,
            UserName: this.formModel.value.UserName,
            Password: this.formModel.get('Password').value,
            Role: "User"
        };
        return this.http.post<any>('/User/Registration', body);    
    }
}