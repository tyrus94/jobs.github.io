const apiUrl = 'https://api.adzuna.com/v1/api/jobs/gb/categories?app_id=adbe43d7&app_key=2abd1f259a8f9ca5b42625f016173e0b';

// Fetch job categories
fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        const jobCategorySelect = document.getElementById('jobCategory');
        data.results.forEach(category => {
            const option = document.createElement('option');
            option.value = category.tag;
            option.textContent = category.label;
            jobCategorySelect.appendChild(option);
        });
    });

// Form submission
document.getElementById('alertForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const jobCategory = document.getElementById('jobCategory').value;
    const frequency = document.getElementById('frequency').value;

    const message = `I want alerts for ${jobCategory} jobs with a frequency of ${frequency}.`;
    const whatsappNumber = '+254783344123'; // Replace with your WhatsApp number
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, '_blank');
});
