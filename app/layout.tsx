import './globals.css'
import "flatpickr/dist/themes/light.css";
import {Roboto} from "next/font/google";
import  NextAuthProvider  from "./providers";
import ToastContainerLayout from "@/lib/components/libraryLayouts/ToastContainerLayout";

export const metadata = {
  title: 'ARM',
  description: 'Helping hand by your need',
}


const roboto = Roboto({
  weight: ["400", "500"],
  subsets: ["latin"]
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <NextAuthProvider>
            {children}
            </NextAuthProvider>
            <ToastContainerLayout />
      </body>
    </html>
  )
}
