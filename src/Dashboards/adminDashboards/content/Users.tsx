import userApi from "../../../features/Auth/userApi"

export const Users = () => {
  const {data: usersData ,isLoading:loadingUsers, error: userError} = userApi.useGetUsersQuery();
  console.log("Users data:", usersData?.data);
  return (
    <div>

       {loadingUsers && <p className="text-xl ">Loading users...</p> }
      {
        userError && <p className="text-xl text-red-500 ">Error loading users.</p>
      }
      {
              usersData && usersData.data && usersData.data.length > 0 ?
              (
                <div className="mt-4 p-4 md:overflow-x-auto">
                  
                   
                      <table  className="table table-xs">
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Address</th>
                            <th>Verified</th>
                            <th>Role</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        {usersData.data.map((user) => (
                        <tbody  >
                          <tr key={user.user_id} className="hover:bg-base-300">
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                            <td>{user.address}</td>
                            <td>{user.is_verified ? "Yes" : "No"}</td>
                            <td>{user.role}</td>
                            <td>
                              {/* Add action buttons or links here */}
                            </td>
                          </tr>
                        </tbody>
                      ))}
                      </table>
                    
                </div>
              ):(
                <p>No users found.</p>
              )
      }
    </div>
  )
}
