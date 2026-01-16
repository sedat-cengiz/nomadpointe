"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import {
  Globe,
  GitCompare,
  User,
  LogOut,
  Heart,
  Map,
  Settings,
  ChevronDown,
  Calculator,
  Clock,
  Menu,
  X,
} from "lucide-react";

interface HeaderProps {
  compareCount?: number;
}

export default function Header({ compareCount = 0 }: HeaderProps) {
  const { data: session, status } = useSession();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Prevent hydration mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
              <Globe className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">
              Nomad<span className="text-primary">Point</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className="text-gray-600 hover:text-primary transition-colors font-medium"
            >
              Cities
            </Link>
            <Link
              href="/compare"
              className="text-gray-600 hover:text-primary transition-colors font-medium"
            >
              Compare
            </Link>
            <Link
              href="/trips"
              className="text-gray-600 hover:text-primary transition-colors font-medium"
            >
              Trip Planner
            </Link>
            <div className="relative group">
              <button className="flex items-center gap-1 text-gray-600 hover:text-primary transition-colors font-medium">
                Tools
                <ChevronDown className="w-4 h-4" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <Link
                  href="/tools/currency"
                  className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:text-primary hover:bg-gray-50 transition-colors first:rounded-t-xl"
                >
                  <Calculator className="w-4 h-4" />
                  Currency Converter
                </Link>
                <Link
                  href="/tools/timezone"
                  className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:text-primary hover:bg-gray-50 transition-colors last:rounded-b-xl"
                >
                  <Clock className="w-4 h-4" />
                  Timezone Planner
                </Link>
              </div>
            </div>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            {/* Compare Button */}
            <Link
              href="/compare"
              className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
            >
              <GitCompare className="w-4 h-4 text-gray-700" />
              <span className="text-sm font-medium text-gray-700">Compare</span>
              {compareCount > 0 && (
                <span className="w-5 h-5 bg-primary text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {compareCount}
                </span>
              )}
            </Link>

            {/* Auth Section */}
            {!isMounted || status === "loading" ? (
              <div className="w-9 h-9 bg-gray-100 rounded-full animate-pulse" />
            ) : session?.user ? (
              // User Menu
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 p-1 rounded-full hover:bg-gray-100 transition-colors"
                >
                  {session.user.image ? (
                    <Image
                      src={session.user.image}
                      alt={session.user.name || "User"}
                      width={36}
                      height={36}
                      className="rounded-full"
                    />
                  ) : (
                    <div className="w-9 h-9 bg-primary rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                  )}
                  <ChevronDown
                    className={`w-4 h-4 text-gray-500 hidden sm:block transition-transform ${isUserMenuOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {/* Dropdown Menu */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-100 py-2 animate-fade-in">
                    {/* User Info */}
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="font-semibold text-gray-900 truncate">
                        {session.user.name}
                      </p>
                      <p className="text-sm text-gray-500 truncate">
                        {session.user.email}
                      </p>
                    </div>

                    {/* Menu Items */}
                    <div className="py-2">
                      <Link
                        href="/dashboard"
                        className="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:text-primary hover:bg-gray-50 transition-colors"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <User className="w-4 h-4" />
                        Dashboard
                      </Link>
                      <Link
                        href="/dashboard?tab=favorites"
                        className="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:text-primary hover:bg-gray-50 transition-colors"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <Heart className="w-4 h-4" />
                        Favorites
                      </Link>
                      <Link
                        href="/trips"
                        className="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:text-primary hover:bg-gray-50 transition-colors"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <Map className="w-4 h-4" />
                        My Trips
                      </Link>
                      <Link
                        href="/profile"
                        className="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:text-primary hover:bg-gray-50 transition-colors"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <Settings className="w-4 h-4" />
                        Settings
                      </Link>
                    </div>

                    {/* Sign Out */}
                    <div className="border-t border-gray-100 pt-2">
                      <button
                        onClick={() => signOut({ callbackUrl: "/" })}
                        className="flex items-center gap-3 px-4 py-2.5 text-red-600 hover:bg-red-50 transition-colors w-full"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              // Login Button
              <Link
                href="/login"
                className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-blue-700 text-white rounded-full font-medium transition-colors"
              >
                <User className="w-4 h-4" />
                <span className="hidden sm:inline">Sign In</span>
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-gray-900"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-100 py-4 animate-fade-in">
            <nav className="flex flex-col gap-2">
              <Link
                href="/"
                className="px-4 py-3 text-gray-600 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Cities
              </Link>
              <Link
                href="/compare"
                className="px-4 py-3 text-gray-600 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors font-medium flex items-center justify-between"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Compare
                {compareCount > 0 && (
                  <span className="w-5 h-5 bg-primary text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {compareCount}
                  </span>
                )}
              </Link>
              <Link
                href="/trips"
                className="px-4 py-3 text-gray-600 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Trip Planner
              </Link>
              <Link
                href="/tools/currency"
                className="px-4 py-3 text-gray-600 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Currency Converter
              </Link>
              <Link
                href="/tools/timezone"
                className="px-4 py-3 text-gray-600 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Timezone Planner
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
