const form = document.getElementById('jobAlertForm');
const jobListingsDiv = document.getElementById('jobListings');
const parser = new RSSParser();
const jobCategorySelect = document.getElementById('jobCategory');

async function fetchCategories() {
    const rssUrl = 'https://www.jobsinkenya.co.ke/wpjobboard/xml/rss/?filter=active';

    try {
        const feed = await parser.parseURL(rssUrl);
        const categories = new Set();

        feed.items.forEach(item => {
            item.category.forEach(cat => categories.add(cat)); // Add categories to the set
        });

        categories.forEach(cat => {
            const option = document.createElement('option');
            option.value = cat;
            option.textContent = cat;
            jobCategorySelect.appendChild(option); // Populate the dropdown
        });
    } catch (error) {
        console.error('Error fetching categories:', error);
    }
}

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const jobCategory = jobCategorySelect.value;
    const frequency = document.getElementById('frequency').value;

    const message = `Hello Ognate,\n\nI would like to receive job alerts for ${jobCategory} with updates every ${frequency}. Thank you!`;

    // Redirect to WhatsApp with prefilled message
    const whatsappUrl = `https://wa.me/YOUR_WHATSAPP_NUMBER?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');

    // Fetch job listings from RSS feed
    const rssUrl = 'https://www.jobsinkenya.co.ke/wpjobboard/xml/rss/?filter=active';
    
    try {
        const feed = await parser.parseURL(rssUrl);
        displayJobListings(feed.items.filter(item => item.category.includes(jobCategory)));
    } catch (error) {
        console.error('Error fetching job listings:', error);
        jobListingsDiv.innerHTML = '<p>Error fetching job listings.</p>';
    }
});

function displayJobListings(items) {
    jobListingsDiv.innerHTML = '';
    items.forEach(item => {
        const jobElement = document.createElement('div');
        jobElement.innerHTML = `
            <h3>${item.title}</h3>
            <p>${item.description}</p>
            <a href="${item.link}" target="_blank">View Job</a>
            <hr>
        `;
        jobListingsDiv.appendChild(jobElement);
    });
}

// Call the function to fetch categories when the page loads
fetchCategories();
