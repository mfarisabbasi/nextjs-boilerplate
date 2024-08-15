import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useState } from "react";
import { menuLinks } from "@/lib/constants";
import Link from "next/link";
import CustomButton from "./buttons/CustomButton";

const MobileNav = ({ user, logout }) => {
  const [openSheet, setOpenSheet] = useState(false);
  return (
    <div className="md:hidden flex">
      <Sheet open={openSheet} onOpenChange={setOpenSheet}>
        <SheetTrigger>
          <Menu />
        </SheetTrigger>
        <SheetContent className="w-full bg-white text-secColor">
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
            <SheetDescription>
              <nav className="mt-4">
                <ul className="flex flex-col gap-4 text-secColor font-medium">
                  {menuLinks.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        onClick={() => {
                          setOpenSheet(false);
                        }}
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                  {user ? (
                    <li
                      onClick={() => {
                        logout();
                        setOpenSheet(false);
                      }}
                      className="text-red-500"
                    >
                      Sign out
                    </li>
                  ) : (
                    <li
                      onClick={() => {
                        setOpenSheet(false);
                      }}
                    >
                      <Link href="/auth/signin">Sign In</Link>
                    </li>
                  )}

                  {user ? (
                    <CustomButton
                      label={"Dashboard"}
                      to={"/dashboard"}
                      onClick={() => {
                        setOpenSheet(false);
                      }}
                    />
                  ) : (
                    <CustomButton
                      label={"Get Started"}
                      to={"/auth/signup"}
                      onClick={() => {
                        setOpenSheet(false);
                      }}
                    />
                  )}
                </ul>
              </nav>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNav;
