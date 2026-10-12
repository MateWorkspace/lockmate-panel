import Input from "@/components/ui/input";
import Select from "@/components/ui/select";
import { SearchIcon } from "@/components/icons";
import FilterBar from "@/components/collection/filter-bar";
import type { Role } from "@/lib/mock";

interface UserFiltersProps {
  search?: string;
  status?: string;
  role?: string;
  roles: Role[];
}

const fieldLabel = "mb-1.5 block text-sm font-semibold text-foreground";

export default function UserFilters({
  search,
  status,
  role,
  roles,
}: UserFiltersProps) {
  return (
    <FilterBar action="/users" clearHref="/users">
      <div>
        <label className={fieldLabel} htmlFor="user-search">
          Search
        </label>
        <div className="relative">
          <SearchIcon className="text-subtle pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2" />
          <Input
            id="user-search"
            name="search"
            type="search"
            defaultValue={search}
            placeholder="Name or email"
            className="pl-10"
          />
        </div>
      </div>

      <div>
        <label className={fieldLabel} htmlFor="user-status">
          Status
        </label>
        <Select id="user-status" name="status" defaultValue={status ?? ""}>
          <option value="">All statuses</option>
          <option value="active">Active</option>
          <option value="invited">Invited</option>
          <option value="suspended">Suspended</option>
        </Select>
      </div>

      <div>
        <label className={fieldLabel} htmlFor="user-role">
          Role
        </label>
        <Select id="user-role" name="role" defaultValue={role ?? ""}>
          <option value="">All roles</option>
          {roles.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </Select>
      </div>
    </FilterBar>
  );
}
