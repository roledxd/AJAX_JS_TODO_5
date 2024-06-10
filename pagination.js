module.exports = (page, pages, perPage) => {
  // Initialize with the first three pages
  let elements = [1, 2, 3];
  
  // Add ellipsis if current page is greater than 2
  if (page > 2) {
    elements.push("...");
  }
  
  // Add pages around the current page
  if (page < pages - 1) {
    for (let i = Math.max(1, page - 1); i <= Math.min(pages, page + 1); i++) {
      elements.push(i);
    }
  }

  // Add ellipsis if current page is less than pages - 2
  if (page < pages - 2) {
    elements.push("...");
  }

  // Add the last three pages
  for (let i = Math.max(1, pages - 2); i <= pages; i++) {
    elements.push(i);
  }

  // Remove duplicates and sort the elements
  elements = [...new Set(elements)].sort((a, b) => a - b);

  // Return the pagination object
  return {
    pages,
    current: page,
    perPage,
    onFirstPage: page === 1,
    onLastPage: page === pages,
    elements,
  };
};
