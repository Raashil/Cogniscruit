"use client";

import { useState } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { FaFileAlt, FaLinkedin, FaGlobe, FaGithub } from "react-icons/fa";

export default function Dashboard() {
  const [resumeURL, setResumeURL] = useState("");
  const [linkedinURL, setLinkedinURL] = useState("");
  const [portfolioURL, setPortfolioURL] = useState("");
  const [githubURL, setGithubURL] = useState("");
  const [questions, setQuestions] = useState([]);
  const [errors, setErrors] = useState({});

  const validateURLs = () => {
    const errs = {};
    if (linkedinURL && !linkedinURL.includes("linkedin.com")) {
      errs.linkedin = "Invalid LinkedIn URL";
    }
    if (githubURL && !githubURL.includes("github.com")) {
      errs.github = "Invalid GitHub URL";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleGenerate = () => {
    if (!validateURLs()) return;
    setQuestions([
      "Can you describe a challenging problem you've solved recently?",
      "How do you stay updated with the latest tools in your domain?",
      "Walk us through a project that showcases your best work.",
    ]);
  };

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <div className="min-h-screen bg-white pt-24 px-4 sm:px-6 lg:px-8">
      {/* Navigation */}
     

      {/* Main Section */}
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
        {/* Left Column - Uploads */}
        <div className="lg:w-1/2 flex flex-col gap-6">
          {[
            {
              label: "Resume",
              icon: <FaFileAlt className="text-blue-500" />,
              url: resumeURL,
              setURL: setResumeURL,
              error: null,
            },
            {
              label: "LinkedIn",
              icon: <FaLinkedin className="text-blue-700" />,
              url: linkedinURL,
              setURL: setLinkedinURL,
              error: errors.linkedin,
            },
            {
              label: "Portfolio",
              icon: <FaGlobe className="text-green-600" />,
              url: portfolioURL,
              setURL: setPortfolioURL,
              error: null,
            },
            {
              label: "GitHub",
              icon: <FaGithub className="text-black" />,
              url: githubURL,
              setURL: setGithubURL,
              error: errors.github,
            },
          ].map(({ label, icon, url, setURL, error }, i) => (
            <div key={i} className="bg-gray-50 p-4 rounded-lg shadow-md">
              <label className="flex items-center gap-2 text-lg font-medium text-gray-700">
                {icon} {label}
              </label>
              <input
                type="file"
                className="mt-2 block w-full text-sm text-gray-600"
              />
              <input
                type="url"
                placeholder={`Enter ${label} URL`}
                value={url}
                onChange={(e) => setURL(e.target.value)}
                className="mt-2 w-full border rounded-md p-2 text-black"
              />
              {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
              {url && !error && (
                <p className="mt-2 text-sm">
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-black underline hover:text-blue-800"
                  >
                    View {label}
                  </a>
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Center Column - Bigger 2D Arrow Button */}
        <div className="flex justify-center items-center lg:w-1/6">
          <button
            onClick={handleGenerate}
            className="text-8xl text-blue-600 hover:text-blue-800 transform hover:scale-110 transition-transform duration-300"
            title="Generate Questions"
          >
            ➜
          </button>
        </div>

        {/* Right Column - ChatGPT-styled scrollable form */}
        <div className="lg:w-1/3">
          <div className="bg-gradient-to-br from-gray-100 to-gray-200 border border-gray-300 p-4 rounded-lg shadow-md h-full">
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              Here are the best suited questions based on your profile
            </h2>
            <div className="bg-white p-3 rounded-md border border-gray-300 h-[350px] overflow-y-auto text-sm font-mono space-y-2">
              {questions.length === 0 ? (
                <p className="text-gray-500">
                  Click the arrow to generate questions...
                </p>
              ) : (
                questions.map((q, i) => (
                  <div
                    key={i}
                    className="bg-gray-100 p-2 rounded-md text-gray-800"
                  >
                    {q}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
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
                    className="flex-1 px-4 py-2 text-sm text-gray-900 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your email"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
    </div>
  );
}
