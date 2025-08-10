import { useState } from "react";
import UserFilters from "../components/UserFilters";
import UserTable from "../components/UserTable";
import PaginationControls from "../components/PaginationControls";
import EditUserModal from "../components/EditUserModal";
import useUserStore from "../store/userStore";

export default function UsersPage() {
  const { users, updateUser, deleteUser } = useUserStore();
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(5);
  const [filterText, setFilterText] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  const filteredUsers = users.filter((u) =>
    u.name.toLowerCase().includes(filterText.toLowerCase())
  );

  const paginatedUsers = filteredUsers.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <>
      <UserFilters filterText={filterText} setFilterText={setFilterText} />

      <UserTable
        users={paginatedUsers}
        onEdit={(user) => setSelectedUser(user)}
        onDelete={deleteUser}
      />

      <PaginationControls
        page={page}
        totalPages={Math.ceil(filteredUsers.length / rowsPerPage)}
        onPageChange={setPage}
      />

      {selectedUser && (
        <EditUserModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
          onSave={updateUser}
        />
      )}
    </>
  );
}
