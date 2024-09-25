document.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.getElementById('loginBtn');
    const signupBtn = document.getElementById('signupBtn');
    const error = document.getElementById('error');

    // Login Functionality
    if (loginBtn) {
        loginBtn.addEventListener('click', () => {
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            const storedUser = localStorage.getItem(username);
            if (storedUser && JSON.parse(storedUser).password === password) {
                localStorage.setItem('loggedInUser', username);
                window.location.href = 'dashboard.html';
            } else {
                error.classList.remove('hidden');
            }
        });
    }

    // Signup Functionality
    if (signupBtn) {
        signupBtn.addEventListener('click', () => {
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            if (localStorage.getItem(username)) {
                error.classList.remove('hidden');
            } else {
                localStorage.setItem(username, JSON.stringify({ password }));
                window.location.href = 'login.html';
            }
        });
    }
});
