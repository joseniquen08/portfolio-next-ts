import { About } from "@/components/HomePage/About";
import { Header } from "@/components/HomePage/Header";
import { Projects } from "@/components/HomePage/Projects";
import { Skills } from "@/components/HomePage/Skills";

export default function Home() {
  return (
    <>
      <Header />
      <Projects />
      <About />
      <Skills />
    </>
  );
}
