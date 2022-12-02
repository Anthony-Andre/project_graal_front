export class Stagiaire {
    private id: number = 0;
    private firstname: string = "";
    private lastname: string = "";
    private email: string = "";
    private phoneNumber: string = "";
    private birthdate!: Date;

    public getId(): number {
        return this.id;
    }

    public setId(id: number): void {
        this.id = id;
    }

    public getLastName(): string {
        return this.lastname;
    }

    public setLastName(lastName: string): void {
        this.lastname = lastName;
    }

    public getFirstName(): string {
        return this.firstname;
    }

    public setFirstName(firstName: string): void {
        this.firstname = firstName;
    }

    public getBirthDate(): Date {
        return this.birthdate;
    }

    public setBirthDate(birthdate: Date): void {
        this.birthdate = birthdate;
    }

    public getPhoneNumber(): string {
        return this.phoneNumber;
    }

    public setPhoneNumber(phoneNumber: string): void {
        this.phoneNumber = phoneNumber;
    }

    public getEmail(): string {
        return this.email;
    }

    public setEmail(email: string): void {
        this.email = email;
    }

    // public getInitials(): string {
    //     return this.firstName.charAt(0).toUpperCase() + this.lastName.charAt(0).toUpperCase();
    // }

}
