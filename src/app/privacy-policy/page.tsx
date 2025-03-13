import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy | Bank App',
  description: 'Privacy Policy for Bank App - How we protect your data and privacy',
};

export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
      
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
          <p className="mb-3">
            At Bank App, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our banking application.
          </p>
          <p>
            Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the application.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
          <p className="mb-3">
            We collect information that you provide directly to us when registering for an account, performing banking transactions, or when you contact customer support.
          </p>
          <p className="mb-3">
            <strong>Personal Information:</strong> Name, email address, phone number, date of birth, social security number, and other identification information.
          </p>
          <p className="mb-3">
            <strong>Financial Information:</strong> Bank account numbers, transaction history, account balances, and payment information.
          </p>
          <p>
            <strong>Usage Data:</strong> Information about how you use our application, including login times, features used, and device information.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>To provide and maintain our banking services</li>
            <li>To process your transactions and manage your accounts</li>
            <li>To verify your identity and prevent fraud</li>
            <li>To communicate with you about your account and provide customer support</li>
            <li>To improve our application and develop new features</li>
            <li>To comply with legal obligations and banking regulations</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
          <p className="mb-3">
            We implement appropriate technical and organizational measures to protect the security of your personal information. However, please be aware that no method of transmission over the internet or electronic storage is 100% secure.
          </p>
          <p>
            We use encryption, secure servers, and regular security assessments to protect your data from unauthorized access.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Third-Party Disclosure</h2>
          <p className="mb-3">
            We may share your information with third parties only in the ways that are described in this privacy policy:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>With service providers who perform services on our behalf</li>
            <li>To comply with legal requirements, such as a law, regulation, court order, or subpoena</li>
            <li>To protect the safety, rights, or property of Bank App, our users, or the public</li>
            <li>In connection with a business transfer, such as a merger, acquisition, or sale of assets</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
          <p className="mb-3">
            Depending on your location, you may have certain rights regarding your personal information, including:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>The right to access the personal information we have about you</li>
            <li>The right to request correction of inaccurate information</li>
            <li>The right to request deletion of your information</li>
            <li>The right to opt-out of certain data sharing practices</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Changes to This Privacy Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. You are advised to review this Privacy Policy periodically for any changes.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at:
            <br />
            <a href="mailto:privacy@bankapp.com" className="text-blue-600 hover:underline">privacy@bankapp.com</a>
          </p>
        </section>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-600">Last Updated: {new Date().toLocaleDateString()}</p>
          <Link href="/" className="text-blue-600 hover:underline mt-2 inline-block">
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
} 