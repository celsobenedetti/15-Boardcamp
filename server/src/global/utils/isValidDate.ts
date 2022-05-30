import moment from "moment";

export function validateDate(date: Date): boolean {
  return moment(date, "YYYY-MM-DD", true).isValid();
}
