document.getElementById('job-alert-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission
    const jobCategory = document.getElementById('job-category').value;
    fetchJobs(jobCategory); // Fetch jobs based on selected category
});

// Update the fetchJobs function to filter by jobCategory
async function fetchJobs(jobCategory) {
    // ... existing fetching logic
    // Filter jobs based on jobCategory
    const filteredJobs = jobs.filter(job => job.category === jobCategory); // Adjust based on RSS structure
    displayJobs(filteredJobs);
}
