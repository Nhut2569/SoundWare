const products = [
  {
    id: 1,
    name: "Loa Bluetooth XSound Pro",
    price: 2990000,
    image: "../data/img/Loa Bluetooth XSound Pro.jpg",
    description:
      "Loa bluetooth không dây với âm thanh 360 độ, chống nước IPX7, pin 20 giờ.",
    rating: 5,
    category: "Bluetooth",
    tags: ["Mới", "Bán chạy"],
    brand: "SoundWave",
    features: ["Chống nước", "Kết nối Bluetooth", "Pin sạc"],
  },
  {
    id: 2,
    name: "Loa SoundBar Max",
    price: 5490000,
    image: "../data/img/Loa SoundBar Max.jpg",
    description:
      "Soundbar cao cấp với công nghệ Dolby Atmos, kết nối không dây với loa siêu trầm.",
    rating: 4,
    category: "Soundbar",
    tags: ["Dolby Atmos"],
    brand: "SoundWave",
    features: ["Kết nối Bluetooth", "Kết nối Wi-Fi"],
  },
  {
    id: 3,
    name: "Loa Bookshelf AudioPro",
    price: 7990000,
    image: "../data/img/Loa Bookshelf AudioPro.jgp",
    description:
      "Loa kệ với âm thanh hi-fi, thiết kế gỗ tự nhiên và công nghệ âm thanh đa phòng.",
    rating: 5,
    category: "Bookshelf",
    tags: ["Hi-Fi"],
    brand: "AudioPro",
    features: ["Kết nối Bluetooth", "Kết nối Wi-Fi"],
  },
  {
    id: 4,
    name: "Loa Party Bass Boom",
    price: 3990000,
    image: "../data/img/Loa Party Bass BoomL.jpg",
    description:
      "Loa di động công suất lớn với đèn LED, hiệu ứng DJ và mic karaoke không dây.",
    rating: 4,
    category: "Party",
    tags: ["Party", "Karaoke"],
    brand: "SoundWave",
    features: ["Đèn LED", "Mic karaoke", "Pin sạc", "Kết nối Bluetooth"],
  },
  {
    id: 5,
    name: "Loa di động Mini Sound",
    price: 1290000,
    image: "../data/img/Loa di động Mini Sound.jpg",
    description:
      "Loa bluetooth siêu nhỏ gọn, dễ mang theo, chống nước IPX5, pin sử dụng liên tục 12 giờ.",
    rating: 3,
    category: "Bluetooth",
    tags: ["Nhỏ gọn"],
    brand: "Sony",
    features: ["Chống nước", "Kết nối Bluetooth", "Pin sạc"],
  },
  {
    id: 6,
    name: "Loa Soundbar Cinema 800",
    price: 9990000,
    image: "../data/img/Loa Soundbar Cinema 800.jpg",
    description:
      "Soundbar cao cấp 7.1.4 kênh, công nghệ Dolby Atmos, DTS:X, kết nối HDMI eARC và loa siêu trầm không dây.",
    rating: 5,
    category: "Soundbar",
    tags: ["Home Cinema"],
    brand: "Harman Kardon",
    features: ["Kết nối Bluetooth", "Kết nối Wi-Fi"],
  },
  {
    id: 7,
    name: "Loa Bluetooth WaterSound",
    price: 1790000,
    image: "../data/img/Loa Bluetooth WaterSound.jpg",
    description:
      "Loa bluetooth chống nước hoàn toàn, có thể ngâm nước, âm thanh 360 độ và có thể nổi trên mặt nước.",
    rating: 4,
    category: "Bluetooth",
    tags: ["Chống nước IPX7"],
    brand: "JBL",
    features: ["Chống nước", "Kết nối Bluetooth", "Pin sạc"],
  },
  {
    id: 8,
    name: "Loa Hi-Fi Tower 900",
    price: 24990000,
    image: "../data/img/Loa Hi-Fi Tower 900.jpg",
    description:
      "Loa đứng hi-fi cao cấp với tweeter bằng sợi carbon, driver lớn và khả năng tái tạo âm thanh chuyên nghiệp.",
    rating: 5,
    category: "Hi-Fi",
    tags: ["Floor Standing"],
    brand: "Bang & Olufsen",
    features: ["Kết nối Bluetooth", "Kết nối Wi-Fi"],
  },
  {
    id: 9,
    name: "Loa Karaoke KTV-100",
    price: 4290000,
    image: "../data/img/Loa Karaoke KTV-100.jgp",
    description:
      "Loa karaoke di động với 2 micro không dây, màn hình cảm ứng hiển thị lời và điều khiển từ xa qua ứng dụng.",
    rating: 4,
    category: "Karaoke",
    tags: ["Karaoke"],
    brand: "SoundWave",
    features: ["Đèn LED", "Mic karaoke", "Pin sạc", "Kết nối Bluetooth"],
  },
  {
    id: 10,
    name: "Loa Bluetooth Luxury",
    price: 12990000,
    image: "../data/img/Loa Bluetooth Luxury2.jgp",
    description:
      "Loa bluetooth cao cấp với vỏ bằng kim loại nguyên khối, da thật và công nghệ âm thanh multi-room.",
    rating: 5,
    category: "Bluetooth",
    tags: ["Cao cấp"],
    brand: "Bose",
    features: ["Kết nối Bluetooth", "Kết nối Wi-Fi"],
  },
  {
    id: 11,
    name: "Loa Studio Monitor",
    price: 8490000,
    image: "../data/img/Loa Studio Monitor.jgp",
    description:
      "Loa monitor studio chuyên nghiệp với kết nối XLR, TRS, tái tạo âm thanh trung thực cho sản xuất âm nhạc.",
    rating: 4,
    category: "Hi-Fi",
    tags: ["Studio"],
    brand: "SoundWave",
    features: [],
  },
  {
    id: 12,
    name: "Loa Soundbar Mini",
    price: 3490000,
    image: "../data/img/Loa di động Mini Sound.jpg",
    description:
      "Soundbar nhỏ gọn với âm thanh vượt trội, lý tưởng cho không gian nhỏ.",
    rating: 4,
    category: "Soundbar",
    tags: ["Nhỏ gọn"],
    brand: "Sony",
    features: ["Kết nối Bluetooth"],
  },
];

// Biến state để lưu trữ các bộ lọc hiện tại
let currentFilters = {
  category: [],
  priceRange: [0, Infinity],
  brand: [],
  features: [],
  search: "",
  sort: "default",
  itemsPerPage: 12,
  currentPage: 1,
};

// Giỏ hàng
let cart = [];

// Khởi tạo khi trang được load
document.addEventListener("DOMContentLoaded", function () {
  // Khởi tạo sự kiện cho nút hiển thị bộ lọc trên mobile
  const filterToggleBtn = document.querySelector(".mobile-filter-toggle");
  const filtersSidebar = document.querySelector(".filters-sidebar");

  filterToggleBtn.addEventListener("click", function () {
    filtersSidebar.classList.toggle("active");
    filterToggleBtn.textContent = filtersSidebar.classList.contains("active")
      ? "Ẩn bộ lọc"
      : "Hiển thị bộ lọc";
  });

  // Khởi tạo sự kiện cho các checkbox danh mục
  const categoryCheckboxes = document.querySelectorAll(
    ".filter-group:nth-child(1) .checkbox-group input"
  );
  categoryCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
      const category = this.parentElement.textContent.trim();
      if (this.checked) {
        if (!currentFilters.category.includes(category)) {
          currentFilters.category.push(category);
        }
      } else {
        currentFilters.category = currentFilters.category.filter(
          (cat) => cat !== category
        );
      }
      applyFilters();
    });
  });

  // Khởi tạo sự kiện cho các checkbox giá tiền
  const priceCheckboxes = document.querySelectorAll(
    ".filter-group:nth-child(2) .checkbox-group input"
  );
  priceCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
      const priceText = this.parentElement.textContent.trim();
      let minPrice = 0;
      let maxPrice = Infinity;

      if (priceText.includes("Dưới")) {
        maxPrice = 2000000;
      } else if (priceText.includes("2.000.000₫ - 5.000.000₫")) {
        minPrice = 2000000;
        maxPrice = 5000000;
      } else if (priceText.includes("5.000.000₫ - 10.000.000₫")) {
        minPrice = 5000000;
        maxPrice = 10000000;
      } else if (priceText.includes("Trên")) {
        minPrice = 10000000;
      }

      if (this.checked) {
        currentFilters.priceRange = [minPrice, maxPrice];
      } else {
        currentFilters.priceRange = [0, Infinity];
      }

      applyFilters();
    });
  });

  // Khởi tạo sự kiện cho nút áp dụng giá
  const applyPriceBtn = document.querySelector(".filter-btn");
  applyPriceBtn.addEventListener("click", function () {
    const minPriceInput = document.querySelectorAll(".price-input")[0].value;
    const maxPriceInput = document.querySelectorAll(".price-input")[1].value;

    let minPrice = minPriceInput ? parseInt(minPriceInput) : 0;
    let maxPrice = maxPriceInput ? parseInt(maxPriceInput) : Infinity;

    currentFilters.priceRange = [minPrice, maxPrice];
    applyFilters();
  });

  // Khởi tạo sự kiện cho các checkbox thương hiệu
  const brandCheckboxes = document.querySelectorAll(
    ".filter-group:nth-child(3) .checkbox-group input"
  );
  brandCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
      const brand = this.parentElement.textContent.trim();
      if (this.checked) {
        if (!currentFilters.brand.includes(brand)) {
          currentFilters.brand.push(brand);
        }
      } else {
        currentFilters.brand = currentFilters.brand.filter((b) => b !== brand);
      }
      applyFilters();
    });
  });

  // Khởi tạo sự kiện cho các checkbox tính năng
  const featureCheckboxes = document.querySelectorAll(
    ".filter-group:nth-child(4) .checkbox-group input"
  );
  featureCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
      const feature = this.parentElement.textContent.trim();
      if (this.checked) {
        if (!currentFilters.features.includes(feature)) {
          currentFilters.features.push(feature);
        }
      } else {
        currentFilters.features = currentFilters.features.filter(
          (f) => f !== feature
        );
      }
      applyFilters();
    });
  });

  // Khởi tạo sự kiện cho ô tìm kiếm
  const searchInput = document.querySelector(".search-input");
  const searchBtn = document.querySelector(".search-btn");

  searchBtn.addEventListener("click", function () {
    currentFilters.search = searchInput.value;
    applyFilters();
  });

  searchInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      currentFilters.search = searchInput.value;
      applyFilters();
    }
  });

  // Khởi tạo sự kiện cho select sắp xếp
  const sortSelect = document.querySelector(
    ".filter-options .filter-select:first-child"
  );
  sortSelect.addEventListener("change", function () {
    const selectedIndex = this.selectedIndex;
    if (selectedIndex === 0) {
      currentFilters.sort = "default";
    } else if (selectedIndex === 1) {
      currentFilters.sort = "price-asc";
    } else if (selectedIndex === 2) {
      currentFilters.sort = "price-desc";
    } else if (selectedIndex === 3) {
      currentFilters.sort = "bestseller";
    } else if (selectedIndex === 4) {
      currentFilters.sort = "newest";
    }
    applyFilters();
  });

  // Khởi tạo sự kiện cho select số lượng hiển thị
  const itemsPerPageSelect = document.querySelector(
    ".filter-options .filter-select:last-child"
  );
  itemsPerPageSelect.addEventListener("change", function () {
    const selectedIndex = this.selectedIndex;
    if (selectedIndex === 0) {
      currentFilters.itemsPerPage = 12;
    } else if (selectedIndex === 1) {
      currentFilters.itemsPerPage = 24;
    } else if (selectedIndex === 2) {
      currentFilters.itemsPerPage = 48;
    }
    currentFilters.currentPage = 1; // Reset về trang đầu tiên khi thay đổi số lượng hiển thị
    applyFilters();
  });

  // Khởi tạo sự kiện cho các nút lọc nhanh danh mục
  const categoryButtons = document.querySelectorAll(".category-options button");
  categoryButtons.forEach((button) => {
    button.addEventListener("click", function () {
      categoryButtons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");

      const category = this.textContent.trim();
      if (category === "Tất cả") {
        currentFilters.category = [];
      } else {
        currentFilters.category = [category];
      }
      applyFilters();
    });
  });

  // Khởi tạo sự kiện cho các nút "Thêm vào giỏ hàng"
  document.addEventListener("click", function (event) {
    if (event.target.classList.contains("add-to-cart")) {
      const productCard = event.target.closest(".product-card");
      const productName =
        productCard.querySelector(".product-name").textContent;
      const productPrice =
        productCard.querySelector(".product-price").textContent;

      const product = products.find((p) => p.name === productName);
      if (product) {
        addToCart(product);
      }
    }
  });

  // Khởi tạo thông tin đăng nhập/đăng ký
  const loginLink = document.getElementById("login-link");
  const registerLink = document.getElementById("register-link");

  loginLink.addEventListener("click", function () {
    alert("Chức năng đăng nhập đang được phát triển");
  });

  registerLink.addEventListener("click", function () {
    alert("Chức năng đăng ký đang được phát triển");
  });

  // Khởi tạo hiển thị sản phẩm ban đầu
  renderProducts(products);
});

// Hàm lọc sản phẩm dựa trên các bộ lọc hiện tại
function filterProducts() {
  let filteredProducts = [...products];

  // Lọc theo danh mục
  if (currentFilters.category.length > 0) {
    filteredProducts = filteredProducts.filter((product) =>
      currentFilters.category.includes(product.category)
    );
  }

  // Lọc theo khoảng giá
  filteredProducts = filteredProducts.filter(
    (product) =>
      product.price >= currentFilters.priceRange[0] &&
      product.price <= currentFilters.priceRange[1]
  );

  // Lọc theo thương hiệu
  if (currentFilters.brand.length > 0) {
    filteredProducts = filteredProducts.filter((product) =>
      currentFilters.brand.includes(product.brand)
    );
  }

  // Lọc theo tính năng
  if (currentFilters.features.length > 0) {
    filteredProducts = filteredProducts.filter((product) =>
      currentFilters.features.some((feature) =>
        product.features.includes(feature)
      )
    );
  }

  // Lọc theo từ khóa tìm kiếm
  if (currentFilters.search) {
    const searchTerm = currentFilters.search.toLowerCase();
    filteredProducts = filteredProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.tags.some((tag) => tag.toLowerCase().includes(searchTerm))
    );
  }

  // Sắp xếp sản phẩm
  if (currentFilters.sort === "price-asc") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (currentFilters.sort === "price-desc") {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (currentFilters.sort === "bestseller") {
    filteredProducts.sort((a, b) => {
      // Giả định: sản phẩm có tag "Bán chạy" là bán chạy nhất
      const aIsBestseller = a.tags.includes("Bán chạy");
      const bIsBestseller = b.tags.includes("Bán chạy");
      if (aIsBestseller && !bIsBestseller) return -1;
      if (!aIsBestseller && bIsBestseller) return 1;
      return b.rating - a.rating; // Nếu cả hai đều là hoặc không là bestseller, sắp xếp theo đánh giá
    });
  } else if (currentFilters.sort === "newest") {
    filteredProducts.sort((a, b) => {
      // Giả định: sản phẩm có tag "Mới" là mới nhất
      const aIsNew = a.tags.includes("Mới");
      const bIsNew = b.tags.includes("Mới");
      if (aIsNew && !bIsNew) return -1;
      if (!aIsNew && bIsNew) return 1;
      return 0;
    });
  }

  return filteredProducts;
}

// Hàm áp dụng bộ lọc và hiển thị sản phẩm
function applyFilters() {
  const filteredProducts = filterProducts();
  renderProducts(filteredProducts);
}

// Hàm hiển thị sản phẩm
function renderProducts(productsToRender) {
  const productsGrid = document.querySelector(".products-grid");
  productsGrid.innerHTML = "";

  // Phân trang
  const startIndex =
    (currentFilters.currentPage - 1) * currentFilters.itemsPerPage;
  const endIndex = startIndex + currentFilters.itemsPerPage;
  const paginatedProducts = productsToRender.slice(startIndex, endIndex);

  if (paginatedProducts.length === 0) {
    productsGrid.innerHTML =
      '<div class="no-products">Không tìm thấy sản phẩm phù hợp với bộ lọc hiện tại.</div>';
    return;
  }

  paginatedProducts.forEach((product) => {
    // Tạo một thẻ a để bao bọc product card
    const productLink = document.createElement("a");
    productLink.href = `../html/CTSanPham/SanPhamID${product.id}.htm`;
    productLink.style.textDecoration = "none";

    const productCard = document.createElement("div");
    productCard.className = "product-card";

    // Tạo HTML cho sản phẩm
    let productHTML = `
        <div class="product-image">
          <img src="${product.image}" alt="${product.name}">
        </div>
        <div class="product-info">
      `;

    // Thêm các tag
    if (product.tags && product.tags.length > 0) {
      product.tags.forEach((tag) => {
        productHTML += `<span class="product-tag">${tag}</span>`;
      });
    }

    // Thêm tên sản phẩm và đánh giá
    productHTML += `
        <h3 class="product-name">${product.name}</h3>
        <div class="rating">
      `;

    // Thêm sao đánh giá
    for (let i = 1; i <= 5; i++) {
      if (i <= product.rating) {
        productHTML += "★";
      } else {
        productHTML += "☆";
      }
    }

    // Thêm giá và mô tả
    productHTML += `
        </div>
        <p class="product-price">${formatCurrency(product.price)}</p>
        <p class="product-description">${product.description}</p>
        <button class="add-to-cart" data-id="${
          product.id
        }">Thêm vào giỏ hàng</button>
      </div>
      `;

    productCard.innerHTML = productHTML;

    // Đặt product card bên trong thẻ a
    productLink.appendChild(productCard);
    productsGrid.appendChild(productLink);

    // Ngăn chặn sự kiện từ nút "Thêm vào giỏ hàng" làm chuyển hướng trang
    const addToCartBtn = productCard.querySelector(".add-to-cart");
    if (addToCartBtn) {
      addToCartBtn.addEventListener("click", function (event) {
        event.preventDefault();
        event.stopPropagation();
        addToCart(product);
      });
    }
  });

  // Hiển thị phân trang
  renderPagination(productsToRender.length);
}
// Hàm hiển thị phân trang
function renderPagination(totalItems) {
  const container = document.querySelector(".products-content");
  let paginationDiv = container.querySelector(".pagination");

  if (!paginationDiv) {
    paginationDiv = document.createElement("div");
    paginationDiv.className = "pagination";
    container.appendChild(paginationDiv);
  } else {
    paginationDiv.innerHTML = "";
  }

  const totalPages = Math.ceil(totalItems / currentFilters.itemsPerPage);

  // Nếu chỉ có 1 trang thì không hiển thị phân trang
  if (totalPages <= 1) {
    return;
  }

  // Nút trang trước
  const prevButton = document.createElement("div");
  prevButton.className = "pagination-item";
  prevButton.textContent = "«";
  prevButton.addEventListener("click", function () {
    if (currentFilters.currentPage > 1) {
      currentFilters.currentPage--;
      applyFilters();
    }
  });
  paginationDiv.appendChild(prevButton);

  // Các nút số trang
  let startPage = Math.max(1, currentFilters.currentPage - 2);
  let endPage = Math.min(totalPages, currentFilters.currentPage + 2);

  for (let i = startPage; i <= endPage; i++) {
    const pageButton = document.createElement("div");
    pageButton.className = "pagination-item";
    if (i === currentFilters.currentPage) {
      pageButton.classList.add("active");
    }
    pageButton.textContent = i;
    pageButton.addEventListener("click", function () {
      currentFilters.currentPage = i;
      applyFilters();
    });
    paginationDiv.appendChild(pageButton);
  }

  // Nút trang sau
  const nextButton = document.createElement("div");
  nextButton.className = "pagination-item";
  nextButton.textContent = "»";
  nextButton.addEventListener("click", function () {
    if (currentFilters.currentPage < totalPages) {
      currentFilters.currentPage++;
      applyFilters();
    }
  });
  paginationDiv.appendChild(nextButton);
}

// Hàm thêm sản phẩm vào giỏ hàng
function addToCart(product) {
  // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa
  const existingProductIndex = cart.findIndex((item) => item.id === product.id);

  if (existingProductIndex !== -1) {
    // Nếu sản phẩm đã tồn tại, tăng số lượng
    cart[existingProductIndex].quantity += 1;
  } else {
    // Nếu sản phẩm chưa tồn tại, thêm mới với số lượng là 1
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    });
  }

  // Hiển thị thông báo
  alert(`Đã thêm ${product.name} vào giỏ hàng!`);

  // Cập nhật hiển thị giỏ hàng (nếu có)
  // updateCartDisplay();
}

// Hàm định dạng tiền tệ
function formatCurrency(amount) {
  return (
    new Intl.NumberFormat("vi-VN", { maximumFractionDigits: 0 }).format(
      amount
    ) + "₫"
  );
}
