import { notFound } from "next/navigation";
import { findToolById } from "../../../lib/queries";
import { ToolDetailsClient } from "../../../components/tools/ToolDetailsClient";

interface ToolDetailsPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ToolDetailsPage({
  params,
}: ToolDetailsPageProps) {
  const { slug } = await params;

  const tool = await findToolById(slug);

  if (!tool) {
    notFound();
  }

  return <ToolDetailsClient tool={tool} />;
}
