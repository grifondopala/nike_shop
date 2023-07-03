import '../app/globals.css'

import { Navbar } from './navbar/Navbar'
import { Footer } from "@/components/footer/Footer";

import ReactNode from "react";

export function Layout({ children }: { children: ReactNode }) {
  return (
      <>
          <Navbar/>
          <div className={'mb-[400px]'}>
              {children}
          </div>
          <Footer/>
      </>
  )
}
