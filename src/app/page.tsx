"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: "How does Bankr AI work?",
      answer: "Bankr AI securely connects to your bank account using Plaid and leverages advanced AI plus live web search to offer personalized financial advice—just like a seasoned advisor, available any time you need."
    },
    {
      question: "Is my data safe?",
      answer: "Absolutely. We prioritize your privacy by never selling your data and using industry-standard security measures to keep your information confidential."
    },
    {
      question: "What types of questions can I ask?",
      answer: "Ask about anything related to your finances—from budgeting and saving tips to credit card options and spending habits. Bankr AI's real-time web search ensures you receive the most up-to-date and relevant answers."
    },
    {
      question: "Which banks are supported?",
      answer: "We work with a wide range of banks through Plaid, so you can securely connect most major financial institutions."
    },
    {
      question: "How much does it cost?",
      answer: "Our service is available for only $5.99 per month."
    }
  ];

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <header className="flex justify-between items-center mb-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-black">Bankr AI</h1>
          </div>
          <nav>
            <ul className="flex space-x-6">
              <li><a href="#how-it-works" className="text-gray-600 hover:text-black transition-colors">How It Works</a></li>
              <li><a href="#pricing" className="text-gray-600 hover:text-black transition-colors">Pricing</a></li>
              <li><a href="#faq" className="text-gray-600 hover:text-black transition-colors">FAQ</a></li>
              <li><Link href="/privacy-policy" className="text-gray-600 hover:text-black transition-colors">Privacy Policy</Link></li>
            </ul>
          </nav>
        </header>

        <main>
          {/* Hero Section */}
          <section className="flex flex-col md:flex-row items-center mb-24">
            <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
              <h2 className="text-4xl md:text-5xl font-bold text-black mb-6 leading-tight">
                Bankr AI – Your AI Financial Advisor
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Imagine having your Harvard MBA best friend in your pocket. Bankr AI securely connects to your bank account and uses advanced AI combined with real-time web search to answer your money questions and provide personalized financial advice. Whether you need budgeting tips, credit card recommendations, or insights on saving smarter, Bankr AI gives you clear, actionable guidance—24/7.
              </p>
              <button className="bg-black hover:bg-gray-800 text-white font-medium py-3 px-6 rounded-lg transition-colors">
                Download on the App Store
              </button>
            </div>
            <div className="md:w-1/2">
              <div className="bg-gray-50 p-6 rounded-xl">
                <div className="bg-white p-4 rounded-lg mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-black mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-center mb-4">Your Personal Financial Advisor</h3>
                <p className="text-gray-600 text-center">
                  Get expert financial advice powered by AI and real-time web search, available 24/7.
                </p>
              </div>
            </div>
          </section>

          {/* How It Works Section */}
          <section id="how-it-works" className="mb-24">
            <h2 className="text-3xl font-bold text-center mb-12">How does Bankr AI Work?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Secure Connection</h3>
                <p className="text-gray-600">
                  Easily connect your bank account using Plaid for safe, reliable data transfer.
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Personalized Insights</h3>
                <p className="text-gray-600">
                  Ask any financial question, and our AI taps into real-time data and web search to provide answers tailored to your spending habits.
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Actionable Advice</h3>
                <p className="text-gray-600">
                  Receive straightforward recommendations that help you manage your money better.
                </p>
              </div>
            </div>
          </section>

          {/* Why Choose Bankr AI Section */}
          <section className="mb-24">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose Bankr AI?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">Real-Time Web Search</h3>
                <p className="text-gray-600">
                  Get the latest advice and data-driven insights exactly when you need them.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">Personalized for You</h3>
                <p className="text-gray-600">
                  Tailored financial guidance based on your unique bank transactions.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">Privacy First</h3>
                <p className="text-gray-600">
                  We never sell your data. Your information stays secure and private.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">Affordable</h3>
                <p className="text-gray-600">
                  Enjoy expert advice for only $5.99 per month.
                </p>
              </div>
            </div>
          </section>

          {/* Pricing Section */}
          <section id="pricing" className="mb-24">
            <div className="bg-gray-50 p-8 rounded-xl text-center">
              <h2 className="text-3xl font-bold mb-4">Simple. Transparent.</h2>
              <p className="text-2xl font-semibold mb-6">Only $5.99/month with no hidden fees.</p>
              <button className="bg-black hover:bg-gray-800 text-white font-medium py-3 px-6 rounded-lg transition-colors">
                Download Now
              </button>
            </div>
          </section>

          {/* FAQ Section */}
          <section id="faq" className="mb-24">
            <h2 className="text-3xl font-bold text-center mb-12">FAQ</h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-gray-50 rounded-lg overflow-hidden">
                  <button
                    className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-100 transition-colors"
                    onClick={() => toggleFaq(index)}
                  >
                    <h3 className="text-xl font-semibold">{faq.question}</h3>
                    <svg
                      className={`w-6 h-6 transform transition-transform ${openFaq === index ? 'rotate-180' : ''}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div
                    className={`px-6 transition-all duration-300 ease-in-out ${
                      openFaq === index ? 'max-h-96 py-4' : 'max-h-0'
                    } overflow-hidden`}
                  >
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Get Started Section */}
          <section className="bg-gray-50 p-8 rounded-xl text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to take control of your finances?</h2>
            <button className="bg-black hover:bg-gray-800 text-white font-medium py-3 px-6 rounded-lg transition-colors">
              Download on the App Store
            </button>
          </section>
        </main>

        <footer className="mt-24 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-6 md:mb-0">
              <span className="text-gray-600">Bankr AI © {new Date().getFullYear()}. All rights reserved. | Powered by Plaid | We never sell your data.</span>
            </div>
            <div>
              <Link href="/privacy-policy" className="text-gray-600 hover:text-black transition-colors">
                Privacy Policy
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
