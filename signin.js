import { EMAIL_REGEX, EIGHT_NUMBERS_REGEX } from "./regex.js";

const visibilityOffIcon = document.querySelector(
  ".password-visibility-off-icon"
);

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

const loginBtn = document.querySelector("button.login");
loginBtn.disabled = true;

const updateLoginButtonState = () => {
  if (
    emailInput.value &&
    passwordInput.value &&
    EMAIL_REGEX.test(emailInput.value.trim()) &&
    EIGHT_NUMBERS_REGEX.test(passwordInput.value.trim())
  ) {
    loginBtn.disabled = false;
  } else {
    loginBtn.disabled = true;
  }
};

// input 태그에 값을 입력할 때 실시간으로 값 반영
emailInput.addEventListener("input", updateLoginButtonState);
passwordInput.addEventListener("input", updateLoginButtonState);

const toggleVisibilityIcon = () => {
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    visibilityOffIcon.src = "../img/icon_visibility_on.png";
  } else {
    passwordInput.type = "password";
    visibilityOffIcon.src = "../img/icon_visibility_off.png";
  }
};

visibilityOffIcon.addEventListener("click", toggleVisibilityIcon);

emailInput.addEventListener("focusout", () => {
  const fieldWrapper = emailInput.parentNode;
  const errorMessage = fieldWrapper.querySelector(".errorMessage");

  if (emailInput.value === "") {
    if (!fieldWrapper.querySelector(".errorMessage")) {
      emailInput.classList.add("error");
      const p = document.createElement("p");
      p.classList.add("errorMessage");
      p.textContent = "이메일을 입력해주세요.";
      fieldWrapper.append(p);
    }
  } else if (EMAIL_REGEX.test(emailInput.value.trim())) {
    emailInput.classList.remove("error");
    if (errorMessage) {
      errorMessage.remove();
    }
    emailInput.style.border = "2px solid var(--main)";
  } else {
    if (errorMessage) {
      errorMessage.remove();
    }
    emailInput.classList.add("error");
    const p = document.createElement("p");
    p.classList.add("errorMessage");
    p.textContent = "잘못된 이메일 형식입니다.";
    fieldWrapper.append(p);
  }
});

passwordInput.addEventListener("focusout", () => {
  const fieldWrapper = passwordInput.parentNode;
  const errorMessage = fieldWrapper.querySelector(".errorMessage");

  if (passwordInput.value === "") {
    if (!fieldWrapper.querySelector(".errorMessage")) {
      passwordInput.classList.add("error");
      const p = document.createElement("p");
      p.classList.add("errorMessage");
      p.textContent = "비밀번호를 입력해주세요.";
      fieldWrapper.append(p);
    }
  } else if (EIGHT_NUMBERS_REGEX.test(passwordInput.value.trim())) {
    passwordInput.classList.remove("error");
    if (errorMessage) {
      errorMessage.remove();
    }
    passwordInput.style.border = "2px solid var(--main)";
  } else {
    if (errorMessage) {
      errorMessage.remove();
    }
    passwordInput.classList.add("error");
    const p = document.createElement("p");
    p.classList.add("errorMessage");
    p.textContent = "비밀번호를 8자 이상 입력해주세요.";
    fieldWrapper.append(p);
  }
});
