import { getServerSession } from "next-auth/next"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { prisma } from "./prisma";

type SessionUser = {
    Id: number,
    UserName: string,
    IsActive: boolean,
    LastLoginDate?: Date | null
}

export async function getSession() {
    return await getServerSession(authOptions)
}



export default async function getCurrentUser(): Promise<SessionUser | null> {
    try {
      const session = await getSession();
  
      if (!session?.user?.email) {
        return null;
      }
  
      const currentUser = await prisma.applicationUser.findUnique({
        where: {
          Email: session.user?.email
        },
        include: {
            ApplicationUserMembership: true
        }
      });
  
      if (!currentUser) {
        return null;
      }

      let sessionUser: SessionUser = {Id: currentUser.Id, UserName: currentUser.UserName, IsActive: currentUser.ApplicationUserMembership!.IsActive, LastLoginDate: currentUser.ApplicationUserMembership?.LastLoginDate }
  
      return sessionUser;
    } catch (error: any) {
      return null;
    }
  }