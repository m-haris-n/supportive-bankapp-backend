import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: 'Supportive Bank Assistant | Your Financial Companion',
  description: 'Meet your Supportive Bank Assistant - helping you manage your finances with ease and intelligence',
};

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <header className="flex justify-between items-center mb-16">
          <div className="flex items-center">
            <div className="bg-blue-600 text-white p-2 rounded-lg mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Supportive Bank</h1>
          </div>
          <nav>
            <ul className="flex space-x-6">
              <li><a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors">Features</a></li>
              <li><a href="#about" className="text-gray-600 hover:text-blue-600 transition-colors">About</a></li>
              <li><Link href="/privacy-policy" className="text-gray-600 hover:text-blue-600 transition-colors">Privacy Policy</Link></li>
            </ul>
          </nav>
        </header>

        <main>
          <section className="flex flex-col md:flex-row items-center mb-24">
            <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Meet Your Supportive Bank Assistant
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Your intelligent financial companion that helps you manage your money, track expenses, and achieve your financial goals with personalized guidance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors">
                  Get Started
                </button>
                <button className="border border-gray-300 hover:border-blue-600 text-gray-700 hover:text-blue-600 font-medium py-3 px-6 rounded-lg transition-colors">
                  Learn More
                </button>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="bg-blue-50 p-4 rounded-lg mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-600 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-center mb-4">AI-Powered Financial Insights</h3>
                <p className="text-gray-600 text-center">
                  Our assistant analyzes your spending patterns and provides personalized recommendations to help you save more and spend wisely.
                </p>
              </div>
            </div>
          </section>

          <section id="features" className="mb-24">
            <h2 className="text-3xl font-bold text-center mb-12">How Our Assistant Helps You</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Expense Tracking</h3>
                <p className="text-gray-600">
                  Automatically categorizes your transactions and provides visual breakdowns of your spending habits.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Smart Budgeting</h3>
                <p className="text-gray-600">
                  Creates personalized budget recommendations based on your income, expenses, and financial goals.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="bg-yellow-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Financial Forecasting</h3>
                <p className="text-gray-600">
                  Predicts future cash flow and helps you plan for upcoming expenses and savings goals.
                </p>
              </div>
            </div>
          </section>

          <section id="about" className="bg-blue-50 p-8 rounded-xl">
            <h2 className="text-3xl font-bold mb-6">About Supportive Bank</h2>
            <p className="text-lg text-gray-700 mb-4">
              At Supportive Bank, we believe that managing your finances should be simple, intuitive, and even enjoyable. Our AI-powered banking assistant is designed to take the stress out of financial management by providing personalized guidance and insights.
            </p>
            <p className="text-lg text-gray-700">
              Whether you're saving for a big purchase, trying to reduce debt, or simply want to gain better control of your spending, our Supportive Bank Assistant is here to help you every step of the way.
            </p>
          </section>
        </main>

        <footer className="mt-24 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-6 md:mb-0">
              <div className="bg-blue-600 text-white p-1 rounded-lg mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-gray-600">© {new Date().getFullYear()} Supportive Bank. All rights reserved.</span>
            </div>
            <div>
              <Link href="/privacy-policy" className="text-gray-600 hover:text-blue-600 transition-colors">
                Privacy Policy
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
