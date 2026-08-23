import type { ReactNode } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ContactModal from "../components/ContactModal/ContactModal";

/**
 * Layout principal — header sticky + footer institutionnel
 */
export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-creme">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <ContactModal />
    </div>
  );
}
