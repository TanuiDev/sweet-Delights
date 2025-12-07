import userApi, { type Tuser } from "../../../../features/Auth/userApi";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBinLine } from "react-icons/ri";
import { DeleteUser } from "./DeleteUser";
import { useState } from "react";
import { UpdateRole } from "./UpdateRole";

export const Users = () => {
  const [deleteUser, setDeleteUser] = useState<Tuser | null>(null);

  const [updateUser, setUpdateUser] = useState<Tuser | null>(null);

  const {
    data: usersData,
    isLoading: loadingUsers,
    error: userError,
  } = userApi.useGetUsersQuery();

  const getRoleBadgeColor = (role: string) => {
    const roleLower = role?.toLowerCase() || "";
    if (roleLower.includes("admin")) {
      return "bg-purple-100 text-purple-800 border-purple-300";
    } else if (roleLower.includes("user")) {
      return "bg-blue-100 text-blue-800 border-blue-300";
    }
    return "bg-gray-100 text-gray-800 border-gray-300";
  };

  return (
    <div className="min-h-screen w-full bg-linear-to-br from-purple-50 via-pink-50 to-indigo-50 py-8  sm:px-6 lg:px-8">
      <DeleteUser user={deleteUser} />
      <UpdateRole user={updateUser} />

      {/* Header */}
      <div className="mb-8 text-center">
        <h2
          data-test="users-title"
          className="text-3xl md:text-4xl font-bold bg-linear-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent mb-2"
        >
          User Management
        </h2>
        <p className="text-gray-600 text-sm md:text-base">
          Manage and monitor all registered users
        </p>
      </div>

      {loadingUsers && (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="flex flex-col items-center gap-4">
            <span className="loading loading-spinner loading-lg text-purple-600"></span>
            <p className="text-lg text-gray-600 font-medium">
              Loading users...
            </p>
          </div>
        </div>
      )}

      {userError && (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6 max-w-md">
            <p className="text-xl text-red-600 font-semibold text-center">
              Error loading users. Please try again later.
            </p>
          </div>
        </div>
      )}

      {usersData && usersData.data && usersData.data.length > 0 ? (
        <div data-test="users-list" className="max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
            <div className="">
              <table className="overflow-x-auto">
                <thead>
                  <tr className="bg-linear-to-r from-purple-600 via-gray-600 to-cyan-600">
                    <th className="px-4 py-2 text-left text-sm font-bold text-white uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-bold text-white uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-4 py-2text-left text-sm font-bold text-white uppercase tracking-wider">
                      Phone
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-bold text-white uppercase tracking-wider">
                      Address
                    </th>
                    <th className="px-4 py-2 text-center text-sm font-bold text-white uppercase tracking-wider">
                      Verified
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-bold text-white uppercase tracking-wider">
                      Created At
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-bold text-white uppercase tracking-wider">
                      Updated At
                    </th>
                    <th className="px-4 py-2 text-center text-sm font-bold text-white uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-4 py-2 text-center text-sm font-bold text-white uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {usersData.data.map((user) => (
                    <tr
                      key={user.user_Id}
                      className="hover:bg-linear-to-r hover:from-purple-50 hover:to-pink-50 transition-all duration-200"
                    >
                      <td className="px-2 py-1 whitespace-nowrap">
                        <div className="text-sm font-semibold text-gray-900">
                          {user.name}
                        </div>
                      </td>
                      <td className="px-2 py-1 whitespace-nowrap">
                        <div className="text-sm text-gray-700">
                          {user.email}
                        </div>
                      </td>
                      <td className="px-2 py-1 whitespace-nowrap">
                        <div className="text-sm text-gray-700">
                          {user.phone}
                        </div>
                      </td>
                      <td className="px-2 py-1">
                        <div className="text-sm text-gray-700 max-w-xs truncate">
                          {user.address}
                        </div>
                      </td>
                      <td className="px-2 py-1 whitespace-nowrap text-center">
                        {user.is_verified ? (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800 border border-green-300">
                            Verified
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-300">
                            Pending
                          </span>
                        )}
                      </td>
                      <td className="px-2 py-1 whitespace-nowrap">
                        <div className="text-sm text-gray-600">
                          {new Date(user.Created_At).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            },
                          )}
                        </div>
                      </td>
                      <td className="px-2 py-1 whitespace-nowrap">
                        <div className="text-sm text-gray-600">
                          {new Date(user.Updated_At).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            },
                          )}
                        </div>
                      </td>
                      <td className="px-2 py-1 whitespace-nowrap text-center">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${getRoleBadgeColor(
                            user.role,
                          )}`}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-linear-to-r from-purple-500 to-pink-500 text-white text-xs font-semibold rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
                            onClick={() => {
                              setUpdateUser(user);
                              (
                                document.getElementById(
                                  "role",
                                ) as HTMLDialogElement
                              )?.showModal();
                            }}
                          >
                            <CiEdit size={16} /> Change Role
                          </button>
                          <button
                            className="inline-flex items-center justify-center p-1.5 bg-linear-to-r from-red-500 to-red-600 text-white text-xs font-semibold rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
                            onClick={() => {
                              setDeleteUser(user);
                              (
                                document.getElementById(
                                  "delete_modal",
                                ) as HTMLDialogElement
                              )?.showModal();
                            }}
                          >
                            <RiDeleteBinLine size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="text-6xl mb-4">👥</div>
            <p className="text-xl text-gray-600 font-medium">No users found.</p>
            <p className="text-sm text-gray-500 mt-2">
              Users will appear here once they register.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
