export class DateService {
    today;
    constructor() {
        this.today = new Date();
    }
    getFrenchDate() {
        return new Intl.DateTimeFormat("fr-Fr", {
            dateStyle: "full"
        }).format(this.today);
    }
    getMonthDay() {
        return this.today.getDate();
    }
    getMonthLength() {
        const year = this.today.getFullYear();
        const month = this.today.getMonth();
        return new Date(year, month, 0).getDate();
    }
    isValidMonthDay(day) {
        return day >= 1 && day <= 31;
    }
    isValidMonthLength(length) {
        return length >= 28 && length <= 31;
    }
}
const dateService = new DateService();
export default dateService;
