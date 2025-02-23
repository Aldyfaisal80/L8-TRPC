import Link from "next/link";
import { ThemeToggle } from "../actions";
import { Heading } from "../ui/heading";
import { Navbar } from "../fragments/Navbar";

export const Header = () => {
  return (
    <header className="flex w-full items-center justify-between px-5 py-3">
      <Link href={"/"}>
        <Heading size={"h3"}>CRUD </Heading>
      </Link>
      <div className="flex items-center gap-5">
        <Navbar />
        <ThemeToggle />
      </div>
    </header>
  );
};
