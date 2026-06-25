import { ClassPage } from "@/components/ClassesPage/ClassPage";
import { technologies } from "@/utils/constants";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function Class({ params }: Props) {
  notFound();
}
