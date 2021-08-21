interface RowData {
  index: number;
  type: string;
}

export interface ValidateData {
  name: string;
  columnIndex: number;
  checkType: string;
  isValid: boolean;
  invalidRows: RowData[];
}
