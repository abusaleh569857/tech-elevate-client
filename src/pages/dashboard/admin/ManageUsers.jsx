import { useEffect } from "react";
import { showAlert } from "@/shared/lib/alert.js";
import { useAppDispatch, useAppSelector } from "@/app/hooks.js";
import { changeUserRole, fetchUsers } from "@/features/admin";
import Button from "@/shared/ui/Button.jsx";
import Panel from "@/shared/ui/Panel.jsx";
import SectionHeader from "@/shared/ui/SectionHeader.jsx";

const ManageUsers = () => {
  const dispatch = useAppDispatch();
  const { users } = useAppSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const updateUserRole = async (userId, role) => {
    const result = await dispatch(changeUserRole({ userId, role }));

    if (changeUserRole.fulfilled.match(result)) {
      showAlert({
        title: "Role updated",
        text: `User role changed to ${role}.`,
        icon: "success",
      });
    } else {
      showAlert({ title: "Update failed", text: result.payload, icon: "error" });
    }
  };

  return (
    <Panel>
      <SectionHeader
        eyebrow="Access Control"
        title="Manage Users"
        description="Update platform roles from one controlled table and keep permission changes consistent across the app."
      />
      <div className="mt-8 overflow-x-auto">
        <table className="min-w-full overflow-hidden rounded-[1.5rem] border border-slate-200 text-left text-sm">
          <thead className="bg-slate-950 text-white">
            <tr>
              <th className="px-4 py-4">Name</th>
              <th className="px-4 py-4">Email</th>
              <th className="px-4 py-4">Role</th>
              <th className="px-4 py-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-t border-slate-200 bg-white">
                <td className="px-4 py-4 font-semibold text-slate-900">{user.name}</td>
                <td className="px-4 py-4 text-slate-600">{user.email}</td>
                <td className="px-4 py-4 text-slate-600">{user.role}</td>
                <td className="px-4 py-4">
                  <div className="flex flex-wrap gap-2">
                    <Button
                      type="button"
                      className="px-4 py-2 text-xs"
                      onClick={() => updateUserRole(user._id, "moderator")}
                      disabled={user.role === "moderator"}
                    >
                      Make Moderator
                    </Button>
                    <Button
                      type="button"
                      variant="secondary"
                      className="px-4 py-2 text-xs"
                      onClick={() => updateUserRole(user._id, "admin")}
                      disabled={user.role === "admin"}
                    >
                      Make Admin
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Panel>
  );
};

export default ManageUsers;



