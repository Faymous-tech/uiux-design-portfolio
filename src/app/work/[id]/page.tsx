import type { Metadata } from "next";
import { projects } from "@/lib/projects";
import CaseStudyClient from "./CaseStudyClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);
  return {
    title: project
      ? `${project.title} — Faymous Aisida`
      : "Faymous Aisida — UI/UX Designer",
  };
}

export default function Page() {
  return <CaseStudyClient />;
}
