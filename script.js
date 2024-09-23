const appId = "adbe43d7"; // Your Adzuna application ID
const appKey = "2abd1f259a8f9ca5b42625f016173e0b"; // Your Adzuna application key
let offset = 0;

document.addEventListener('DOMContentLoaded', () => {
    fetchCategories();
});

async function fetchCategories() {
    const url = `https://api.adzuna.com/v1/api/jobs/gb/categories?app_id=${appId}&app_key=${appKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        populateCategories(data.results);
    } catch (error) {
        console.error("Error fetching categories:", error);
    }
}

function populateCategories(categories) {
    const jobCategorySelect = document.getElementById('jobCategory');
    jobCategorySelect.innerHTML = '<option value="">Select a job category</option>';
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.tag;
        option.textContent = category.label;
        jobCategorySelect.appendChild(option);
    });
}

document.getElementById('searchButton').addEventListener('click', () => {
    const jobCategory = document.getElementById('jobCategory').value;
    if (jobCategory) {
        searchJobs(jobCategory);
    }
});

async function searchJobs(category) {
    const url = `https://api.adzuna.com/v1/api/jobs/gb/search/1?app_id=${appId}&app_key=${appKey}&results_per_page=5&offset=${offset}&category=${category}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        displayJobs(data.results);
        offset += 5; // Update offset for loading more results
        document.getElementById('loadMore').style.display = 'block';
    } catch (error) {
        console.error("Error fetching job listings:", error);
    }
}

function displayJobs(jobs) {
    const jobResults = document.getElementById('jobResults');
    jobResults.innerHTML = ''; // Clear previous results
    jobs.forEach(job => {
        const card = document.createElement('div');
        card.className = 'job-card';
        card.innerHTML = `
            <h3>${job.title}</h3>
            <p><strong>Company:</strong> ${job.company.name}</p>
            <p><strong>Location:</strong> ${job.location.display_name}</p>
            <p>${job.description.substring(0, 100)}...</p>
            <a href="${job.redirect_url}" target="_blank">Apply</a>
        `;
        jobResults.appendChild(card);
    });
}

document.getElementById('loadMore').addEventListener('click', () => {
    const jobCategory = document.getElementById('jobCategory').value;
    if (jobCategory) {
        searchJobs(jobCategory);
    }
});
