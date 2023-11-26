import  UsersJson from "./users.json";

interface User {
    email: string;
    number: number;
  }

  interface Iprops {
    email: string;
    number?: string;
}

export class Model {
    constructor() {}

    private users: User[] = UsersJson;

    

    public findUsers({email, number}: Iprops): User[] | [] {
        return this.users.filter((user) => {
            if(number) {
                return user.email.toLocaleLowerCase().includes(email.toLowerCase()) && user.number.toString().includes(number);
            }
            else{
                return user.email.toLocaleLowerCase().includes(email.toLowerCase());
            }
        });
    }
}

export const model = new Model();