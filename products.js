const products = [
  {
    id: "vans-os-01",
    name: "Vans Old Skool sneakers",
    price: 3198.00,
    stock: 14,
    gallery: [
      { main: "assets/Shoes/shoes-blue1.webp", thumb: "assets/Shoes/shoes-blue%20icon1.webp" },
      { main: "assets/Shoes/shoes-blue2.webp", thumb: "assets/Shoes/shoes-blue%20icon2.webp" },
      { main: "assets/Shoes/shoes-blue3.webp", thumb: "assets/Shoes/shoes-blue%20icon3.webp" },
      { main: "assets/Shoes/shoes-blue4.webp", thumb: "assets/Shoes/shoes-blue%20icon4.webp" }
    ],
    sizes: [5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10]
  },
  {
    id: "salomon-acs-02",
    name: "Salomon ACS + OG",
    price: 11990.00,
    stock: 5,
    gallery: [
      { main: "assets/Shoes/shoes-brown1.webp", thumb: "assets/Shoes/shoes-brown%20icon1.webp" }, // Fixed closing bracket here
      { main: "assets/Shoes/shoes-brown2.webp", thumb: "assets/Shoes/shoes-brown%20icon2.webp" },
      { main: "assets/Shoes/shoes-brown3.webp", thumb: "assets/Shoes/shoes-brown%20icon3.webp" },
      { main: "assets/Shoes/shoes-brown4.webp", thumb: "assets/Shoes/shoes-brown%20icon4.webp" }
    ],
    sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11]
  },
  {
    id: "nb-p400-03",
    name: "New Balance P400", 
    price: 7795.00,
    stock: 9,
    gallery: [
      { main: "assets/Shoes/shoes-maroon1.webp", thumb: "assets/Shoes/shoes-maroon%20icon1.webp" },
      { main: "assets/Shoes/shoes-maroon2.webp", thumb: "assets/Shoes/shoes-maroon%20icon2.webp" },
      { main: "assets/Shoes/shoes-maroon3.webp", thumb: "assets/Shoes/shoes-maroon%20icon3.webp" },
      { main: "assets/Shoes/shoes-maroon4.webp", thumb: "assets/Shoes/shoes-maroon%20icon4.webp" }
    ],
    sizes: [6, 7, 8, 9, 10, 11]
  },
  {
    id: "jordan-j4-04",
    name: "Air Jordan 4 Retro Men's Basketball Shoes",
    price: 12095.00,
    stock: 3,
    gallery: [
      { main: "assets/Shoes/shoes-red1.webp", thumb: "assets/Shoes/shoes-red%20icon1.webp" },
      { main: "assets/Shoes/shoes-red2.webp", thumb: "assets/Shoes/shoes-red%20icon2.webp" },
      { main: "assets/Shoes/shoes-red3.webp", thumb: "assets/Shoes/shoes-red%20icon3.webp" },
      { main: "assets/Shoes/shoes-red4.webp", thumb: "assets/Shoes/shoes-red%20icon4.webp" }
    ],
    sizes: [8, 8.5, 9, 9.5, 10, 10.5, 11, 12]
  },
  {
    id: "jordan-j6-retro",
    name: "Air Jordan 4 Retro Mens Basketball Shoes",
    price: 10895.00,
    stock: 5,
    gallery: [
      { main: "assets/Shoes/shoes-blackred1.webp", thumb: "assets/Shoes/shoes-blackred%20icon1.webp" },
      { main: "assets/Shoes/shoes-blackred2.webp", thumb: "assets/Shoes/shoes-blackred%20icon2.webp" },
      { main: "assets/Shoes/shoes-blackred3.webp", thumb: "assets/Shoes/shoes-blackred%20icon3.webp" },
      { main: "assets/Shoes/shoes-blackred4.webp", thumb: "assets/Shoes/shoes-blackred%20icon4.webp" }
    ],
    sizes: [8, 8.5, 9]
  },
  {
    id: "cta-throwback-01",
    name: "Chuck Taylor All Star Throwback Mens Sneakers",
    price: 4595.00,
    stock: 12,
    gallery: [
      { main: "assets/Shoes/shoes-gray1.webp", thumb: "assets/Shoes/shoes-gray%icon1.webp" },
      { main: "assets/Shoes/shoes-gray2.webp", thumb: "assets/Shoes/shoes-gray%icon2.webp" },
      { main: "assets/Shoes/shoes-gray3.webp", thumb: "assets/Shoes/shoes-gray%icon3.webp" },
      { main: "assets/Shoes/shoes-gray4.webp", thumb: "assets/Shoes/shoes-gray%icon4.webp" }
    ],
    sizes: [8.5, 9, 9.5, 10, 10.5, 11]
  }
];

function renderProducts(productsList) {
  const gridContainer = document.getElementById('product-grid');
  gridContainer.innerHTML = ''; // Clear container

  productsList.forEach(product => {
    // Format currency to Philippine Peso (PHP)
    const formattedPrice = new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP'
    }).format(product.price);

    // Extract the primary display image
    const mainImg = product.gallery[0]?.main || 'placeholder.jpg';

    // Generate Card Structure
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <div class="product-image-wrapper">
        <img src="${mainImg}" alt="${product.name}" loading="lazy">
      </div>
      <div class="product-info">
        <h2 class="product-name">${product.name}</h2>
        <p class="product-price">${formattedPrice}</p>
      </div>
    `;

    gridContainer.appendChild(card);
  });
}

renderProducts(products);