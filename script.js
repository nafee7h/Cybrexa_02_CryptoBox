const passwordInput = document.getElementById("password");
const strengthBar = document.getElementById("strength-bar");
const strengthText = document.getElementById("strength-text");
const crackTime = document.getElementById("crack-time");
const breachWarning = document.getElementById("breach-warning");

const commonPasswords = ["123456", "password", "qwerty", "12345678"];

passwordInput.addEventListener("input", () => {
  const password = passwordInput.value;
  let score = 0;

  if (password.length >= 8) score += 20;
  if (/[A-Z]/.test(password)) score += 20;
  if (/[a-z]/.test(password)) score += 20;
  if (/[0-9]/.test(password)) score += 20;
  if (/[^A-Za-z0-9]/.test(password)) score += 20;

  // Strength display
  strengthBar.style.width = score + "%";

  if (score < 40) {
    strengthBar.style.background = "red";
    strengthText.textContent = "Strength: Weak";
    crackTime.textContent = "Crack Time: Seconds";
  } else if (score < 70) {
    strengthBar.style.background = "orange";
    strengthText.textContent = "Strength: Medium";
    crackTime.textContent = "Crack Time: Hours/Days";
  } else {
    strengthBar.style.background = "lime";
    strengthText.textContent = "Strength: Strong";
    crackTime.textContent = "Crack Time: Years";
  }

  // Breach check
  if (commonPasswords.includes(password)) {
    breachWarning.textContent = "⚠️ Common password!";
    breachWarning.style.color = "red";
  } else {
    breachWarning.textContent = "";
  }
});

// Generator
function generatePassword() {
  const length = document.getElementById("length").value;
  document.getElementById("length-value").textContent = length;

  const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";

  let password = "";
  const array = new Uint32Array(length);
  window.crypto.getRandomValues(array);

  for (let i = 0; i < length; i++) {
    password += chars[array[i] % chars.length];
  }

  document.getElementById("generated-password").value = password;
}

// Copy
function copyPassword() {
  const pass = document.getElementById("generated-password");
  pass.select();
  document.execCommand("copy");
  alert("Copied!");
}
