"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ArrowLeft, Menu, X } from "lucide-react";

import LogoutButton from "@/components/pages/LogoutButton";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Check current logged-in user
  useEffect(() => {
    const storedUser = localStorage.getItem("card_scanner_user");
    setIsLoggedIn(!!storedUser);
  }, [pathname]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const isAuthPage = pathname === "/login" || pathname === "/signup";

  const navLinkClass = (path: string) =>
    `px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
      pathname === path
        ? "bg-primary-50 text-primary-600"
        : "text-gray-600 hover:text-primary-600 hover:bg-gray-50"
    }`;

  const mobileNavLinkClass = (path: string) =>
    `block w-full px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 ${
      pathname === path
        ? "bg-primary-50 text-primary-600"
        : "text-gray-700 hover:bg-gray-50 hover:text-primary-600"
    }`;

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="h-16 sm:h-[72px] flex items-center justify-between">
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group min-w-0">
            <div className="w-9 h-9 sm:w-11 sm:h-11 bg-primary-600 text-white rounded-xl flex items-center justify-center shadow-sm transition-transform duration-200 group-hover:scale-105 shrink-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 sm:h-6 sm:w-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="20" height="14" x="2" y="5" rx="2" />
                <line x1="2" x2="22" y1="10" y2="10" />
              </svg>
            </div>
            <span className="font-bold text-gray-900 text-lg sm:text-xl tracking-tight truncate">
              Card Scanner
            </span>
          </Link>

          {/* AUTH PAGES: Back button */}
          {isAuthPage ? (
            <button
              type="button"
              onClick={() => router.back()}
              className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-primary-600 hover:bg-gray-50 transition-all duration-200"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden xs:inline">Back</span>
            </button>
          ) : (
            <>
              {/* DESKTOP NAV */}
              <nav className="hidden md:flex items-center gap-1 lg:gap-2">
                <Link href="/" className={navLinkClass("/")}>
                  Upload
                </Link>
                <Link href="/cards" className={navLinkClass("/cards")}>
                  My Cards
                </Link>

                {isLoggedIn ? (
                  <>
                    <Link href="/profile" className={navLinkClass("/profile")}>
                      Profile
                    </Link>
                    <div className="h-6 w-px bg-gray-200 mx-1 lg:mx-2" />
                    <LogoutButton />
                  </>
                ) : (
                  <Link href="/login" className={navLinkClass("/login")}>
                    Login
                  </Link>
                )}
              </nav>

              {/* MOBILE HAMBURGER */}
              <button
                type="button"
                onClick={() => setMobileOpen((v) => !v)}
                className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-primary-600 transition-colors"
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </>
          )}
        </div>
      </div>

      {/* MOBILE MENU PANEL */}
      {!isAuthPage && (
        <>
          {/* Backdrop */}
          <div
            className={`md:hidden fixed inset-0 top-16 sm:top-[72px] bg-black/40 z-40 transition-opacity duration-200 ${
              mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            }`}
            onClick={() => setMobileOpen(false)}
            aria-hidden={!mobileOpen}
          />

          {/* Slide-down panel */}
          <div
            className={`md:hidden absolute left-0 right-0 top-full bg-white border-b border-gray-200 shadow-lg z-50 transition-all duration-200 origin-top ${
              mobileOpen
                ? "opacity-100 scale-y-100 translate-y-0"
                : "opacity-0 scale-y-95 -translate-y-2 pointer-events-none"
            }`}
          >
            <nav className="max-w-7xl mx-auto px-4 py-3 space-y-1">
              <Link href="/" className={mobileNavLinkClass("/")} onClick={() => setMobileOpen(false)}>
                Upload
              </Link>
              <Link
                href="/cards"
                className={mobileNavLinkClass("/cards")}
                onClick={() => setMobileOpen(false)}
              >
                My Cards
              </Link>

              {isLoggedIn ? (
                <>
                  <Link
                    href="/profile"
                    className={mobileNavLinkClass("/profile")}
                    onClick={() => setMobileOpen(false)}
                  >
                    Profile
                  </Link>
                  <div className="border-t border-gray-100 my-2" />
                  <div className="px-2 py-1">
                    <LogoutButton />
                  </div>
                </>
              ) : (
                <Link
                  href="/login"
                  className={mobileNavLinkClass("/login")}
                  onClick={() => setMobileOpen(false)}
                >
                  Login
                </Link>
              )}
            </nav>
          </div>
        </>
      )}
    </header>
  );
}
