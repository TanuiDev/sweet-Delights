import userApi from "../../../features/Auth/userApi"

export const Users = () => {
  const {data: usersData, isLoading:loadingUsers, error: userError} = userApi.useGetUsersQuery();
  console.log("Users data:", usersData);
  return (
    <div>

      {loadingUsers && <p className="text-xl ">Loading users...</p> }
      {
        userError && <p className="text-xl text-red-500 ">Error loading users.</p>
      }
      {
              usersData && usersData && usersData.length > 0 ?
              (
                <div>

                </div>
              ):(
                <p>No users found.</p>
              )
      }
    </div>
  )
}
