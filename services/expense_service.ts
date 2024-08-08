import { ExpenseRepository } from '../repositories/expense_repository';
import { IExpenses } from '@/types/models_types/expenses_type';
export class ExpenseService {
  private ExpenseRepository: ExpenseRepository;

  constructor() {
    this.ExpenseRepository = new ExpenseRepository();
  }

  async addNewExpense(ExpenseData: IExpenses): Promise<IExpenses> {
    return await this.ExpenseRepository.create(ExpenseData);
  }
 

  
}

export default ExpenseService