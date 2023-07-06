import '../app/globals.css'

import { Navbar } from './navbar/Navbar'
import { Footer } from "@/components/footer/Footer";

import ReactNode from "react";

export function Layout({ children }: { children: ReactNode }) {
  return (
      <div>
          <Navbar/>
          <div className={'mb-[400px] mt-[20px] min-h-screen'}>
              {children}
          </div>
          <Footer/>
      </div>
  )
}
