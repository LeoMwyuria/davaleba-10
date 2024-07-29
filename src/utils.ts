import fs from 'fs/promises';
import path from 'path';

const dataFilePath = path.join(__dirname, '../src/data.json');

export interface Expense {
  id: number;
  name: string;
  cost: number;
  createdAt: string;
}

export const readData = async (): Promise<Expense[]> => {
  const data = await fs.readFile(dataFilePath, 'utf-8');
  return JSON.parse(data);
};

export const writeData = async (data: Expense[]): Promise<void> => {
  await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2));
};
