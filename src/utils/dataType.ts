export function getDataType(value: unknown): string {
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
