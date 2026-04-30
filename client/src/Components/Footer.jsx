function Footer() {
  return (
    <footer className="bg-gray-800 sticky bottom-0 z-50 text-white p-4 mt-auto">
      <div className="flex flex-col md:flex-row justify-between items-center">
        {/* Left */}
        <p className="text-sm">© 2026 CRM System. All rights reserved.</p>

        {/* Center */}
        <div className="flex gap-4 text-sm mt-2 md:mt-0">
          <a href="#" className="hover:text-blue-400">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-blue-400">
            Terms
          </a>
          <a href="#" className="hover:text-blue-400">
            Help
          </a>
        </div>

        {/* Right */}
        <p className="text-sm mt-2 md:mt-0">Developed by Team Akshay</p>
      </div>
    </footer>
  );
}

export default Footer;
