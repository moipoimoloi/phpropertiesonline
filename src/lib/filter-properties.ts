import { properties, type Property } from "@/data/properties";

export type PropertyFilters = {
  location?: string;
  status?: string;
};

const matchesLocation = (property: Property, location: string | undefined): boolean => {
  if (!location || location === "Any Location") return true;
  return property.location.toLowerCase().includes(location.toLowerCase());
};

const matchesStatus = (property: Property, status: string | undefined): boolean => {
  if (!status || status === "Any Status") return true;
  if (status === "Pre-selling") return property.status.startsWith("PRE-SELLING");
  if (status === "Ready for Occupancy") return !property.status.startsWith("PRE-SELLING");
  return true;
};

export function filterProperties(filters: PropertyFilters): readonly Property[] {
  return properties.filter((p) => matchesLocation(p, filters.location) && matchesStatus(p, filters.status));
}

export function hasActiveFilters(filters: PropertyFilters): boolean {
  const loc = filters.location && filters.location !== "Any Location";
  const status = filters.status && filters.status !== "Any Status";
  return Boolean(loc || status);
}
