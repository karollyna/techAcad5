import type React from 'react';
export const Table = ({ headers, rows }: { headers: string[]; rows: React.ReactNode }) => (
  <table>
    <thead><tr>{headers.map((header) => <th key={header}>{header}</th>)}</tr></thead>
    <tbody>{rows}</tbody>
  </table>
);
