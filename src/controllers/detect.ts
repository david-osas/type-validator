import { RequestHandler } from "express";
import { ColData, ColType } from "../types/detect";
import { Data } from "../types/csv";
import { getDataType } from "../utils/dataType";

export const detectTypes: RequestHandler = (req, res, next) => {
  const colsData: ColData[] = [];
  const data: Data = res.locals.data;

  const colNames = getColNames(data);
  for (let i = 0; i < colNames.columnNumber; i++) {
    const colType = detectColValues(data, i);
    const col: ColData = {
      columnName: colNames.columns[i],
      columnTypes: colType,
    };
    colsData.push(col);
  }

  return res.json({
    status: "success",
    message: "successfully detected column types",
    data: colsData,
  });
};

function getColNames(data: Data) {
  const colData: { columnNumber: number; columns: string[] } = {
    columnNumber: 0,
    columns: [],
  };

  colData.columnNumber = data[0].length;
  for (let i = 0; i < colData.columnNumber; i++) {
    colData.columns.push(data[0][i]);
  }

  return colData;
}

function detectColValues(data: Data, index: number) {
  const freqMap: { [key: string]: number } = {};
  const col: ColType = { mainType: { type: "", frequency: 0 }, otherTypes: [] };

  for (let i = 1; i < data.length; i++) {
    const dataType = getDataType(data[i][index]);
    if (Object.prototype.hasOwnProperty.call(freqMap, dataType)) {
      freqMap[dataType]++;
    } else {
      freqMap[dataType] = 1;
    }
  }

  const freqList = Object.entries(freqMap);
  freqList.sort((a, b) => b[1] - a[1]);
  col.mainType.type = freqList[0][0];
  col.mainType.frequency = freqList[0][1];
  for (let i = 1; i < freqList.length; i++) {
    const item = { type: freqList[i][0], frequency: freqList[i][1] };
    col.otherTypes.push(item);
  }

  return col;
}
