export const getPagination = (page = 1, limit = 10): { skip: number; take: number } => ({
  skip: (page - 1) * limit,
  take: limit
});
