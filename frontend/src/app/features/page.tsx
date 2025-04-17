import React from 'react';

export default function FeaturesPage() {
  const features = [
    {
      title: "AI-Powered Question Generation",
      description: "Generate high-quality interview questions tailored to specific job roles and requirements using advanced AI algorithms.",
      icon: "🤖"
    },
    {
      title: "Customizable Question Types",
      description: "Create a mix of technical, behavioral, and situational questions to assess candidates comprehensively.",
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

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Powerful Features
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Everything you need to create effective and engaging interviews
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
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

        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Join thousands of companies using Cogniscruit to improve their hiring process
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-300">
            Start Free Trial
          </button>
        </div>
      </div>
    </div>
  );
} 