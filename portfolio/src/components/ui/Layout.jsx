// src/components/ui/Layout.jsx
import React from "react";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuViewport,
} from "./navigation-menu";
import { Link } from "react-router-dom"; // Or any routing library you're using

const Layout = ({ children }) => {
  return (
    <div>
      {/* Navigation Menu */}
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Menu</NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuLink asChild>
                <Link to="/">Home</Link>
              </NavigationMenuLink>
              <NavigationMenuLink asChild>
                <Link to="/about">About</Link>
              </NavigationMenuLink>
              <NavigationMenuLink asChild>
                <Link to="/contact">Contact</Link>
              </NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      {/* Page Content */}
      <main>{children}</main>
    </div>
  );
};

export default Layout;
