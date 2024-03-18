import { ClassPage } from "@/components/ClassesPage/ClassPage";
import { technologies } from "@/utils/constants";
import { notFound } from "next/navigation";

interface Props {
  params: {
    slug: string;
  };
}

export default function Class({ params }: Props) {
  const tech = technologies.find((element) => element.slug == params.slug);

  if (!tech) {
    notFound();
  }

  return <ClassPage tech={tech} />;
}
