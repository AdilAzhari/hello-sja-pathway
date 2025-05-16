// Dark mode toggle
document.addEventListener('DOMContentLoaded', function () {
    const themeToggle = document.getElementById('themeToggle');

    // Load saved theme preference
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
        updateToggleIcon(true);
    }

    themeToggle.addEventListener('click', function (e) {
        e.preventDefault();
        document.body.classList.toggle('dark-mode');

        // Save preference
        const isDark = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');
        updateToggleIcon(isDark);
    });

    function updateToggleIcon(isDark) {
        const icon = themeToggle.querySelector('i');
        if (isDark) {
            icon.classList.replace('fa-moon', 'fa-sun');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i> Light Mode';
        } else {
            icon.classList.replace('fa-sun', 'fa-moon');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i> Dark Mode';
        }
    }

    // Form validation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            const email = document.getElementById('email').value;
            if (!email.includes('@')) {
                e.preventDefault();
                alert('Please enter a valid email address');
                return false;
            }
            // Add more validations as needed
            return true;
        });
    }
});

// Enhanced Form Validation
function initFormValidation() {
    const forms = document.querySelectorAll('form');

    forms.forEach(form => {
        form.addEventListener('submit', function (e) {
            let isValid = true;

            // Validate required fields
            form.querySelectorAll('[required]').forEach(field => {
                const formGroup = field.closest('.form-group');

                if (!field.value.trim()) {
                    formGroup.classList.add('error');
                    isValid = false;
                } else {
                    formGroup.classList.remove('error');

                    // Special email validation
                    if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)) {
                        formGroup.classList.add('error');
                        isValid = false;
                    }
                }
            });

            if (!isValid) {
                e.preventDefault();
                form.querySelector('.error input, .error select, .error textarea').focus();
            }
        });

        // Real-time validation
        form.querySelectorAll('input, select, textarea').forEach(field => {
            field.addEventListener('input', () => {
                const formGroup = field.closest('.form-group');
                if (field.value.trim()) {
                    formGroup.classList.remove('error');
                }
            });
        });
    });
}

// Initialize when DOM loads
document.addEventListener('DOMContentLoaded', function () {
    initFormValidation();
    // ... (previous dark mode code)
});

document.getElementById('themeToggle')?.addEventListener('click', function (e) {
    e.preventDefault();
    document.body.classList.toggle('dark-mode');

    const icon = this.querySelector('i');
    if (document.body.classList.contains('dark-mode')) {
        icon.classList.replace('fa-moon', 'fa-sun');
        this.innerHTML = '';
        this.appendChild(icon);
        this.appendChild(document.createTextNode(' Light Mode'));
    } else {
        icon.classList.replace('fa-sun', 'fa-moon');
        this.innerHTML = '';
        this.appendChild(icon);
        this.appendChild(document.createTextNode(' Dark Mode'));
    }
});

document.getElementById('contactForm')?.addEventListener('submit', function (e) {
    const email = document.getElementById('email').value;
    if (!email.includes('@')) {
        e.preventDefault();
        alert('Please enter a valid email address');
    }
});
