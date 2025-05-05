const products = [
    {
        image: "https://picsum.photos/200/200?1",
        name: "Wireless Headphones",
        price: 7999,
        description: "Noise-cancelling over-ear headphones."
    },
    {
        image: "https://picsum.photos/200/200?2",
        name: "Smartwatch",
        price: 12999,
        description: "Fitness tracking smartwatch."
    },
    {
        image: "https://picsum.photos/200/200?3",
        name: "Gaming Mouse",
        price: 2499,
        description: "Ergonomic gaming mouse."
    },
    {
        image: "https://picsum.photos/200/200?4",
        name: "Laptop Stand",
        price: 1999,
        description: "Adjustable aluminium stand."
    },
    {
        image: "https://picsum.photos/200/200?1",
        name: "Wireless Headphones",
        price: 7999,
        description: "Noise-cancelling over-ear headphones."
    },
    {
        image: "https://picsum.photos/200/200?2",
        name: "Smartwatch",
        price: 12999,
        description: "Fitness tracking smartwatch."
    },
    {
        image: "https://picsum.photos/200/200?3",
        name: "Gaming Mouse",
        price: 2499,
        description: "Ergonomic gaming mouse."
    },
    {
        image: "https://picsum.photos/200/200?4",
        name: "Laptop Stand",
        price: 1999,
        description: "Adjustable aluminium stand."
    },
    {
        image: "https://picsum.photos/200/200?1",
        name: "Wireless Headphones",
        price: 7999,
        description: "Noise-cancelling over-ear headphones."
    },
    {
        image: "https://picsum.photos/200/200?2",
        name: "Smartwatch",
        price: 12999,
        description: "Fitness tracking smartwatch."
    },
    {
        image: "https://picsum.photos/200/200?3",
        name: "Gaming Mouse",
        price: 2499,
        description: "Ergonomic gaming mouse."
    },
    {
        image: "https://picsum.photos/200/200?4",
        name: "Laptop Stand",
        price: 1999,
        description: "Adjustable aluminium stand."
    },
    {
        image: "https://picsum.photos/200/200?1",
        name: "Wireless Headphones",
        price: 7999,
        description: "Noise-cancelling over-ear headphones."
    },
    {
        image: "https://picsum.photos/200/200?2",
        name: "Smartwatch",
        price: 12999,
        description: "Fitness tracking smartwatch."
    },
    {
        image: "https://picsum.photos/200/200?3",
        name: "Gaming Mouse",
        price: 2499,
        description: "Ergonomic gaming mouse."
    },
    {
        image: "https://picsum.photos/200/200?4",
        name: "Laptop Stand",
        price: 1999,
        description: "Adjustable aluminium stand."
    },
    {
        image: "https://picsum.photos/200/200?1",
        name: "Wireless Headphones",
        price: 7999,
        description: "Noise-cancelling over-ear headphones."
    },
    {
        image: "https://picsum.photos/200/200?2",
        name: "Smartwatch",
        price: 12999,
        description: "Fitness tracking smartwatch."
    },
    {
        image: "https://picsum.photos/200/200?3",
        name: "Gaming Mouse",
        price: 2499,
        description: "Ergonomic gaming mouse."
    },
    {
        image: "https://picsum.photos/200/200?4",
        name: "Laptop Stand",
        price: 1999,
        description: "Adjustable aluminium stand."
    },
    {
        image: "https://picsum.photos/200/200?1",
        name: "Wireless Headphones",
        price: 7999,
        description: "Noise-cancelling over-ear headphones."
    },
    {
        image: "https://picsum.photos/200/200?2",
        name: "Smartwatch",
        price: 12999,
        description: "Fitness tracking smartwatch."
    },
    {
        image: "https://picsum.photos/200/200?3",
        name: "Gaming Mouse",
        price: 2499,
        description: "Ergonomic gaming mouse."
    },
    {
        image: "https://picsum.photos/200/200?4",
        name: "Laptop Stand",
        price: 1999,
        description: "Adjustable aluminium stand."
    }

    
];

const itemsPerPage = 10;
let currentPage = 1;

function displayProducts(page) {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedProducts = products.slice(start, end);
    
    const tableBody = document.getElementById('productTableBody');
    tableBody.innerHTML = '';
    
    paginatedProducts.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${product.image}" alt="${product.name}"></td>
            <td>${product.name}</td>
            <td>₹${product.price.toLocaleString()}</td>
            <td>${product.description}</td>
        `;
        tableBody.appendChild(row);
    });
    
    updatePaginationControls();
}

function updatePaginationControls() {
    const totalPages = Math.ceil(products.length / itemsPerPage);
    document.getElementById('pageInfo').textContent = `Page ${currentPage} of ${totalPages}`;
    
    document.getElementById('prevBtn').disabled = currentPage === 1;
    document.getElementById('nextBtn').disabled = currentPage === totalPages;
}

function previousPage() {
    if (currentPage > 1) {
        currentPage--;
        displayProducts(currentPage);
    }
}

function nextPage() {
    const totalPages = Math.ceil(products.length / itemsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        displayProducts(currentPage);
    }
}

// Initialize the display
document.addEventListener('DOMContentLoaded', () => {
    displayProducts(currentPage);
});