const isFieldEmpty = (field) => !field || field.trim() === "";
const isValueZero = (value) => Number(value) === 0;
const isArrayEmpty = (array) => !array || array.length === 0;
const doseTheNameExist = (name, array) =>
  array.some((item) => item.name === name);

const validation = {
  isFieldEmpty,
  isValueZero,
  isArrayEmpty,
  doseTheNameExist,
};

export default validation;
