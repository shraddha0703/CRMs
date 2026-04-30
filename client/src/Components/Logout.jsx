import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("admin");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <motion.button
      onClick={handleLogout}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
     
    >
      Logout
    </motion.button>
  );
};

export default LogoutButton;
