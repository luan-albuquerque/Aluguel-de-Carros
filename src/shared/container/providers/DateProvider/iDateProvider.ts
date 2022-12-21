interface iDateProvider {
  compareInHours(startDate: Date, endDate: Date): number;
  compareInDays(startDate: Date, endDate: Date): number;
  compareIfBefore(startDate: Date, endDate: Date): boolean;
  convertToUTC(date: Date): string;
  addDays(days: number): Date;
  addHours(hours: number): Date;
  dateNow(): Date;
}

export { iDateProvider };
