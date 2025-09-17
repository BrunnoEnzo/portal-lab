// src/components/ui/Table.tsx
'use client';
import {
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
} from '@mui/material';
import React from 'react';

// Define o formato de um objeto de configuração da coluna
export interface ColumnDef<T> {
  header: string; // O texto do cabeçalho
  accessorKey: keyof T; // A chave do objeto de dados para acessar o valor
}

// Props da nossa tabela genérica
interface TableProps<T> {
  data: T[]; // Um array de dados de qualquer tipo
  columns: ColumnDef<T>[]; // A configuração das colunas
}

export const Table = <T extends { id: any }>({ data, columns }: TableProps<T>) => {
  return (
    <Box sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer component={Paper}>
        <MuiTable stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.header}>{column.header}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id}>
                {columns.map((column) => (
                  <TableCell key={`${row.id}-${String(column.accessorKey)}`}>
                    {String(row[column.accessorKey])}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </MuiTable>
      </TableContainer>
    </Box>
  );
};