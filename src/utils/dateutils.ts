export function GetDateFromString(dateAsString: string) {
  const splitFields = dateAsString.split("-");
  return new Date(
    Number.parseInt(splitFields[2], 10),
    Number.parseInt(splitFields[1], 10) - 1,
    Number.parseInt(splitFields[0], 10)
  );
}

export const DateFilter = {
  comparator: (date1: Date, date2: string) => {
    const cellDate = GetDateFromString(date2);

    if (date1.getTime() === cellDate.getTime()) {
      return 0;
    }

    if (cellDate < date1) {
      return -1;
    }

    if (cellDate > date1) {
      return 1;
    }
    return 1;
  }
};
