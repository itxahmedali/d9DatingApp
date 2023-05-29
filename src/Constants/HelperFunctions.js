export const handleImageLoad = setLoading => {
  setLoading(false);
};
export function formatUSDPrice(price) {
  if (isNaN(price)) {
    return 'Invalid Price';
  }
  const roundedPrice = Number(price).toFixed(2);
  const parts = roundedPrice.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return '$' + parts.join('.');
}
