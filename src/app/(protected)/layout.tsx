import { ReactNode } from "react";
import Navbar from "./_components/navbar";

export interface ProtectedLayoutProps {
  children: ReactNode;
}
export default function ProtectedLayout({ children }: ProtectedLayoutProps) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
