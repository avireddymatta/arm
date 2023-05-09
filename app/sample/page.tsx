"use client";

import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { TypeOf } from "zod";
import { IReactSelect } from "@/lib/types_interfaces/helper";
import InputHookControl from "@/lib/components/_shared/controls/InputHookControl";
import DateHookControl from "@/lib/components/_shared/controls/DateHookControl";
import SelectHookControl from "@/lib/components/_shared/controls/SelectHookControl";
import CheckboxHookControl from "@/lib/components/_shared/controls/CheckboxHookControl";
import RadioHookControl from "@/lib/components/_shared/controls/RadioHookControl";


const schema = z.object({
    name: z.string().min(1, { message: 'Required' }),
    age: z.number(),
    dob: z.date(),
    gender: z.string(),
    checkbox1: z.boolean(),
    checkbox2: z.boolean(),
    communicationType: z.string(),
    address: z.string()
  });


  type InputSchema = z.infer<typeof schema>;



  const Sample = () => {
    
    const genderOptions: IReactSelect[] = [
      {label: "Male", value: "Male"},
      {label: "Female", value: "Female"},
      {label: "Others", value: "Others"},
    ];


    const methods = useForm<InputSchema>({
      resolver: zodResolver(schema),
      defaultValues: {
        name: "John Doe",
        age: 29,
        dob: new Date(2023, 5, 24),
        gender: "Male",
        checkbox1: true,
        checkbox2: false,
        communicationType: "SMS",
        address: ""
      }
    });
  
    const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
    } = methods;

    return (
      <FormProvider {...methods}>
      <form onSubmit={handleSubmit((d) => console.log(d))} className="p-4">
        <div className="grid grid-cols-2 gap-4 w-3/4">
          <div>
              <InputHookControl name="name" type="text" label={"Name"} />
          </div>
      
          <div>
          <InputHookControl name="age" type="number" label={"Age"} />

          </div>
          <div>
            <DateHookControl name="dob" label="Date Of Birth" />
          </div>
          <div className="">
            <SelectHookControl label={"Gender"} name={"gender"} options={genderOptions} />
          </div>
          <div>
            <CheckboxHookControl label={"Checkbox 1"} name={"checkbox1"} />
          </div>
          <div>
            <CheckboxHookControl label={"Checkbox 2"} name={"checkbox2"} />
          </div>
          <div>
            <RadioHookControl name={"communicationType"} value={"Email"} label={"Email"} />
            <RadioHookControl name={"communicationType"} value={"WhatsApp"} label={"WhatsApp"} />
            <RadioHookControl name={"communicationType"} value={"SMS"} label={"SMS"} />
          </div>
          <div>
              <InputHookControl name="address" type="textarea" label={"Address"} />
          </div>

        </div>
        <div className="mt-3">
               <input type="submit"  className="btn-primary-custom"/>    
          </div>
        
      </form>
      </FormProvider>
    );
}


export default Sample;