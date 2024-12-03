"use client"

import { useState } from "react";
import SuccessMsg from "./SuccessMsg";
import UserForm from "./UserForm";

export default function Home() {
    const [isSubmitted, setIsSubmitted] = useState(false);

    if(isSubmitted){
        return(
            <SuccessMsg setIsSubmitted={setIsSubmitted}></SuccessMsg>
        )
    }

    return (
        <div className="flex items-center justify-center p-12">
            <div className="mx-auto w-full max-w-[550px]">
                <UserForm setIsSubmitted={setIsSubmitted}></UserForm>
            </div>
        </div>
    );
}
