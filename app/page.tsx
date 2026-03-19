import { getFiles } from "../lib/actions/fetch.actions";
import { FileCard } from "../components/FileCard";
import { SidebarFilter } from "../components/SidebarFilter";
import { EmptyState } from "../components/EmptyState";
import { PageWrapper } from "../components/PageWrapper";
import { HeroSection } from "../components/HeroSection";

export default async function Home(props: {
  searchParams: Promise<{ q?: string; class?: string; subject?: string }>;
}) {
  const searchParams = (await props.searchParams) || {};
  const files = await getFiles(searchParams.q, searchParams.class, searchParams.subject);

  return (
    <PageWrapper>
      <div className="w-full">
        <HeroSection />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 px-6 md:px-12 mt-12 pb-20 max-w-screen-2xl mx-auto">
          <div className="lg:col-span-1">
            <SidebarFilter />
          </div>

          <div className="lg:col-span-3 pt-2">
            {files.length === 0 ? (
              <EmptyState />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {files.map((file: any, index: number) => (
                  <FileCard
                    key={file._id}
                    id={file._id}
                    title={file.title}
                    subject={file.subject}
                    classNum={file.class}
                    type={file.type}
                    driveUrl={file.driveUrl}
                    index={index}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
