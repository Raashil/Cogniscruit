"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth";

import {
  FaPlus,
  FaRedo,
  FaLinkedin,
  FaGithub,
  FaBriefcase,
  FaInfoCircle,
} from "react-icons/fa";

interface Errors {
  linkedin?: string;
  github?: string;
}

type TabType = "home" | "addDetails" | "progress";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<TabType>("home");
  const [linkedinURL, setLinkedinURL] = useState<string>("");
  const [githubURL, setGithubURL] = useState<string>("");
  const [errors, setErrors] = useState<Errors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [jobName, setJobName] = useState<string>("");
  const { user } = useAuth();
  const [resultModal, setResultModal] = useState<{
    open: boolean;
    message: string;
    success: boolean;
  }>({ open: false, message: "", success: false });


 
  const [recentJobs, setRecentJobs] = useState<
    Array<{
      id: string;
      job_description: string;
      created_at: string;
      status: "waiting" | "inprogress" | "completed";
      behavioural_questions: string[];
      technical_questions: string[];
    }>
  >([]);
  

  useEffect(() => {
    fetchUserJobs();
  }, []);

  const fetchUserJobs = async () => {
    try {
      
      const authToken = localStorage.getItem("authToken");
      const response = await fetch("http://127.0.0.1:5050/get_user_jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch jobs");
      }

      const data = await response.json();

      
      const jobs = data.jobs.map((job: any) => ({
        id: job.job_id,
        job_description: job.job_description,
        created_at: job.created_at,
        status: job.status.toLowerCase() as "waiting" | "inprogress" | "completed",
        behavioural_questions: job.behavioural,
        technical_questions: job.technical,
      }));
      setRecentJobs(jobs);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  const validateURLs = () => {
    const newErrors: Errors = {};

    // LinkedIn URL validation
    if (linkedinURL) {
      if (!linkedinURL.includes("linkedin.com")) {
        newErrors.linkedin = "Please enter a valid LinkedIn URL";
      }
    }

   // GitHub URL validation
    if (githubURL) {
      if (!githubURL.includes("github.com")) {
        newErrors.github = "Please enter a valid GitHub URL";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleGenerate = async () => {
    if (!validateURLs()) return;
    if (!jobName.trim()) {
      alert("Please enter a job name");
      return;
    }
    if (!linkedinURL.trim()) {
      alert("Please enter a linkedinURL");
      return;
    }
    if (!githubURL.trim()) {
      alert("Please enter a githubURL ");
      return;
    }

    setIsLoading(true);
    try {
      const authToken = localStorage.getItem("authToken");
      if (!authToken) {
        throw new Error("No backend token found");
      }

      // Extract GitHub username from URL
      const githubUsername = githubURL.split("github.com/")[1]?.split("/")[0];
      if (!githubUsername) {
        throw new Error("Invalid GitHub URL");
      }

      const response = await fetch("http://127.0.0.1:5050/interview_gen_task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          github_username: githubUsername,
          linkedin_url: linkedinURL,
          job_description: jobName,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate questions");
      }

      const data = await response.json();


      if (data?.job_id) {
        setResultModal({
          open: true,
          message: "Job created successfully!",
          success: true,
        });
      } else {
        console.log(data);
        setResultModal({
          open: true,
          message: "Failed to create job. Please try again.",
          success: false,
        });
      }

    } catch (error) {
      console.error("Error generating questions:", error);
      setResultModal({
        open: true,
        message:
          error instanceof Error
            ? error.message
            : "An error occurred while generating questions",
        success: false,
      });

      // alert(
      //   error instanceof Error
      //     ? error.message
      //     : "An error occurred while generating questions"
      // );
    } finally {
      setIsLoading(false);
    }
  };


  const refreshClick = () => {
    window.location.href = "/dashboard";
  };


  // const handleSignOut = () => {
  //   signOut({ callbackUrl: "/" });
  // };

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
      {/* Welcome Message */}
      <div className="max-w-7xl mx-auto mb-8">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Welcome, {user?.name || "User"}! 👋
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Ready to generate some interview questions?
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            <button
              onClick={() => setActiveTab("home")}
              className={`${
                activeTab === "home"
                  ? "border-blue-500 text-blue-600 dark:text-blue-400"
                  : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Home
            </button>
            <button
              onClick={() => setActiveTab("addDetails")}
              className={`${
                activeTab === "addDetails"
                  ? "border-blue-500 text-blue-600 dark:text-blue-400"
                  : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
             AI Question Generator
            </button>
            <button
              onClick={() => setActiveTab("progress")}
              className={`${
                activeTab === "progress"
                  ? "border-blue-500 text-blue-600 dark:text-blue-400"
                  : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Analytics
            </button>
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-7xl mx-auto">
        {activeTab === "addDetails" && (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Column - Uploads */}
            <div className="lg:w-1/2 flex flex-col gap-6">
              {[
                {
                  label: "Add Job Description",
                  icon: <FaBriefcase className="text-blue-600" />,
                  url: jobName,
                  setURL: setJobName,
                  error: null,
                  type: "textarea",
                },
             
                {
                  label: "LinkedIn",
                  icon: <FaLinkedin className="text-blue-700" />,
                  url: linkedinURL,
                  setURL: setLinkedinURL,
                  error: errors.linkedin,
                  type: "url",
                },
                {
                  label: "GitHub",
                  icon: <FaGithub className="text-black dark:text-white" />,
                  url: githubURL,
                  setURL: setGithubURL,
                  error: errors.github,
                  type: "url",
                },
              ].map(({ label, icon, url, setURL, error, type }, index) => (
                <div
                  key={index}
                  className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow-md"
                >
                  <label className="flex items-center gap-2 text-lg font-medium text-gray-700 dark:text-gray-300">
                    {icon} {label}
                  </label>
                  {type === "textarea" ? (
                    <textarea
                      placeholder={`Enter ${label}`}
                      value={url}
                      onChange={(e) => setURL(e.target.value)}
                      className="mt-2 w-full border dark:border-gray-700 rounded-md p-2 text-black dark:text-white bg-white dark:bg-gray-700 h-32 resize-none"
                    />
                  )  : (
                    <input
                      type="url"
                      placeholder={`Enter ${label} URL`}
                      value={url}
                      onChange={(e) => {
                        setURL(e.target.value);
                        // Clear error when user starts typing
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
                  )}
                  {error && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {error}
                    </p>
                  )}
                  {url && !error && type !== "textarea" && (
                    <p className="mt-2 text-sm">
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 dark:text-blue-400 underline hover:text-blue-800 dark:hover:text-blue-300"
                      >
                        View {label}
                      </a>
                    </p>
                  )}
                </div>
              ))}

              {/* Generate Questions Button */}
              <div className="mt-4 flex justify-center">
                <button
                  onClick={handleGenerate}
                  disabled={isLoading}
                  className={`px-6 py-3 ${
                    isLoading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"
                  } text-white rounded-md transition-colors text-lg font-medium`}
                >
                  {isLoading ? "Generating..." : "Generate Questions"}
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "home" && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="space-y-6">
              {/* Create New Job Button */}
              <div className="flex justify-end space-x-2">

              <button
                  onClick={() => refreshClick()}
                  className="flex items-center gap-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  <FaRedo className="text-sm" />
                  Refresh
                </button>

                <button
                  onClick={() => setActiveTab("addDetails")}
                  className="flex items-center gap-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  <FaPlus className="text-sm" />
                  Create New Job
                </button>


              </div>


              {/* Job Status List */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  Recent Jobs
                </h3>
                <div className="space-y-2">
                  {recentJobs.map((job) => (
                    <div
                      key={job.id}
                      className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                         
                          <span
                            className="text-sm font-medium text-gray-800 dark:text-white cursor-pointer"
                            onClick={() => handleJobClick(job.id)}
                          >
                            Job Id : {job.id}
                          </span>
                        
                      </div>

                      <div className="flex items-center space-x-3">
                         
                          <span
                            className="text-sm font-medium text-gray-800 dark:text-white cursor-pointer"
                            
                          >
                            Created at :{job.created_at}
                          </span>
                        
                      </div>

                      <div className="flex items-center space-x-2">
                        
                          
                            <button
                              onClick={() => handleJobClick(job.id)}
                              className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-md transition-colors"
                            >
                              <FaInfoCircle className="text-sm" />
                              Details
                            </button>
                         
                          
                        
                        <div className="flex items-center space-x-2">
                          <div className="w-24 h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all duration-1000 ${
                                job.status === "completed"
                                  ? "w-full bg-green-500 dark:bg-green-400"
                                  : job.status === "inprogress"
                                  ? "w-3/4 bg-blue-500 dark:bg-blue-400 animate-pulse"
                                  : "w-1/4 bg-red-500 dark:bg-red-400"
                              }`}
                            />
                          </div>
                          <span
                            className={`text-xs font-medium ${
                              job.status === "completed"
                                ? "text-green-600 dark:text-green-400"
                                : job.status === "inprogress"
                                ? "text-blue-600 dark:text-blue-400"
                                : "text-red-600 dark:text-red-400"
                            }`}
                          >
                            {job.status.charAt(0).toUpperCase() +
                              job.status.slice(1)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Questions Modal */}
              {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full p-6 overflow-hidden">

                    {/* Scrollable content */}
                    <div className="max-h-[80vh] overflow-y-auto pr-2">
                      <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                          Job Description
                        </h2>
                        <button
                          onClick={handleCloseModal}
                          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                        >
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>

                      {/* Job Description */}
                      <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <p className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
                          {recentJobs.find((job) => job.id === selectedJob)?.job_description}
                        </p>
                      </div>

                      {/* Questions Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Behavioral Questions Column */}
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                            Behavioral Questions
                          </h3>
                          <div className="space-y-3">
                            {recentJobs.find((job) => job.id === selectedJob)?.behavioural_questions.map((question, index) => (
                              <div key={index} className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                                <p className="text-gray-800 dark:text-gray-200">
                                  {question}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Technical Questions Column */}
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                            Technical Questions
                          </h3>
                          <div className="space-y-3">
                            {recentJobs.find((job) => job.id === selectedJob)?.technical_questions.map((question, index) => (
                              <div key={index} className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                                <p className="text-gray-800 dark:text-gray-200">
                                  {question}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "progress" && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              Your Progress
            </h2>
            <div className="space-y-4">
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                  Questions Generated
                </h3>
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                  0
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                  Job Descriptions Analyzed
                </h3>
                <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                  0
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                  Average Question Quality
                </h3>
                <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                  0%
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 mt-16">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white text-lg font-semibold">Cogniscruit</h3>
              <p className="mt-2 text-gray-400 text-sm">
                Transforming interview processes with AI-powered question
                generation.
              </p>
            </div>
            <div>
              <h3 className="text-white text-lg font-semibold">Quick Links</h3>
              <ul className="mt-2 space-y-1">
                <li>
                  <Link
                    href="/about"
                    className="text-gray-400 hover:text-white text-sm"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/features"
                    className="text-gray-400 hover:text-white text-sm"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-gray-400 hover:text-white text-sm"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white text-lg font-semibold">Resources</h3>
              <ul className="mt-2 space-y-1">
                <li>
                  <Link
                    href="/blog"
                    className="text-gray-400 hover:text-white text-sm"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="/faq"
                    className="text-gray-400 hover:text-white text-sm"
                  >
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link
                    href="/support"
                    className="text-gray-400 hover:text-white text-sm"
                  >
                    Support
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white text-lg font-semibold">Newsletter</h3>
              <p className="mt-2 text-gray-400 text-sm">
                Subscribe to our newsletter for updates and insights.
              </p>
              <form className="mt-4">
                <div className="flex">
                  <input
                    type="email"
                    className="flex-1 px-4 py-2 text-sm text-gray-900 dark:text-gray-200 dark:bg-gray-700 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your email"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Subscribe
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-700 pt-8">
            <p className="text-gray-400 text-sm text-center">
              ©️ {new Date().getFullYear()} Cogniscruit. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {resultModal.open && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-gray-800 dark:text-white">
              {resultModal.success ? "Success" : "Error"}
            </h2>
          </div>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            {resultModal.message}
          </p>
          <div className="flex justify-end">
            <button
              onClick={() => {
                setResultModal({ open: false, message: "", success: false });
                if (resultModal.success) {
                  window.location.href = "/dashboard";
                }
              }}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
            >
              OK
            </button>
          </div>
        </div>
      </div>
      )}

    </div>
  );
}
