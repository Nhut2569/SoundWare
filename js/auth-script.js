let users = [];
let currentUser = null;

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
    modal.style.display = "none";
  });
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.style.display = "flex";
    const form = modal.querySelector("form");
    if (form) form.reset();
    const errorMessage = modal.querySelector(".error-message");
    if (errorMessage) errorMessage.style.display = "none";
    const errorElements = modal.querySelectorAll(".error");
    errorElements.forEach((err) => {
      err.style.display = "none";
    });
    // Reset validation status
    modal.querySelectorAll("input").forEach((input) => {
      input.classList.remove("valid-input", "invalid-input");
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
  window.location.href = "./html/TrangChu.htm";
}

// Hàm đăng nhập
function loginUser(email, password) {
  email = email.trim().toLowerCase();

  // Load users mới nhất từ localStorage
  loadUsersFromStorage();

  try {
    console.log(`Đang cố đăng nhập với email: "${email}"`);
    const user = users.find(
      (u) => u.email.toLowerCase() === email && u.password === password
    );

    if (!user) {
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

    alert("Đăng nhập thành công! Đang chuyển đến trang chủ...");

    redirectToHomePage();
  } catch (error) {
    console.error("Lỗi đăng nhập:", error);
    showLoginError(error.message);
  }
}

// Hàm đăng ký
function registerUser(name, email, phone, password) {
  name = name.trim();
  email = email.trim().toLowerCase();
  phone = phone.trim();

  // Load users mới nhất từ localStorage
  loadUsersFromStorage();

  try {
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

    closeModal(document.getElementById("register-modal"));

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
  const authButtons = document.getElementById("auth-buttons");
  if (authButtons) authButtons.style.display = "none";

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

// Hàm validate số điện thoại (10 số, bắt đầu bằng số 0)
function validatePhone(phone) {
  const re = /^0\d{9}$/;
  return re.test(phone);
}

// Hàm check mật khẩu mạnh
function validateStrongPassword(password) {
  // Ít nhất 6 ký tự, bao gồm chữ hoa, chữ thường và số
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
  return re.test(password);
}

// Hàm check email đã tồn tại
function emailExists(email) {
  loadUsersFromStorage();
  return users.some((u) => u.email.toLowerCase() === email.toLowerCase());
}

// Hàm validate trường đầu vào và hiển thị lỗi ngay lập tức
function validateInput(input, validationFunction, errorMessage) {
  const value = input.value;
  const errorElement = input.nextElementSibling;

  if (!validationFunction(value)) {
    input.classList.remove("valid-input");
    input.classList.add("invalid-input");

    if (errorElement && errorElement.classList.contains("error")) {
      errorElement.textContent = errorMessage || "Trường này không hợp lệ";
      errorElement.style.display = "block";
    }
    return false;
  } else {
    input.classList.remove("invalid-input");
    input.classList.add("valid-input");

    if (errorElement && errorElement.classList.contains("error")) {
      errorElement.style.display = "none";
    }
    return true;
  }
}

// Hàm setup real-time validation cho form đăng ký
function setupRegisterFormValidation() {
  const nameInput = document.getElementById("register-name");
  const emailInput = document.getElementById("register-email");
  const phoneInput = document.getElementById("register-phone");
  const passwordInput = document.getElementById("register-password");
  const confirmPasswordInput = document.getElementById(
    "register-confirm-password"
  );

  if (nameInput) {
    nameInput.addEventListener("input", function () {
      validateInput(
        this,
        (value) => value.trim().length >= 3,
        "Tên phải có ít nhất 3 ký tự"
      );
    });
  }

  if (emailInput) {
    emailInput.addEventListener("input", function () {
      const isValidFormat = validateInput(
        this,
        validateEmail,
        "Email không đúng định dạng"
      );

      if (isValidFormat && emailExists(this.value)) {
        validateInput(this, () => false, "Email này đã được sử dụng");
      }
    });

    // Check trùng lặp khi focus out
    emailInput.addEventListener("blur", function () {
      if (validateEmail(this.value) && emailExists(this.value)) {
        validateInput(this, () => false, "Email này đã được sử dụng");
      }
    });
  }

  if (phoneInput) {
    phoneInput.addEventListener("input", function () {
      validateInput(
        this,
        validatePhone,
        "Số điện thoại phải có 10 số và bắt đầu bằng số 0"
      );
    });
  }

  if (passwordInput) {
    passwordInput.addEventListener("input", function () {
      validateInput(
        this,
        (value) => value.length >= 6,
        "Mật khẩu phải có ít nhất 6 ký tự"
      );

      // Validate mạnh nếu muốn (có thể comment lại nếu không cần)
      /*
      validateInput(
        this, 
        validateStrongPassword, 
        "Mật khẩu phải có ít nhất 6 ký tự, gồm chữ hoa, chữ thường và số"
      );
      */

      // Nếu confirm password đã có nội dung, check lại match
      if (confirmPasswordInput && confirmPasswordInput.value) {
        validateInput(
          confirmPasswordInput,
          (value) => value === passwordInput.value,
          "Mật khẩu xác nhận không khớp"
        );
      }
    });
  }

  if (confirmPasswordInput && passwordInput) {
    confirmPasswordInput.addEventListener("input", function () {
      validateInput(
        this,
        (value) => value === passwordInput.value,
        "Mật khẩu xác nhận không khớp"
      );
    });
  }
}

// Hàm setup real-time validation cho form đăng nhập
function setupLoginFormValidation() {
  const emailInput = document.getElementById("login-email");
  const passwordInput = document.getElementById("login-password");

  if (emailInput) {
    emailInput.addEventListener("input", function () {
      validateInput(this, validateEmail, "Email không đúng định dạng");
    });
  }

  if (passwordInput) {
    passwordInput.addEventListener("input", function () {
      validateInput(
        this,
        (value) => value.length >= 6,
        "Mật khẩu phải có ít nhất 6 ký tự"
      );
    });
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

  // Thêm style cho validation
  addValidationStyles();

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

  // Thiết lập real-time validation cho các form
  setupRegisterFormValidation();
  setupLoginFormValidation();

  // Xử lý form đăng nhập
  const loginForm = document.getElementById("login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const email = document.getElementById("login-email").value;
      const password = document.getElementById("login-password").value;

      let isValid = true;

      // Validate email
      isValid =
        validateInput(
          document.getElementById("login-email"),
          validateEmail,
          "Email không đúng định dạng"
        ) && isValid;

      // Validate password
      isValid =
        validateInput(
          document.getElementById("login-password"),
          (value) => value.length >= 6,
          "Mật khẩu phải có ít nhất 6 ký tự"
        ) && isValid;

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
        validateInput(
          document.getElementById("register-name"),
          (value) => value.trim().length >= 3,
          "Tên phải có ít nhất 3 ký tự"
        ) && isValid;

      // Validate email
      const emailInput = document.getElementById("register-email");
      isValid =
        validateInput(
          emailInput,
          validateEmail,
          "Email không đúng định dạng"
        ) && isValid;

      // Kiểm tra email đã tồn tại
      if (isValid && emailExists(email)) {
        isValid =
          validateInput(emailInput, () => false, "Email này đã được sử dụng") &&
          isValid;
      }

      // Validate phone
      isValid =
        validateInput(
          document.getElementById("register-phone"),
          validatePhone,
          "Số điện thoại phải có 10 số và bắt đầu bằng số 0"
        ) && isValid;

      // Validate password
      isValid =
        validateInput(
          document.getElementById("register-password"),
          (value) => value.length >= 6,
          "Mật khẩu phải có ít nhất 6 ký tự"
        ) && isValid;

      // Validate confirm password
      isValid =
        validateInput(
          document.getElementById("register-confirm-password"),
          (value) => value === password,
          "Mật khẩu xác nhận không khớp"
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

// Thêm CSS cho validation
function addValidationStyles() {
  const styleElement = document.createElement("style");
  styleElement.textContent = `
    .valid-input {
      border: 2px solid #4CAF50 !important;
      background-color: rgba(76, 175, 80, 0.05) !important;
    }
    
    .invalid-input {
      border: 2px solid #F44336 !important;
      background-color: rgba(244, 67, 54, 0.05) !important;
    }
    
    .error {
      color: #F44336;
      font-size: 12px;
      margin-top: 4px;
      display: none;
    }
    
    input {
      transition: border 0.3s, background-color 0.3s;
    }
  `;
  document.head.appendChild(styleElement);
}
