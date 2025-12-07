import userApi, { type Tuser } from "../../../../features/Auth/userApi";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBinLine } from "react-icons/ri";
import {
  FaUsers,
  FaCheckCircle,
  FaClock,
  FaUserShield,
  FaUserTag,
  FaExclamationTriangle,
} from "react-icons/fa";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";
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
    <div className="min-h-screen w-fit bg-linear-to-br from-purple-50 via-pink-50 to-indigo-50">
      <DeleteUser user={deleteUser} />
      <UpdateRole user={updateUser} />

      <div className="mb-6 text-center">
        <div className="flex items-center justify-center mb-3">
          <div className="relative">
            <div className="absolute inset-0 bg-purple-500/20 rounded-full blur-xl animate-pulse" />
            <div className="relative bg-white p-3 rounded-full shadow-lg border-2 border-purple-200">
              <FaUsers className="text-purple-600 text-2xl" />
            </div>
          </div>
        </div>
        <h2
          data-test="users-title"
          className="text-2xl md:text-3xl font-bold bg-linear-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent mb-2"
        >
          User Management
        </h2>
        <p className="text-gray-600 text-sm md:text-base">
          Manage and monitor all registered users
        </p>
        {usersData?.data && (
          <div className="mt-3 inline-flex items-center gap-2 bg-white px-3 py-1.5 rounded-full shadow-md border border-purple-200">
            <FaUsers className="text-purple-600 text-sm" />
            <span className="font-semibold text-gray-700 text-sm">
              {usersData.data.length} Total Users
            </span>
          </div>
        )}
      </div>

      {loadingUsers && (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="flex flex-col items-center gap-4 bg-white rounded-xl shadow-xl p-8 border border-purple-200">
            <div className="relative">
              <div className="absolute inset-0 bg-purple-500/20 rounded-full blur-xl animate-pulse" />
              <span className="loading loading-spinner loading-md text-purple-600 relative"></span>
            </div>
            <p className="text-base text-gray-700 font-semibold">
              Loading users...
            </p>
            <p className="text-xs text-gray-500">
              Please wait while we fetch the data
            </p>
          </div>
        </div>
      )}

      {userError && (
        <div className="flex  justify-center min-h-[400px]">
          <div className="bg-red-50 border-2 border-red-300 rounded-xl p-6 max-w-md shadow-xl">
            <div className="flex justify-center mb-3">
              <div className="bg-red-100 p-3 rounded-full">
                <FaExclamationTriangle className="text-red-600 text-2xl" />
              </div>
            </div>
            <p className="text-base text-red-700 font-bold text-center mb-1">
              Error Loading Users
            </p>
            <p className="text-xs text-red-600 text-center">
              Please try again later or contact support if the problem persists.
            </p>
          </div>
        </div>
      )}

      {usersData && usersData.data && usersData.data.length > 0 ? (
        <div data-test="users-list" className="max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl  border border-purple-200">
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="bg-linear-to-r from-purple-600 via-pink-600 to-indigo-600">
                  <th className="px-2 py-3 text-left text-xs font-bold text-white uppercase tracking-wide whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      <FaUserTag className="text-purple-200 text-xs" />
                      Name
                    </div>
                  </th>
                  <th className="px-2 py-3 text-left text-xs font-bold text-white uppercase tracking-wide whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      <MdEmail className="text-purple-200 text-xs" />
                      Email
                    </div>
                  </th>
                  <th className="px-2 py-3 text-left text-xs font-bold text-white uppercase tracking-wide whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      <MdPhone className="text-purple-200 text-xs" />
                      Phone
                    </div>
                  </th>
                  <th className="px-2 py-3 text-left text-xs font-bold text-white uppercase tracking-wide whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      <MdLocationOn className="text-purple-200 text-xs" />
                      Address
                    </div>
                  </th>
                  <th className="px-2 py-3 text-center text-xs font-bold text-white uppercase tracking-wide whitespace-nowrap">
                    <div className="flex items-center justify-center gap-1.5">
                      <FaCheckCircle className="text-purple-200 text-xs" />
                      Verified
                    </div>
                  </th>
                  <th className="px-2 py-3 text-left text-xs font-bold text-white uppercase tracking-wide whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      <FaClock className="text-purple-200 text-xs" />
                      Created At
                    </div>
                  </th>
                  <th className="px-2 py-3 text-left text-xs font-bold text-white uppercase tracking-wide whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      <FaClock className="text-purple-200 text-xs" />
                      Updated At
                    </div>
                  </th>
                  <th className="px-2 py-3 text-center text-xs font-bold text-white uppercase tracking-wide whitespace-nowrap">
                    <div className="flex items-center justify-center gap-1.5">
                      <FaUserShield className="text-purple-200 text-xs" />
                      Role
                    </div>
                  </th>
                  <th className="px-2 py-3 text-center text-xs font-bold text-white uppercase tracking-wide whitespace-nowrap sticky right-0 bg-purple-600 shadow-xl">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {usersData.data.map((user) => (
                  <tr
                    key={user.user_Id}
                    className="hover:bg-linear-to-r hover:from-purple-50 hover:via-pink-50 hover:to-indigo-50 transition-all duration-300 hover:shadow-md"
                  >
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-linear-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white text-xs font-bold shadow-md">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="text-xs font-bold text-gray-900">
                          {user.name}
                        </div>
                      </div>
                    </td>
                    <td className="px-2 py-3 whitespace-nowrap">
                      <div className="text-xs text-gray-700 font-medium">
                        {user.email}
                      </div>
                    </td>
                    <td className="px-2 py-3 whitespace-nowrap">
                      <div className="text-xs text-gray-700 font-medium">
                        {user.phone}
                      </div>
                    </td>
                    <td className="px-2 py-3 whitespace-nowrap">
                      <div
                        className="text-xs text-gray-700 max-w-[180px] truncate"
                        title={user.address}
                      >
                        {user.address}
                      </div>
                    </td>
                    <td className="px-2  py-3 whitespace-nowrap text-center">
                      {user.is_verified ? (
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold bg-linear-to-r from-green-100 to-emerald-100 text-green-800 border border-green-300 shadow-sm">
                          <FaCheckCircle className="text-xs" />
                          Verified
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold bg-linear-to-r from-amber-100 to-yellow-100 text-amber-800 border border-amber-300 shadow-sm">
                          <FaClock className="text-xs" />
                          Pending
                        </span>
                      )}
                    </td>
                    <td className="px-2 py-3 whitespace-nowrap">
                      <div className="text-xs text-gray-600 font-medium">
                        {new Date(user.Created_At).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </div>
                    </td>
                    <td className="px-2 py-3 whitespace-nowrap">
                      <div className="text-xs text-gray-600 font-medium">
                        {new Date(user.Updated_At).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </div>
                    </td>
                    <td className="px-2 py-3 whitespace-nowrap text-center">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold border shadow-sm ${getRoleBadgeColor(
                          user.role,
                        )}`}
                      >
                        <FaUserShield className="text-xs" />
                        {user.role}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-center sticky right-0 bg-white shadow-lg">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-linear-to-r from-purple-500 to-pink-500 text-white text-xs font-bold rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
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
                          className="inline-flex items-center justify-center p-1.5 bg-linear-to-r from-red-500 to-red-600 text-white text-xs font-bold rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
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
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        !loadingUsers &&
        !userError && (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center bg-white rounded-xl shadow-xl p-8 border border-purple-200">
              <div className="flex justify-center mb-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-purple-500/20 rounded-full blur-xl" />
                  <div className="relative bg-purple-100 p-4 rounded-full">
                    <FaUsers className="text-purple-600 text-3xl" />
                  </div>
                </div>
              </div>
              <p className="text-lg text-gray-800 font-bold mb-1">
                No Users Found
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Users will appear here once they register.
              </p>
            </div>
          </div>
        )
      )}
    </div>
  );
};
