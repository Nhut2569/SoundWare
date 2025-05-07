window.onload = function () {
  loadUserProfile();
  showTab("orders");

  // Thêm sự kiện lưu thông tin cá nhân
  document
    .getElementById("save-profile-btn")
    .addEventListener("click", saveUserProfile);
};

function showTab(tabId) {
  // Ẩn tất cả các nội dung tab
  const tabContents = document.querySelectorAll(".tab-content");
  tabContents.forEach((tab) => {
    tab.classList.remove("active");
  });

  // Bỏ active khỏi tất cả các tab
  const tabs = document.querySelectorAll(".profile-tab");
  tabs.forEach((tab) => {
    tab.classList.remove("active");
  });

  // Hiển thị nội dung tab được chọn
  document.getElementById(tabId).classList.add("active");

  // Đánh dấu tab được chọn
  document
    .querySelector(`.profile-tab[onclick="showTab('${tabId}')"]`)
    .classList.add("active");
}

// Hàm định dạng giá tiền
function formatPrice(price) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
  })
    .format(price)
    .replace("₫", "₫");
}

// Hàm tải thông tin người dùng từ localStorage
function loadUserProfile() {
  const userData = JSON.parse(localStorage.getItem("userData")) || {};
  const registrationData =
    JSON.parse(localStorage.getItem("registrationData")) || {};

  // Sử dụng dữ liệu từ form đăng ký nếu có
  const fullName =
    registrationData.fullName || userData.fullName || "Chưa đăng nhập";
  const email =
    registrationData.email ||
    userData.email ||
    "Vui lòng đăng nhập để xem thông tin";
  const phone = registrationData.phone || userData.phone || "";
  const firstName = registrationData.firstName || userData.firstName || "";
  const lastName = registrationData.lastName || userData.lastName || "";
  const address = registrationData.address || userData.address || "";
  const city = registrationData.city || userData.city || "";

  // Tạo ngày đăng ký nếu chưa có
  if (!userData.joinedDate) {
    const now = new Date();
    userData.joinedDate = `${now.getDate()}/${
      now.getMonth() + 1
    }/${now.getFullYear()}`;
    localStorage.setItem("userData", JSON.stringify(userData));
  }

  // Cập nhật thông tin trong phần header
  document.getElementById("user-full-name").textContent = fullName;
  document.getElementById("user-email").textContent = email;
  document.getElementById("user-joined-date").textContent =
    "Thành viên từ: " + (userData.joinedDate || "01/01/2025");

  // Điền thông tin vào form thông tin cá nhân
  document.getElementById("firstName").value = firstName;
  document.getElementById("lastName").value = lastName;
  document.getElementById("email").value = email;
  document.getElementById("phone").value = phone;
  document.getElementById("birthdate").value = userData.birthdate || "";
  document.getElementById("gender").value = userData.gender || "";

  // Kiểm tra và hiển thị đơn hàng
  loadOrders();

  // Kiểm tra và hiển thị sản phẩm yêu thích
  loadWishlist();

  // Kiểm tra và hiển thị địa chỉ
  loadAddresses();
}

// Lưu thông tin cá nhân
function saveUserProfile() {
  const userData = JSON.parse(localStorage.getItem("userData")) || {};
  const registrationData =
    JSON.parse(localStorage.getItem("registrationData")) || {};

  // Lấy giá trị từ form
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const birthdate = document.getElementById("birthdate").value;
  const gender = document.getElementById("gender").value;
  const currentPassword = document.getElementById("currentPassword").value;
  const newPassword = document.getElementById("newPassword").value;

  // Cập nhật dữ liệu người dùng
  userData.firstName = firstName;
  userData.lastName = lastName;
  userData.email = email;
  userData.phone = phone;
  userData.birthdate = birthdate;
  userData.gender = gender;
  userData.fullName = firstName + " " + lastName;

  // Cập nhật lại thông tin registration nếu có
  if (registrationData.email) {
    registrationData.firstName = firstName;
    registrationData.lastName = lastName;
    registrationData.fullName = firstName + " " + lastName;
    registrationData.email = email;
    registrationData.phone = phone;

    if (
      currentPassword &&
      newPassword &&
      currentPassword === registrationData.password
    ) {
      registrationData.password = newPassword;
    }

    localStorage.setItem("registrationData", JSON.stringify(registrationData));
  }

  // Lưu vào localStorage
  localStorage.setItem("userData", JSON.stringify(userData));

  // Cập nhật thông tin trong phần header
  document.getElementById("user-full-name").textContent = userData.fullName;
  document.getElementById("user-email").textContent = email;

  // Hiển thị thông báo thành công
  showSuccessMessage();
}

// Hiển thị thông báo thành công
function showSuccessMessage() {
  const successMessage = document.getElementById("success-message");
  successMessage.classList.add("show");

  setTimeout(() => {
    successMessage.classList.remove("show");
  }, 3000);
}

// Tải đơn hàng từ localStorage
function loadOrders() {
  const orders = JSON.parse(localStorage.getItem("orders")) || [];
  const ordersContainer = document.getElementById("orders-container");
  const noOrdersMessage = document.getElementById("no-orders");

  // Kiểm tra nếu không có đơn hàng
  if (orders.length === 0) {
    ordersContainer.style.display = "none";
    noOrdersMessage.style.display = "block";
    return;
  }

  // Xóa nội dung mẫu
  ordersContainer.innerHTML = "";
  noOrdersMessage.style.display = "none";

  // Hiển thị các đơn hàng
  orders.forEach((order, index) => {
    const orderCard = document.createElement("div");
    orderCard.className = "order-card";

    const orderDate = new Date(order.date || Date.now());
    const formattedDate = `${orderDate.getDate()}/${
      orderDate.getMonth() + 1
    }/${orderDate.getFullYear()}`;

    orderCard.innerHTML = `
      <div class="order-header">
        <div>
          <h3>Đơn hàng #SWO${(10000 + index).toString()}</h3>
          <p>Ngày đặt: ${formattedDate}</p>
        </div>
        <div class="order-status ${
          order.status === "Đang xử lý" ? "pending" : ""
        }">${order.status || "Đang xử lý"}</div>
      </div>
      <div class="order-items">
        ${generateOrderItems(order.items)}
      </div>
      <div class="order-total">Tổng cộng: ${formatPrice(
        getTotalOrderPrice(order.items)
      )}</div>
    `;

    ordersContainer.appendChild(orderCard);
  });
}

// Tạo HTML cho các sản phẩm trong đơn hàng
function generateOrderItems(items) {
  if (!items || items.length === 0) return "<p>Không có sản phẩm nào.</p>";

  return items
    .map(
      (item) => `
    <div class="order-item">
      <img src="${item.image || "/api/placeholder/60/60"}" alt="${item.name}" />
      <div class="order-item-details">
        <h4>${item.name}</h4>
        <p>Số lượng: ${item.quantity} | ${formatPrice(item.price)}</p>
      </div>
    </div>
  `
    )
    .join("");
}

// Tính tổng giá trị đơn hàng
function getTotalOrderPrice(items) {
  if (!items || items.length === 0) return 0;

  return items.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);
}

// Tải danh sách sản phẩm yêu thích từ localStorage
function loadWishlist() {
  const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  const wishlistContainer = document.getElementById("wishlist-container");
  const noWishlistMessage = document.getElementById("no-wishlist");

  // Kiểm tra nếu không có sản phẩm yêu thích
  if (wishlist.length === 0) {
    wishlistContainer.style.display = "none";
    noWishlistMessage.style.display = "block";
    return;
  }

  // Xóa nội dung mẫu
  wishlistContainer.innerHTML = "";
  noWishlistMessage.style.display = "none";

  // Hiển thị các sản phẩm yêu thích
  wishlist.forEach((product, index) => {
    const wishlistItem = document.createElement("div");
    wishlistItem.className = "wishlist-item";
    wishlistItem.dataset.index = index;

    wishlistItem.innerHTML = `
      <img src="${product.image || "/api/placeholder/250/180"}" alt="${
      product.name
    }" />
      <div class="wishlist-item-info">
        <h3>${product.name}</h3>
        <p class="price">${formatPrice(product.price)}</p>
        <div class="wishlist-actions">
          <button class="wishlist-btn add-cart-btn" onclick="addToCart(${index})">
            Thêm vào giỏ hàng
          </button>
          <button class="wishlist-btn remove-btn" onclick="removeFromWishlist(${index})">Xóa</button>
        </div>
      </div>
    `;

    wishlistContainer.appendChild(wishlistItem);
  });
}

// Xóa sản phẩm khỏi danh sách yêu thích
function removeFromWishlist(index) {
  const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

  wishlist.splice(index, 1);
  localStorage.setItem("wishlist", JSON.stringify(wishlist));

  // Cập nhật lại giao diện
  loadWishlist();
  showSuccessMessage();
}

// Thêm sản phẩm vào giỏ hàng từ danh sách yêu thích
function addToCart(index) {
  const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Kiểm tra sản phẩm đã có trong giỏ hàng chưa
  const productIndex = cart.findIndex((item) => item.id === wishlist[index].id);

  if (productIndex !== -1) {
    // Nếu đã có thì tăng số lượng
    cart[productIndex].quantity += 1;
  } else {
    // Nếu chưa có thì thêm mới với số lượng là 1
    const product = { ...wishlist[index], quantity: 1 };
    cart.push(product);
  }

  // Lưu giỏ hàng vào localStorage
  localStorage.setItem("cart", JSON.stringify(cart));

  // Hiển thị thông báo thành công
  document.getElementById("success-message").textContent =
    "Đã thêm vào giỏ hàng!";
  showSuccessMessage();
}

// Tải danh sách địa chỉ từ localStorage
function loadAddresses() {
  const addresses = JSON.parse(localStorage.getItem("addresses")) || [];
  const addressContainer = document.getElementById("address-container");

  // Xóa nội dung mẫu
  addressContainer.innerHTML = "";

  // Nếu không có địa chỉ nào, thêm thông báo
  if (addresses.length === 0) {
    addressContainer.innerHTML =
      '<p style="text-align: center; margin-bottom: 20px;">Bạn chưa có địa chỉ nào. Vui lòng thêm mới.</p>';
    return;
  }

  // Hiển thị các địa chỉ
  addresses.forEach((address, index) => {
    const addressCard = document.createElement("div");
    addressCard.className = "address-card";

    if (address.isDefault) {
      addressCard.innerHTML = `<div class="default-badge">Mặc định</div>`;
    }

    addressCard.innerHTML += `
      <h3>${address.title}</h3>
      <p>${address.fullName}</p>
      <p>${address.detail}</p>
      <p>${address.city}</p>
      <p>Số điện thoại: ${address.phone}</p>
      <div class="address-actions">
        <button class="address-btn edit-btn" onclick="editAddress(${index})">Chỉnh sửa</button>
        <button class="address-btn delete-btn" onclick="deleteAddress(${index})">Xóa</button>
      </div>
    `;

    addressContainer.appendChild(addressCard);
  });
}

// Mở modal thêm địa chỉ mới
function showAddAddressModal() {
  document.getElementById("address-modal-title").textContent =
    "Thêm địa chỉ mới";
  document.getElementById("editing-address-index").value = "-1";

  // Xóa các giá trị trong form
  document.getElementById("address-title").value = "";
  document.getElementById("address-fullname").value = "";
  document.getElementById("address-phone-input").value = "";
  document.getElementById("address-detail-input").value = "";
  document.getElementById("address-city-input").value = "";
  document.getElementById("address-default").checked = false;

  // Hiển thị modal
  document.getElementById("address-modal").style.display = "block";
}

// Đóng modal địa chỉ
function closeAddressModal() {
  document.getElementById("address-modal").style.display = "none";
}

// Chỉnh sửa địa chỉ
function editAddress(index) {
  const addresses = JSON.parse(localStorage.getItem("addresses")) || [];
  const address = addresses[index];

  if (!address) return;

  document.getElementById("address-modal-title").textContent =
    "Chỉnh sửa địa chỉ";
  document.getElementById("editing-address-index").value = index;

  // Điền thông tin vào form
  document.getElementById("address-title").value = address.title || "";
  document.getElementById("address-fullname").value = address.fullName || "";
  document.getElementById("address-phone-input").value = address.phone || "";
  document.getElementById("address-detail-input").value = address.detail || "";
  document.getElementById("address-city-input").value = address.city || "";
  document.getElementById("address-default").checked =
    address.isDefault || false;

  // Hiển thị modal
  document.getElementById("address-modal").style.display = "block";
}

// Lưu địa chỉ
function saveAddress() {
  const addresses = JSON.parse(localStorage.getItem("addresses")) || [];
  const editingIndex = parseInt(
    document.getElementById("editing-address-index").value
  );

  const addressData = {
    title: document.getElementById("address-title").value,
    fullName: document.getElementById("address-fullname").value,
    phone: document.getElementById("address-phone-input").value,
    detail: document.getElementById("address-detail-input").value,
    city: document.getElementById("address-city-input").value,
    isDefault: document.getElementById("address-default").checked,
  };

  // Kiểm tra nếu đặt làm mặc định, bỏ mặc định của các địa chỉ khác
  if (addressData.isDefault) {
    addresses.forEach((addr) => (addr.isDefault = false));
  }

  // Nếu là chỉnh sửa
  if (editingIndex >= 0) {
    addresses[editingIndex] = addressData;
  } else {
    // Nếu là thêm mới
    // Nếu là địa chỉ đầu tiên, đặt mặc định là true
    if (addresses.length === 0) {
      addressData.isDefault = true;
    }
    addresses.push(addressData);
  }

  // Lưu vào localStorage
  localStorage.setItem("addresses", JSON.stringify(addresses));

  // Đóng modal
  closeAddressModal();

  // Cập nhật lại giao diện
  loadAddresses();

  // Hiển thị thông báo thành công
  document.getElementById("success-message").textContent =
    "Địa chỉ đã được lưu thành công!";
  showSuccessMessage();
}

// Xóa địa chỉ
function deleteAddress(index) {
  const addresses = JSON.parse(localStorage.getItem("addresses")) || [];

  // Kiểm tra nếu xóa địa chỉ mặc định
  const isDefault = addresses[index].isDefault;

  // Xóa địa chỉ
  addresses.splice(index, 1);

  // Nếu xóa địa chỉ mặc định và còn địa chỉ khác
  if (isDefault && addresses.length > 0) {
    // Đặt địa chỉ đầu tiên làm mặc định
    addresses[0].isDefault = true;
  }

  // Lưu vào localStorage
  localStorage.setItem("addresses", JSON.stringify(addresses));

  // Cập nhật lại giao diện
  loadAddresses();

  // Hiển thị thông báo thành công
  document.getElementById("success-message").textContent = "Đã xóa địa chỉ!";
  showSuccessMessage();
}

// Đóng modal khi nhấp ra ngoài
window.onclick = function (event) {
  const modal = document.getElementById("address-modal");
  if (event.target === modal) {
    closeAddressModal();
  }
};
