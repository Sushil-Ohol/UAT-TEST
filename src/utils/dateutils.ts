export const DateFilter = {
  comparator: (value1: string, value2: string): number => {
    const date1 = new Date(value1);
    const date2 = new Date(value2);
    if (date1 === date2) {
      return 0;
    }
    return date1 > date2 ? 1 : -1;
  }
};
