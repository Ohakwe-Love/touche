// Category filtering functionality
document.addEventListener('DOMContentLoaded', function() {
    const catTabs = document.querySelectorAll('.cat-tab');
    const catItems = document.querySelectorAll('.cat-item');

    catTabs.forEach(tab => {
        tab.addEventListener('click', function() {
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