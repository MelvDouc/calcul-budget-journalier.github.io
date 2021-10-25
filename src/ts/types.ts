export interface BudgetInfoInterface {
  funds: number | null;
  monthDay: number | null;
  monthLength: number | null;
  nextIncomeDay: number | null;
}

export interface BudgetEventNamesInterface {
  NEW_BUDGET: string;
  RESET_INPUTS: string;
}