import { API_BASE } from "@/lib/api";

export interface ListContactsParams {
  search?: string;
  countryId?: number;
  stateId?: number;
  limit?: number;
  offset?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface Contact {
  id: number;
  name: string;
  email: string;
  mobileCode?: string | null;
  mobile?: string | null;
  address?: string | null;
  countryId?: number | null;
  countryName?: string | null;
  stateId?: number | null;
  stateName?: string | null;
  cityId?: number | null;
  cityName?: string | null;
  events?: [{ id: number, eventId: number; name: string; role: string }];
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
  total: number;
}

export type FetchContactsResponse = {
  rows: Contact[];
  total: number;
};

export async function fetchContacts(params: ListContactsParams = {}): Promise<FetchContactsResponse> {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      query.append(key, value.toString());
    }
  });

  const response = await fetch(`${API_BASE}/contact?${query.toString()}`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch contacts");
  }

  const data = await response.json();

  return data;
}
