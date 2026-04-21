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
      style={{
        background: "red",
        color: "#fff",
        border: "none",
        padding: "4px 18px",
        borderRadius: "5px",
        cursor: "pointer", 
      }}
    >
      Logout
    </motion.button>
  );
};

export default LogoutButton;
