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

// State management
let selectedPersons = 2;
let selectedDate = new Date(2021, 11, 2);
let selectedTime = '18:00';
let currentMonth = new Date();

// Initialize
document.addEventListener('DOMContentLoaded', function () {
    initCustomSelects();
    initDatePicker();
    initFormValidation();
});

// Custom Select Functionality
function initCustomSelects() {
    // Persons select
    const personsSelect = document.getElementById('personsSelect');
    const personsDisplay = personsSelect.querySelector('.select-display');
    const personsOptions = personsSelect.querySelector('.select-options');

    personsDisplay.addEventListener('click', function (e) {
        e.stopPropagation();
        personsDisplay.classList.toggle('active');
        personsOptions.classList.toggle('show');

        // Close other dropdowns
        document.getElementById('timeSelect').querySelector('.select-display').classList.remove('active');
        document.getElementById('timeSelect').querySelector('.select-options').classList.remove('show');
    });

    personsOptions.querySelectorAll('.select-option').forEach(option => {
        option.addEventListener('click', function () {
            personsOptions.querySelectorAll('.select-option').forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');
            selectedPersons = this.dataset.value;
            personsDisplay.querySelector('.select-value').textContent = this.textContent;
            personsDisplay.classList.remove('active');
            personsOptions.classList.remove('show');
        });
    });

    // Time select
    const timeSelect = document.getElementById('timeSelect');
    const timeDisplay = timeSelect.querySelector('.select-display');
    const timeOptions = timeSelect.querySelector('.select-options');

    timeDisplay.addEventListener('click', function (e) {
        e.stopPropagation();
        timeDisplay.classList.toggle('active');
        timeOptions.classList.toggle('show');

        // Close other dropdowns
        personsDisplay.classList.remove('active');
        personsOptions.classList.remove('show');
    });

    timeOptions.querySelectorAll('.time-option').forEach(option => {
        option.addEventListener('click', function () {
            timeOptions.querySelectorAll('.time-option').forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');
            selectedTime = this.dataset.value;
            timeDisplay.querySelector('.select-value').textContent = this.textContent;
            timeDisplay.classList.remove('active');
            timeOptions.classList.remove('show');
        });
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', function () {
        personsDisplay.classList.remove('active');
        personsOptions.classList.remove('show');
        timeDisplay.classList.remove('active');
        timeOptions.classList.remove('show');
    });
}

// Custom Date Picker
function initDatePicker() {
    const dateDisplay = document.getElementById('dateDisplay');
    const calendarPopup = document.getElementById('calendarPopup');
    const calendarGrid = document.getElementById('calendarGrid');
    const monthYear = document.getElementById('monthYear');
    const prevMonth = document.getElementById('prevMonth');
    const nextMonth = document.getElementById('nextMonth');

    dateDisplay.addEventListener('click', function (e) {
        e.stopPropagation();
        dateDisplay.classList.toggle('active');
        calendarPopup.classList.toggle('show');
        renderCalendar();
    });

    prevMonth.addEventListener('click', function () {
        currentMonth.setMonth(currentMonth.getMonth() - 1);
        renderCalendar();
    });

    nextMonth.addEventListener('click', function () {
        currentMonth.setMonth(currentMonth.getMonth() + 1);
        renderCalendar();
    });

    document.addEventListener('click', function (e) {
        if (!calendarPopup.contains(e.target) && !dateDisplay.contains(e.target)) {
            dateDisplay.classList.remove('active');
            calendarPopup.classList.remove('show');
        }
    });

    function renderCalendar() {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();

        monthYear.textContent = currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        calendarGrid.innerHTML = '';

        // Day headers
        const dayHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        dayHeaders.forEach(day => {
            const header = document.createElement('div');
            header.className = 'calendar-day-header';
            header.textContent = day;
            calendarGrid.appendChild(header);
        });

        // Empty cells before first day
        for (let i = 0; i < firstDay; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.className = 'calendar-day empty';
            calendarGrid.appendChild(emptyDay);
        }

        // Calendar days
        for (let day = 1; day <= daysInMonth; day++) {
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day';
            dayElement.textContent = day;

            const dayDate = new Date(year, month, day);
            dayDate.setHours(0, 0, 0, 0);

            // Check if date is in the past
            if (dayDate < today) {
                dayElement.classList.add('disabled');
            } else {
                dayElement.addEventListener('click', function () {
                    selectedDate = new Date(year, month, day);
                    dateDisplay.querySelector('.date-value').textContent =
                        selectedDate.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' });
                    dateDisplay.classList.remove('active');
                    calendarPopup.classList.remove('show');
                });
            }

            // Highlight today
            if (dayDate.getTime() === today.getTime()) {
                dayElement.classList.add('today');
            }

            // Highlight selected date
            if (selectedDate &&
                dayDate.getFullYear() === selectedDate.getFullYear() &&
                dayDate.getMonth() === selectedDate.getMonth() &&
                dayDate.getDate() === selectedDate.getDate()) {
                dayElement.classList.add('selected');
            }

            calendarGrid.appendChild(dayElement);
        }
    }
}

// Form Validation
function initFormValidation() {
    document.getElementById('reservationForm').addEventListener('submit', function (e) {
        e.preventDefault();

        let isValid = true;
        document.querySelectorAll('.error').forEach(err => err.classList.remove('show'));

        // Validate full name
        const fullname = document.getElementById('fullname').value.trim();
        if (fullname.length < 2) {
            document.getElementById('nameError').classList.add('show');
            isValid = false;
        }

        // Validate phone
        const phone = document.getElementById('phone').value.trim();
        const phoneRegex = /^[0-9+\-\s()]{10,}$/;
        if (!phoneRegex.test(phone)) {
            document.getElementById('phoneError').classList.add('show');
            isValid = false;
        }

        // Validate email
        const email = document.getElementById('email').value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            document.getElementById('emailError').classList.add('show');
            isValid = false;
        }

        // Validate date
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (selectedDate < today) {
            document.getElementById('dateError').classList.add('show');
            isValid = false;
        }

        if (isValid) {
            const successMsg = document.getElementById('successMessage');
            successMsg.classList.add('show');

            const reservation = {
                name: fullname,
                phone: phone,
                email: email,
                persons: selectedPersons,
                date: selectedDate.toLocaleDateString(),
                time: selectedTime
            };
            console.log('Reservation Details:', reservation);

            setTimeout(() => {
                this.reset();
                selectedPersons = 2;
                selectedDate = new Date(2021, 11, 2);
                selectedTime = '18:00';
                document.getElementById('personsSelect').querySelector('.select-value').textContent = '2 persons';
                document.getElementById('dateDisplay').querySelector('.date-value').textContent = '02/12/2021';
                document.getElementById('timeSelect').querySelector('.select-value').textContent = '06:00 PM';
                successMsg.classList.remove('show');
            }, 3000);
        }
    });
}

let currentSlide = 0;
const slider = document.getElementById('sliderWrapper');
const dots = document.getElementById('sliderDots');
const cards = document.querySelectorAll('.dish-card');

let cardsPerView = 3;
if (window.innerWidth <= 1200) cardsPerView = 2;
if (window.innerWidth <= 768) cardsPerView = 1;

let totalSlides = Math.ceil(cards.length / cardsPerView);

function createDots() {
    dots.innerHTML = '';
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('div');
        dot.className = `dot ${i === 0 ? 'active' : ''}`;
        dot.onclick = () => goToSlide(i);
        dots.appendChild(dot);
    }
}

function updateDots() {
    document.querySelectorAll('.dot').forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

function moveSlide(direction) {
    currentSlide += direction;
    if (currentSlide < 0) currentSlide = totalSlides - 1;
    if (currentSlide >= totalSlides) currentSlide = 0;
    updateSlider();
}

function goToSlide(index) {
    currentSlide = index;
    updateSlider();
}

function updateSlider() {
    const cardWidth = cards[0].offsetWidth;
    const gap = 30;
    const offset = currentSlide * (cardWidth + gap) * cardsPerView;
    slider.style.transform = `translateX(-${offset}px)`;
    updateDots();
}

window.addEventListener('resize', () => {
    const oldCardsPerView = cardsPerView;
    cardsPerView = 3;
    if (window.innerWidth <= 1200) cardsPerView = 2;
    if (window.innerWidth <= 768) cardsPerView = 1;

    if (oldCardsPerView !== cardsPerView) {
        currentSlide = 0;
        totalSlides = Math.ceil(cards.length / cardsPerView);
        createDots();
        updateSlider();
    }
});

createDots();

// let autoSlide = setInterval(() => moveSlide(1), 5000);

slider.addEventListener('mouseenter', () => clearInterval(autoSlide));
slider.addEventListener('mouseleave', () => {
    autoSlide = setInterval(() => moveSlide(1), 5000);
});

// contactForm Submission Handling

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const successMessage = document.getElementById('successMessage');
        successMessage.classList.add('show');

        this.reset();

        setTimeout(() => {
            successMessage.classList.remove('show');
        }, 5000);
    });
}