export const voidStartingSpaceInput = (e: any) => {
  if (/^\s/.test(e.target.value)) e.target.value = "";
};
