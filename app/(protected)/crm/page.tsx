'use client';

import { useEffect, useState } from "react";
import { Contact, fetchContacts } from "./lib/api";
import ContactFilters from "./components/ContactFilters";
import ContactTable from "./components/ContactTable";
import Pagination from "./components/Pagination";

export default function CRMPage() {
  
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(20);
  const [offset, setOffset] = useState(0);
  const [total, setTotal] = useState(0);

  const loadContacts = async () => {
    setLoading(true)
    try {
      const data = await fetchContacts({ search, limit, offset });
      setContacts(data.rows);
      setTotal(data.total);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadContacts();
  }, [search, limit, offset]);

  return(
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">CRM - Contacts</h1>

      {/* Filters / Search */}
      <ContactFilters search={search} setSearch={setSearch} />

      {/* Table */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ContactTable contacts={contacts} />
      )}

      {/* Pagination */}
      <Pagination
        total={total}
        limit={limit}
        offset={offset}
        setOffset={setOffset}
      />
    </div>
  );
}