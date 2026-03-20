import { PageWrapper } from "../../components/PageWrapper";

export default function PrivacyPage() {
  return (
    <PageWrapper>
      <div className="min-h-screen bg-[#001E2B] py-20 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-10 uppercase tracking-tight">
            Privacy <span className="text-[#00ED64]">Policy</span>
          </h1>
          
          <div className="space-y-8 text-slate-400 leading-relaxed font-medium">
            <section>
              <h2 className="text-xl font-bold text-white uppercase mb-4 tracking-wider">1. Data Collection</h2>
              <p>
                Eduplus Kerala prioritizes user privacy. We do not track general visitors. 
                However, for users who contribute resources (Uploaders), we collect and log verified email addresses through Supabase Auth OTP 
                to comply with the Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white uppercase mb-4 tracking-wider">2. Purpose of Logging</h2>
              <p>
                Identity logging is performed solely for legal compliance and accountability. 
                In the event of a security breach or illegal content upload, this data allows us to fulfill our legal obligations under the IT Act, 2000.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white uppercase mb-4 tracking-wider">3. Third-Party Services</h2>
              <p>
                We use Supabase for authentication and database management, and Google Drive for file hosting. 
                Your interaction with these services is governed by their respective privacy policies.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white uppercase mb-4 tracking-wider">4. Data Sharing</h2>
              <p>
                We do not sell or share your personal data with third parties for marketing. 
                Personal data (uploader emails) is only shared with authorized law enforcement agencies when served with a valid legal order.
              </p>
            </section>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
