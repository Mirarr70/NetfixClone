// Simple client-side auth demo using localStorage (no backend)
(function () {
  const USERS_KEY = "nf_users";

  function getUsers() {
    try { return JSON.parse(localStorage.getItem(USERS_KEY)) || []; }
    catch (e) { return []; }
  }
  function saveUsers(users) {
    try { localStorage.setItem(USERS_KEY, JSON.stringify(users)); } catch (e) {}
  }
  function showMsg(text, type) {
    const box = document.getElementById("msg");
    box.textContent = text;
    box.className = "alert alert-" + type;
  }

  const registerForm = document.getElementById("registerForm");
  const loginForm = document.getElementById("loginForm");

  if (registerForm) {
    registerForm.addEventListener("submit", function (e) {
      e.preventDefault();
      registerForm.classList.add("was-validated");
      if (!registerForm.checkValidity()) return;

      const username = document.getElementById("username").value.trim();
      const email = document.getElementById("email").value.trim().toLowerCase();
      const password = document.getElementById("password").value;
      const users = getUsers();

      if (users.some(u => u.email === email)) {
        showMsg("This email is already registered.", "danger");
        return;
      }
      users.push({ username, email, password });
      saveUsers(users);
      showMsg("Account created! Redirecting to login...", "success");
      setTimeout(() => { window.location.href = "sign-in.html"; }, 1200);
    });
  }

  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
      loginForm.classList.add("was-validated");
      if (!loginForm.checkValidity()) return;

      const email = document.getElementById("email").value.trim().toLowerCase();
      const password = document.getElementById("password").value;
      const user = getUsers().find(u => u.email === email && u.password === password);

      if (user) {
        showMsg("Welcome back, " + user.username + "!", "success");
        setTimeout(() => { window.location.href = "index.html"; }, 1200);
      } else {
        showMsg("Invalid email or password.", "danger");
      }
    });
  }
})();