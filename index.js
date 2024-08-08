#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
class BankAccount {
    balance;
    constructor(balance) {
        this.balance = balance;
    }
    Withdraw(amount) {
        if (amount <= this.balance) {
            this.balance -= amount;
            console.log(chalk.yellowBright(`\n\tWithdrawing Rs. ${amount}...`));
            setTimeout(() => {
                console.log(chalk.greenBright(`\tTransaction Completed! Please take your cash.`));
                console.log(chalk.greenBright(`\tYour new balance is Rs. ${this.balance}`));
            }, 5000);
        }
        else {
            console.log(chalk.redBright(`\tTransaction declined: insufficient balance.`));
        }
    }
    Deposit(amount) {
        this.balance += amount;
        console.log(chalk.yellowBright(`\n\tDepositing Rs. ${amount} into your account...`));
        setTimeout(() => {
            console.log(chalk.greenBright(`\tDeposit Transaction Successful!`));
            console.log(chalk.greenBright(`\tYour new balance is Rs. ${this.balance}`));
        }, 5000);
    }
    checkBalance() {
        console.log(chalk.greenBright(`\tYour balance is Rs. ${this.balance}`));
    }
}
let balance = Math.round(Math.random() * 3000);
const service = async function () {
    console.log(chalk.magentaBright("\n\t=========== WELCOME TO OOP BANK SERVICES ============"));
    console.log(chalk.greenBright(`\t============ ACCOUNT BALANCE: Rs.${balance} ==============`));
    const userAcc = new BankAccount(balance);
    while (true) {
        const user = await inquirer.prompt([
            {
                name: "fname",
                type: "input",
                message: chalk.blueBright("\tEnter your firstname:")
            },
            {
                name: "lname",
                type: "input",
                message: chalk.blueBright("\tEnter your lastname:")
            },
            {
                name: "age",
                type: "input",
                message: chalk.blueBright("\tEnter your age:")
            },
            {
                name: "choice",
                type: "list",
                message: chalk.blue("\tHow can I assist you today? What would you like to do?"),
                choices: ["\tWithdraw Cash", "\tDeposit Money", "\tCheck Balance", "\tExit"]
            },
        ]);
        let amount;
        if (user.choice === "\tWithdraw Cash") {
            const { amount } = await inquirer.prompt({
                name: "amount",
                type: "number",
                message: chalk.blueBright("\tEnter the amount:")
            });
            userAcc.Withdraw(amount);
        }
        else if (user.choice === "\tDeposit Money") {
            const { amount } = await inquirer.prompt({
                name: "amount",
                type: "number",
                message: chalk.blueBright("\tEnter the amount:")
            });
            userAcc.Deposit(amount);
        }
        else if (user.choice === "\tCheck Balance") {
            userAcc.checkBalance();
        }
        else {
            console.log(chalk.yellowBright(`\tExiting the program...`));
            setTimeout(() => {
                console.log(chalk.greenBright(`\tThank you ${user.fname} for using our service!`));
            }, 3000);
            break;
        }
        // Update the balance for the next loop iteration
        balance = userAcc.balance;
    }
}();
