import { Input, InputProps } from "../ui/input.js";
import React from "react";
import { Label } from "../ui/label.js";
import { cn } from "../../lib/utils.js";
interface IProps extends InputProps {
    labelText?: string,
    htmlFor?: string,
    labelclassName?: any;

}
export const CustomInput = ({
    labelText,
    htmlFor,
    labelclassName,
    ...props }: IProps) => (<div>
        <Label htmlFor={htmlFor}
            className={cn("text-start m-0", labelclassName)}
        >{labelText}</Label>
        <Input
            {...props}
        />
    </div>)