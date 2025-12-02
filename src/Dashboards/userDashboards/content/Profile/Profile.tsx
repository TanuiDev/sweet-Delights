import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../../app/store";
import { logout } from "../../../../features/Auth/userSlice";
import { useNavigate } from "react-router";
import userApi from "../../../../features/Auth/userApi";
import { UpdateProfile } from "./UpdateProfile";

export const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user_Id = useSelector((state: RootState) => state.user.user?.user_id);

  const { data, isLoading, error, refetch } = userApi.useGetUsersByIdQuery(
    user_Id ?? 0,
    {
      skip: !user_Id,
    },
  );

  return (
    <div className="relative isolate min-h-screen w-full overflow-hidden bg-gradient-to-br from-[#f7f0ff] via-[#ffe4f5] to-[#e0edff] px-4 py-10 text-gray-900 sm:px-6 lg:px-12">
      <div className="pointer-events-none absolute -left-40 top-10 h-80 w-80 rounded-full bg-pink-200/50 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 top-1/3 h-96 w-96 rounded-full bg-purple-200/60 blur-3xl" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-white to-transparent" />

      <div className="relative z-10 mx-auto max-w-4xl">
        {isLoading ? (
          <div className="flex min-h-[60vh] items-center justify-center">
            <div className="flex flex-col items-center gap-4">
              <span className="loading loading-spinner loading-lg text-primary" />
              <p className="text-lg font-medium text-gray-700">
                Loading profile...
              </p>
            </div>
          </div>
        ) : error ? (
          <div className="flex min-h-[60vh] items-center justify-center">
            <div className="rounded-2xl border border-red-200 bg-red-50/80 p-8 text-center backdrop-blur-sm">
              <div className="mb-4 text-5xl">⚠️</div>
              <h3 className="mb-2 text-xl font-semibold text-red-800">
                Error Loading Profile
              </h3>
              <p className="text-red-600">
                We couldn't load your profile information. Please try again
                later.
              </p>
            </div>
          </div>
        ) : (
          <div className="rounded-3xl border border-white/60 bg-white/70 p-6 shadow-2xl backdrop-blur-2xl sm:p-8 lg:p-10">
            <div className="mb-8 border-b border-gray-200/60 pb-6">
              <p className="text-xs uppercase tracking-[0.25em] text-purple-600 sm:text-sm">
                Profile
              </p>
              <h2 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
                User Information
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Manage your account details and preferences
              </p>
            </div>

            {/* Profile Card */}
            <div className="mb-8 rounded-2xl border border-gray-200/60 bg-gradient-to-br from-white to-purple-50/30 p-6 shadow-lg sm:p-8">
              <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
                {/* Avatar */}
                <div className="relative">
                  <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 opacity-75 blur" />
                  <img
                    src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
                    alt="user avatar"
                    className="relative h-32 w-32 rounded-full border-4 border-white object-cover shadow-xl sm:h-40 sm:w-40"
                  />
                  {data?.is_verified && (
                    <div className="absolute -bottom-2 -right-2 rounded-full bg-green-500 p-1.5 shadow-lg">
                      <svg
                        className="h-4 w-4 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                  )}
                </div>

                <div className="flex-1 space-y-4 text-center sm:text-left">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                      {data?.name}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">User Profile</p>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-lg bg-white/60 p-3 backdrop-blur-sm">
                      <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                        User ID
                      </p>
                      <p className="mt-1 text-sm font-medium text-gray-900">
                        {data?.user_Id}
                      </p>
                    </div>
                    <div className="rounded-lg bg-white/60 p-3 backdrop-blur-sm">
                      <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Name
                      </p>
                      <p className="mt-1 text-sm font-medium text-gray-900 capitalize">
                        {data?.name}
                      </p>
                    </div>

                    <div className="rounded-lg bg-white/60 p-3 backdrop-blur-sm">
                      <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Email
                      </p>
                      <p className="mt-1 truncate text-sm font-medium text-gray-900">
                        {data?.email}
                      </p>
                    </div>

                    <div className="rounded-lg bg-white/60 p-3 backdrop-blur-sm">
                      <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Role
                      </p>
                      <p className="mt-1 text-sm font-medium text-gray-900 capitalize">
                        {data?.role}
                      </p>
                    </div>
                    <div className="rounded-lg bg-white/60 p-3 backdrop-blur-sm">
                      <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Address
                      </p>
                      <p className="mt-1 text-sm font-medium text-gray-900 capitalize">
                        {data?.address}
                      </p>
                    </div>

                    <div className="rounded-lg bg-white/60 p-3 backdrop-blur-sm">
                      <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Verification Status
                      </p>
                      <div className="mt-1 flex items-center justify-center gap-2 sm:justify-start">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                            data?.is_verified
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {data?.is_verified ? (
                            <>
                              <svg
                                className="mr-1 h-3 w-3"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              Verified
                            </>
                          ) : (
                            <>
                              <svg
                                className="mr-1 h-3 w-3"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              Not Verified
                            </>
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <button
                className="btn btn-primary flex-1 gap-2 bg-gradient-to-r from-purple-600 to-pink-500 border-none text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl sm:flex-initial"
                onClick={() => {
                  (
                    document.getElementById(
                      "update_profile",
                    ) as HTMLDialogElement
                  )?.showModal();
                }}
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
                Update Profile
              </button>

              <button
                className="btn btn-outline btn-error flex-1 gap-2 border-2 text-gray-700 transition-all hover:scale-105 hover:bg-red-50 sm:flex-initial"
                onClick={() => {
                  dispatch(logout());
                  navigate("/login");
                }}
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                Logout
              </button>
            </div>
          </div>
        )}

        {data && <UpdateProfile user={data} refetch={refetch} />}
      </div>
    </div>
  );
};
