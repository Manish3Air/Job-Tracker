import React from "react";
import { Link } from "react-router-dom";
import { Github, Twitter, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-base-200 to-base-300 text-base-content">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo & Description */}
        <div>
          <Link to="/" className="text-2xl font-bold text-primary">
            JobTracker
          </Link>
          <p className="mt-3 text-sm opacity-80">
            Track your job applications effortlessly and stay focused on your career journey.
          </p>
        </div>


        {/* Social Links */}
        <div>
          <h4 className="font-semibold mb-4 text-lg">Connect with us</h4>
          <div className="flex gap-4">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
              <Twitter size={22} />
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
              <Github size={22} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
              <Linkedin size={22} />
            </a>
          </div>
          <p className="mt-4 text-sm">team@jobtracker.com</p>
        </div>
      </div>

      <div className="text-center py-4 border-t border-base-300 text-sm opacity-80">
        © {new Date().getFullYear()} JobTracker. All rights reserved.
      </div>
      
    </footer>
  );
};

export default Footer;
