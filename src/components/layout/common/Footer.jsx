const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-4">
      <div className="container mx-auto text-center">
        &copy; {new Date().getFullYear()} VideoTube. All Rights Reserved.
        <div className="mt-2 space-x-4">
          <a href="/privacy" className="hover:text-white">
            Privacy Policy
          </a>
          <a href="/terms" className="hover:text-white">
            Terms of Service
          </a>
          <a href="/contact" className="hover:text-white">
            Contact Us
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
