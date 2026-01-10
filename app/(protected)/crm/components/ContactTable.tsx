"use client";

import { Contact } from "../lib/api";

interface ContactTableProps {
  contacts: Contact[];
}

export default function ContactTable({ contacts }: ContactTableProps) {
  return (
    <div className="relative overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
      <table className="w-full border-collapse text-sm">
        <thead className="sticky top-0 z-10 bg-gray-50">
          <tr className="text-left text-xs font-semibold uppercase tracking-wide text-gray-600">
            <th className="px-4 py-3">ID</th>
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Email</th>
            <th className="px-4 py-3">Mobile</th>
            <th className="px-4 py-3">Country</th>
            <th className="px-4 py-3">State</th>
            <th className="px-4 py-3">City</th>
            <th className="px-4 py-3">Events</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100">
          {contacts.map((c, index) => (
            <tr key={c.id} className={`transition-colors ${index % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-indigo-50`}>
              <td className="px-4 py-3 font-mono text-xs text-gray-500">{c.id}</td>

              <td className="px-4 py-3 font-medium text-gray-900">{c.name}</td>

              <td className="px-4 py-3 text-gray-700">
                <a href={`mailto:${c.email}`} className="text-indigo-600 hover:underline">
                  {c.email}
                </a>
              </td>

              <td className="px-4 py-3 text-gray-700">
                {c.mobile ? (
                  <a href={`https://wa.me/${(c.mobileCode ?? "").replace("+", "")}${c.mobile}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-green-600 hover:text-green-700 hover:underline">
                    {c.mobileCode} {c.mobile}
                  </a>
                ) : (
                  <span className="text-gray-400">—</span>
                )}
              </td>

              <td className="px-4 py-3 text-gray-700">{c.countryName ?? <span className="text-gray-400">—</span>}</td>

              <td className="px-4 py-3 text-gray-700">{c.stateName ?? <span className="text-gray-400">—</span>}</td>

              <td className="px-4 py-3 text-gray-700">{c.cityName ?? <span className="text-gray-400">—</span>}</td>

              <td className="px-4 py-3">
                {c.events && c.events.length > 0 ? (
                  <div className="flex flex-col gap-2">
                    {c.events.map((e) => (
                      <div key={e.id} className="flex flex-wrap items-center gap-2">
                        {/* Event title */}
                        <span className="rounded-full border border-indigo-200 bg-indigo-50 px-2 py-0.5 font-semibold tracking-wide text-[11px] text-indigo-700">{e.name}</span>

                        {/* Role badge */}
                        <span className="inline-flex items-center text-[8px] font-medium text-gray-900  uppercase ">{e.role}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <span className="text-gray-400">—</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
