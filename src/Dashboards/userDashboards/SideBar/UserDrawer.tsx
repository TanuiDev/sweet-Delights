import { Link } from "react-router";

import { userData } from "./sideBar copy/drawer";

export const UserDrawer = () => {
  return (
    <>
      <div className="">
        <h3 className="text-white text-xl font-semibold p-2 bg-gray-500 ">User Menu</h3>
        <div className="border-b border-gray-400"></div>
        <ul className="p-2 space-y-4  text-white text-lg"> 
          {userData.map((item) => (
            <li key={item.id} className="  p-2 rounded-md">
              <Link to={item.link} className="">{item.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
