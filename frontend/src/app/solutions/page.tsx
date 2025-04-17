'use client';

import Link from 'next/link';

export default function SolutionsPage() {
  const challenges = [
    {
      title: "Time-Consuming Process",
      description: "Manually crafting interview questions for each candidate can take hours of research and preparation.",
      solution: "Our AI generates relevant questions in seconds, saving you valuable time.",
      icon: "⏱️"
    },
    {
      title: "Inconsistent Quality",
      description: "Questions vary in quality and relevance depending on the interviewer's experience and preparation time.",
      solution: "Standardized, high-quality questions generated using proven frameworks and best practices.",
      icon: "⚖️"
    },
    {
      title: "Limited Coverage",
      description: "Manual question preparation often misses key areas or skills that should be assessed.",
      solution: "Comprehensive coverage of technical, behavioral, and situational aspects based on job requirements.",
      icon: "🎯"
    },
    {
      title: "Bias in Questioning",
      description: "Unconscious bias can creep into manually prepared questions, affecting fairness.",
      solution: "AI-generated questions are designed to be objective and standardized across all candidates.",
      icon: "🎭"
    }
  ];

  const processSteps = [
    {
      title: "Input Analysis",
      description: "Our AI analyzes job descriptions, candidate profiles, and requirements to understand the context.",
      icon: "📝"
    },
    {
      title: "Skill Mapping",
      description: "Identifies key skills and competencies that need to be assessed for the specific role.",
      icon: "🗺️"
    },
    {
      title: "Question Generation",
      description: "Generates relevant questions using industry best practices and proven frameworks.",
      icon: "🤖"
    },
    {
      title: "Quality Assurance",
      description: "Questions are validated for clarity, relevance, and effectiveness in assessing skills.",
      icon: "✅"
    }
  ];

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            How Cogniscruit Solves Interview Question Generation
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Transforming the way companies prepare for interviews
          </p>
        </div>

        {/* Challenges and Solutions */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Common Challenges and Our Solutions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {challenges.map((item, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-200"
              >
                <div className="flex items-start gap-4">
                  <div className="text-4xl">{item.icon}</div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {item.description}
                    </p>
                    <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
                      <p className="text-blue-600 dark:text-blue-400 font-medium">
                        {item.solution}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Process Steps */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Our Process
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-200"
              >
                <div className="text-4xl mb-4">{step.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Results Section */}
        <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            The Results
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                80%
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Reduction in question preparation time
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                95%
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Improvement in question quality and relevance
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                100%
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Standardized assessment across all candidates
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to Transform Your Interview Process?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Experience the power of AI-powered interview question generation
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/demo"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              Request a Demo
            </Link>
            <Link
              href="/learn-more"
              className="inline-flex items-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-base font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 