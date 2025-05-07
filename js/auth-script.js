// Khai báo các biến cho mock API
let users = [];
let currentUser = null;

// Load users từ localStorage ngay khi script được tải
function loadUsersFromStorage() {
  const storedUsers = localStorage.getItem("users");
  if (storedUsers) {
    try {
      users = JSON.parse(storedUsers);
      console.log("Loaded users:", users);
    } catch (e) {
      console.error("Lỗi khi phân tích dữ liệu users:", e);
      users = [];
    }
  } else {
    console.log("Không tìm thấy dữ liệu users trong localStorage");
  }
}

// Hàm hiển thị modal
function showModal(modalId) {
  document.querySelectorAll(".modal").forEach((modal) => {
    modal.style.display = "none"; // Ẩn tất cả modal trước
  });
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.style.display = "flex"; // Hiện modal cần mở
    // Reset form
    const form = modal.querySelector("form");
    if (form) form.reset();
    // Ẩn thông báo lỗi
    const errorMessage = modal.querySelector(".error-message");
    if (errorMessage) errorMessage.style.display = "none";
    // Ẩn tất cả thông báo lỗi nhỏ
    const errorElements = modal.querySelectorAll(".error");
    errorElements.forEach((err) => {
      err.style.display = "none";
    });
  }
}

// Đóng modal
function closeModal(modal) {
  if (modal) {
    modal.style.display = "none";
  }
}

// Hàm mở form theo chế độ login/register
function showForm(mode) {
  if (mode === "register") {
    showModal("register-modal");
  } else {
    showModal("login-modal");
  }
}

// Hàm chuyển hướng sau khi đăng nhập thành công
function redirectToHomePage() {
  // Chuyển người dùng đến trang TrangChu.html
  window.location.href = "./html/TrangChu.htm";
}

// Hàm đăng nhập
function loginUser(email, password) {
  // Clean input data
  email = email.trim().toLowerCase();

  // Load users mới nhất từ localStorage
  loadUsersFromStorage();

  try {
    console.log(`Đang cố đăng nhập với email: "${email}"`);

    // Tìm user trong "database" với so sánh không phân biệt hoa thường cho email
    const user = users.find(
      (u) => u.email.toLowerCase() === email && u.password === password
    );

    if (!user) {
      // Debug: In ra tất cả email trong hệ thống để so sánh
      console.log("Các email hiện có trong hệ thống:");
      users.forEach((u) => console.log(`- "${u.email}"`));

      throw new Error("Email hoặc mật khẩu không đúng");
    }

    // Tạo token giả
    const token = "mock_token_" + Math.random().toString(36).substring(2);

    // Lưu thông tin người dùng
    const userData = {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
    };

    // Lưu vào localStorage
    localStorage.setItem("authToken", token);
    localStorage.setItem("userData", JSON.stringify(userData));

    // Đóng modal đăng nhập
    closeModal(document.getElementById("login-modal"));

    console.log("Đăng nhập thành công với user:", userData);

    // Hiển thị thông báo thành công và chuyển hướng
    alert("Đăng nhập thành công! Đang chuyển đến trang chủ...");

    // Chuyển hướng đến trang chủ sau khi thông báo
    redirectToHomePage();
  } catch (error) {
    console.error("Lỗi đăng nhập:", error);
    showLoginError(error.message);
  }
}

// Hàm đăng ký
function registerUser(name, email, phone, password) {
  // Clean input data
  name = name.trim();
  email = email.trim().toLowerCase(); // Lưu email dạng lowercase để dễ so sánh
  phone = phone.trim();

  // Load users mới nhất từ localStorage
  loadUsersFromStorage();

  try {
    // Kiểm tra email đã tồn tại chưa (không phân biệt hoa thường)
    const existingUser = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );
    if (existingUser) {
      throw new Error("Email đã được sử dụng");
    }

    // Tạo user mới
    const newUser = {
      id: Date.now().toString(),
      name: name,
      email: email,
      phone: phone,
      password: password,
    };

    // Thêm vào "database"
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    console.log("Đã đăng ký user mới:", newUser);
    console.log("Danh sách users sau khi đăng ký:", users);

    // Đóng modal đăng ký
    closeModal(document.getElementById("register-modal"));

    // Hiển thị thông báo thành công và tự động điền email vào form đăng nhập
    alert("Đăng ký thành công! Vui lòng đăng nhập.");

    // Chuyển đến form đăng nhập và điền sẵn email
    showForm("login");
    const loginEmailInput = document.getElementById("login-email");
    if (loginEmailInput) {
      loginEmailInput.value = email;
    }
  } catch (error) {
    console.error("Lỗi đăng ký:", error);
    showRegisterError(error.message);
  }
}

// Hàm cập nhật giao diện sau khi đăng nhập thành công
function updateUIAfterLogin(user) {
  // Ẩn nút đăng nhập/đăng ký
  const authButtons = document.getElementById("auth-buttons");
  if (authButtons) authButtons.style.display = "none";

  // Hiển thị thông tin người dùng
  const userInfoArea = document.getElementById("user-info-area");
  if (userInfoArea) {
    userInfoArea.style.display = "block";
    const userName = document.getElementById("user-name");
    if (userName) {
      userName.textContent = `Xin chào, ${user.name}`;
    }
  }

  // Lưu người dùng hiện tại
  currentUser = user;
}

// Hàm hiển thị lỗi đăng nhập
function showLoginError(message) {
  const errorElement = document.getElementById("login-error");
  if (errorElement) {
    errorElement.textContent = message || "Đăng nhập thất bại";
    errorElement.style.display = "block";
  }
}

// Hàm hiển thị lỗi đăng ký
function showRegisterError(message) {
  const errorElement = document.getElementById("register-error");
  if (errorElement) {
    errorElement.textContent = message || "Đăng ký thất bại";
    errorElement.style.display = "block";
  }
}

// Hàm đăng xuất
function logoutUser() {
  // Xóa token và dữ liệu người dùng
  localStorage.removeItem("authToken");
  localStorage.removeItem("userData");
  currentUser = null;

  // Cập nhật UI
  const authButtons = document.getElementById("auth-buttons");
  if (authButtons) authButtons.style.display = "flex";

  const userInfoArea = document.getElementById("user-info-area");
  if (userInfoArea) userInfoArea.style.display = "none";

  alert("Đã đăng xuất!");
}

// Hàm validate email
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Hàm validate số điện thoại (10 số)
function validatePhone(phone) {
  const re = /^0\d{9}$/;
  return re.test(phone);
}

// Hàm validate trường đầu vào và hiển thị lỗi
function validateInput(inputId, isValid) {
  const input = document.getElementById(inputId);
  const errorElement = input.nextElementSibling;

  if (!isValid) {
    if (errorElement && errorElement.classList.contains("error")) {
      errorElement.style.display = "block";
    }
    return false;
  } else {
    if (errorElement && errorElement.classList.contains("error")) {
      errorElement.style.display = "none";
    }
    return true;
  }
}

// Thêm chức năng kiểm tra và hiển thị users hiện tại
function showCurrentUsers() {
  loadUsersFromStorage();
  console.log("Danh sách users hiện tại:", users);
  alert("Đã in danh sách users ra console. Mở Developer Tools để xem.");
}

// Thêm dữ liệu mẫu nếu chưa có
function addSampleUsers() {
  if (users.length === 0) {
    const sampleUsers = [
      {
        id: "1",
        name: "Nguyễn Văn A",
        email: "nguyenvana@example.com",
        phone: "0987654321",
        password: "123456",
      },
      {
        id: "2",
        name: "Trần Thị B",
        email: "tranthib@example.com",
        phone: "0912345678",
        password: "123456",
      },
    ];

    users = sampleUsers;
    localStorage.setItem("users", JSON.stringify(sampleUsers));
    console.log("Đã thêm dữ liệu mẫu:", sampleUsers);
  }
}

// Thêm nút "Reset dữ liệu" và "Hiển thị dữ liệu" vào DOM
function addDebugButtons() {
  const container = document.createElement("div");
  container.style.position = "fixed";
  container.style.bottom = "10px";
  container.style.right = "10px";
  container.style.zIndex = "9999";
  container.style.display = "flex";
  container.style.flexDirection = "column";
  container.style.gap = "5px";

  // Nút reset dữ liệu
  const resetButton = document.createElement("button");
  resetButton.textContent = "Reset dữ liệu";
  resetButton.style.padding = "5px 10px";
  resetButton.style.backgroundColor = "#ff6b6b";
  resetButton.style.color = "white";
  resetButton.style.border = "none";
  resetButton.style.borderRadius = "4px";
  resetButton.style.cursor = "pointer";
  resetButton.onclick = function () {
    if (confirm("Bạn có chắc muốn xóa tất cả dữ liệu người dùng?")) {
      localStorage.removeItem("users");
      localStorage.removeItem("authToken");
      localStorage.removeItem("userData");
      alert("Đã xóa tất cả dữ liệu. Trang sẽ được tải lại.");
      location.reload();
    }
  };

  // Nút hiển thị dữ liệu
  const showButton = document.createElement("button");
  showButton.textContent = "Hiển thị users";
  showButton.style.padding = "5px 10px";
  showButton.style.backgroundColor = "#4d4dff";
  showButton.style.color = "white";
  showButton.style.border = "none";
  showButton.style.borderRadius = "4px";
  showButton.style.cursor = "pointer";
  showButton.onclick = showCurrentUsers;

  container.appendChild(resetButton);
  container.appendChild(showButton);
  document.body.appendChild(container);
}

// Khởi tạo khi trang đã tải xong
document.addEventListener("DOMContentLoaded", function () {
  // Tải dữ liệu users từ localStorage
  loadUsersFromStorage();

  // Thêm dữ liệu mẫu nếu chưa có
  addSampleUsers();

  // Thêm nút debug
  addDebugButtons();

  // Kiểm tra xem người dùng đã đăng nhập chưa
  const authToken = localStorage.getItem("authToken");
  const userData = localStorage.getItem("userData");

  if (authToken && userData) {
    try {
      const user = JSON.parse(userData);

      // Kiểm tra xem chúng ta có đang ở trang đăng nhập không
      // Nếu đã đăng nhập và đang ở trang đăng nhập, chuyển hướng đến trang chủ
      if (
        window.location.pathname.includes("index.html") ||
        window.location.pathname.endsWith("/")
      ) {
        redirectToHomePage();
      } else {
        // Nếu đang ở các trang khác, chỉ cập nhật UI
        updateUIAfterLogin(user);
      }
    } catch (e) {
      console.error("Lỗi đọc dữ liệu người dùng:", e);
      localStorage.removeItem("authToken");
      localStorage.removeItem("userData");
    }
  }

  // Xử lý sự kiện click nút đóng modal
  document.querySelectorAll(".close-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const modal = btn.closest(".modal");
      closeModal(modal);
    });
  });

  // Sự kiện click để chuyển giữa các modal
  const switchToRegister = document.getElementById("switch-to-register");
  if (switchToRegister) {
    switchToRegister.addEventListener("click", function (e) {
      e.preventDefault();
      showForm("register");
    });
  }

  const switchToLogin = document.getElementById("switch-to-login");
  if (switchToLogin) {
    switchToLogin.addEventListener("click", function (e) {
      e.preventDefault();
      showForm("login");
    });
  }

  // Xử lý form đăng nhập
  const loginForm = document.getElementById("login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const email = document.getElementById("login-email").value;
      const password = document.getElementById("login-password").value;

      let isValid = true;

      // Validate email
      isValid = validateInput("login-email", validateEmail(email)) && isValid;

      // Validate password
      isValid =
        validateInput("login-password", password.length >= 6) && isValid;

      if (isValid) {
        loginUser(email, password);
      }
    });
  }

  // Xử lý form đăng ký
  const registerForm = document.getElementById("register-form");
  if (registerForm) {
    registerForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("register-name").value;
      const email = document.getElementById("register-email").value;
      const phone = document.getElementById("register-phone").value;
      const password = document.getElementById("register-password").value;
      const confirmPassword = document.getElementById(
        "register-confirm-password"
      ).value;

      let isValid = true;

      // Validate name
      isValid =
        validateInput("register-name", name.trim().length >= 3) && isValid;

      // Validate email
      isValid =
        validateInput("register-email", validateEmail(email)) && isValid;

      // Validate phone
      isValid =
        validateInput("register-phone", validatePhone(phone)) && isValid;

      // Validate password
      isValid =
        validateInput("register-password", password.length >= 6) && isValid;

      // Validate confirm password
      isValid =
        validateInput(
          "register-confirm-password",
          password === confirmPassword
        ) && isValid;

      if (isValid) {
        registerUser(name, email, phone, password);
      }
    });
  }

  // Xử lý nút đăng xuất
  const logoutBtn = document.getElementById("logout-button");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", logoutUser);
  }

  // Đóng modal khi click bên ngoài
  window.addEventListener("click", function (event) {
    const modals = document.querySelectorAll(".modal");
    modals.forEach((modal) => {
      if (event.target === modal) {
        closeModal(modal);
      }
    });
  });
});
