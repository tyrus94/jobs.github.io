document.addEventListener('DOMContentLoaded', () => {
    const jobCategorySelect = document.getElementById('job-category');
    const jobListDiv = document.getElementById('job-list');

    // Fetch and populate job categories
    fetch('https://www.jobsinkenya.co.ke/wpjobboard/xml/rss/?filter=active')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(str => new window.DOMParser().parseFromString(str, 'text/xml'))
        .then(data => {
            const items = data.querySelectorAll('item');
            items.forEach(item => {
                const category = item.querySelector('category').textContent;
                const option = document.createElement('option');
                option.value = category;
                option.textContent = category;
                if (!Array.from(jobCategorySelect.options).some(opt => opt.value === category)) {
                    jobCategorySelect.appendChild(option);
                }
            });
        })
        .catch(error => {
            console.error('Error fetching the RSS feed:', error);
            jobListDiv.innerHTML = '<p>Error fetching job listings.</p>';
        });

    // Handle form submission
    document.getElementById('alert-form').addEventListener('submit', (event) => {
        event.preventDefault();
        const jobCategory = jobCategorySelect.value;
        const frequency = document.getElementById('frequency').value;
        const message = `Hello Ognate,\n\nI would like to receive job alerts for ${jobCategory} with updates every ${frequency}. Thank you!`;
        const whatsappUrl = `https://wa.me/+254783344123?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    });
});
