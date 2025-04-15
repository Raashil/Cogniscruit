"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  FaLinkedin,
  FaGithub,
  FaBriefcase,
  FaCheck,
  FaTimes,
  FaEdit,
  FaTrash,
} from "react-icons/fa";

type TabType = "home" | "addDetails" | "progress";
interface Errors {
  linkedin?: string;
  github?: string;
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<TabType>("home");
  const [linkedinURL, setLinkedinURL] = useState("");
  const [githubURL, setGithubURL] = useState("");
  const [portfolioURL, setPortfolioURL] = useState("");
  const [jobName, setJobName] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [userName, setUserName] = useState("User");
  const [recentJobs, setRecentJobs] = useState<
    Array<{
      id: string;
      title: string;
      status: "processing" | "done" | "error";
      questions: string[];
    }>
  >([]);
  const [editingJob, setEditingJob] = useState<{
    id: string;
    title: string;
    questions: string[];
  } | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const storedName = localStorage.getItem("userName");
    if (!token) {
      window.location.href = "/login";
    }
    if (storedName) {
      setUserName(storedName);
    }

    const fetchUserJobs = async () => {
      try {
        const response = await fetch("http://localhost:5000/get_user_jobs", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok)
          throw new Error(data.message || "Failed to fetch jobs");

        const jobs = data.jobs.map((job: any) => ({
          id: job.job_id,
          title: job.job_description,
          status: job.status.toLowerCase() as "processing" | "done" | "error",
          questions:
            job.behavioural === "Not Processed" ? [] : [job.behavioural],
        }));

        setRecentJobs(jobs);
      } catch (err) {
        console.error("Error fetching jobs:", err);
      }
    };

    fetchUserJobs();
  }, []);

  const validateURLs = () => {
    const newErrors: Errors = {};
    if (linkedinURL && !linkedinURL.includes("linkedin.com")) {
      newErrors.linkedin = "Please enter a valid LinkedIn URL";
    }
    if (githubURL && !githubURL.includes("github.com")) {
      newErrors.github = "Please enter a valid GitHub URL";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleGenerate = async () => {
    if (!validateURLs()) return;
    if (!jobName.trim()) return alert("Please enter a job name");

    const token = localStorage.getItem("authToken");
    if (!token) return alert("No backend token found. Please log in again.");

    setIsLoading(true);
    try {
      const githubUsername = githubURL.split("github.com/")[1]?.split("/")[0];
      if (!githubUsername) throw new Error("Invalid GitHub URL");

      const response = await fetch("http://localhost:5000/interview_gen_task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          github_username: githubUsername,
          linkedin_url: linkedinURL,
          job_description: jobName,
        }),
      });

      if (!response.ok) throw new Error("Failed to generate questions");

      const data = await response.json();
      setRecentJobs((prev) => [
        {
          id: data.job_id,
          title: jobName,
          status: "processing",
          questions: [],
        },
        ...prev,
      ]);

      setJobName("");
      setLinkedinURL("");
      setGithubURL("");
      setActiveTab("home");
    } catch (err: any) {
      console.error("Error:", err.message);
      alert(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditJob = (job: (typeof recentJobs)[0]) =>
    setEditingJob({ ...job });

  const handleSaveEdit = () => {
    if (!editingJob) return;
    setRecentJobs((prev) =>
      prev.map((job) =>
        job.id === editingJob.id ? { ...job, title: editingJob.title } : job
      )
    );
    setEditingJob(null);
  };

  const handleCancelEdit = () => setEditingJob(null);
  const handleDeleteJob = (jobId: string) =>
    setRecentJobs((prev) => prev.filter((job) => job.id !== jobId));

  const handleJobClick = (jobId: string) => {
    setSelectedJob(jobId);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedJob(null);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto mb-8">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Welcome, {userName}! 👋
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Ready to generate some interview questions?
        </p>
      </div>

      {/* TABS */}
      <div className="max-w-7xl mx-auto mb-8 border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex space-x-8">
          {["home", "addDetails", "progress"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as TabType)}
              className={`${
                activeTab === tab
                  ? "border-blue-500 text-blue-600 dark:text-blue-400"
                  : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              } py-4 px-1 border-b-2 font-medium text-sm`}
            >
              {tab === "home"
                ? "Home"
                : tab === "addDetails"
                ? "Add Job Details"
                : "Word Analytics"}
            </button>
          ))}
        </nav>
      </div>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto">
        {/* Add Job Details Tab */}
        {activeTab === "addDetails" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                label: "Job Name",
                value: jobName,
                setValue: setJobName,
                icon: <FaBriefcase />,
              },
              {
                label: "LinkedIn",
                value: linkedinURL,
                setValue: setLinkedinURL,
                icon: <FaLinkedin />,
                error: errors.linkedin,
              },
              {
                label: "GitHub",
                value: githubURL,
                setValue: setGithubURL,
                icon: <FaGithub />,
                error: errors.github,
              },
              {
                label: "Portfolio/Job Desc",
                value: portfolioURL,
                setValue: setPortfolioURL,
                icon: <FaBriefcase />,
              },
            ].map(({ label, value, setValue, icon, error }) => (
              <div
                key={label}
                className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow-md"
              >
                <label className="flex items-center gap-2 text-lg font-medium text-gray-700 dark:text-gray-300">
                  {icon} {label}
                </label>
                <input
                  type="text"
                  placeholder={`Enter ${label}`}
                  value={value}
                  onChange={(e) => {
                    setValue(e.target.value);
                    if (error) {
                      setErrors((prev) => ({
                        ...prev,
                        [label.toLowerCase()]: undefined,
                      }));
                    }
                  }}
                  className={`mt-2 w-full border ${
                    error ? "border-red-500" : "dark:border-gray-700"
                  } rounded-md p-2 text-black dark:text-white bg-white dark:bg-gray-700`}
                />
                {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
              </div>
            ))}

            <div className="md:col-span-2 mt-4 flex justify-center">
              <button
                onClick={handleGenerate}
                disabled={isLoading}
                className={`px-6 py-3 ${
                  isLoading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                } text-white rounded-md text-lg font-medium`}
              >
                {isLoading ? "Generating..." : "Generate Questions"}
              </button>
            </div>
          </div>
        )}

        {/* Home Tab */}
        {activeTab === "home" && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 space-y-6">
            <div className="flex justify-end">
              <button
                onClick={() => setActiveTab("addDetails")}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Create New Job
              </button>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                Recent Jobs
              </h3>
              {recentJobs.map((job) => (
                <div
                  key={job.id}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <div>
                    {editingJob?.id === job.id ? (
                      <input
                        value={editingJob.title}
                        onChange={(e) =>
                          setEditingJob((prev) =>
                            prev ? { ...prev, title: e.target.value } : null
                          )
                        }
                        className="border rounded p-1 bg-white dark:bg-gray-800"
                      />
                    ) : (
                      <span
                        onClick={() => handleJobClick(job.id)}
                        className="text-sm font-medium cursor-pointer"
                      >
                        {job.title}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    {editingJob?.id === job.id ? (
                      <>
                        <button onClick={handleSaveEdit}>
                          <FaCheck />
                        </button>
                        <button onClick={handleCancelEdit}>
                          <FaTimes />
                        </button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => handleEditJob(job)}>
                          <FaEdit />
                        </button>
                        <button onClick={() => handleDeleteJob(job.id)}>
                          <FaTrash />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Progress Tab */}
        {activeTab === "progress" && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              Your Progress
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  label: "Questions Generated",
                  value: recentJobs.length * 3,
                  color: "blue",
                },
                {
                  label: "Jobs Analyzed",
                  value: recentJobs.length,
                  color: "green",
                },
                { label: "Average Quality", value: "87%", color: "purple" },
              ].map((stat, idx) => (
                <div
                  key={idx}
                  className={`bg-gray-100 dark:bg-gray-700 p-4 rounded-md text-center`}
                >
                  <h3 className="font-semibold text-gray-800 dark:text-white mb-1">
                    {stat.label}
                  </h3>
                  <p
                    className={`text-3xl font-bold text-${stat.color}-600 dark:text-${stat.color}-400`}
                  >
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-3xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Job Details</h2>
              <button onClick={handleCloseModal}>
                <FaTimes />
              </button>
            </div>
            <div className="space-y-4">
              <p>{recentJobs.find((job) => job.id === selectedJob)?.title}</p>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold mb-2">Behavioral Questions</h3>
                  {["Tell me...", "Describe...", "How do you..."].map(
                    (q, i) => (
                      <div key={i} className="p-2 bg-gray-100 rounded">
                        {q}
                      </div>
                    )
                  )}
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Technical Questions</h3>
                  {["Explain REST...", "Optimize DB...", "Testing flow"].map(
                    (q, i) => (
                      <div key={i} className="p-2 bg-gray-100 rounded">
                        {q}
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
