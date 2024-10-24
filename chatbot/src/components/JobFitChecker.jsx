import React, { useState } from 'react';
import { getGroqChatCompletion } from '../services/groqService';
import 'bootstrap/dist/css/bootstrap.min.css';
import './JobFitChecker.css'; // Custom CSS for additional styling

const JobFitChecker = () => {
    const [jobDetails, setJobDetails] = useState('');
    const [resume, setResume] = useState('');
    const [fitEvaluation, setFitEvaluation] = useState('');
    const [fitStatus, setFitStatus] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleResumeChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setResume(event.target.result); // Set resume text
            };
            reader.onerror = () => {
                setError('Failed to read the file. Please try again.');
            };
            reader.readAsText(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setFitEvaluation('');
        setFitStatus('');

        try {
            const messageContent = `Evaluate the following job details and resume for a good fit and provide a clear conclusion:\nJob Details: ${jobDetails}\nResume: ${resume}`;

            const evaluation = await getGroqChatCompletion(messageContent);

            const formattedEvaluation = formatResponse(evaluation);
            const status = determineFitStatus(evaluation);

            setFitEvaluation(formattedEvaluation);
            setFitStatus(status);
        } catch (error) {
            console.error('Error checking fit:', error);
            setError('An error occurred while evaluating fit. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const formatResponse = (response) => {
        // Remove any asterisks or unwanted characters
        const cleanedResponse = response.replace(/\*/g, '').trim();
        const sections = cleanedResponse.split('\n\n'); // Assuming double newlines separate sections
        return sections.map((section, index) => (
            <div key={index} className="response-section">
                {/* Make headings bold */}
                {section.startsWith('Job Requirements') && <h4 className="font-weight-bold">{section}</h4>}
                {section.startsWith('Resume Evaluation') && <h4 className="font-weight-bold">{section}</h4>}
                {section.startsWith('Conclusion') && <h4 className="font-weight-bold">{section}</h4>}
                {!section.startsWith('Job Requirements') && !section.startsWith('Resume Evaluation') && !section.startsWith('Conclusion') && <p>{section}</p>}
            </div>
        ));
    };

    const determineFitStatus = (evaluation) => {
        const lowerCaseEval = evaluation.toLowerCase();

        if (lowerCaseEval.includes('great match') || lowerCaseEval.includes('excellent match') || lowerCaseEval.includes('perfect fit')) {
            return 'Higher Chance';
        } else if (lowerCaseEval.includes('good match') || lowerCaseEval.includes('suitable') || lowerCaseEval.includes('strong match')) {
            return 'Good Fit';
        } else if (lowerCaseEval.includes('not a good match') || lowerCaseEval.includes('no match') || lowerCaseEval.includes('weak fit')) {
            return 'Not Matched'; // Change here for specific feedback
        } else {
            return 'Not fit for the Role'; // Default status when no match found
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Job Fit Checker</h2>
            <form onSubmit={handleSubmit} className="border p-4 rounded shadow bg-light">
                <div className="mb-3">
                    <label htmlFor="jobDetails" className="form-label">Job Details:</label>
                    <textarea
                        id="jobDetails"
                        className="form-control"
                        rows="4"
                        value={jobDetails}
                        onChange={(e) => setJobDetails(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="resume" className="form-label">Resume (TXT file):</label>
                    <input
                        id="resume"
                        type="file"
                        accept=".txt"
                        className="form-control"
                        onChange={handleResumeChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? 'Checking...' : 'Check Fit'}
                </button>
            </form>
            {error && <div className="alert alert-danger mt-3">{error}</div>}
            {fitEvaluation && (
                <div className="mt-4">
                    <div className="alert alert-info mt-4">
                        <h4>Fit Status: {fitStatus}</h4>
                    </div>
                    <h3 className="text-success">Fit Evaluation:</h3>
                    <div>{fitEvaluation}</div>
                </div>
            )}
        </div>
    );
};

export default JobFitChecker;
