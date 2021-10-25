export class DateService {
  private readonly today: Date;

  constructor() {
    this.today = new Date();
  }

  public getFrenchDate(): string {
    return new Intl.DateTimeFormat("fr-Fr", {
      dateStyle: "full"
    }).format(this.today);
  }

  public getMonthDay(): number {
    return this.today.getDate();
  }

  public getMonthLength(): number {
    const year = this.today.getFullYear();
    const month = this.today.getMonth();
    return new Date(year, month, 0).getDate();
  }

  public isValidMonthDay(day: any): boolean {
    return day >= 1 && day <= 31;
  }

  public isValidMonthLength(length: any): boolean {
    return length >= 28 && length <= 31;
  }
}

const dateService = new DateService();
export default dateService;