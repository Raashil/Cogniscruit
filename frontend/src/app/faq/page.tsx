"use client";

import Link from "next/link";
import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqItems: FAQItem[] = [
    {
      question: "What is Cogniscruit?",
      answer: "Cogniscruit is an AI-powered platform that helps generate personalized interview questions based on job descriptions and candidate profiles. It analyzes LinkedIn profiles and GitHub repositories to create relevant technical and behavioral questions."
    },
    {
      question: "How does the question generation work?",
      answer: "Our system uses advanced AI algorithms to analyze your job description, LinkedIn profile, and GitHub repositories. It then generates a mix of technical and behavioral questions that are specifically tailored to the role and your experience."
    },
    {
      question: "What information do I need to provide?",
      answer: "To generate questions, you'll need to provide: 1) A job description, 2) Your LinkedIn profile URL, and 3) Your GitHub profile URL. This helps us create the most relevant questions for your specific situation."
    },
    {
      question: "How long does it take to generate questions?",
      answer: "The question generation process typically takes a few minutes. The exact time may vary depending on the complexity of the job description and the amount of information available in your profiles."
    },
    {
      question: "Can I customize the generated questions?",
      answer: "Currently, the questions are automatically generated based on the provided information. However, you can always create multiple sets of questions by submitting different job descriptions."
    },
    {
      question: "Is my data secure?",
      answer: "Yes, we take data security very seriously. All your information is encrypted and stored securely. We only use your LinkedIn and GitHub data for question generation and do not share it with any third parties."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-24 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-12">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
          Frequently Asked Questions
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Find answers to common questions about Cogniscruit
        </p>
      </div>

      {/* FAQ Section */}
      <div className="max-w-3xl mx-auto">
        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left focus:outline-none"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium text-gray-800 dark:text-white">
                    {item.question}
                  </h3>
                  {openIndex === index ? (
                    <FaChevronUp className="text-gray-500" />
                  ) : (
                    <FaChevronDown className="text-gray-500" />
                  )}
                </div>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <p className="text-gray-600 dark:text-gray-400">
                    {item.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Contact Section */}
      <div className="max-w-7xl mx-auto mt-16 mb-16">
        <div className="bg-blue-50 dark:bg-gray-800 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            Still have questions?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Can't find the answer you're looking for? Please chat to our friendly team.
          </p>
          <Link
            href="/support"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Contact Support
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800">
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
    </div>
  );
} 