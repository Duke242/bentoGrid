import Link from "next/link"
import { getSEOTags } from "@/libs/seo"
import config from "@/config"

// CHATGPT PROMPT TO GENERATE YOUR PRIVACY POLICY — replace with your own data 👇

// 1. Go to https://chat.openai.com/
// 2. Copy paste bellow
// 3. Replace the data with your own (if needed)
// 4. Paste the answer from ChatGPT directly in the <pre> tag below

// You are an excellent lawyer.

// I need your help to write a simple privacy policy for my website. Here is some context:
// - Website: https://shipfa.st
// - Name: ShipFast
// - Description: A JavaScript code boilerplate to help entrepreneurs launch their startups faster
// - User data collected: name, email and payment information
// - Non-personal data collection: web cookies
// - Purpose of Data Collection: Order processing
// - Data sharing: we do not share the data with any other parties
// - Children's Privacy: we do not collect any data from children
// - Updates to the Privacy Policy: users will be updated by email
// - Contact information: marc@shipfa.st

// Please write a simple privacy policy for my site. Add the current date.  Do not add or explain your reasoning. Answer:

export const metadata = getSEOTags({
  title: `Privacy Policy | ${config.appName}`,
  canonicalUrlRelative: "/privacy-policy",
})

const PrivacyPolicy = () => {
  return (
    <main className="max-w-xl mx-auto">
      <div className="p-5">
        <Link href="/" className="btn btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M15 10a.75.75 0 01-.75.75H7.612l2.158 1.96a.75.75 0 11-1.04 1.08l-3.5-3.25a.75.75 0 010-1.08l3.5-3.25a.75.75 0 111.04 1.08L7.612 9.25h6.638A.75.75 0 0115 10z"
              clipRule="evenodd"
            />
          </svg>{" "}
          Back
        </Link>
        <h1 className="text-3xl font-extrabold pb-6">
          Privacy Policy for {config.appName}
        </h1>

        <pre
          className="leading-relaxed whitespace-pre-wrap"
          style={{ fontFamily: "sans-serif" }}
        >
          {`Privacy Policy

Last Updated: April 6, 2024

Welcome to BentoGrids! Our website, located at https://bento-grid.com, is dedicated to helping you create Bento Grids easily. Your privacy is important to us, and we are committed to protecting your personal information.

1. **Information We Collect**
   - We collect the following types of information:
     - Name
     - Email
     - Payment information

2. **Non-Personal Data Collection**
   - We use web cookies to collect non-personal information for the purpose of improving user experience and website functionality.

3. **Purpose of Data Collection**
   - We collect your information for the sole purpose of processing orders efficiently and effectively.

4. **Data Sharing**
   - We do not share your personal data with any third parties. Your information is kept confidential and secure.

5. **Children's Privacy**
   - We do not knowingly collect any personal information from children under the age of 13. Our services are intended for individuals who are 13 years of age and older.

6. **Updates to the Privacy Policy**
   - Users will be notified of any updates to this Privacy Policy via email.

By using BentoGrids, you agree to the terms outlined in this Privacy Policy. If you have any questions or concerns about our privacy practices, please contact us.

Thank you for trusting BentoGrids with your information.

Sincerely,
The BentoGrids Team`}
        </pre>
      </div>
    </main>
  )
}

export default PrivacyPolicy
