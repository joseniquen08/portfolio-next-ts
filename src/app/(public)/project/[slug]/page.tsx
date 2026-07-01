import { ProjectPage } from "@/components/ProjectPage";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function Project({ params }: Props) {
  const { slug } = await params;
  return <ProjectPage slug={slug} />;
}
