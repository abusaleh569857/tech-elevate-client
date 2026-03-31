import { Link } from "react-router-dom";
import Panel from "@/shared/ui/Panel.jsx";

const footerLinks = [
  { label: "Home", to: "/" },
  { label: "Products", to: "/products" },
  { label: "Register", to: "/register" },
  { label: "Login", to: "/login" },
];

const socialLinks = [
  {
    label: "Facebook",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="currentColor">
        <path d="M13.5 21v-7h2.3l.4-2.8h-2.7V9.4c0-.8.2-1.4 1.4-1.4H16V5.5c-.6-.1-1.3-.2-2-.2-2 0-3.5 1.2-3.5 3.5v2.4H8V14h2.5v7h3Z" />
      </svg>
    ),
  },
  {
    label: "Twitter",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="currentColor">
        <path d="M18.9 4H21l-4.6 5.2L21.8 20h-4.3l-3.4-4.5L10.1 20H8l4.9-5.6L7.8 4h4.3l3.1 4.2L18.9 4Zm-1.5 14.4h1.2L11.4 5.5h-1.3l7.3 12.9Z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.3" cy="6.7" r="0.8" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
];

const Footer = () => {
  return (
    <footer className="px-4 pb-8 pt-12 md:px-6 lg:px-8">
      <Panel className="mx-auto max-w-7xl overflow-hidden bg-[linear-gradient(135deg,#082f49_0%,#0f172a_45%,#155e75_100%)] text-white">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-200">
              TechElevate
            </p>
            <h2 className="mt-4 text-3xl font-black">Build, launch, and grow smarter.</h2>
            <p className="mt-4 max-w-md text-sm leading-7 text-white/70">
              TechElevate helps makers showcase products, collect feedback, and manage growth operations from one polished platform.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white">Quick Links</h3>
            <div className="mt-4 grid gap-3 text-sm text-white/80">
              {footerLinks.map((item) => (
                <Link key={item.to} to={item.to} className="transition hover:text-white">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white">Contact</h3>
            <div className="mt-4 space-y-3 text-sm text-white/80">
              <p>support@techelevate.app</p>
              <p>+880 1534 587 570</p>
              <p>Dhaka, Bangladesh</p>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-white/10 pt-6 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-white/60">
            Copyright {new Date().getFullYear()} TechElevate. All rights reserved.
          </p>
          <div className="flex items-center gap-3 text-white/70">
            {socialLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                aria-label={item.label}
                className="rounded-full border border-white/10 p-3 transition hover:bg-white/10 hover:text-white"
              >
                {item.icon}
              </a>
            ))}
          </div>
        </div>
      </Panel>
    </footer>
  );
};

export default Footer;
