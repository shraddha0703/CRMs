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
    { name: "Dashboard", path: "/Admindashboard" },
    { name: "Leads", path: "/Leads" },
    { name: "CustomersTask", path: "/ManageTask" },
    { name: "Reports", path: "/Reports" },
    { name: "Settings", path: "/Setting" },
  ];

  const userMenu = [
    { name: "Dashboard", path: "/Userdashboard" },
    { name: "My Tasks", path: "/Mytasks" },
    { name: "Calendar", path: "/Calender" },
    { name: "Deals", path: "/Deals" },
  ];

  const menuItems = role === "Admin" ? adminMenu : userMenu;

  return (
    // <motion.nav
    //   className="bg-black sticky top-0 z-50 text-white p-4 flex gap-6"
    //   initial={{ opacity: 0 }}
    //   animate={{ opacity: 1 }}
    // >
    //   <div className="flex gap-6">
    //     {menuItems.map((item, index) => (
    //       <NavLink
    //         key={index}
    //         to={item.path}
    //         className={({ isActive }) =>
    //           isActive
    //             ? "underline text-yellow-400"
    //             : "hover:underline cursor-pointer"
    //         }
    //       >
    //         {item.name}
    //       </NavLink>
    //     ))}
    //   </div>

    //   <div className="ml-auto flex gap-4">
    //     <ThemeToggle />
    //     <LogoutButton />
    //   </div>
    // </motion.nav>

    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 backdrop-blur-xl bg-white/10 border-b border-white/20 shadow-lg"
    >
      <div className=" mx-auto px-6 py-3 flex items-center text-white">
        {/* 🔹 Logo / Title */}
        <h1 className="px-6 text-xl font-bold tracking-wide bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          CRM 
        </h1>

        {/* 🔹 Menu */}
        <div className="flex gap-6">
          {menuItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              className={({ isActive }) =>
                `relative px-2 py-1 transition-all duration-300 ${
                  isActive ? "text-cyan-400" : "text-gray-600 hover:text-white  dark:text-white"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {item.name}

                  {/* 🔥 Animated underline */}
                  <motion.span
                    layoutId="underline"
                    className="absolute left-0 -bottom-1 h-[2px] bg-gradient-to-r from-cyan-400 to-blue-500 rounded"
                    style={{ width: isActive ? "100%" : "0%" }}
                    transition={{ duration: 0.3 }}
                  />
                </>
              )}
            </NavLink>
          ))}
        </div>

        {/* 🔹 Right Side */}
        <div className="ml-auto flex items-center gap-4">
          {/* Theme Toggle */}
          <div className="bg-white/10 p-2 rounded-lg hover:bg-white/20 transition">
            <ThemeToggle />
          </div>

          {/* Logout Button */}
          <button className="bg-gradient-to-r from-red-500 to-pink-500 px-4 py-2 rounded-lg hover:opacity-90 transition shadow-md">
            <LogoutButton />
          </button>
        </div>
      </div>
    </motion.nav>
  );
}

export default Navbar;
