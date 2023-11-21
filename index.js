document.addEventListener('DOMContentLoaded', function () {
    // Load saved data from web storage
    const savedData = JSON.parse(localStorage.getItem('userData'));
    if (savedData) {
        document.getElementById('name').value = savedData.name || '';
        document.getElementById('email').value = savedData.email || '';
        document.getElementById('password').value = savedData.password || '';
        document.getElementById('dob').value = savedData.dob || '';
        document.getElementById('acceptTerms').checked = savedData.acceptTerms || false;
    }

    // Additional validation for Date of Birth
    document.getElementById('registrationForm').addEventListener('submit', function (event) {
        const dobInput = document.getElementById('dob');
        const dobError = document.getElementById('dobError');

        // Validate age between 18 and 55
        if (!validateAge(dobInput.value)) {
            dobError.style.display = 'block';
            event.preventDefault(); // Prevent form submission
        } else {
            dobError.style.display = 'none';
            // Save form data to web storage
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                password: document.getElementById('password').value,
                dob: dobInput.value,
                acceptTerms: document.getElementById('acceptTerms').checked,
            };
            localStorage.setItem('userData', JSON.stringify(formData));
        }
    });

    // Function to validate age between 18 and 55
    function validateAge(dateOfBirth) {
        const dob = new Date(dateOfBirth);
        const today = new Date();
        const age = today.getFullYear() - dob.getFullYear();
        const monthDiff = today.getMonth() - dob.getMonth();
        return age > 18 && age < 55 || (age === 18 && monthDiff >= 0);
    }
});
