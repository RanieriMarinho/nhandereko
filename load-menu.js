document.addEventListener("DOMContentLoaded", function() {
    fetch('menu.html')
        .then(response => response.text())
        .then(html => {
            const headerPlaceholder = document.getElementById('header-placeholder');
            if(headerPlaceholder) {
                headerPlaceholder.innerHTML = html;
            }
        });
});