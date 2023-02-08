const reformatForReactSelect = (array: any[], value: string, label: string) => {
  const modifiedArray = [];
  for (let initialVal of array) {
    modifiedArray.push({ value: initialVal[value], label: initialVal[label] });
  }
  return modifiedArray;
};

export default reformatForReactSelect;
