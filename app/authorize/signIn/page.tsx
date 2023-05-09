"use client";

import {signIn} from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import InputHookControl from "@/lib/components/_shared/controls/InputHookControl";
import Link from "next/link";
import { toast } from 'react-toastify';

const schema = z.object({
    Email: z.string().email(),
    Password: z.string().nonempty("Password is required"),
});

type SignInSchema = z.infer<typeof schema>;


const SignIn = () => {

    const router = useRouter();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams?.get("callbackUrl") || "/tasks";
  
    const methods = useForm<SignInSchema>({
        resolver: zodResolver(schema),
        defaultValues: {
            Email: "",
            Password: ""
        }
    });

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = methods;

    const onSubmit = async (data: SignInSchema, event: any) => {

        event.preventDefault();
        try
        {
            const res = await signIn("credentials", {
                redirect: false,
                Email: data.Email,
                Password: data.Password,
                callbackUrl,
              });

              if (!res?.error) {
                router.push(callbackUrl);
              } else {
                
                toast("invalid email or password", {
                    type: "error"
                });
              }
        }
        catch{

        }

    }

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} >
                <div className={`grid h-screen place-items-center `}>
                    <div className="grid bg-white border border-solid shadow-lg place-items-start w-96 rounded-lg  p-10 gap-4  mb-6">
                        <div className="font-semibold  text-2xl text-four justify-self-start w-full ">
                            Welcome Back
                        </div>

                        <div className="w-full">
                            <InputHookControl label="Email" type="text" name="Email" />
                        </div>
                        <div className="w-full">
                            <InputHookControl label="Password" type="password" name="Password" />
                        </div>
                        <div className="w-full">
                            <input type="submit" value="Login" className="btn bg-one hover:bg-two text-black w-full" />
                        </div>

                        <div className="flex justify-self-end text-three my-3 hover:text-four">
                            <Link href={"/authorize/signUp"}>Create new account?</Link>
                        </div>
                    </div>
                </div>
            </form>
        </FormProvider>
    )
}

export default SignIn;