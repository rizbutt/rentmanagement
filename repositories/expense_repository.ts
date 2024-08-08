import Expense from '../models/expense_model';
import { IExpenses } from '@/types/models_types/expenses_type';

export class ExpenseRepository {
  async create(ExpenseData: IExpenses): Promise<IExpenses> {
    const expense = new Expense(ExpenseData);
    
    return await expense.save();
  }

 
}