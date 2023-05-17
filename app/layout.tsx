import './globals.css'
import "flatpickr/dist/themes/light.css";
import {Roboto} from "next/font/google";
import  NextAuthProvider  from "./providers";
import ToastContainerLayout from "@/app/components/libraryLayouts/ToastContainerLayout";
import QueryProviders from "@/app/utils/provider";

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
          <QueryProviders>
            {children}
            </QueryProviders>
            </NextAuthProvider>
            <ToastContainerLayout />
      </body>
    </html>
  )
}
