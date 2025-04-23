import React from "react";
import { Link } from "react-router-dom";
import { Github, Twitter, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-base-200 to-base-300 text-base-content">
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center md:items-start gap-6">
        {/* Logo & Description */}
        <div className="text-center md:text-left">
          <Link to="/" className="text-2xl font-bold text-primary">
            JobTracker
          </Link>
          <p className="mt-3 text-sm opacity-80 max-w-xs">
            Track your job applications effortlessly and stay focused on your career journey.
          </p>
        </div>

        {/* Social Links */}
        <div className="flex gap-4">
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transform hover:scale-125 transition duration-300"
          >
            <Twitter size={22} />
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transform hover:scale-125 transition duration-300"
          >
            <Github size={22} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transform hover:scale-125 transition duration-300"
          >
            <Linkedin size={22} />
          </a>
        </div>
      </div>

      <div className="text-center py-4 border-t border-base-300 text-sm opacity-80">
        © {new Date().getFullYear()} JobTracker. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
