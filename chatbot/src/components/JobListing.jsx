import React, { useState, useEffect } from 'react';
import './JobListing.css'; // This works if JobListing.jsx is in the same folder as jobListing.css

import { fetchJobListings, addJobListing } from './jobData'; // Only import the necessary functions

const programmingLanguages = [
    'JavaScript', 'Python', 'Java', 'C#', 'C++', 'Ruby', 'PHP', 'Go', 'Swift', 'Kotlin',
    'Rust', 'TypeScript', 'Scala', 'Perl', 'Dart', 'Objective-C', 'Shell', 'R', 'SQL',
];

const JobListing = () => {
    const [resume, setResume] = useState(null);
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [manualSkill, setManualSkill] = useState('');
    const [manualSkills, setManualSkills] = useState([]);
    const [foundLanguages, setFoundLanguages] = useState([]);
    const [jobs, setJobs] = useState([]); // State to hold job listings
    const [newJob, setNewJob] = useState({ title: '', skills: '', description: '', applyLink: '' }); // State for new job form

    useEffect(() => {
        loadJobListings();
    }, []);

    const loadJobListings = async () => {
        const listings = await fetchJobListings();
        setJobs(listings);
    };

    const handleResumeUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = async (event) => {
            const text = event.target.result;
            extractProgrammingLanguages(text);
        };
        reader.readAsText(file);
    };

    const extractProgrammingLanguages = (text) => {
        const found = programmingLanguages.filter(lang => text.includes(lang));
        setFoundLanguages(found);
    };

    const handleAddManualSkill = () => {
        if (manualSkill && !manualSkills.includes(manualSkill)) {
            setManualSkills([...manualSkills, manualSkill]);
            setManualSkill('');
        }
    };

    const handleFilterJobs = () => {
        const allSkills = [...foundLanguages, ...manualSkills];
        filterJobs(allSkills);
    };

    const filterJobs = (skills) => {
        const skillArray = skills.map(skill => skill.trim().toLowerCase());

        const matches = jobs.filter(job =>
            skillArray.some(skill => job.skills.toLowerCase().includes(skill))
        );

        setFilteredJobs(matches);
    };

    const handleAddJob = async () => {
        const addedJob = await addJobListing(newJob);
        setJobs((prevJobs) => [...prevJobs, addedJob]);
        setNewJob({ title: '', skills: '', description: '', applyLink: '' }); // Reset form
    };

    return (
        <div className="job-listing">
            <h1>Find Your Dream Job</h1>

            <form className="job-filter-form">
                <input
                    type="file"
                    accept=".txt,.pdf,.doc,.docx"
                    onChange={handleResumeUpload}
                    className="resume-upload"
                />
                <button
                    type="button"
                    className="submit-button"
                    onClick={handleFilterJobs}
                >
                    Filter Jobs
                </button>
            </form>

            <div className="manual-skill-input">
                <input
                    type="text"
                    value={manualSkill}
                    onChange={(e) => setManualSkill(e.target.value)}
                    placeholder="Add a skill manually"
                />
                <button type="button" onClick={handleAddManualSkill}>Add Skill</button>
            </div>

            {manualSkills.length > 0 && (
                <div className="added-skills">
                    <h4>Added Skills:</h4>
                    <ul>
                        {manualSkills.map((skill, index) => (
                            <li key={index}>{skill}</li>
                        ))}
                    </ul>
                </div>
            )}

            <div className="job-container">
                {/* Filtered Job Listings */}
                {filteredJobs.length > 0 && (
                    <div className="job-results">
                        <h2>Filtered Job Listings</h2>
                        <div className="job-cards">
                            {filteredJobs.map(job => (
                                <div key={job.id} className="card">
                                    <h3>{job.title}</h3>
                                    <p>Required Skills: {job.skills}</p>
                                    <p>Description: {job.description}</p>
                                    <button
                                        className="apply-button"
                                        onClick={() => window.location.href = job.applyLink}
                                    >
                                        Apply
                                    </button>
                                    {/* Removed update and delete buttons */}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* All Available Job Listings */}
                <div className="all-jobs small-box">
                    <h2>All Available Job Listings</h2>
                    <div className="job-cards">
                        {jobs.map(job => (
                            <div key={job.id} className="card">
                                <h3>{job.title}</h3>
                                <p>Required Skills: {job.skills}</p>
                                <p>Description: {job.description}</p>
                                <button
                                    className="apply-button"
                                    onClick={() => window.location.href = job.applyLink}
                                >
                                    Apply
                                </button>
                                {/* Removed update and delete buttons */}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Form to Add New Job */}
            <div>
                
            </div>
        </div>
    );
};

export default JobListing;
