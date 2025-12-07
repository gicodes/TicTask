import { BlogRes } from "@/types/axios";
import { nextAuthApiGet } from "@/lib/axios";
import { notFound } from "next/navigation";
import { BlogCardProps } from "@/types/resources";
import { BlogSlugPage } from "../../_level_3/blogSlug";

export const dynamicParams = true;
export const revalidate = 60;

async function getBlogBySlug(slug: string): Promise<BlogCardProps | null> {
  try {
    const res: BlogRes = await nextAuthApiGet(`/resources/blog/${slug}`);
    return res?.data ?? null;
  } catch {
    return null;
  }
}

async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) notFound();

  return <BlogSlugPage blog={blog} params={slug} />;
}

export default Page;