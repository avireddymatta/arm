"use client";

import { signOut, useSession } from "next-auth/react";


const UserTask = () => {
    
    

    return (
        <>
     
        <h1>Client Session</h1>
        {/* <button className="px-4 py-3 rounded-md shadow-md border-two hover:border-three" onClick={() => signOut()}>LogOut</button> */}
      </>
    )

}


export default UserTask;