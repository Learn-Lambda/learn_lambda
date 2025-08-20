export const ObjectIsNotEmpty = (obj: Object | undefined) => {
  if (obj === undefined) {
    return false;
  }
  return Object.keys(obj).length !== 0;
};
