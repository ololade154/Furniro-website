let mobileNav = document.querySelector('.mobile-nav');
function openMenu() {
  mobileNav.style.right = '0';
}
function closeMenu() {
  mobileNav.style.right = '-200px';
}

const cart_icon = document.querySelector('.cart-icon');

const Products = [
  {
    id: 0,
    name: 'Syltherine',
    price_tag: 'new',
    description: 'Stylish cafe chair',
    price: 2500,
    image: '/IMAGES/product1.svg',
    quantity: 1,
  },
  {
    id: 1,
    name: 'Leviosa',
    price_tag: 'new',
    description: 'Stylish cafe chair',
    price: 2500,
    image: '/IMAGES/product2.svg',
    quantity: 1,
  },
  {
    id: 2,
    name: 'Lolito',
    price_tag: 'new',
    description: '',
    price: 2500,
    image: '/IMAGES/product3.svg',
    quantity: 1,
  },
  {
    id: 3,
    name: 'Respira',
    price_tag: 'new',
    description: '',
    price: 2500,
    image: '/IMAGES/product4.svg',
    quantity: 1,
  },
  {
    id: 4,
    name: 'Grifo',
    price_tag: 'new',
    description: 'Night lamp',
    price: 2500,
    image: '/IMAGES/product5.svg',
    quantity: 1,
  },
  {
    id: 5,
    name: 'Muggo',
    price_tag: 'new',
    description: 'Cute bed set',
    price: 2500,
    image: '/IMAGES/product6.svg',
    quantity: 1,
  },
  {
    id: 6,
    name: 'Pingky',
    price_tag: 'new',
    description: 'Cute bed set',
    price: 2500,
    image: '/IMAGES/product7.svg',
    quantity: 1,
  },
  {
    id: 7,
    name: 'Pingky',
    price_tag: 'new',
    description: 'Cute bed set',
    price: 2500,
    image: '/IMAGES/product7.svg',
    quantity: 1,
  },
];

const cart = JSON.parse(localStorage.getItem('carts')) || [];

const cartLogo = document.querySelectorAll('.cart-logo');
const modal = document.querySelector('.modal-wrapper'); // make sure this exists too

cartLogo.forEach((logo) => {
  logo.addEventListener('click', () => {
    modal.style.display = 'block';
    console.log('clicked');
    setTimeout(() => {
      modal.classList.remove('hidden');
    }, 10);
  });
});

const addItemToCart = (product) => {
  const cart = JSON.parse(localStorage.getItem('carts')) || [];
  const productExist = cart.find((el) => el.id === product.id);
  if (productExist) {
    productExist.quantity += 1;
  } else {
    product.quantity = 1;
    cart.push(product);
  }
  localStorage.setItem('carts', JSON.stringify(cart));
};

const productSection = document.querySelector('.product-display');

const productNode = (data) => {
  const product = document.createElement('div');
  product.className = 'product';

  const product_image = document.createElement('img');
  product_image.setAttribute('src', data?.image);

  const product_tag = document.createElement('h5');
  product_tag.innerHTML = data?.price_tag;

  product.appendChild(product_image);
  product.appendChild(product_tag);

  const product_text = document.createElement('div');
  product_text.className = 'product-text';

  const product_name = document.createElement('h6');
  product_name.innerHTML = data?.name;
  product_text.appendChild(product_name);

  const product_desc = document.createElement('p');
  product_desc.innerHTML = data?.description;
  product_text.appendChild(product_desc);

  const product_price = document.createElement('span');
  product_price.innerHTML = data?.price;
  product_text.appendChild(product_price);

  const button = document.createElement('button');
  button.innerHTML = 'Add to Cart';
  button.addEventListener('click', () => {
    addItemToCart(data);
    renderCart();
    // alert('Product added to cart!');
  });
  product_text.appendChild(button);

  product.appendChild(product_text);

  return product;
};

document.addEventListener('DOMContentLoaded', () => {
  const prod = Products.map((product) => productNode(product));

  console.log(prod, 'produ');
  productSection.append(...prod);
});

const IncreaseItemQuantity = (id) => {
  const cart = JSON.parse(localStorage.getItem('carts')) || [];

  const updatedCart = cart.map((item) =>
    item.id === id ? { ...item, quantity: item.quantity + 1 } : item
  );

  localStorage.setItem('carts', JSON.stringify(updatedCart));
  renderCart(); // this will now use the updated cart from localStorage
};

const DecreaseItemQuantity = (id) => {
  const cart = JSON.parse(localStorage.getItem('carts')) || [];

  const updatedCart = cart.map((item) =>
    item.id === id ? { ...item, quantity: item.quantity - 1 } : item
  );

  localStorage.setItem('carts', JSON.stringify(updatedCart));
  renderCart();
};

const deleteCartItem = (id) => {
  const cart = JSON.parse(localStorage.getItem('carts')) || [];
  const updatedCart = cart.filter((item) => item.id !== id);
  localStorage.setItem('carts', JSON.stringify(updatedCart));
  renderCart();
};

function createCartItem({ imageSrc, titleText, priceText, quantity, id }) {
  // Create the main cart item div
  const cartItem = document.createElement('div');
  cartItem.className = 'cart-item';

  // Create and append the image
  const img = document.createElement('img');
  img.className = 'cart-img';
  img.src = imageSrc;
  img.alt = '';
  cartItem.appendChild(img);

  // Create the right-side div
  const cartRight = document.createElement('div');
  cartRight.className = 'cart-right';

  // Title and price container
  const infoDiv = document.createElement('div');

  const title = document.createElement('h1');
  title.className = 'product-cart-title';
  title.textContent = titleText;

  const price = document.createElement('p');
  price.className = 'product-price';
  price.textContent = priceText;

  infoDiv.appendChild(title);
  infoDiv.appendChild(price);

  // Bottom section
  const bottomDiv = document.createElement('div');
  bottomDiv.className = 'bottom';

  const deleteIcon = document.createElement('img');
  deleteIcon.src = '/IMAGES/delete-icon.svg';
  deleteIcon.alt = '';
  deleteIcon.className = 'delete-icon';
  deleteIcon.addEventListener('click', () => {
    deleteCartItem(id);
  });
  bottomDiv.appendChild(deleteIcon);

  // Quantity button
  const quantityBtn = document.createElement('button');
  quantityBtn.className = 'product-increment-btn';

  ['-', quantity.toString(), '+'].forEach((text, index) => {
    const p = document.createElement('p');
    p.textContent = text;

    // Add click events only to "-" and "+"
    if (text === '+') {
      p.addEventListener('click', () => {
        IncreaseItemQuantity(id);
      });
    }

    if (text === '-') {
      p.addEventListener('click', () => {
        if (quantity > 1) {
          DecreaseItemQuantity(id);
        }
      });
    }

    quantityBtn.appendChild(p);
  });

  bottomDiv.appendChild(quantityBtn);

  // Append everything
  cartRight.appendChild(infoDiv);
  cartRight.appendChild(bottomDiv);
  cartItem.appendChild(cartRight);

  return cartItem;
}

const cartContainer = document.querySelector('.modal-content');
const closeModalIcon = document.querySelector('.modal-close');

// const modal = document.querySelector('.modal-wrapper');

closeModalIcon.addEventListener('click', () => {
  modal.classList.add('hidden'); // This will trigger the fade-out effect

  setTimeout(() => {
    modal.style.display = 'none'; // Hide the modal
  }, 300); // Time must match the CSS transition duration
});

function renderCart() {
  const cart = JSON.parse(localStorage.getItem('carts')) || [];
  cartContainer.innerHTML = ''; // clear previous items

  const numberOfCartItems = cart.length;
  const cartNums = document.querySelectorAll('.no-of-item');

  if (numberOfCartItems > 0) {
    cartNums.forEach((cartNum) => {
      cartNum.classList.remove('hidden');
      cartNum.style.display = 'block';
      cartNum.innerHTML = numberOfCartItems;
    });
  }

  if (cart.length === 0) {
    const h1 = document.createElement('h1');
    h1.textContent = 'No Cart Item';
    h1.className = 'no-cart-item';
    cartContainer.appendChild(h1);
    return;
  }

  cart.forEach((it) => {
    const cartItemElement = createCartItem({
      imageSrc: it?.image,
      titleText: it?.name,
      priceText: it.price,
      quantity: it.quantity,
      id: it.id,
    });
    cartContainer.appendChild(cartItemElement);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderCart();
});
