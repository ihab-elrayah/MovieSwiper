// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyANv19NfBm6VuxtjAea6OCE3lj8baNqT-0",
    authDomain: "reeltalk-7051c.firebaseapp.com",
    projectId: "reeltalk-7051c",
    storageBucket: "reeltalk-7051c.appspot.com",
    messagingSenderId: "1050276984691",
    appId: "1:1050276984691:web:3462d9dc4eab6b4ed37706",
    measurementId: "G-90KGC1D99T"
  };

// Initialize Firebase app
firebase.initializeApp(firebaseConfig);

// Get references to Firebase Auth and Database
const auth = firebase.auth()

const database = firebase.database()

// Use device language for Auth 
auth.useDeviceLanguage();

// Function to handle password reset
const resetPasswordFunction = () => {
    // Get user's email from input
    const email = document.getElementById('email').value;

    // Element to display message
    const messageElement = document.getElementById('message');

    // Call Firebase reset email API
    auth.sendPasswordResetEmail(email)
    .then(() => {
        // Display success message
        messageElement.textContent = 'Password Reset Email Sent Successfully!';
        messageElement.style.color = 'black'; // Optional: style the message
    })
    .catch(error => {
        // Display error message  
        messageElement.textContent = 'Error: ' + error.message;
        messageElement.style.color = 'black'; // Optional: style the message
    })
}

// Assuming resetPassword and resetForm are already defined above this script
resetPassword.addEventListener('click', resetPasswordFunction);
resetForm.addEventListener('submit', confirmReset);



