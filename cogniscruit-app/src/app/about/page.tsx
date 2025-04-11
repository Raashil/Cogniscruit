import Link from "next/link";
import Image from "next/image";

export default function About() {
  const teamMembers = [
    {
      name: "Raashil Aadhyanth",
      designation: "Team Lead/ Developer",
      image: "/raashil.jpeg",
      bio: "Leading the development team with expertise in full-stack development and project management.",
    },
    {
      name: "Jonathan Guan",
      designation: "AI Engineer/Testing",
      image: "/jonathan.jpeg",
      bio: "Specializing in AI model development and comprehensive testing strategies for robust solutions.",
    },
    {
      name: "Sujith Venkatesh",
      designation: "Frontend Developer/DevOps",
      image: "/sujith.jpeg",
      bio: "Building responsive user interfaces and managing cloud infrastructure for seamless deployment.",
    },
    {
      name: "Ross Carvalho",
      designation: "Backend Developer/AI",
      image: "/ross.jpeg",
      bio: "Architecting scalable backend systems and implementing AI-driven solutions for intelligent question generation.",
    },
    {
      name: "Reshma Ramakumar",
      designation: "Backend Developer/DevOps",
      image: "/reshma.jpeg",
      bio: "Developing robust backend services and optimizing deployment pipelines for efficient delivery.",
    },
    {
      name: "Hui Zhang",
      designation: "AI Engineer",
      image: "/hui.jpeg",
      bio: "Focusing on advanced AI algorithms and machine learning models for intelligent interview question generation.",
    },
    {
      name: "Arun Chowdary",
      designation: "Testing/Documentation",
      image: "/arun.jpeg",
      bio: "Ensuring product quality through comprehensive testing and maintaining clear technical documentation.",
    },
    {
      name: "Mahalakshmi Nagineni",
      designation: "Testing/Documentation",
      image: "/mahalakshmi.jpeg",
      bio: "Implementing thorough testing protocols and creating user-friendly documentation for seamless product adoption.",
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Navigation */}

      {/* About Hero Section */}
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
            About Cogniscruit
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-400 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Transforming the recruitment process through AI-powered interview question generation.
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="bg-gray-50 dark:bg-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
              Our Mission
            </h2>
            <p className="mt-4 text-lg text-gray-500 dark:text-gray-400 max-w-3xl mx-auto">
              At Cogniscruit, we're on a mission to revolutionize the interview process by leveraging artificial intelligence to create personalized, relevant, and effective interview questions. We believe that every candidate deserves a fair and comprehensive assessment, and every interviewer should have access to the best tools for making informed decisions.
            </p>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
              Our Team
            </h2>
            <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
              Meet the passionate individuals behind Cogniscruit
            </p>
          </div>
          <div className="mt-12 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {teamMembers.map((member, index) => (
              <div key={index} className="relative p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                <div className="text-center">
                  <div className="relative w-32 h-32 mx-auto mb-4">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">{member.name}</h3>
                  <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">{member.designation}</p>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-gray-50 dark:bg-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
              Our Values
            </h2>
          </div>
          <div className="mt-12 grid gap-8 grid-cols-1 sm:grid-cols-3">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-md bg-blue-500 text-white">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">Innovation</h3>
              <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
                Constantly pushing boundaries in AI and recruitment technology
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-md bg-blue-500 text-white">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">Efficiency</h3>
              <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
                Streamlining the recruitment process for better outcomes
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-md bg-blue-500 text-white">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">Fairness</h3>
              <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
                Ensuring unbiased and consistent candidate evaluation
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white text-lg font-semibold">Cogniscruit</h3>
              <p className="mt-2 text-gray-400 text-sm">
                Transforming interview processes with AI-powered question generation.
              </p>
            </div>
            <div>
              <h3 className="text-white text-lg font-semibold">Quick Links</h3>
              <ul className="mt-2 space-y-1">
                <li>
                  <Link href="/about" className="text-gray-400 hover:text-white text-sm">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/features" className="text-gray-400 hover:text-white text-sm">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-400 hover:text-white text-sm">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white text-lg font-semibold">Resources</h3>
              <ul className="mt-2 space-y-1">
                <li>
                  <Link href="/blog" className="text-gray-400 hover:text-white text-sm">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="text-gray-400 hover:text-white text-sm">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/support" className="text-gray-400 hover:text-white text-sm">
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
              © {new Date().getFullYear()} Cogniscruit. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
} 