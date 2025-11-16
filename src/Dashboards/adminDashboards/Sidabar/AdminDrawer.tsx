import { Link } from "react-router";
import { adminData } from "../Sidabar/sideBar/drawer";

export const AdminDrawer = () => {
  return (
    <>
      <div className="">
        <ul className="text-lg md:text-xl gap-y-2 pl-3">
          {adminData.map((item) => (
            <li key={item.id}>
              <Link to={item.link}>{item.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
