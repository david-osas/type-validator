# type-validator

An API that detects and validates data types of input data. The type validator API currently has two features,  type detection and type validation. Input data is sent to the API in a CSV file. Only one CSV file can be uploaded in a request. The current maximum size for an uploaded CSV file is 1MB. The uploaded file must contain a minimum of two rows, the first row is automatically taken as the title row for the columns.

### Relevant links

[API Docs link](https://documenter.getpostman.com/view/10840074/TzzDJutH)

### Supported types 📃

Going through the documentation a GET request can be made to fetch currently supported types used by type-validator for its operations. The supported types can also be useful in making detection or validation requests.

### Detection 🔍

For this feature, a CSV file is uploaded containing input data thought off in rows and columns. The API scans the data in the file and returns a JSON response stating the "main types" in each column found in the CSV file, and the frequencies of the types. If more than one type is found in a column it also states the "other types" found in each column and their respective frequencies. Values in the "other types" array are sorted in descending order, based on frequency.


### Validation ✅

For this feature, a CSV file is uploaded containing input data, thought off in rows and columns, and an array of strings that contain the types to be used for validation. The indexes in the types array should correspond to the order of columns in the CSV file, i.e. index 0, containing a string value representing the type to be validated, will correspond to the first column in the CSV file. The values in the array of types should be types supported by type-validator. If a value is not a supported type, the validation process will be stopped and an error message will be returned. Upon completion of the validation process, a JSON response is returned stating whether a column in the CSV file meets the specified type validation for it. If there are cells that do not meet their specified column type, type-validator will return an array containing the row index and type of each invalid cell for each column. 


### The future 🔮

The type-validator application is a young project, and more features can be implemented into it. So watch out for more type magic in the future 🎉🎉🎉
