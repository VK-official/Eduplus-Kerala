import { PageWrapper } from "../../components/PageWrapper";

export default function TermsPage() {
  return (
    <PageWrapper>
      <div className="min-h-screen bg-[#001E2B] py-20 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-10 uppercase tracking-tight">
            Terms & <span className="text-[#00ED64]">Conditions</span>
          </h1>
          
          <div className="space-y-8 text-slate-400 leading-relaxed font-medium">
            <section>
              <h2 className="text-xl font-bold text-white uppercase mb-4 tracking-wider">1. Intermediary Status</h2>
              <p>
                Eduplus Kerala operates strictly as an "Intermediary" as defined under Section 2(1)(w) of the Information Technology Act, 2000. 
                Our platform functions as a search and directory service for academic materials hosted on third-party servers.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white uppercase mb-4 tracking-wider">2. Safe Harbour & Liability</h2>
              <p>
                In accordance with Section 79 of the IT Act, 2000, Eduplus Kerala is not liable for any third-party information, data, or communication link made available or hosted by it. 
                We do not initiate the transmission, select the receiver of the transmission, or select/modify the information contained in the transmission.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white uppercase mb-4 tracking-wider">3. User Responsibility</h2>
              <p>
                Users who upload links to this platform are solely and legally responsible for the content they link. 
                Uploading malicious files, malware, or pirated content is a criminal offense under Sections 43 and 66 of the IT Act, 2000. 
                Eduplus Kerala Cooperates fully with law enforcement agencies and will provide uploader identity logs (verified email and IP) upon legal request.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white uppercase mb-4 tracking-wider">4. "As-Is" Warranty</h2>
              <p>
                All links and materials are provided on an "As-Is" and "As-Available" basis. 
                We make no warranties, express or implied, regarding the safety, accuracy, or reliability of any resource linked on this platform. 
                Users download and use these materials at their own absolute risk.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white uppercase mb-4 tracking-wider">5. Indemnification</h2>
              <p>
                By using this platform, you agree to indemnify and hold harmless the founders, owners, and contributors of Eduplus Kerala 
                from any legal claims, damages, or losses arising from your use of the site or your upload of any content.
              </p>
            </section>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
