import { promises as fs } from "fs";
import { Data } from "../types/csv";

export async function readCsvFile(path: string): Promise<Data> {
  const file = await fs.readFile(path, "utf8");
  const fileRows = file.split("\r\n");
  const data: Data = fileRows.map((item) =>
    item.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/)
  );
  data.pop();

  return data;
}
