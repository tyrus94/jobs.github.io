document.getElementById('job-preference-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const jobType = document.getElementById('job-type').value;
    const phone = document.getElementById('phone').value;

    // Here you would typically send this data to your backend
    document.getElementById('message').innerText = `Thank you! You will receive ${jobType} alerts at ${phone}.`;
});
