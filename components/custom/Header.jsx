"use client";
import Link from "next/link";
import userStore from "@/stores/userStore";
import MobileNav from "./MobileNav";
import { useState, useEffect } from "react";
import { menuLinks } from "@/lib/constants";
import Image from "next/image";
import { MoonLoader } from "react-spinners";
import { useRouter } from "next/navigation";
import { Skeleton } from "../ui/skeleton";
import CustomButton from "./buttons/CustomButton";

const Header = () => {
  const [isLoading, setIsLoading] = useState(true);

  const user = userStore((state) => state.user);
  const setUser = userStore((state) => state.setUser);
  const removeUser = userStore((state) => state.removeUser);

  const router = useRouter();

  async function handleLogout() {
    const response = await fetch("/api/auth/profile", { method: "POST" });
    if (response.ok) {
      removeUser();
      router.refresh();
    }
  }

  async function getProfile() {
    setIsLoading(true);
    const response = await fetch("/api/auth/profile");
    const data = await response.json();
    setUser(data.user);
    setIsLoading(false);
  }

  useEffect(() => {
    if (!user) {
      getProfile();
    }
  }, [user]);

  return (
    <>
      {isLoading ? (
        <div className="my-6 h-[80px] flex items-center justify-between md:px-10 px-4 gap-4">
          <Skeleton className="bg-indigo-300 w-[130px] h-[50px]" />
          <div className="md:flex hidden">
            <div className="flex items-center gap-10 text-secColor font-medium text-sm">
              {menuLinks.map((link) => (
                <Skeleton
                  key={link.name}
                  className="bg-indigo-300 w-[70px] h-[20px]"
                />
              ))}
              <Skeleton className="bg-indigo-300 w-[70px] h-[20px]" />
              <Skeleton className="bg-indigo-300 w-[140px] h-[40px] rounded-full" />
            </div>
          </div>
        </div>
      ) : (
        <header className="my-6 h-[80px] flex items-center justify-between md:px-10 px-4 gap-4">
          <Link href="/">
            <Image src="/next.svg" width={130} height={100} alt="Logo" />
          </Link>
          {isLoading && (
            <div className="flex justify-center items-center">
              <MoonLoader color="#654CFF" size={19} />
            </div>
          )}

          {!isLoading && !user && (
            <nav className="md:flex hidden">
              <ul className="flex items-center gap-10 text-secColor font-medium text-sm">
                {menuLinks.map((link) => (
                  <li key={link.name} className="underline">
                    <Link href={link.href}>{link.name}</Link>
                  </li>
                ))}
                <li className="underline">
                  <Link href="/auth/sign-in">Sign In</Link>
                </li>
                <CustomButton to={"/auth/sign-up"} label={"Get Started"} />
              </ul>
            </nav>
          )}

          {!isLoading && user && (
            <nav className="md:flex hidden">
              <ul className="flex items-center gap-10 text-secColor font-medium text-sm">
                {menuLinks.map((link) => (
                  <li key={link.name} className="underline">
                    <Link href={link.href}>{link.name}</Link>
                  </li>
                ))}
                <li className="underline text-red-500" onClick={handleLogout}>
                  <p className="cursor-pointer" onClick={handleLogout}>
                    Sign out
                  </p>
                </li>
                <CustomButton to={"/dashboard"} label={"Dashboard"} />
              </ul>
            </nav>
          )}

          <MobileNav user={user} logout={handleLogout} />
        </header>
      )}
    </>
  );
};

export default Header;
