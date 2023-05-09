import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { useRouter } from "next/router";

  
export const metadata = {
  title: 'Authentication',
  description: 'Sign In or Sign Up',
}


  export default async function AuthorizeLayout({
    children,
  }: {
    children: React.ReactNode
  }) {

    const session = await getServerSession(authOptions);
    
    if(session != null){

    }


    return (
        <div className="">
{/* bg-[url('/images/AuthorizeBackground.jpg')] */}
            {children}
   

        </div>
    )
  }
  