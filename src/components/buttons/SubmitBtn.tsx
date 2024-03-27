import React, { ReactNode } from 'react'
import { Button } from '../ui/button.js'
import { Navigation, useNavigation } from 'react-router-dom'
import { cn } from '../../lib/utils.js'
import { ButtonProps } from '../ui/button.js'
interface iSubmitProps extends ButtonProps {
    children: ReactNode,
    className?: string,
    isError?: boolean,
    submittingText?: string,
    isLoading?:boolean
}
const SubmitBtn = ({
    children,
    className,
    isError,
    submittingText,isLoading
}: iSubmitProps) => {
    const navigation = useNavigation()
    const isSubmitting = isLoading ?? navigation.state == "submitting" 
    return (
        <Button
            disabled={isSubmitting}
            className={cn(`
            disabled:bg-red-800
            `, className)}
        >
            {isSubmitting ? submittingText || "loading ..." : children}
        </Button>
    )
}

export default SubmitBtn