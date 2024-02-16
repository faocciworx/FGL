// Function to submit the form
function submitForm() {
    // Get form input elements
    var nameInput = document.getElementById('name');
    var emailInput = document.getElementById('email');
    var phoneInput = document.getElementById('phone');
    var messageInput = document.getElementById('message');

    // Validate input values
    if (!validateRequired(nameInput.value, 'Please enter your name.')) return;
    if (!validateRequired(emailInput.value, 'Please enter your email.')) return;
    if (!validatePhoneNumber(phoneInput.value)) return;

    // Prepare form data for submission
    var formData = {
        name: nameInput.value,
        email: emailInput.value,
        phone: phoneInput.value,
        message: messageInput.value
    };

    // Create an XMLHttpRequest to send data to Formspree
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://formspree.io/f/mleqdlzk');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                // Successful submission
                document.getElementById('mail_success').style.display = 'block';

                // Redirect to index.html after 3 seconds
                setTimeout(function () {
                    window.location.href = 'index.html';
                }, 3000);
            } else {
                // Error in submission
                document.getElementById('mail_fail').style.display = 'block';
            }
        }
    };

    // Show "Sending..." status only after input validation
    document.getElementById('mail_success').style.display = 'none';
    document.getElementById('mail_fail').style.display = 'none';

    // Send form data as JSON
    xhr.send(JSON.stringify(formData));
}

// Function to validate required fields
function validateRequired(value, errorMessage) {
    // Display a warning if there is no input
    if (value.trim() === '') {
        document.getElementById('input_warning').style.display = 'block';
        setTimeout(function () {
            document.getElementById('input_warning').style.display = 'none';
        }, 2000); // Hide the warning after 2 seconds
        return false;
    }

    return true;
}

// Function to validate email format
function validateEmail(email) {
    var emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email);
}

// Function to validate phone number format
function validatePhoneNumber(phoneNumber) {
    // Check if the input contains only numeric characters
    var numericRegex = /^[0-9]+$/;
    
    if (!numericRegex.test(phoneNumber)) {
        alert('Please enter a valid phone number.');
        return false;
    }
    
    return true;
}
