export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
const clean = (value: string): string => value.replace(/\D/g, '');
const digit = (cpf: string, factor: number): number => {
  const total = cpf.slice(0, factor - 1).split('').reduce((sum, item, index) => sum + Number(item) * (factor - index), 0);
  const result = (total * 10) % 11;
  return result === 10 ? 0 : result;
};
export const isValidCpf = (value: string): boolean => {
  const cpf = clean(value);
  return cpf.length === 11 && !/^(\d)\1+$/.test(cpf) && digit(cpf, 10) === Number(cpf[9]) && digit(cpf, 11) === Number(cpf[10]);
};
