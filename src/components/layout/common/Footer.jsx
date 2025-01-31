const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-4 mt-auto">
      <div className="container mx-auto text-center">
        <p>
          &copy; {new Date().getFullYear()} Fusion Stream. All Rights Reserved.
        </p>
        <div className="mt-2 flex justify-center space-x-6">
          <span className="cursor-default hover:text-white transition-colors duration-200">
            Privacy Policy
          </span>
          <span className="cursor-default hover:text-white transition-colors duration-200">
            Terms of Service
          </span>
          <span className="cursor-default hover:text-white transition-colors duration-200">
            Contact Us
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
