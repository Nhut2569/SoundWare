// Thay thế phần script trong GioHang.htm bằng mã sau:

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

// Cập nhật số lượng sản phẩm trong giỏ hàng
function updateQuantity(productId, newQuantity) {
  const cartItems = getCartItems();
  const itemIndex = cartItems.findIndex((item) => item.id === productId);

  if (itemIndex !== -1) {
    // Giới hạn số lượng tối thiểu là 1
    cartItems[itemIndex].quantity = Math.max(1, newQuantity);
    saveCartItems(cartItems);
    renderCart();
  }
}

// Xóa sản phẩm khỏi giỏ hàng
function removeFromCart(productId) {
  const cartItems = getCartItems();
  const updatedCart = cartItems.filter((item) => item.id !== productId);
  saveCartItems(updatedCart);
  renderCart();
}

// Tính tổng tiền của đơn hàng
function calculateTotals() {
  const cartItems = getCartItems();
  let subtotal = 0;

  cartItems.forEach((item) => {
    subtotal += item.price * item.quantity;
  });

  // Phí giao hàng cố định, nếu tổng đơn hàng > 5 triệu thì miễn phí
  const shipping = subtotal > 5000000 ? 0 : 30000;

  // Giảm giá (nếu có)
  const discount = 0; // Tính toán giảm giá nếu có mã

  // Tổng tiền cần thanh toán
  const total = subtotal + shipping - discount;

  // Cập nhật lên giao diện
  document.getElementById("subtotal").textContent = formatCurrency(subtotal);
  document.getElementById("shipping").textContent = formatCurrency(shipping);
  document.getElementById("discount").textContent = formatCurrency(discount);
  document.getElementById("total").textContent = formatCurrency(total);
}

// Hiển thị giỏ hàng lên giao diện
function renderCart() {
  const cartItems = getCartItems();
  const cartItemsContainer = document.getElementById("cart-items-container");
  const emptyCart = document.getElementById("empty-cart");
  const cartWithItems = document.getElementById("cart-with-items");

  // Nếu giỏ hàng trống, hiển thị trạng thái trống
  if (cartItems.length === 0) {
    emptyCart.style.display = "block";
    cartWithItems.style.display = "none";
    return;
  }

  // Nếu có sản phẩm, hiển thị giỏ hàng
  emptyCart.style.display = "none";
  cartWithItems.style.display = "flex";

  // Xóa tất cả sản phẩm hiện tại
  cartItemsContainer.innerHTML = "";

  // Thêm từng sản phẩm vào giao diện
  cartItems.forEach((item) => {
    const cartItemElement = document.createElement("div");
    cartItemElement.className = "cart-item";

    // Đảm bảo đường dẫn hình ảnh luôn đúng và có sẵn
    // Nếu imageUrl là đường dẫn tương đối, thêm đường dẫn đầy đủ
    let imageUrl = item.image;

    // Kiểm tra nếu imageUrl không tồn tại hoặc không hợp lệ
    if (!imageUrl || imageUrl === "" || imageUrl === "undefined") {
      // Sử dụng hình ảnh placeholder mặc định
      imageUrl = "images/products/placeholder.jpg";
    } else if (imageUrl.startsWith("/")) {
      // Đảm bảo đường dẫn đầy đủ nếu là đường dẫn tương đối
      imageUrl = imageUrl; // Giữ nguyên nếu đã là đường dẫn tuyệt đối
    } else if (!imageUrl.startsWith("http")) {
      // Nếu không phải URL đầy đủ và không bắt đầu bằng '/', thêm đường dẫn tương đối
      imageUrl = "images/products/" + imageUrl;
    }

    cartItemElement.innerHTML = `
<div class="cart-item-image">
<img src="${imageUrl}" alt="${
      item.name
    }" onerror="this.src='images/products/placeholder.jpg'">
</div>
<div class="cart-item-details">
<h3 class="cart-item-name">${item.name}</h3>
<p class="cart-item-price">${formatCurrency(item.price)}</p>
<div class="cart-item-actions">
  <div class="quantity-controls">
    <button class="qty-btn" onclick="updateQuantity('${item.id}', ${
      item.quantity - 1
    })">-</button>
    <input type="number" class="qty-input" value="${
      item.quantity
    }" min="1" onchange="updateQuantity('${item.id}', parseInt(this.value))">
    <button class="qty-btn" onclick="updateQuantity('${item.id}', ${
      item.quantity + 1
    })">+</button>
  </div>
  <button class="remove-btn" onclick="removeFromCart('${item.id}')">Xóa</button>
</div>
</div>
`;
    cartItemsContainer.appendChild(cartItemElement);
  });

  // Tính toán và cập nhật tổng tiền
  calculateTotals();
}

// Khởi tạo giỏ hàng khi tải trang
window.onload = function () {
  renderCart();

  // Thêm hàm xử lý cho nút thanh toán
  const checkoutBtn = document.querySelector(".checkout-btn");
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", function () {
      const cartItems = getCartItems();
      if (cartItems.length > 0) {
        alert(
          "Cảm ơn bạn đã đặt hàng! Chúng tôi sẽ xử lý đơn hàng của bạn ngay."
        );
        // Xóa giỏ hàng sau khi thanh toán
        saveCartItems([]);
        renderCart();
      } else {
        alert("Giỏ hàng của bạn đang trống!");
      }
    });
  }

  // Thêm hàm xử lý cho nút áp dụng mã giảm giá
  const applyPromoBtn = document.querySelector(".promo-code button");
  if (applyPromoBtn) {
    applyPromoBtn.addEventListener("click", function () {
      const promoInput = document.querySelector(".promo-code input");
      const promoCode = promoInput.value.trim();

      if (promoCode) {
        alert("Mã giảm giá đã được áp dụng!");
        // Ở đây bạn có thể thêm logic xử lý mã giảm giá thực tế
      } else {
        alert("Vui lòng nhập mã giảm giá!");
      }
    });
  }
};
