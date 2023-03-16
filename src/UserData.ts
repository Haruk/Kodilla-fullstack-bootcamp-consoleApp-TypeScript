import Message from './Message';
import { ColorOption } from './Message'

type User = {
    name: string;
    age: number;
}


class UserData {

    private data: User[];

    constructor() {
        this.data = []
    }

    public showAll(): void {
        Message.showColorized(ColorOption.Info, `Users data`);

        if (this.data.length) {
            console.table(this.data)
        } else {
            console.log(`No data...`)
        }
    }

    public add(newUser: User): void {

        if (newUser.age < 0) {
            Message.showColorized(ColorOption.Error, `Wrong data!`)
            return;
        }

        if (!newUser.name && !newUser.name.length) {
            Message.showColorized(ColorOption.Error, `Wrong data!`)
            return;
        }

        this.data.push(newUser)
        Message.showColorized(ColorOption.Success, `User has been successfully added!`)

    }

    public remove(userName: string): void {

        const userExists = this.data.some((user: User): boolean => user.name === userName ? true : false);

        if (userExists) {
            this.data = this.data.filter((user: User): boolean => user.name === userName ? false : true)
            Message.showColorized(ColorOption.Success, `User deleted!`)
        } else {
            Message.showColorized(ColorOption.Error, `User not found...`)
        }

    }

    public edit(editedUserName: string, newUser: User): void {

        const userExists = this.data.some((user: User): boolean => user.name === editedUserName ? true : false);

        if (userExists) {
            this.data = this.data.map((user: User): User => {

                if (user.name === editedUserName) {
                    return { name: newUser.name, age: newUser.age }
                } else {
                    return user
                }

            })
            Message.showColorized(ColorOption.Success, `User edited!`)
        } else {
            Message.showColorized(ColorOption.Error, `User not found...`)
        }

    }
}


export default UserData;