import { useState } from "react";
import { Link } from "wouter";
import MobileMenu from "./MobileMenu";
import ApplyNowButton from "./ApplyNowButton";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <header className="shadow-navy-bg py-4 md:py-6 pl-[5px] pr-[5px] pt-[29px] pb-[29px]">
        <div className="max-w-site mx-auto px-4 md:px-6 flex justify-between items-center">
          {/* Shadow Pages Logo */}
          <Link href="/">
            <div className="flex items-center space-x-2 cursor-pointer">
              <img 
                src="https://start.shadowpages.io/assets/logosp.webp" 
                alt="Shadow Pages Logo" 
                className="h-8"
              />
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/free-resources/shadow-pages-playbook" className="text-white hover:text-gray-200 font-medium text-base transition-colors">
              Free Playbook
            </Link>
            <ApplyNowButton className="text-white hover:text-gray-200 font-medium text-base transition-colors" />
          </nav>
          
          {/* Mobile Menu Button - Three horizontal lines */}
          <button 
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1"
            onClick={toggleMobileMenu}
          >
            <span className="w-6 h-0.5 bg-white"></span>
            <span className="w-6 h-0.5 bg-white"></span>
            <span className="w-6 h-0.5 bg-white"></span>
          </button>
        </div>
      </header>
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </>
  );
}
