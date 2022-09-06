export const camelCase = (text: string) => {
  const newText = text.replace(/[-_\s.]+(.)?/g, (_: any, c: any) =>
    c ? c.toUpperCase() : ""
  );
  return newText.substring(0, 1).toLowerCase() + newText.substring(1);
};
