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

// Initialize Auth and Database
const auth = firebase.auth()
const database = firebase.database()

// Register user function
function register () {

  // Get all our input fields
  email = document.getElementById('email').value
  password = document.getElementById('password').value
  full_name = document.getElementById('full_name').value
  favorite_group = document.getElementById('favorite_group').value
  favorite_movie = document.getElementById('favorite_movie').value

  // Validate input fields
  if (validate_email(email) == false || validate_password(password) == false) {
    
    // Displays error if invalid
    alert('Email or Password is not correct!')
    return 
  }

  if (validate_field(full_name) == false || validate_field(favorite_group) == false || validate_field(favorite_movie) == false) {
    
    // Displays error if invalid
    alert('One or More Extra Fields are not correct!')
    return
  }

  // Create user with email and password
  auth.createUserWithEmailAndPassword(email, password)
  .then(function() {

    // Declare user variable
    var user = auth.currentUser

    // Add this user to Firebase Database
    var database_ref = database.ref()

    // Create User data
    var user_data = {
      email : email, 
      full_name : full_name,
      favorite_group : favorite_group,
      favorite_movie: favorite_movie,
      last_login : Date.now()
    }

    // Push to Firebase Database
    database_ref.child('users/' + user.uid).set(user_data)

    // Displays success message
    alert('User Created!')
  })
  .catch(function(error) {

    // Firebase will use this to alert of its errors
    var error_code = error.code
    var error_message = error.message

    alert(error_message)
  })
}

// Login user function
function login () {

  // Get all our input fields
  email = document.getElementById('email').value
  password = document.getElementById('password').value

  // Validate input fields
  if (validate_email(email) == false || validate_password(password) == false) {
    alert('Email or Password is not correct!')
    return 
  }

  // Sign in user
  auth.signInWithEmailAndPassword(email, password)
  .then(function() {

    // Declare user variable
    var user = auth.currentUser

    // Add this user to Firebase Database
    var database_ref = database.ref()

    // Create User data
    var user_data = {
      last_login : Date.now()
    }

    // Push to Firebase Database
    database_ref.child('users/' + user.uid).update(user_data)
    

    // Redirect logged users to corresponing stored data of favorite movie gernre
    let favorite_group = document.getElementById('favorite_group').value
    if(favorite_group.toLowerCase() === "adventure" || 
    favorite_group.toLowerCase() === "action" ||
     favorite_group.toLowerCase() === "animation") {
     
     window.location.href = "AA.html";
     return;
  
}else if(favorite_group.toLowerCase() === "comedy") {
  window.location.href = "comedy.html";
 } else if (favorite_group.toLowerCase() === "drama" || 
 favorite_group.toLowerCase() === "mystery" || 
 favorite_group.toLowerCase() === "documentary") {
  window.location.href = "DMD.html";
 }else if(favorite_group.toLowerCase() === "horror" || 
 favorite_group.toLowerCase() === "thriller") {
  window.location.href = "HT.html";
}else if(favorite_group.toLowerCase() === "romance") {
  window.location.href = "romance.html";
}

    // Displays success message  
    alert('User Logged In!')

  })
  .catch(function(error) {

    // Firebase will use this to alert of its errors
    var error_code = error.code
    var error_message = error.message

    // Displays error message  
    alert(error_message)
  })
}


// Input validation functions
function validate_email(email) {

    // Regex to validate email
  expression = /^[^@]+@\w+(\.\w+)+\w$/
  if (expression.test(email) == true) {
    
    // Email is vaild
    return true
  } else {
    // Email is not not vaild
    return false
  }
}


function validate_password(password) {
  
  // Firebase requires min 6 chars
  if (password < 6) {
    return false
  } else {
    return true
  }
}

// Check for null value (no input)
function validate_field(field) {
  if (field == null) {
    return false
  }

// Check for zero length (no actual characters)
  if (field.length <= 0) {
    return false
  } else {
    return true // Return true only if field has real input
  }
}

//User reset password redircet to different page
function forgetPassword() {
  window.location.href = "reset_password.html"; 
}
