import { AppError } from "./../types/error";
import { RequestHandler } from "express";
import { getDataType } from "../utils/dataType";
import { Data } from "../types/csv";
import { ValidateData } from "../types/validate";

//columns: [type]

export const validateCsv: RequestHandler = (req, res, next) => {
  const reqErr: AppError = new Error("invalid payload passed");
  reqErr.status = 404;

  if (!req.body.columns) return next(reqErr);

  const supportedTypes = new Set([
    "boolean",
    "float",
    "integer",
    "string",
    "unknown",
  ]);
  const data: Data = res.locals.data;
  const columns: string[] = req.body.columns;

  if (data[0].length !== columns.length) return next(reqErr);

  const validateData: ValidateData[] = [];

  for (let i = 0; i < columns.length; i++) {
    if (!supportedTypes.has(columns[i])) {
      reqErr.message = `Invalid type given. Type ${columns[i]} is not supported`;
      return next(reqErr);
    }
    const col: ValidateData = {
      name: data[0][i],
      columnIndex: i,
      checkType: columns[i],
      isValid: true,
      invalidRows: [],
    };

    for (let j = 1; j < data.length; j++) {
      const row = data[j];
      const dataType = getDataType(row[i]);

      if (dataType !== columns[i]) {
        if (col.isValid) col.isValid = false;
        col.invalidRows.push({ index: j, type: dataType });
      }
    }

    validateData.push(col);
  }

  return res.json({
    status: "success",
    message: "vaidation process is complete",
    data: validateData,
  });
};
