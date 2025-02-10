import { useState } from "react";
import logo from "@/assets/logo.svg";
import { links } from "@/utils/constants";
import { NavLink } from "react-router-dom";
import { RiCloseLine } from "react-icons/ri";
import { HiOutlineMenu } from "react-icons/hi";

interface NavLinksProps {
  handleClick?: () => void;
}

const NavLinks = ({ handleClick }: NavLinksProps) => {
  return (
    <div className="mt-10">
      {links.map((item) => (
        <NavLink
          key={item.name}
          to={item.to}
          className="flex flex-row justify-start items-center my-8 text-sm font-medium text-gray-400 hover:text-cyan-400"
          // Call click only on mobile devices
          onClick={() => handleClick && handleClick()}
        >
          <item.icon className="w-6 h-6 mr-2" />
          {item.name}
        </NavLink>
      ))}
    </div>
  );
};

const Sidebar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (  
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex flex-col w-[240px] py-10 px-4 bg-[#191624]">
        <img src={logo} alt="logo" className="w-full h-14 object-contain" />
        <NavLinks />
      </div>

      {/* Mobile Menu Button */}
      <div className="absolute top-6 right-3 md:hidden block">
        {mobileMenuOpen ? (
          <RiCloseLine className="text-white w-6 h-6 mr-2" 
            onClick={() => setMobileMenuOpen(false)}
          />
        ) : (
          <HiOutlineMenu className="text-white w-6 h-6 mr-2" 
            onClick={() => setMobileMenuOpen(true)}
          />
        )}
      </div>
      
      {/* Mobile Toggled Sidebar */}
      <div className={`md:hidden absolute top-0 h-screen w-2/3 bg-gradient-to-tl from-white/10 to-[#483d8b] 
        backdrop-blur-lg z-10 p-6 smooth-transition
        ${mobileMenuOpen ? 'left-0' : '-left-full'}`}
      >
        <img src={logo} alt="logo" className="w-full h-14 object-contain" />
        <NavLinks handleClick={() => setMobileMenuOpen(false)} />
      </div>
    </>
  )
}

export default Sidebar