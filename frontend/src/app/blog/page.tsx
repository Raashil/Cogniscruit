import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Sample blog posts data - you can replace this with your actual data
const blogPosts = [
  {
    id: 1,
    title: "The Future of AI in Recruitment",
    excerpt: "Discover how artificial intelligence is transforming the recruitment landscape and what it means for HR professionals.",
    date: "March 15, 2024",
    author: "Sarah Johnson",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    category: "Technology"
  },
  {
    id: 2,
    title: "Best Practices for Technical Interviews",
    excerpt: "Learn the most effective strategies for conducting technical interviews and evaluating candidate skills.",
    date: "March 10, 2024",
    author: "Michael Chen",
    image: "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    category: "Interviewing"
  },
  {
    id: 3,
    title: "Building a Diverse Tech Team",
    excerpt: "Explore strategies for creating and maintaining a diverse and inclusive technology team.",
    date: "March 5, 2024",
    author: "Emily Rodriguez",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    category: "Diversity & Inclusion"
  }
];

export default function BlogPage() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Cogniscruit Blog
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Insights, tips, and best practices for modern recruitment
          </p>
        </div>

        {/* Featured Categories */}
        <div className="mb-16">
          <div className="flex flex-wrap justify-center gap-4">
            {['All', 'Technology', 'Interviewing', 'Diversity & Inclusion', 'Best Practices'].map((category) => (
              <button
                key={category}
                className="px-4 py-2 rounded-full bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-48 w-full">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-blue-600 dark:text-blue-400">
                    {post.category}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {post.date}
                  </span>
                </div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {post.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    By {post.author}
                  </span>
                  <Link
                    href={`/blog/${post.id}`}
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium"
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter Section */}
        <div className="mt-16 bg-blue-50 dark:bg-blue-900/30 rounded-lg p-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Subscribe to Our Newsletter
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Get the latest insights and updates delivered to your inbox
            </p>
            <form className="max-w-md mx-auto">
              <div className="flex gap-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
} 