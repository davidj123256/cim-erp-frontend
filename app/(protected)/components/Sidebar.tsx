import Link from "next/link";
import { LogoutButton } from "./LogoutButton";

export function Sidebar() {
  return (
    <aside className="w-64 bg-gray-900 text-white p-4">
      <h2 className="text-lg font-semibold">CIM ERP</h2>
      <nav className="mt-6 space-y-2">
        <Link href="/dashboard" className="block hover:underline">
          Dashboard
        </Link>
        <Link href="/calendar" className="block hover:underline">
          Calendar
        </Link>
        <Link href="/crm" className="block hover:underline">
          CRM
        </Link>
        <LogoutButton />
      </nav>
    </aside>
  );
}
