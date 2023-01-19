import { Itransaction, Transaction } from './transaction';
import Statement from './statement';

export class Account {
  openingBalance: number;
  transactionHistory: Itransaction[];
  overdraftLimit: number;

  constructor(openingBalance = 0, overdraftLimit = 100) {
    this.openingBalance = openingBalance;
    this.transactionHistory = [];
    this.overdraftLimit = overdraftLimit;
  }

  deposit(amount: number): number {
    return this.transactionHistory.push(
      new Transaction(amount, amount + this.balance())
    );
  }

  withdraw(amount: number) {
    this._withdrawChecks(amount);

    let withdrawal = -amount;
    return this.transactionHistory.push(
      new Transaction(withdrawal, this.balance() + withdrawal)
    );
  }

  balance = () => {
    return this.transactionHistory
      .map((transaction) => transaction.amount)
      .reduce((a, b) => a + b, 0);
  };

  viewStatement = () => {
    let statement = new Statement();
    let printout = statement.printStatement(this.transactionHistory);

    return printout;
  };

  _withdrawChecks = (amount) => {
    if (amount < 0) {
      throw new Error('Invalid amount - Cannot withdraw amount less than £0');
    } else if (amount > this.balance() + this.overdraftLimit) {
      throw new Error('Insufficient funds');
    }
  };
}
