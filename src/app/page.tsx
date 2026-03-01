import ActionMenu from "@/components/ActionMenu";
import Hero from "@/components/Hero";
import Manifesto from "@/components/Manifesto";
import Navbar from "@/components/Navbar";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Hero />
      <Manifesto />
      <ActionMenu />
    </div>
  );
}
