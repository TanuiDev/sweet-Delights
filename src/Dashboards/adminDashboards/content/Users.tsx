import userApi, { type Tuser } from "../../../features/Auth/userApi";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBinLine } from "react-icons/ri";
import { DeleteUser } from "./DeleteUser";
import { useState } from "react";

export const Users = () => {
  const [deleteUser, setDeleteUser] = useState<Tuser | null>(null);

  const {
    data: usersData,
    isLoading: loadingUsers,
    error: userError,
  } = userApi.useGetUsersQuery();
  console.log("Users data:", usersData?.data);
  return (
    <div>
      <DeleteUser user={deleteUser} />

      {loadingUsers && (
        <p className="text-xl ">
          <span className="loading loading-spinner loading-2xl"></span>
        </p>
      )}
      {userError && (
        <p className="text-xl text-red-500 ">Error loading users.</p>
      )}
      {usersData && usersData.data && usersData.data.length > 0 ? (
        <div className="overflow-x-auto w-full">
          <table className="table table-xs w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-700 text-white lg:text-lg">
                <th className="px-4 py-4">Name</th>
                <th className="px-4 py-4">Email</th>
                <th className="px-4 py-4">Phone</th>
                <th className="px-4 py-4">Address</th>
                <th className="px-4 py-4">Verified</th>
                <th className="px-4 py-4">Created At</th>
                <th className="px-4 py-4">Updated At</th>
                <th className="px-4 py-4">Role</th>
                <th className="px-4 py-4">Actions</th>
              </tr>
            </thead>
            {usersData.data.map((user) => (
              <tbody>
                <tr
                  key={user.user_id}
                  className="hover:bg-base-300 border-b border-gray-300 lg:text-md"
                >
                  <td className="px-4 py-2 border-r border-gray-900">
                    {user.name}
                  </td>
                  <td className="px-4 py-2 border-r border-gray-900">
                    {user.email}
                  </td>
                  <td className="px-4 py-2 border-r border-gray-900">
                    {user.phone}
                  </td>
                  <td className="px-4 py-2 border-r border-gray-900">
                    {user.address}
                  </td>
                  <td className="px-4 py-2 border-r border-gray-900">
                    {user.is_verified ? (
                      <span className="badge badge-success">Verified</span>
                    ) : (
                      <span className="badge badge-warning">Pending</span>
                    )}
                  </td>
                  <td className="px-4 py-2 border-r border-gray-900">
                    {new Date(user.Created_At).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 border-r border-gray-900">
                    {new Date(user.Updated_At).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 border-r border-gray-900">
                    {user.role}
                  </td>
                  <td className="px-4 py-2 flex gap-x-2">
                    <button className="btn btn-sm btn-primary ">
                      <CiEdit size={20} />
                    </button>
                    <button
                      className="btn btn-sm btn-danger bg-red-600 border-red-600 hover:bg-red-700 hover:border-red-700"
                      onClick={() => {
                        setDeleteUser(user);
                        (
                          document.getElementById(
                            "delete_modal",
                          ) as HTMLDialogElement
                        )?.showModal();
                      }}
                    >
                      <RiDeleteBinLine size={20} />
                    </button>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
};
