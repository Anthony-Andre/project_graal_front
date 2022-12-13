export class UserDto {
    public id?: number;
    public login: string = '';
    public password: string = '';
    public stayConnected?: boolean = false;

    // public formDeserialize(formData: any): void {
    //     this.login = formData.userLogin;
    //     this.password = formData.userPassword;
    //     this.stayConnected = formData.stayConnected;
    // }
}
