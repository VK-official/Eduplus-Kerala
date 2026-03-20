import { getTrendingFiles } from "../lib/actions/fetch.actions";
import { FileCard } from "./FileCard";

export default async function TrendingFiles() {
  const trendingFiles = await getTrendingFiles();

  if (!trendingFiles || trendingFiles.length === 0) {
    return null;
  }

  return (
    <section className="mt-16 w-full">
      <div className="mb-6 flex items-center gap-2">
        <span className="text-2xl">🔥</span>
        <h2 className="text-2xl font-bold tracking-tight text-white uppercase italic">
          Trending This Week
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {trendingFiles.map((file: any) => (
          <FileCard
            key={file.id}
            id={file.id}
            title={file.title}
            subject={file.subject}
            classNum={file.class}
            type={file.resource_type}
            driveUrl={file.resource_link}
          />
        ))}
      </div>
    </section>
  );
}
