import { create } from "zustand";
import generateUsers from "../utils/generateUsers";

const useUserStore = create((set) => ({
  users: generateUsers(30),
  updateUser: (updatedUser) =>
    set((state) => ({
      users: state.users.map((u) =>
        u.id === updatedUser.id ? updatedUser : u
      ),
    })),
  deleteUser: (id) =>
    set((state) => ({
      users: state.users.filter((u) => u.id !== id),
    })),
}));

export default useUserStore;
