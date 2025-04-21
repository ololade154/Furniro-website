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
console.log(cart, 'cart');

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
    alert('Product added to cart!');
  });
  product_text.appendChild(button);

  product.appendChild(product_text);

  return product;
};

const prod = Products.map((product) => productNode(product));

productSection.append(...prod);
