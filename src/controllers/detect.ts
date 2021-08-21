import { AppError } from "./../types/error";
import { RequestHandler } from "express";
import { promises as fs } from "fs";

type Data = string[][];

interface ColTypeFreq {
  type: string;
  frequency: number;
}

interface ColType {
  mainType: ColTypeFreq;
  otherTypes: ColTypeFreq[];
}

interface ColData {
  columnName: string;
  columnTypes: ColType;
}

export const detectSchema: RequestHandler = async (req, res, next) => {
  const fileError: AppError = new Error("error reading uploaded file");
  fileError.status = 404;
  const colsData: ColData[] = [];

  if (req.file?.path) {
    try {
      await fs.access(req.file?.path);
      const file = await fs.readFile(req.file?.path, "utf8");
      const fileRows = file.split("\r\n");
      const data: Data = fileRows.map((item) =>
        item.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/)
      );
      data.pop();
      if (data.length < 2) {
        fileError.message = "atleast 2 rows are required";
        throw fileError;
      }

      const colNames = getColNames(data);
      for (let i = 0; i < colNames.columnNumber; i++) {
        const colType = detectColValues(data, i);
        const col: ColData = {
          columnName: colNames.columns[i],
          columnTypes: colType,
        };
        colsData.push(col);
      }
    } catch (err) {
      console.log(err);
      return next(fileError);
    }
  } else {
    return next(fileError);
  }

  return res.json({
    status: "success",
    message: "successfully detected column types",
    data: colsData,
  });
};

function getDataType(value: unknown) {
  let dataType = "unknown";

  if (!value || typeof value !== "string" || value === "") return dataType;
  const hasLetters = /[a-zA-Z]/g;

  if (!hasLetters.test(value)) {
    const floatVal = parseFloat(value);
    dataType = "float";

    if (Number.isInteger(floatVal)) dataType = "integer";
  } else {
    const stringVal = value.toLowerCase();

    if (stringVal === "true" || stringVal === "false") dataType = "boolean";
    else dataType = "string";
  }

  return dataType;
}

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
