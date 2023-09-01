import '../app/globals.css'

import { Navbar } from './navbar/Navbar'
import { Footer } from "@/components/footer/Footer";

import ReactNode from "react";

export function Layout({ children }: { children: ReactNode }) {
  return (
      <div>
          <Navbar/>
          <div className={'mb-[200px] mt-[60px] min-h-screen max-[450px]:mt-[100px]'}>
              {children}
          </div>
          <Footer/>
      </div>
  )
}
