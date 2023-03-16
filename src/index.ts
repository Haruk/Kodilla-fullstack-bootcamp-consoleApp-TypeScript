const inquirer = require('inquirer');

import UserData from "./UserData";
import Message from './Message';
import { ColorOption } from "./Message";

enum Action {
    List = "list",
    Add = "add",
    Remove = "remove",
    Quit = "quit",
    Edit = `edit`,
}

type InquirerAnswers = {
    action: Action
}


const users = new UserData();
console.log("\n");
console.info("???? Welcome to the UsersApp!");
console.log("====================================");
Message.showColorized(ColorOption.Info, "Available actions");
console.log("\n");
console.log("list – show all users");
console.log("add – add new user to the list");
console.log("edit – edit user");
console.log("remove – remove user from the list");
console.log("quit – quit the app");
console.log("\n");


const startApp = () => {
    inquirer.prompt([{
        name: 'action',
        type: 'input',
        message: 'How can I help you?',
    }]).then(async (answers: InquirerAnswers) => {
        switch (answers.action) {
            case Action.List:
                users.showAll();
                break;
            case Action.Add:
                const user = await inquirer.prompt([{
                    name: 'name',
                    type: 'input',
                    message: 'Enter name',
                }, {
                    name: 'age',
                    type: 'number',
                    message: 'Enter age',
                }]);
                users.add(user);
                break;
            case Action.Edit:
                const editedData = await inquirer.prompt([{
                    name: 'editedUserName',
                    type: 'input',
                    message: 'Enter name',
                }, {
                    name: 'newName',
                    type: 'input',
                    message: 'Enter new name',
                }, {
                    name: 'newAge',
                    type: 'input',
                    message: 'Enter new age',
                }]);
                users.edit(editedData.editedUserName, {
                    name: editedData.newName,
                    age: editedData.newAge
                })
                break;
            case Action.Remove:
                const name = await inquirer.prompt([{
                    name: 'name',
                    type: 'input',
                    message: 'Enter name',
                }]);
                users.remove(name.name);
                break;
            case Action.Quit:
                Message.showColorized(ColorOption.Info, "Bye bye!");
                return;
            default:
                Message.showColorized(ColorOption.Error, `Command not found.`)
                break;
        }

        startApp();
    });

}
startApp();