import React from "react";
import logo from "../../assets/images/logo.svg";
// import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useContext } from "react";
import AuthContext from "@/context/AuthContext";
import { RiH1 } from "react-icons/ri";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import CartIcon from "@/assets/gifs/CartIcon.svg";

const Header = () => {
  const { toast } = useToast();
  const { state, setState } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    localStorage.removeItem("cartSize");

    setState({ token: null, user: null, role: null, cartSize: null });

    toast({
      title: "Logged Out",
      description: "You have been logged out successfully!",
    });

    navigate("/");
  };

  console.log(state);

  return (
    <header
      className="header flex items-center relative z-1010"
      style={{
        boxShadow: "0 2px 4px rgba(0,0,0,.08), 0 4px 12px rgba(0,0,0,.08)",
      }}
    >
      <div className="container px-[100px] py-[5px] ">
        <div className="flex items-center justify-between">
          <div className="w-[650px] flex items-center justify-between">
            <div>
              <img src={logo} className="w-[120px] object-cover" alt="" />
            </div>

            <div className="navigation">
              <ul className="menu flex items-center">
                <li className="menu-item p-[10px] hover:underline hover:underline-offset-[15px]">
                  <NavLink
                    to="/"
                    className={(navClass) =>
                      navClass.isActive ? "font-bold text-orange-500 " : ""
                    }
                  >
                    Home
                  </NavLink>
                </li>
                <li className="menu-item p-[10px] hover:underline hover:underline-offset-[15px]">
                  <NavLink
                    to="/about"
                    className={(navClass) =>
                      navClass.isActive ? "font-bold text-orange-500" : ""
                    }
                  >
                    About
                  </NavLink>
                </li>
                <li className="menu-item p-[10px] hover:underline hover:underline-offset-[15px]">
                  <NavLink
                    to="/doctors"
                    className={(navClass) =>
                      navClass.isActive ? "font-bold text-orange-500" : ""
                    }
                  >
                    Find a Doctor
                  </NavLink>
                </li>
                <li className="menu-item p-[10px] hover:underline hover:underline-offset-[15px]">
                  <NavLink
                    to="/medishop"
                    className={(navClass) =>
                      navClass.isActive ? "font-bold text-orange-500" : ""
                    }
                  >
                    MediShop
                  </NavLink>
                </li>
                <li className="menu-item p-[10px] hover:underline hover:underline-offset-[15px]">
                  <NavLink
                    to="/medilab"
                    className={(navClass) =>
                      navClass.isActive ? "font-bold text-orange-500" : ""
                    }
                  >
                    MediLab
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex items-center justify-center space-x-2">
            {/* <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-[3px] px-4 rounded-full">
              Login/SignUp
            </button> */}
            {state.role == "patient" && (
              <div className="relative cursor-pointer">
                <Link to="/cart">
                  <img src={CartIcon} className="w-[30px] h-[30px] " alt="" />
                  <span className="absolute -top-2 -right-2 bg-orange-500 text-xs text-white font-bold rounded-full p-1">
                    {state?.cartSize}
                  </span>
                </Link>
              </div>
            )}

            {state.token && state.user ? (
              <div className="flex space-x-2">
                <Link to="/user/settings">
                  <Avatar className="w-[40px] h-[40px]">
                    <AvatarImage src={state.user?.photo} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </Link>
                <Button
                  size="sm"
                  className="bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-full"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </div>
            ) : (
              <NavLink to="/Login">
                <Button
                  size="sm"
                  className="bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-full"
                >
                  Login/Sign Up
                </Button>
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
