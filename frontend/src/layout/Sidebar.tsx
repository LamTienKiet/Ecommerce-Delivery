import { NavLink } from "react-router-dom";

const menu = [
  { path: "/", label: "DashBoard" },
  { path: "/products", label: "Products" },
  { path: "/categories", label: "Categories" },
  { path: "/orders", label: "Orders" },
  { path: "/revenue", label: "Revenue" },
];

export const Sidebar = () => {
  return (
    <div>
      <h2>LaTiuKy Restaurant</h2>
      <span>Welcome Admin</span>
      <nav className="">
        {menu.map((item) => (
          <NavLink key={item.path} to={item.path}>
            {item.label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};
