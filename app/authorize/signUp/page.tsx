"use client";

import { signIn } from "next-auth/react";
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import InputHookControl from "@/lib/components/_shared/controls/InputHookControl";
import Link from "next/link";
import { toast } from "react-toastify";
import DateHookControl from "@/lib/components/_shared/controls/DateHookControl";

const schema = z.object({
    Name: z.string().nonempty("UserName is required."),
    Email: z.string().nonempty("Email is required.").email(),
    Password: z.string().nonempty("Password is required.").min(4),
    ConfirmPassword: z.string().nonempty("ConfirmPassword is required.").min(4),
    DateOfBirth: z.date()
})
.refine((data) => data.ConfirmPassword === data.Password && data.Password != "", {
message: "Passwords don't match",
path: ["ConfirmPassword"]
})
;


export type SignUpSchema = z.infer<typeof schema>;



const SignUp = () => {

    const methods = useForm<SignUpSchema>({
        resolver: zodResolver(schema),
        defaultValues: {
            Name: "",
            Email: "",
            Password: "",
            ConfirmPassword: "",
            DateOfBirth: undefined
        }
    });

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = methods;

    const onSubmit = async (data: SignUpSchema, event: any) => {
        event.preventDefault();

        const res = await fetch("/api/register", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (!res.ok) {
              
            toast((await res.json()).message, {
                type: "error"
            });
            return;
          }
    
        signIn(undefined, { callbackUrl: "/tasks" });

    }

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} >
                <div className={`grid h-screen place-items-center transition ease-in-out`}>
                    <div className="grid grid-cols-2 bg-white border border-solid shadow-lg place-items-start w-[500px] rounded-lg  p-10 gap-4  mb-6">
                        <div className="font-semibold  text-2xl text-four justify-self-start w-full col-span-2 ">
                            Create your Account
                        </div>
                        <div className="w-full col-span-2">
                            <InputHookControl label="Email" type="text" name="Email" />
                        </div>
                        
                        <div className="w-full">
                            <InputHookControl label="UserName" type="text" name="Name" />
                        </div>
                        <div className="w-full">
                            <DateHookControl name="DateOfBirth" label="Date Of Birth" />
                        </div>
                        <div className="w-full">
                            <InputHookControl label="Password" type="password" name="Password" />
                        </div>
                        <div className="w-full">
                            <InputHookControl label="ConfirmPassword" type="password" name="ConfirmPassword" />
                        </div>
                     
                        <div className="w-full col-span-2">
                            <input type="submit" value="Register" className="btn bg-one hover:bg-two text-black w-full" />
                        </div>

                        <div className="flex justify-self-end text-three my-3 hover:text-four col-span-2">
                            <Link href={"/authorize/signIn"}>Already have an account?</Link>
                        </div>
                    </div>
                </div>
            </form>
        </FormProvider>
    )
}

export default SignUp;