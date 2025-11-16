// Theme Toggle Functionality (no dark-mode class)
document.addEventListener('DOMContentLoaded', function () {
    const modeToggle = document.getElementById('modeToggle');
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        if (savedTheme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
            modeToggle.checked = true;
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            modeToggle.checked = false;
        }
    } else {
        // No saved theme: use system preference
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.documentElement.setAttribute('data-theme', 'dark');
            modeToggle.checked = true;
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            modeToggle.checked = false;
        }
    }

    // Handle toggle change
    modeToggle.addEventListener('change', function () {
        if (this.checked) {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        }
    });

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (!localStorage.getItem('theme')) {
            if (e.matches) {
                document.documentElement.setAttribute('data-theme', 'dark');
                modeToggle.checked = true;
            } else {
                document.documentElement.setAttribute('data-theme', 'light');
                modeToggle.checked = false;
            }
        }
    });
});

// Scroll Header Functionality & force white text at top
window.addEventListener('scroll', () => {
    const header = document.querySelector('.site-header');
    const headerLinks = header.querySelectorAll('a, a.logo h2, nav ul li a');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
        // Remove inline color to restore theme-based color
        headerLinks.forEach(el => el.style.color = '');
    } else {
        header.classList.remove('scrolled');
        // Force white color for all header text
        headerLinks.forEach(el => el.style.color = '#fff');
    }
});

const openNav = document.querySelector(".open-nav");
const navigation = document.getElementById("small-screen-nav");
const closeNav = document.querySelector(".close-nav");

if (openNav && navigation && closeNav) {
    // Toggle instead of separate open/close
    const toggleNav = () => navigation.classList.toggle("active");
    
    openNav.addEventListener("click", toggleNav);
    closeNav.addEventListener("click", toggleNav);
    
    // Optional: Close on outside click
    document.addEventListener("click", (e) => {
        if (!navigation.contains(e.target) && !openNav.contains(e.target)) {
            navigation.classList.remove("active");
        }
    });
    
    // Optional: Close on Escape key
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && navigation.classList.contains("active")) {
            navigation.classList.remove("active");
        }
    });
}

if (openNav) {
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        // Add 'fixed' class when scrolled down more than 100px
        if (currentScrollY > 100) {
            openNav.classList.add('fixed');
            
            // Optional: Hide when scrolling down, show when scrolling up
            if (currentScrollY > lastScrollY) {
                openNav.classList.add('hidden');
            } else {
                openNav.classList.remove('hidden');
            }
        } else {
            openNav.classList.remove('fixed', 'hidden');
        }
        
        lastScrollY = currentScrollY;
    });
}

// Category filtering functionality
document.addEventListener('DOMContentLoaded', function () {
    const catTabs = document.querySelectorAll('.cat-tab');
    const catItems = document.querySelectorAll('.cat-item');

    catTabs.forEach(tab => {
        tab.addEventListener('click', function () {
            // Remove active class from all tabs
            catTabs.forEach(t => t.classList.remove('active'));

            // Add active class to clicked tab
            this.classList.add('active');

            // Get the selected category
            const selectedCategory = this.getAttribute('data-category');

            // Filter items
            catItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');

                if (selectedCategory === 'main') {
                    // Show all items when 'main' is selected
                    item.style.display = 'flex';
                } else if (itemCategory === selectedCategory) {
                    // Show items that match the selected category
                    item.style.display = 'flex';
                } else {
                    // Hide items that don't match
                    item.style.display = 'none';
                }
            });
        });
    });
});