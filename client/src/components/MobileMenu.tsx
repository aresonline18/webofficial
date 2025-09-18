import { Link } from "wouter";
import ApplyNowButton from "./ApplyNowButton";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  if (!isOpen) return null;

  return (
    <div className="md:hidden shadow-navy-bg border-b border-gray-600">
      <nav className="max-w-site mx-auto px-4 md:px-6 py-4 space-y-4">
        <Link 
          href="/" 
          className="block text-white hover:text-gray-200 font-medium transition-colors"
          onClick={onClose}
        >
          Start
        </Link>
        <Link 
          href="/free-resources/shadow-pages-playbook" 
          className="block text-white hover:text-gray-200 font-medium transition-colors"
          onClick={onClose}
        >
          Shadow Pages Playbook
        </Link>
        <ApplyNowButton 
          className="block text-white hover:text-gray-200 font-medium transition-colors"
          onClick={onClose}
        />
      </nav>
    </div>
  );
}
