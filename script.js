function showForm(formId) {
  document
    .querySelectorAll(".form-box")
    .forEach((form) => form.classList.remove("active"));
  document.getElementById(formId).classList.add("active");
}

function showLoginOptions() {
  document.getElementById("main-login").style.display = "none";
  document.getElementById("login-form").classList.add("active");
}

function hideLoginOptions() {
  document
    .querySelectorAll(".form-box")
    .forEach((form) => form.classList.remove("active"));
  document.getElementById("main-login").style.display = "block";
}
// Firebase config (use your own values)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Login OTP
document.getElementById("send-otp-btn").addEventListener("click", function () {
  const phoneNumber = "+91" + document.getElementById("phone").value;

  window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
    "recaptcha-container",
    {
      size: "invisible",
    }
  );

  firebase
    .auth()
    .signInWithPhoneNumber(phoneNumber, window.recaptchaVerifier)
    .then((confirmationResult) => {
      window.confirmationResult = confirmationResult;
      alert("OTP sent!");
      document.getElementById("otp-section").style.display = "block";
    })
    .catch((error) => {
      alert("Error sending OTP: " + error.message);
      console.error(error);
    });
});

// Show reset password section
document
  .getElementById("forgot-password-link")
  .addEventListener("click", function () {
    document.getElementById("reset-password-section").style.display = "block";
  });

// Forgot Password - Send OTP
document
  .getElementById("send-reset-otp-btn")
  .addEventListener("click", function () {
    const phoneNumber = "+91" + document.getElementById("reset-phone").value;

    window.recaptchaVerifierReset = new firebase.auth.RecaptchaVerifier(
      "recaptcha-container-reset",
      {
        size: "invisible",
      }
    );

    firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber, window.recaptchaVerifierReset)
      .then((confirmationResult) => {
        window.confirmationResultReset = confirmationResult;
        alert("Reset OTP sent!");
        document.getElementById("reset-otp-section").style.display = "block";
      })
      .catch((error) => {
        alert("Error sending reset OTP: " + error.message);
        console.error(error);
      });
  });

// Verify OTP and reset password
document
  .getElementById("reset-password-btn")
  .addEventListener("click", function () {
    const otp = document.getElementById("reset-otp").value;
    const newPassword = document.getElementById("new-password").value;

    window.confirmationResultReset
      .confirm(otp)
      .then((result) => {
        const user = result.user;
        return user.updatePassword(newPassword);
      })
      .then(() => {
        alert("Password reset successful!");
      })
      .catch((error) => {
        alert("Error: " + error.message);
        console.error(error);
      });
  });
