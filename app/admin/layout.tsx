import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard Portofolio | ZaCreative Studio",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#070D18] text-navy dark:text-zinc-100">
      {children}
    </div>
  );
}
