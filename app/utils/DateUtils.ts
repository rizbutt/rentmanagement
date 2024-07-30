// Utility functions for date management
export class DateUtils {
  // Format date
  formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  // Calculate next payment date
  calculateNextPaymentDate(joinDate: Date): Date {
    const nextMonth = new Date(joinDate);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    return nextMonth;
  }
}
