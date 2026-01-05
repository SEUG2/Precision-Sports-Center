import React from "react";
import { Outlet } from "react-router-dom";
import SiteHeader from "./SiteHeader";
import MissionDisclaimer from "./MissionDisclaimer";
import SiteFooter from "./SiteFooter";
import MobileBottomNav from "./MobileBottomNav";
import { Toaster } from "@/components/ui/toaster";

export default function AppLayout() {
  return (
    <div className="app-shell">
      <SiteHeader />
      <main className="app-main">
        <Outlet />
      </main>
      <MissionDisclaimer />
      <SiteFooter />
      <MobileBottomNav />
      <Toaster />
    </div>
  );
}
