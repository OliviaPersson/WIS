import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<any[]>(`/user`);
    }

     register(user: any) {
        return this.http.post(`/user`, user);
    }
    /*
    delete(id: number) {
        return this.http.delete(`/users/${id}`);
    } */
}