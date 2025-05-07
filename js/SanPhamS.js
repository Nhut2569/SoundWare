// Định nghĩa format số tiền thành tiền Việt Nam
function formatCurrency(amount) {
  return new Intl.NumberFormat("vi-VN").format(amount) + "₫";
}

// Lấy dữ liệu giỏ hàng từ localStorage
function getCartItems() {
  const cart = localStorage.getItem("soundwave_cart");
  return cart ? JSON.parse(cart) : [];
}

// Lưu giỏ hàng vào localStorage
function saveCartItems(cartItems) {
  localStorage.setItem("soundwave_cart", JSON.stringify(cartItems));
}

// Tạo ID duy nhất cho sản phẩm trong giỏ hàng
function generateUniqueId() {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

// Thêm sản phẩm vào giỏ hàng
function addToCart(productElement) {
  // Lấy thông tin sản phẩm từ card được click
  const productCard = productElement.closest(".product-card");

  const productName = productCard.querySelector(".product-name").textContent;
  const productPrice = productCard.querySelector(".product-price").textContent;
  // Xử lý chuỗi giá để lấy giá trị số
  const priceValue = parseInt(productPrice.replace(/\D/g, ""));

  // Lấy URL hình ảnh sản phẩm
  const productImage = productCard.querySelector(".product-image img").src;

  // Tạo object sản phẩm
  const product = {
    id: generateUniqueId(),
    name: productName,
    price: priceValue,
    image: productImage,
    quantity: 1,
  };

  // Lấy giỏ hàng hiện tại
  const cartItems = getCartItems();

  // Kiểm tra xem sản phẩm có cùng tên đã tồn tại trong giỏ hàng chưa
  const existingProductIndex = cartItems.findIndex(
    (item) => item.name === productName
  );

  if (existingProductIndex !== -1) {
    // Nếu sản phẩm đã tồn tại, tăng số lượng lên 1
    cartItems[existingProductIndex].quantity += 1;
  } else {
    // Nếu chưa tồn tại, thêm sản phẩm mới vào giỏ hàng
    cartItems.push(product);
  }

  // Lưu giỏ hàng vào localStorage
  saveCartItems(cartItems);

  // Hiển thị thông báo đã thêm vào giỏ hàng
  alert(`Đã thêm "${productName}" vào giỏ hàng!`);
}

// Thêm sự kiện cho tất cả các nút "Thêm vào giỏ hàng"
document.addEventListener("DOMContentLoaded", function () {
  const addToCartButtons = document.querySelectorAll(".add-to-cart");

  addToCartButtons.forEach((button) => {
    button.addEventListener("click", function () {
      addToCart(this);
    });
  });
});
