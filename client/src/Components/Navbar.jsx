// // import { motion } from "framer-motion";

// // function Navbar() {
// //   const user = JSON.parse(localStorage.getItem("user") || "{}");
// //   const role = user.role;

// //   const adminMenu = ["Dashboard", "Leads", "Customers", "Reports", "Settings"];

// //   const userMenu = ["Dashboard", "My Tasks", "Calendar", "Deals"];

// //   if (role === "Admin") {
// //     return <Navigate to="/Admindashboard" />;
// //   } else if (role === "User") {
// //     return <Navigate to="/Userdashboard" />;
// //   }
// //   const menuItems = role === "Admin" ? adminMenu : userMenu;

// //   return (
// //     <motion.nav
// //       className="bg-black text-white p-4 flex gap-6"
// //       initial={{ opacity: 0 }}
// //       animate={{ opacity: 1 }}
// //     >
// //       {menuItems.map((item, index) => (
// //         <span key={index} className="hover:underline cursor-pointer">
// //           {item}
// //         </span>
// //       ))}
// //     </motion.nav>
// //   );
// // }

// // export default Navbar;
// import { motion } from "framer-motion";
// import LogoutButton from "./Logout";
// import ThemeToggle from "./Toggle";

// function Navbar() {
//   const role = localStorage.getItem("role"); // FIXED

//   const adminMenu = ["Dashboard", "Leads", "Customers", "Reports", "Settings"];
//   const userMenu = ["Dashboard", "My Tasks", "Calendar", "Deals"];

//   const menuItems = role === "Admin" ? adminMenu : userMenu;

//   return (
//     <motion.nav
//       className="bg-black text-white p-4 flex gap-6 "
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//     >
//       <div className="flex gap-6">
//         {menuItems.map((item, index) => (
//           <span key={index} className="hover:underline cursor-pointer">
//             {item}
//           </span>
//         ))}
//       </div>
//       <div className="ml-auto flex gap-4">
//         <ThemeToggle />

//         <LogoutButton />
//       </div>
//     </motion.nav>
//   );
// }

// export default Navbar;
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import LogoutButton from "./Logout";
import ThemeToggle from "./Toggle";
import React from "react";

function Navbar() {
  const role = localStorage.getItem("role");

  const adminMenu = [
    { name: "Dashboard", path: "/" },
    { name: "Leads", path: "/leads" },
    { name: "Customers", path: "/customers" },
    { name: "Reports", path: "/reports" },
    { name: "Settings", path: "/settings" },
  ];

  const userMenu = [
    { name: "Dashboard", path: "/Userdashboard" },
    { name: "My Tasks", path: "/Mytasks" },
    { name: "Calendar", path: "/calendar" },
    { name: "Deals", path: "/deals" },
  ];

  const menuItems = role === "Admin" ? adminMenu : userMenu;

  return (
    <motion.nav
      className="bg-black text-white p-4 flex gap-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="flex gap-6">
        {menuItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) =>
              isActive
                ? "underline text-yellow-400"
                : "hover:underline cursor-pointer"
            }
          >
            {item.name}
          </NavLink>
        ))}
      </div>

      <div className="ml-auto flex gap-4">
        <ThemeToggle />
        <LogoutButton />
      </div>
    </motion.nav>
  );
}

export default Navbar;
