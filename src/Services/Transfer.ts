export const banksIn = ["Ngân hàng Reen bank"];

export const isBankInSystem = (name: string): boolean => {
  return banksIn.some(
    (b) => b.trim().toLowerCase() === name.trim().toLowerCase()
  );
};