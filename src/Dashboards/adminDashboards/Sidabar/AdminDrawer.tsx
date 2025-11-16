import { Link } from "react-router";
import { adminData } from "../Sidabar/sideBar/drawer";

export const AdminDrawer = () => {
  return (
    <>
      <div>
        <h1 className="welcome">Welcome back Admin</h1>
        <ul>
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
