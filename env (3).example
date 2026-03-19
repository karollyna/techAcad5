const clean = (value: string): string => value.replace(/\D/g, '');
const invalid = (cpf: string): boolean => cpf.length !== 11 || /^(\d)\1+$/.test(cpf);
const digit = (cpf: string, factor: number): number => {
  const total = cpf.split('').slice(0, factor - 1).reduce((sum, item, index) => sum + Number(item) * (factor - index), 0);
  const result = (total * 10) % 11;
  return result === 10 ? 0 : result;
};
export const isValidCpf = (value: string): boolean => {
  const cpf = clean(value);
  return !invalid(cpf) && digit(cpf, 10) === Number(cpf[9]) && digit(cpf, 11) === Number(cpf[10]);
};
