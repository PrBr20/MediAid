import React from "react";
import logo from "../../assets/images/logo.svg";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="flex mt-[50px] h-[350px] item-center bg-gray-200">
      <div className="flex flex-col w-1/3 items-center justify-center">
        <img src={logo} className="px-auto w-[120px]" alt="" />
        <p>copyright 2023, developed by pb, afsh, ta</p>
      </div>

      <div className="flex flex-col w-1/3 pl-[200px] justify-center">
        <h1 className="font-bold text-2xl">Services</h1>
        <p>Find a Doctor</p>
        <p>MediShop</p>
        <p>MediLab</p>
        <h1 className="font-bold text-2xl mt-[10px]">Follow Us</h1>
        <div className="flex">
          <FaLinkedin className="w-5 h-5 mr-[5px]" />
          <FaFacebook className="w-5 h-5 mx-[5px]" />
          <FaInstagram className="w-5 h-5 mx-[5px]" />
          <FaGithub className="w-5 h-5 mx-[5px]" />
        </div>
      </div>

      <div className="flex flex-col w-1/3 pl-[150px] pt-[30px] justify-center">
        <h1 className="font-bold text-2xl">Quick Links</h1>
        <p>Services</p>
        <p>FeedBacks</p>
        <p>Faq</p>
        <div className="mt-[10px]">
          <h1 className="font-bold text-2xl mt[10px]">Contact Us</h1>
          <p>Phone: 123456789</p>
          <p>Email: yahoo@gmail.com </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
