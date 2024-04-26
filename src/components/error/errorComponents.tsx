import React from "react";
import { useAsyncError, useRouteError } from "react-router-dom";
import { AnimatedText } from "../Animated/animated";
// import { Button } from "react-day-picker";
import { isAxiosError } from "axios";
// import UiButton from "./UiButton"
// import AnimatedText from "./AnimateText"
// import UserRole from "../utils/userRole"

export const ErrorElement = () => {
    // const navigatePath = UserRole()
    const error = useRouteError() || useAsyncError();

    // const isAsyncError = useAsyncError()
    // const navigate = useNavigate()
    let errMsg = "";
    if (isAxiosError(error)) {
        errMsg = error.response?.data?.msg || error.response?.data
    }
    else if (typeof error === 'string') {
        errMsg = errMsg
    }
    else {
        // errMsg = error
    }
    console.log(error,"error element log here")
    return (
        <div className="py-8 flex flex-col items-center">
            <img
                src="https://cdni.iconscout.com/illustration/premium/thumb/sorry-item-not-found-3328225-2809510.png"
                className="mx-auto w-full max-w-sm "
            />
            <AnimatedText
                className="text-lg sm:text-xl max-w-lg leading-[1.3rem] italic bg-rose-100 py-4 rounded-lg shadow-sm font-medium !my-10 !text-rose-600"
                text={errMsg || "something went wrong ,try again later"}
            />

            {/* <Button
                onClick={() => navigate(-1, { replace: true })}
                className="!w-[min(30rem,calc(100%-2.5rem))] !mb-5 !mx-auto !py-3.5 !text-lg !rounded-xl !bg-green-800"
            >
                Go Back
            </Button>
            <Button
                className="!w-[min(30rem,calc(100%-2.5rem))] !mx-auto !py-3.5 !text-lg !rounded-xl"

            >
                <Link to="/"
                    className="w-full"
                    replace>
                    Go To Dashboard
                </Link>
            </Button> */}
        </div>
    )
}
