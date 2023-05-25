export function sortData(data, sortField, sortOrder) {
  //   const sortedData = data.sort((a, b) => {
  //     let fieldA = a[sortField].replace(/[$%"',[\]\s]/g, "");
  //     let fieldB = b[sortField].replace(/[$%"',[\]\s]/g, "");
  //     if (typeof fieldA === "string") {
  //       fieldA = fieldA.toLowerCase();
  //       fieldB = fieldB.toLowerCase();
  //     }

  //     if (!isNaN(fieldA) && !isNaN(fieldB)) {
  //       fieldA = Number(fieldA);
  //       fieldB = Number(fieldB);
  //     }
  //   });

  const sortedData = data.sort((a, b) => {
    let fieldA = a[sortField].replace(/[$%"',[\]\s]/g, "");
    let fieldB = b[sortField].replace(/[$%"',[\]\s]/g, "");
    if (typeof fieldA === "string") {
      fieldA = fieldA.toLowerCase();
      fieldB = fieldB.toLowerCase();
    }

    if (!isNaN(fieldA) && !isNaN(fieldB)) {
      fieldA = Number(fieldA);
      fieldB = Number(fieldB);
    }

    if (fieldA < fieldB) {
      return sortOrder === "asc" ? -1 : 1;
    }
    if (fieldA > fieldB) {
      return sortOrder === "asc" ? 1 : -1;
    }
    return 0;
  });

  return sortedData;
}
