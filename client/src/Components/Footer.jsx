import { motion } from "framer-motion";
function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="sticky bottom-0 z-50 backdrop-blur-xl bg-white/10 border-t border-white/20 shadow-inner"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 text-white flex flex-col md:flex-row justify-between items-center gap-3">
        {/* 🔹 Left */}
        <p className="text-sm text-black dark:text-gray-300">
          © 2026 CRM System. All rights reserved.
        </p>

        {/* 🔹 Center Links */}
        <div className="flex gap-6 text-sm">
          {["Privacy Policy", "Terms", "Help"].map((item, i) => (
            <motion.a
              key={i}
              href="#"
              whileHover={{ scale: 1.1 }}
              className="relative text-black dark:text-gray-300 hover:text-cyan-400 transition"
            >
              {item}

              {/* 🔥 underline animation */}
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300 group-hover:w-full"></span>
            </motion.a>
          ))}
        </div>

        {/* 🔹 Right */}
        <p className="text-sm text-black dark:text-gray-300">
          Developed by{" "}
          <span className="font-semibold text-cyan-400">Team Akshay</span>
        </p>
      </div>
    </motion.footer>
  );
}

export default Footer;
