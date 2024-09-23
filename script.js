const form = document.getElementById('jobAlertForm');
const jobListingsDiv = document.getElementById('jobListings');
const parser = new RSSParser();

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const jobCategory = document.getElementById('jobCategory').value;
    const frequency = document.getElementById('frequency').value;

    const message = `Hello Ognate,\n\nI would like to receive job alerts for ${jobCategory} with updates every ${frequency}. Thank you!`;

    // Redirect to WhatsApp with prefilled message
    const whatsappUrl = `https://wa.me/+254705757661?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');

    // Fetch job listings from RSS feed
    const rssUrl = 'https://www.jobsinkenya.co.ke/wpjobboard/xml/rss/?filter=active';
    
    try {
        const feed = await parser.parseURL(rssUrl);
        displayJobListings(feed.items);
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
