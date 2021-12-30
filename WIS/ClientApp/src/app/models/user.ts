export class User {
    id: string;
    firstName: string;
    lastName: string;
    userName: string;
    password: string;
    role: String;

    constructor(firstName, lastName, userName, password, role) {  (3)
        this.firstName = firstName;
        this.lastName = lastName;
        this.userName = userName;
        this.password = password;
        this.role = "User";
    }
}