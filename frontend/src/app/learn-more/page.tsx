'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function LearnMorePage() {
  const [activeTab, setActiveTab] = useState('features');

  const features = [
    {
      title: "AI-Powered Question Generation",
      description: "Our advanced AI algorithms analyze job descriptions and candidate profiles to generate relevant, high-quality interview questions.",
      icon: "🤖"
    },
    {
      title: "Customizable Question Types",
      description: "Create a mix of technical, behavioral, and situational questions tailored to your specific needs.",
      icon: "🎯"
    },
    {
      title: "Real-time Collaboration",
      description: "Work together with your team to review and refine interview questions in real-time.",
      icon: "👥"
    },
    {
      title: "Smart Question Bank",
      description: "Access a growing database of pre-vetted questions and add your own to build a personalized question library.",
      icon: "📚"
    },
    {
      title: "Analytics & Insights",
      description: "Track question effectiveness and gather insights to improve your interview process over time.",
      icon: "📊"
    },
    {
      title: "Secure & Private",
      description: "Your data and questions are encrypted and stored securely, ensuring complete privacy.",
      icon: "🔒"
    }
  ];

  const benefits = [
    {
      title: "Save Time",
      description: "Reduce the time spent on manual question preparation by up to 80%.",
      icon: "⏱️"
    },
    {
      title: "Improve Consistency",
      description: "Ensure all candidates are evaluated using the same high-quality standards.",
      icon: "⚖️"
    },
    {
      title: "Enhance Quality",
      description: "Generate more relevant and insightful questions that better assess candidate capabilities.",
      icon: "✨"
    },
    {
      title: "Reduce Bias",
      description: "Create standardized questions that help minimize unconscious bias in the interview process.",
      icon: "🎭"
    }
  ];

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Learn More About Cogniscruit
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Discover how our AI-powered platform can transform your hiring process
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
              <button
                onClick={() => setActiveTab('features')}
                className={`${
                  activeTab === 'features'
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                Features
              </button>
              <button
                onClick={() => setActiveTab('benefits')}
                className={`${
                  activeTab === 'benefits'
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                Benefits
              </button>
              <button
                onClick={() => setActiveTab('how-it-works')}
                className={`${
                  activeTab === 'how-it-works'
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                How It Works
              </button>
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          {activeTab === 'features' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 hover:shadow-md transition-shadow duration-200"
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'benefits' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 hover:shadow-md transition-shadow duration-200"
                >
                  <div className="text-4xl mb-4">{benefit.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'how-it-works' && (
            <div className="space-y-8">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-2xl">
                    1
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Input Candidate Information
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Provide the candidate&apos;s resume, LinkedIn profile, or job description to our platform.
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-2xl">
                    2
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    AI Analysis
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Our AI algorithms analyze the information to understand key skills, experience, and requirements.
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-2xl">
                    3
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Question Generation
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    The system generates personalized interview questions based on the analysis.
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-2xl">
                    4
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Review and Customize
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Review the generated questions, make any necessary adjustments, and save them to your question bank.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* CTA Section */}
        <div className="mt-12 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Join thousands of companies using Cogniscruit to improve their hiring process
          </p>
          <Link
            href="/demo"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            Request a Demo
          </Link>
        </div>
      </div>
    </div>
  );
} 