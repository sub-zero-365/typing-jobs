import React from "react";
import { Link, useAsyncError, useNavigate, useRouteError } from "react-router-dom";
import { AnimatedText } from "../Animated/animated";
// import { Button } from "react-day-picker";
import { isAxiosError } from "axios";
import { AlertCircle } from "lucide-react"

import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "../ui/alert"
import { Button } from "../ui/button";
import { Scrollable } from "../Scrollable";

export const ErrorElement = () => {
    // const navigatePath = UserRole()
    const error = useRouteError() || useAsyncError();
console.log("this is the error message ",error)
    // const isAsyncError = useAsyncError()
    // const navigate = useNavigate()
    let errMsg = "";
    if (isAxiosError(error)) {
        errMsg = error.response?.data?.msg || error.response?.data?.message || error.response?.data
    }
    else if (typeof error === 'string') {
        errMsg = errMsg
    }
    else {
        // errMsg = error
    }
    console.log(error, "error element log here")
    const navigate = useNavigate()
    return (
        <div className="py-8 flex flex-col items-center">
            <img
                src="https://cdni.iconscout.com/illustration/premium/thumb/sorry-item-not-found-3328225-2809510.png"
                className="mx-auto w-full max-w-sm "
            />
            <Alert variant="destructive" className="w-[calc(100%-1rem)] max-w-md mx-auto">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription className="text-sm font-medium">
                    {errMsg}
                </AlertDescription>
            </Alert>

            <Scrollable className=" max-w-md w-[calc(100%-1rem)] justify-center mx-auto py-5" direction="column">
                <Button variant="destructive"
                    onClick={() => navigate(-1, { replace: true })}
                    className=""
                >
                    Go Back
                </Button>

                <Link to="/"

                    className=" block w-fit"
                    replace>
                    <Button
                        className="bg-colorPrimary"

                    >
                        Dashboard
                    </Button>
                </Link>

            </Scrollable>
        </div>
    )
}
