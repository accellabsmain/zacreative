import { redirect } from "next/navigation";
import AdminDashboardClient from "@/components/admin/AdminDashboardClient";
import { getAdminSession } from "@/lib/auth";
import { getAllPortfolioItems } from "@/lib/portfolio-store";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  const items = await getAllPortfolioItems();

  return (
    <AdminDashboardClient username={session.sub} initialItems={items} />
  );
}
