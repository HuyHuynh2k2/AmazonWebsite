export let products = [];

export async function loadProductsFetch() {
  const response = await fetch('https://supersimplebackend.dev/products');
  const productsData = await response.json(); // Get the data from the response
  
  // Map over productsData instead of the empty products array
  products = productsData.map((item) => {
    return new Product(item);
  });
}

class Product {
  id;
  images;
  name;
  rating;
  priceCents;

  constructor(productDetails) {
    this.id = productDetails.id;
    this.images = productDetails.image;
    this.name = productDetails.name;
    this.rating = productDetails.rating;
    this.priceCents = productDetails.priceCents;
  }
}
