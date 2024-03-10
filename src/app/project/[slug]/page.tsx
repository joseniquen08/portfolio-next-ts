import { ProjectPage } from "@/components/ProjectPage";

interface Props {
  params: {
    slug: string;
  };
}

export default function Project({ params }: Props) {
  return <ProjectPage slug={params.slug} />;
}
