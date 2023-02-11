import { compareAsc, differenceInDays } from 'date-fns';
import { customLocalStorage } from 'utils/storage';

export type Transaction = {
  id: string;
  date: string;
  payed: number;
};

export type Loan = {
  id: string;
  name: string;
  initialDate: string;
  value: number;
  percentageInterest: number;
  observations: string;
  transactions: Transaction[];
};

const normalizeDate = (date: Date) => new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 59, 59);
export class Loans {
  private loans: Map<string, Loan>;
  constructor(initialLoans?: Loan[]) {
    const loans = initialLoans ?? customLocalStorage.getItem<Loan[]>('loans') ?? [];
    this.loans = new Map(loans.map((loan) => [loan.id, loan]));
  }

  addLoan(loan: Omit<Loan, 'id' | 'transactions'> & { id?: string }) {
    const id = loan.id ?? Math.random().toString(36).substr(2, 9);
    const transactions = [{ id: '0', date: normalizeDate(new Date(loan.initialDate)).toISOString(), payed: 0 }];
    this.loans.set(id, { ...loan, id, transactions });
    this.save();
  }

  getLoans() {
    return [...this.loans.values()];
  }

  getLoan(id: string) {
    return this.loans.get(id);
  }

  deleteLoan(id: string) {
    this.loans.delete(id);
    this.save();
  }

  addTransaction(id: string, transaction: Pick<Transaction, 'date' | 'payed'>) {
    const transactions = this.getTransactions(id);
    if (!transactions) return;
    transactions.push({ ...transaction, id: Math.random().toString(36).substr(2, 9) });
    transactions.sort((a, b) => compareAsc(normalizeDate(new Date(a.date)), normalizeDate(new Date(b.date))));
    this.save();
  }

  calculateInterest(id: string) {
    const transactions = this.getTransactions(id);
    const loan = this.getLoan(id);
    if (!loan) return;
    if (!transactions) return;
    const result = [...transactions, { id: 'today', date: normalizeDate(new Date()).toISOString(), payed: 0 }].reduce(
      (acc, curr, index) => {
        if (index === 0) return { ...acc, date: curr.date };
        const diff = differenceInDays(normalizeDate(new Date(curr.date)), normalizeDate(new Date(acc.date)));
        const interestPercentage = acc.interest * diff;
        const interest = acc.value * interestPercentage + acc.interestToPay;
        const payed = interest - curr.payed;
        const value = payed < 0 ? acc.value - Math.abs(payed) : acc.value;
        const interestToPay = payed < 0 ? 0 : payed;
        const total = value + interestToPay;
        const totalPayed = acc.totalPayed + curr.payed;

        return { ...acc, total, totalPayed, value, interestToPay, date: curr.date };
      },
      {
        value: loan.value,
        total: loan.value,
        payed: 0,
        date: '',
        interest: loan.percentageInterest / 100 / 30,
        interestToPay: 0,
        totalPayed: 0,
      }
    );

    return result;
  }

  deleteTransaction(id: string, transactionId: string) {
    const loan = this.getLoan(id);
    if (!loan) return;
    loan.transactions = loan.transactions.filter((transaction) => transaction.id !== transactionId);
    this.save();
  }

  getTransaction(id: string, transactionId: string) {
    const loan = this.getLoan(id);
    if (!loan) return;
    return loan.transactions.find((transaction) => transaction.id === transactionId);
  }

  getTransactions(id: string) {
    const loan = this.getLoan(id);
    if (!loan) return;
    return loan.transactions;
  }

  save() {
    const loans = this.getLoans();
    customLocalStorage.setItem('loans', loans);
  }
}

export const loans = new Loans(customLocalStorage.getItem<Loan[]>('loans') ?? []);
// export const loans = new Loans([
//   {
//     id: '1',
//     name: 'bla',
//     initialDate: new Date(2022, 11, 9, 23).toISOString(),
//     value: 12000,
//     percentageInterest: 25,
//     observations: 'string',
//     transactions: [
//       {
//         id: '0',
//         date: new Date(2022, 11, 9, 23).toISOString(),
//         payed: 0,
//       },
//       {
//         id: '1',
//         date: new Date(2023, 0, 19).toISOString(),
//         payed: 4000,
//       },
//     ],
//   },
//   {
//     id: '2',
//     name: 'ble',
//     initialDate: new Date(2022, 11, 15, 23).toISOString(),
//     value: 8000,
//     percentageInterest: 25,
//     observations: 'string',
//     transactions: [
//       {
//         id: '0',
//         date: new Date(2022, 11, 15, 23).toISOString(),
//         payed: 0,
//       },
//       {
//         id: '1',
//         date: new Date(2023, 0, 19, 22).toISOString(),
//         payed: 1000,
//       },
//       {
//         id: '2',
//         date: new Date(2023, 0, 20).toISOString(),
//         payed: 1300,
//       },
//     ],
//   },
// ]);

// const a = [
//   { id: '0', date: subDays(new Date(), 30).toISOString(), payed: 0 },
//   { id: '1', date: new Date().toISOString(), payed: 250 },
//   { id: '2', date: new Date().toISOString(), payed: 1 },
//   { id: '2', date: new Date().toISOString(), payed: 2 },
//   { id: '2', date: new Date().toISOString(), payed: 0 },
// ];

// const b = a.reduce(
//   (acc, curr, index) => {
//     if (index === 0) return { ...acc, date: curr.date };
//     const diff = differenceInDays(new Date(curr.date), new Date(acc.date));
//     const interestPercentage = acc.interest * diff;
//     const interest = acc.value * interestPercentage + acc.interestToPay;
//     const payed = interest - curr.payed;
//     const value = payed < 0 ? acc.value - Math.abs(payed) : acc.value;
//     const interestToPay = payed < 0 ? 0 : payed;
//     const total = value + interestToPay;
//     const totalPayed = acc.totalPayed + curr.payed;
//     return { ...acc, total, totalPayed, value, interestToPay, date: curr.date };
//   },
//   {
//     value: 1000,
//     total: 1000,
//     payed: 0,
//     date: '',
//     interest: 0.25 / 30,
//     interestToPay: 0,
//     totalPayed: 0,
//   }
// );

// console.log(b);
