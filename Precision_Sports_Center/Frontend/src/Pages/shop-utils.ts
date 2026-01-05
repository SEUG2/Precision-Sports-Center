import { Product } from "./shop-data";

export function calculateDiscountPercentage(product: Product): number {
  if (!product.discountPrice || product.discountPrice >= product.price) {
    return 0;
  }
  const diff = product.price - product.discountPrice;
  return Math.round((diff / product.price) * 100);
}

export function getProductPrice(product: Product): number {
  return product.discountPrice ?? product.price;
}
