import { UploadForm } from "../../components/UploadForm";
import { TeacherCommentDashboard } from "../../components/TeacherCommentDashboard";
import { ActivitySidebar } from "../../components/ActivitySidebar";
import { PageWrapper } from "../../components/PageWrapper";
import { getTeacherFilesWithComments } from "../../lib/actions/fetch.actions";

export const metadata = {
  title: "Teacher Dashboard | Eduplus Kerala",
  description: "Secure console for uploading educational resources and managing feedback.",
};

export default async function DashboardPage() {
  // NextAuth Eradicated - Phase 10
  // Defaulting to a placeholder teacher session for UI stability
  const session = { user: { name: "Teacher Admin", email: "admin@eduplus.kerala" } };

  const teacherFiles = await getTeacherFilesWithComments();

  return (
    <PageWrapper>
      <div className="min-h-screen bg-[#001E2B] py-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Sidebar with Activity Stats */}
            <aside className="lg:col-span-1">
              <ActivitySidebar email={session.user?.email} />
            </aside>

            {/* Main Console Content */}
            <main className="lg:col-span-2 space-y-8">
              <UploadForm />
              <TeacherCommentDashboard initialFiles={teacherFiles} />
            </main>

          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
