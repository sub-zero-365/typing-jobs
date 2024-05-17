import React, { ReactNode } from 'react'
import { Button } from '../ui/button.js'
import {  useNavigation } from 'react-router-dom'
import { cn } from '../../lib/utils.js'
import { ButtonProps } from '../ui/button.js'
interface iSubmitProps extends ButtonProps {
    children: ReactNode,
    isError?: boolean,
    submittingText?: string | ReactNode,
    isLoading?:boolean,
    refE?:any
}
const SubmitBtn = ({
    children,
    className,
    submittingText,isLoading,
    refE,
    ...props
}: iSubmitProps) => {
    const navigation = useNavigation()
    const isSubmitting = isLoading ?? navigation.state == 'submitting' 
    return (
        <Button
        ref={refE}
            disabled={isSubmitting}
            className={cn('disabled:bg-red-800', className)}
            {...props}
        >
            {isSubmitting ? submittingText || 'loading ...' : children}
        </Button>
    )
}

export default SubmitBtn