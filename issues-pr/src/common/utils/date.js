import moment from "moment";

export const dateToStringDate = (date) => moment(date).format("DD-MM-YYYY");
