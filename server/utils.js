export const sortCaseInsensitive = (sortField, sortOrder) => (a, b) => {
  const aField = String(a[sortField]).normalize().toLowerCase();
  const bField = String(b[sortField]).normalize().toLowerCase();

  return sortOrder === 'desc'
    ? bField.localeCompare(aField)
    : aField.localeCompare(bField);
};

export const filterByValuesCaseInsensitive = filter => user => {
  const filterLowerCaseTrimmed = filter.normalize().toLowerCase().trim();

  return Object.values(user).some(value =>
    String(value).normalize().toLowerCase().includes(filterLowerCaseTrimmed));
};
