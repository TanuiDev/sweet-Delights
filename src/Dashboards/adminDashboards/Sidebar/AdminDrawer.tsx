import { Link } from "react-router";
import { adminData } from "./sideBar/drawer";

export const AdminDrawer = () => {
  return (
    <>
      <div className="h-full w-full bg-slate-900 text-slate-100 border-r  border-slate-800 shadow-lg">
        <h3 className="text-2xl font-semibold tracking-wide px-4 py-5 bg-slate-950 border-b border-slate-800">
          Admin Menu
        </h3>
        <div className="border-b border-slate-800"></div>
        <ul className="p-4 space-y-2 text-base">
          {adminData.map((item) => (
            <li key={item.id} className="rounded-md">
              <Link
                to={item.link}
                className="block px-3 py-2 rounded-md transition-colors duration-200 hover:bg-slate-800 hover:text-emerald-200"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
