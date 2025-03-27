import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy | Bankr AI',
  description: 'Privacy Policy for Bankr AI - How we protect your data and privacy',
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
        <header className="flex justify-between items-center mb-8 md:mb-12">
          <Link href="/" className="text-xl md:text-2xl font-bold text-black">
            Bankr AI
          </Link>
        </header>

        <main>
          <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">Bankr AI Privacy Policy</h1>
          
          <div className="space-y-6 md:space-y-8">
            <p className="text-gray-600 text-base md:text-lg">
              At Bankr AI, your privacy is our top priority. This Privacy Policy explains how we collect, use, and protect your information when you use our app.
            </p>

            <section>
              <h2 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4">1. Information We Collect</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg md:text-xl font-semibold mb-2">Personal Information:</h3>
                  <p className="text-gray-600 text-base md:text-lg">
                    When you sign up, we may collect your name, email address, and any other contact details you provide.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-semibold mb-2">Financial Data:</h3>
                  <p className="text-gray-600 text-base md:text-lg">
                    To provide personalized financial advice, we securely connect to your bank account via Plaid. This connection allows us to access transaction data and spending patterns solely to generate tailored insights for you.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-semibold mb-2">Usage Information:</h3>
                  <p className="text-gray-600 text-base md:text-lg">
                    We gather information about how you use our app (e.g., features accessed, frequency of use) to help improve our service.
                  </p>
                  <p className="text-gray-600 text-base md:text-lg mt-2">
                    We may use cookies or similar technologies on our website to enhance your user experience.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4">2. How We Use Your Information</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg md:text-xl font-semibold mb-2">Personalized Advice:</h3>
                  <p className="text-gray-600 text-base md:text-lg">
                    We use your financial and usage data to deliver customized financial insights, budgeting tips, and recommendations—much like having your own expert advisor.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-semibold mb-2">Service Improvement:</h3>
                  <p className="text-gray-600 text-base md:text-lg">
                    Data collected helps us enhance our app, fix issues, and better understand your needs.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-semibold mb-2">Communication:</h3>
                  <p className="text-gray-600 text-base md:text-lg">
                    We may use your contact details to send you updates, billing information, or important notices regarding your account.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-semibold mb-2">Security and Fraud Prevention:</h3>
                  <p className="text-gray-600 text-base md:text-lg">
                    Your data is used to protect and secure your account, ensuring that only you can access your information.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4">3. Data Sharing and Disclosure</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg md:text-xl font-semibold mb-2">Third-Party Service Providers:</h3>
                  <p className="text-gray-600 text-base md:text-lg">
                    We share information only with trusted partners (e.g., Plaid) who assist us in providing our service. These partners are contractually bound to protect your data and use it only as necessary.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-semibold mb-2">No Sale of Personal Data:</h3>
                  <p className="text-gray-600 text-base md:text-lg">
                    We do not sell, rent, or trade your personal or financial information with third parties.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-semibold mb-2">Legal Requirements:</h3>
                  <p className="text-gray-600 text-base md:text-lg">
                    We may disclose your information if required by law or to protect our rights, your safety, or that of others.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4">4. Data Security</h2>
              <div className="space-y-4">
                <p className="text-gray-600 text-base md:text-lg">
                  We use industry-standard security measures (such as encryption) to safeguard your data both in transit and at rest.
                </p>
                <p className="text-gray-600 text-base md:text-lg">
                  Our systems are regularly updated to protect against unauthorized access, alteration, or destruction of your information.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4">5. Data Retention</h2>
              <div className="space-y-4">
                <p className="text-gray-600 text-base md:text-lg">
                  Your information is retained for as long as your account is active or as needed to provide you with our services.
                </p>
                <p className="text-gray-600 text-base md:text-lg">
                  Once your account is closed, we will securely delete your personal data unless a longer retention period is required by law.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4">6. Your Rights and Choices</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg md:text-xl font-semibold mb-2">Access and Update:</h3>
                  <p className="text-gray-600 text-base md:text-lg">
                    You can review and update your personal information at any time by accessing your account settings.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-semibold mb-2">Opt-Out:</h3>
                  <p className="text-gray-600 text-base md:text-lg">
                    If you no longer wish to receive communications from us, you can opt-out via the provided links in our emails.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-semibold mb-2">Data Deletion:</h3>
                  <p className="text-gray-600 text-base md:text-lg">
                    You may request the deletion of your data by contacting us. Note that some information may be retained as required by legal obligations.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4">7. International Data Transfers</h2>
              <p className="text-gray-600 text-base md:text-lg">
                Your data may be stored or processed on servers located outside your country. We ensure that such transfers are conducted in accordance with applicable data protection laws.
              </p>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4">8. Changes to This Privacy Policy</h2>
              <div className="space-y-4">
                <p className="text-gray-600 text-base md:text-lg">
                  We may update this Privacy Policy from time to time. When changes occur, we will notify you by posting the updated policy on our website and updating the effective date.
                </p>
                <p className="text-gray-600 text-base md:text-lg">
                  We encourage you to review this policy periodically to stay informed about how we protect your information.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4">9. Contact Us</h2>
              <p className="text-gray-600 text-base md:text-lg">
                If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at:
                <br />
                <a href="mailto:privacy@bankr.ai" className="text-black hover:underline">privacy@bankr.ai</a>
              </p>
            </section>

            <div className="mt-6 md:mt-8 pt-6 border-t border-gray-200">
              <p className="text-gray-600 text-base md:text-lg">
                By using Bankr AI, you agree to the terms of this Privacy Policy. Thank you for trusting us with your financial journey.
              </p>
            </div>
          </div>

          <div className="mt-8 md:mt-12 pt-6 border-t border-gray-200">
            <p className="text-sm md:text-base text-gray-600">Last Updated: {new Date().toLocaleDateString()}</p>
            <Link href="/" className="text-black hover:underline mt-4 inline-block text-sm md:text-base">
              Return to Home
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
} 