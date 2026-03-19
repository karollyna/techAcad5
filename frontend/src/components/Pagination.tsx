export const Pagination = ({ page, total, onChange }: { page: number; total: number; onChange: (page: number) => void }) => {
  const pages = Math.max(1, Math.ceil(total / 10));
  return <div className="pagination">{Array.from({ length: pages }, (_, index) => <button key={index} onClick={() => onChange(index + 1)} disabled={page === index + 1}>{index + 1}</button>)}</div>;
};
