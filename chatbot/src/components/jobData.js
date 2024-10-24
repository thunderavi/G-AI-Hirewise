const API_URL = 'http://localhost:8000/api/jobs/'; // Update with your actual API URL

// Fetch all job listings
export const fetchJobListings = async () => {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error('Failed to fetch job listings');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching job listings:', error);
        return [];
    }
};

// Add a new job listing
export const addJobListing = async (jobData) => {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(jobData),
        });
        if (!response.ok) {
            throw new Error('Failed to add job listing');
        }
        return await response.json();
    } catch (error) {
        console.error('Error adding job listing:', error);
        return null;
    }
};

// Update an existing job listing
export const updateJobListing = async (id, jobData) => {
    try {
        const response = await fetch(`${API_URL}${id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(jobData),
        });
        if (!response.ok) {
            throw new Error('Failed to update job listing');
        }
        return await response.json();
    } catch (error) {
        console.error('Error updating job listing:', error);
        return null;
    }
};

// Delete a job listing
export const deleteJobListing = async (id) => {
    try {
        const response = await fetch(`${API_URL}${id}/`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Failed to delete job listing');
        }
        return true; // Return true on successful delete
    } catch (error) {
        console.error('Error deleting job listing:', error);
        return false;
    }
};
