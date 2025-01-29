import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import React from "react";
import { GoChevronDown } from "react-icons/go";
import { IoPersonOutline, IoSearch } from "react-icons/io5";
import { FiShoppingCart } from "react-icons/fi";
import { SearchProvider } from "../search/SearchContext";
import SearchBar from "../search/SearchBar";
import { CiHeart } from "react-icons/ci";
import { HiBars3BottomRight } from "react-icons/hi2";

export default function Header() {
  return (
    <div className="w-full px-4 md:px-6 py-4 bg-white font-sans font-semibold sticky top-0 z-50 ">
      <div className="flex justify-between items-center">
        {/* Left Section: Logo and Navigation */}
        <div className="flex items-center gap-3 md:gap-2 lg:gap-12">
          {/* Logo */}
          <h2 className="text-2xl font-bold">
            <Link href={"/"}>Bandage</Link>
          </h2>

          {/* Navigation Links */}
          <nav className="hidden md:flex">
            <ul className="flex gap-x-6">
              <li>
                <Link href={"/"} className="hover:text-blue-500">
                  Home
                </Link>
              </li>
              <li className=" ">
                <Link
                  href={"/products"}
                  className="flex items-center gap-1 hover:text-blue-500"
                >
                  Shop
                  <GoChevronDown />
                </Link>
              </li>
              <li>
                <Link href={"/about"} className="hover:text-blue-500">
                  About
                </Link>
              </li>

              <li>
                <Link href={"/contact"} className="hover:text-blue-500">
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-x-4">
          {/* Desktop Icons */}
          <div className="hidden md:flex items-center gap-x-6">
            {/* Login */}
            <div className="flex items-center gap-x-2 text-[#23A6F0]">
              <IoPersonOutline size={20} />
              <Link href={"/login"}>
                <p>Login</p>
              </Link>
              <span>/</span>
              <Link href={"/register"}>
                <p>Register</p>
              </Link>
            </div>

            {/* Icons */}
            <ul className="flex items-center gap-x-4 text-[#23A6F0]">
              <li>
                <SearchProvider>
                  <SearchBar />
                </SearchProvider>
              </li>
              <li className="">
                <Link href={"/cart"} className="flex items-center gap-x-1">
                  <FiShoppingCart size={24} />
                  <p>1</p>
                </Link>
              </li>
              <li className="">
                <Link href={"/"} className="flex items-center gap-x-1">
                  <CiHeart size={28} />
                  <p>1</p>
                </Link>
              </li>
            </ul>
          </div>

          {/* Mobile Icons */}
          <div className="flex md:hidden items-center gap-x-4">
            {/* Search */}
            <SearchProvider>
              <SearchBar />
            </SearchProvider>
            {/* Cart */}
            <Link href={"/cart"} className="flex items-center">
              <FiShoppingCart size={24} className="text-[#23A6F0]" />
            </Link>

            {/* Toggle Button */}
            <Sheet>
              <SheetTrigger>
                <HiBars3BottomRight size={30} className="text-black" />
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle></SheetTitle>
                  <SheetDescription>
                    <div className="flex flex-col justify-center items-center gap-y-6 text-2xl font-sans font-semibold text-[#39393a]">
                      <ul className="flex flex-col items-center gap-8">
                        <li>
                          <Link href={"/"} className="hover:text-blue-500">
                            Home
                          </Link>
                        </li>
                        <li className="flex items-center gap-1">
                          <Link
                            href={"/products"}
                            className="hover:text-blue-500"
                          >
                            Shop
                          </Link>
                          <GoChevronDown />
                        </li>
                        <li>
                          <Link href={"/about"} className="hover:text-blue-500">
                            About
                          </Link>
                        </li>

                        <li>
                          <Link
                            href={"contact/"}
                            className="hover:text-blue-500"
                          >
                            Contact
                          </Link>
                        </li>
                      </ul>
                      {/* Right Section */}
                      <div className="flex items-center gap-x-4">
                        {/* Desktop Icons */}
                        <div className="flex flex-col items-center gap-6">
                          {/* Login */}
                          <div className="flex flex-col gap-3 items-center text-[#23A6F0]">
                            <IoPersonOutline size={30} />
                            <Link href={"/login"}>
                              <p>Login</p>
                            </Link>
                            <span>/</span>
                            <Link href={"/register"}>
                              <p>Register</p>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </SheetDescription>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </div>
  );
}
