export type Data = string[][];

export interface ColTypeFreq {
  type: string;
  frequency: number;
}

export interface ColType {
  mainType: ColTypeFreq;
  otherTypes: ColTypeFreq[];
}

export interface ColData {
  columnName: string;
  columnTypes: ColType;
}
