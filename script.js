document.getElementById('searchBtn').addEventListener('click', async () => {
    const query = document.getElementById('search').value;
    const response = await fetch(`https://api.adzuna.com/v1/jobs/us/search?app_id=adbe43d7&app_key=2abd1f259a8f9ca5b42625f016173e0b&what=${query}`);
    
    if (!response.ok) {
        console.error('Error fetching data');
        return;
    }

    const data = await response.json();
    displayResults(data);
});

function displayResults(data) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = ''; // Clear previous results
    data.results.forEach(job => {
        const jobElement = document.createElement('div');
        jobElement.textContent = `${job.title} - ${job.company}`;
        resultsDiv.appendChild(jobElement);
    });
}
