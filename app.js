const menu = document.querySelector('.menu');
const ham = document.querySelector('.ham');
const closeIcon = document.querySelector('.close');

ham.addEventListener('click', () => {
    menu.classList.toggle('show');
});

closeIcon.addEventListener('click', () => {
    menu.classList.remove('show');
});

// Image slider functionality
const images = document.querySelectorAll('.img-slider .img');
let currentIndex = 0;

function showImage(index) {
    images.forEach((img, i) => {
        img.style.display = i === index ? 'block' : 'none';
    });
}

function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
}

// Automatically change images every 3 seconds
setInterval(nextImage, 3000);
showImage(currentIndex); // Show the first image initially

// Search functionality
const searchInput = document.getElementById('input');
searchInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        const query = searchInput.value;
        console.log(`Searching for: ${query}`);
        // You can add functionality to filter products based on `query`
    }
});
// Sample product data (this can be extended or fetched from a server)
const products = [
  { name: "Shoes", category: "Fashion", price: "$5", image: "https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" },
  { name: "Men's T-Shirt", category: "Fashion", price: "$6.34", image: "https://images.pexels.com/photos/3649765/pexels-photo-3649765.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" },
  { name: "Jeans", category: "Fashion", price: "$9", image: "https://media.istockphoto.com/photos/folded-blue-jeans-on-a-white-background-modern-casual-clothing-flat-picture-id1281304280" },
  { name: "Watch", category: "Accessories", price: "$9.1", image: "https://images.pexels.com/photos/8839887/pexels-photo-8839887.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" },
  { name: "Smartphone", category: "Electronics", price: "$20", image: "https://images.pexels.com/photos/6858618/pexels-photo-6858618.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" },
  // Add more products as needed
];

// Function to fetch suggested products based on the selected category
function getSuggestions(category) {
  // Filter products by category (you can also add more criteria)
  return products.filter(product => product.category === category);
}

// Function to display suggested products
function displaySuggestions(suggestedProducts) {
  const suggestionsContainer = document.getElementById('suggested-items');
  suggestionsContainer.innerHTML = ''; // Clear existing suggestions

  // Add each suggested product to the container
  suggestedProducts.forEach(product => {
    const item = document.createElement('div');
    item.classList.add('suggested-item');
    item.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <div class="name">${product.name}</div>
      <div class="price">${product.price}</div>
    `;
    suggestionsContainer.appendChild(item);
  });
}

// Example: Display suggestions when a product category is clicked
document.querySelectorAll('.items').forEach(item => {
  item.addEventListener('click', () => {
    const category = item.querySelector('.name').textContent; // Assume category matches name (customize as needed)
    const suggestions = getSuggestions(category);
    displaySuggestions(suggestions);
  });
});
// Function to display products based on a given list (filtered or full)
function displayProducts(productList) {
  const container = document.querySelector(".container");
  container.innerHTML = ''; // Clear existing products

  productList.forEach(product => {
    const item = document.createElement('div');
    item.classList.add('items');
    item.innerHTML = `
      <div class="img"><img src="${product.image}" alt="${product.name}"></div>
      <div class="name">${product.name}</div>
      <div class="price">${product.price}</div>
      <div class="info">${product.description}</div>
    `;
    container.appendChild(item);
  });
}

// Event listener for search functionality
document.getElementById('searchInput').addEventListener('input', (event) => {
  const searchTerm = event.target.value.toLowerCase();

  // Filter products by name or category
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm) ||
    product.category.toLowerCase().includes(searchTerm)
  );

  // Display filtered products
  displayProducts(filteredProducts);
});

// Initially display all products
displayProducts(products);
const product = [
  {
    id: 1,
    name: "Shoes",
    category: "Fashion",
    price: "$5",
    description: "Lorem ipsum dolor sit amet consectetur.",
    image: "https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    recommendations: [2, 3] // IDs of related products
  },
  {
    id: 2,
    name: "Men's T-Shirt",
    category: "Fashion",
    price: "$6.34",
    description: "Lorem ipsum dolor sit.",
    image: "https://images.pexels.com/photos/3649765/pexels-photo-3649765.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    recommendations: [1, 3]
  },
  {
    id: 3,
    name: "Jeans",
    category: "Fashion",
    price: "$9",
    description: "Lorem ipsum dolor sit amet.",
    image: "https://media.istockphoto.com/photos/folded-blue-jeans-on-a-white-background-modern-casual-clothing-flat-picture-id1281304280",
    recommendations: [1, 2]
  }
  // ... other products
];
// Function to display recommendations for a selected product
function displayRecommendations(recommendedIds) {
  const recommendedContainer = document.getElementById("recommended-items");
  recommendedContainer.innerHTML = ''; // Clear previous recommendations

  // Find recommended products based on IDs
  const recommendedProducts = products.filter(product => recommendedIds.includes(product.id));

  // Display each recommended product
  recommendedProducts.forEach(product => {
    const item = document.createElement('div');
    item.classList.add('items');
    item.innerHTML = `
      <div class="img"><img src="${product.image}" alt="${product.name}"></div>
      <div class="name">${product.name}</div>
      <div class="price">${product.price}</div>
      <div class="info">${product.description}</div>
    `;
    recommendedContainer.appendChild(item);
  });
}

// Event listener to show recommendations on product click
document.querySelectorAll('.items').forEach((item, index) => {
  item.addEventListener('click', () => {
    const product = products[index];
    displayRecommendations(product.recommendations);
  });
});
