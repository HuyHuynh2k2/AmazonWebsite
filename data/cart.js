// set up the default cart
export let cart;

loadFromMemory();

export function loadFromMemory() {
  cart = JSON.parse(localStorage.getItem('cart'));

  if(!cart) {
    cart = [
      {
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 2,
        deliveryOption: '1'
      }
      , 
      {
        productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity: 1,
        deliveryOption: '2'
      }
    ];
  }
}

function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId) {
  const productQuantity = Number(document.querySelector(`.js-quantity-selector-${productId}`).value);

  // in case the item already exist
  let matchedItem;

  cart.forEach((item) => {
    if(item.productId === productId) {
      matchedItem = item;
    }
  });

  if(matchedItem) {
    matchedItem.quantity += productQuantity;
  } else {
    cart.push(
      {
        productId: productId,
        quantity: productQuantity,
        deliveryOption: '1'
      }
    );
  }
  saveToStorage();
}

export function removeFromCart(productId) {
  let newCart = [];
  cart.forEach((product) => {
    if(!(product.productId === productId)) {
      newCart.push(product);
    }
  });
  cart = newCart;

  saveToStorage();
}

export function updateProductQuantity(productId, newQuantity) {
  const matchedProduct = cart.find((product) => product.productId === productId); 

  if (matchedProduct) {
    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else {
      matchedProduct.quantity = newQuantity; 
    }

    saveToStorage(); 
  }
}


export function getCurrentCartQuantity() {
  let cartQuantity = 0;
  cart.forEach((item) => {
    cartQuantity += item.quantity;
  }); 
  return cartQuantity;
}






