import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/atoms/Card";
import { Button } from "@/components/atoms/Button";
import { roles as fallbackRoles } from "@/data/mockData";

interface RolesResponse {
  roles: typeof fallbackRoles;
}

export function Users() {
  const [roles, setRoles] = useState<typeof fallbackRoles>([]);

  useEffect(() => {
    const load = async () => {
      const response = await fetch("/api/roles");
      const payload = (await response.json()) as RolesResponse;
      setRoles(payload.roles);
    };
    load();
  }, []);

  const list = roles.length ? roles : fallbackRoles;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">User Management</h1>
          <p className="text-sm text-slate-500">
            Role-based access control and audit logging.
          </p>
        </div>
        <Button>Add User</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {list.map((role) => (
          <Card key={role.id}>
            <CardContent className="space-y-2">
              <p className="text-sm font-semibold text-slate-800 dark:text-white">
                {role.title}
              </p>
              <p className="text-xs text-slate-500">{role.access}</p>
              <p className="text-xs text-slate-500">{role.members} members</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <div>
            <p className="text-sm font-semibold">Activity Logs</p>
            <p className="text-xs text-slate-500">Audit-ready change tracking</p>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-xl border border-dashed border-slate-200 p-6 text-center text-sm text-slate-500 dark:border-slate-800">
            Enable immutable audit logs for compliance and security reviews.
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div>
            <p className="text-sm font-semibold">Supplier Portal</p>
            <p className="text-xs text-slate-500">View-only access to POs</p>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-xl border border-dashed border-slate-200 p-6 text-center text-sm text-slate-500 dark:border-slate-800">
            Invite suppliers to monitor their purchase orders and shipment status.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
