export const sortHistoryByTimestamp = (histories) => {
  histories.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  return histories;
};
