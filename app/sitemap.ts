import { MetadataRoute } from 'next';
import { getAllFilesForSitemap } from '../lib/actions/fetch.actions';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://eduplus-kerala.vercel.app"; // Fallback/default domain

  const files = await getAllFilesForSitemap();
  
  const resourceEntries = files.map((file: any) => ({
    url: `${baseUrl}/vault/${file.id}`,
    lastModified: new Date(file.updated_at || new Date()),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const staticEntries = [
    { url: `${baseUrl}/`,           lastModified: new Date(), changeFrequency: 'daily'   as const, priority: 1.0 },
    { url: `${baseUrl}/vault`,      lastModified: new Date(), changeFrequency: 'daily'   as const, priority: 0.9 },
    { url: `${baseUrl}/textbooks`,      lastModified: new Date(), changeFrequency: 'weekly'  as const, priority: 0.8 },
    { url: `${baseUrl}/about`,      lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.5 },
  ];

  return [...staticEntries, ...resourceEntries];
}
