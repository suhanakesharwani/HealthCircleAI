import { Menu, HeartPulse } from "lucide-react";
import Button from "./Button";

const Navbar = () => {
  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <div className="mx-auto max-w-7xl px-6 py-5">
        <div className="rounded-full bg-white/70 backdrop-blur-xl shadow-lg">
          <div className="flex items-center justify-between px-7 py-4">

            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-violet-600 text-white">
                <HeartPulse size={20}/>
              </div>

              <div>
                <h2 className="font-semibold text-lg">
                  HealthCircle
                </h2>

                <p className="text-xs text-gray-500">
                  AI Healthcare
                </p>
              </div>
            </div>

            <nav className="hidden md:flex gap-8 text-sm">
              <a href="#features">Features</a>
              <a href="#family">Family</a>
              <a href="#reports">Reports</a>
              <a href="#faq">FAQ</a>
            </nav>

            <div className="hidden md:block">
              <Button>Get Started</Button>
            </div>

            <button className="md:hidden">
              <Menu />
            </button>

          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;