export const formatDate = (inputDate: string) => {
  const date = new Date(inputDate);

  const month = date.toLocaleString('en-US', { month: 'short' });
  const day = date.getDate();
  const year = date.getFullYear();

  return `${month} ${day}, ${year}`;
};
