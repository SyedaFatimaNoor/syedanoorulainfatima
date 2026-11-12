"use client";

import { trapDialogFocus } from "@/lib/dialog";

import { PageLink as Link } from "@/components/page-link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { navigation, site } from "@/lib/site";
import { Logo } from "./ui";

export function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let scheduled = false;
    const update = () => {
      scheduled = false;
      setScrolled(window.scrollY > 24);
      if (!isHome) return;
      let current = "";
      for (const { id } of navigation) {
        const section = document.getElementById(id);
        if (section && section.getBoundingClientRect().top < 220) current = id;
      }
      setActive(current);
    };
    const scroll = () => {
      if (!scheduled) {
        scheduled = true;
        window.requestAnimationFrame(update);
      }
    };
    scroll();
    window.addEventListener("scroll", scroll, { passive: true });
    return () => window.removeEventListener("scroll", scroll);
  }, [isHome]);

  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [menuOpen]);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 850px)");
    const closeOnDesktop = () => {
      if (media.matches) dialog.current?.close();
    };
    media.addEventListener("change", closeOnDesktop);
    return () => media.removeEventListener("change", closeOnDesktop);
  }, []);

  const hrefFor = (id: string) => (isHome ? `#${id}` : `/#${id}`);
  const openMenu = () => {
    dialog.current?.showModal();
    setMenuOpen(true);
  };
  const closeMenu = () => {
    dialog.current?.close();
  };

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
        <div className="container header-inner">
          <Link
            href="/"
            className="logo-link"
            aria-label={`${site.name}, home`}
          >
            <Logo />
          </Link>
          <nav className="desktop-nav" aria-label="Main navigation">
            {navigation.map(({ id, label }) => (
              <a
                key={id}
                href={hrefFor(id)}
                className={active === id && isHome ? "active" : ""}
                aria-current={active === id && isHome ? "location" : undefined}
              >
                {label}
                <span className="nav-dot" />
              </a>
            ))}
          </nav>
          <a href={hrefFor("contact")} className="header-cta">
            Let’s talk <ArrowUpRight size={17} aria-hidden="true" />
          </a>
          <button
            ref={menuButton}
            type="button"
            className="menu-toggle icon-button"
            aria-label="Open navigation menu"
            aria-haspopup="dialog"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={openMenu}
          >
            <Menu size={23} />
          </button>
        </div>
      </header>
      <dialog
        ref={dialog}
        id="mobile-navigation"
        className="mobile-menu"
        onKeyDown={trapDialogFocus}
        aria-label="Navigation menu"
        onClose={() => {
          setMenuOpen(false);
          menuButton.current?.focus();
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeMenu();
        }}
      >
        <div className="mobile-menu-inner">
          <div className="mobile-menu-top">
            <Logo />
            <button
              type="button"
              className="icon-button"
              onClick={closeMenu}
              aria-label="Close navigation menu"
            >
              <X size={25} />
            </button>
          </div>
          <span className="eyebrow">TAKE A LOOK AROUND</span>
          <nav aria-label="Mobile navigation">
            {navigation.map(({ id, label }, index) => (
              <a href={hrefFor(id)} key={id} onClick={closeMenu}>
                <span className="mono">0{index + 1}</span>
                {label}
                <ArrowUpRight size={25} aria-hidden="true" />
              </a>
            ))}
          </nav>
          <a href={`mailto:${site.email}`} className="mobile-email">
            {site.email}
            <ArrowUpRight size={17} aria-hidden="true" />
          </a>
          <span className="mobile-menu-note">
            Based in Karachi. Open to the world.
          </span>
        </div>
      </dialog>
    </>
  );
}
