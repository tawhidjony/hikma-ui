import React, { ButtonHTMLAttributes } from "react";
import { cn } from "../../utils";
import { FieldValues, useFormContext } from "react-hook-form";

type ButtonProps = {
    title?:string;
    className?:string;
    children?:React.ReactNode;
    startIcon?:React.ReactNode;
    endIcon?:React.ReactNode;
    variant?: "default" | "secondary" | "danger" | "warning" | "success" | "info" | "light" | "dark";
    size?: "sm" | "md" | "lg";
    disabled?:boolean;
    loading?:boolean;
    loadingIcon?:React.ReactNode;
    loadingText?:string;
    onClick?:() => void;
} & ButtonHTMLAttributes<HTMLButtonElement>

const UiButton = (props:ButtonProps) => {
    const {title,children, className, startIcon, endIcon, variant = "default", size = "md", disabled, loading = false, loadingIcon, loadingText, onClick, ...rest} = props

    const variantClasses = {
        default: "bg-gradient-to-r from-primary-600 to-primary-700 hover:bg-gradient-to-r hover:from-primary-800 hover:to-primary-600 text-white",
        secondary: "bg-gradient-to-r from-gray-600 to-gray-700 hover:bg-gradient-to-r hover:from-gray-800 hover:to-gray-600 text-white",
        danger: "bg-gradient-to-r from-red-700 to-red-500 hover:bg-gradient-to-r hover:from-red-800 hover:to-red-600 text-white",
        warning: "bg-gradient-to-r from-yellow-600 to-yellow-500 hover:bg-gradient-to-r hover:from-yellow-800 hover:to-yellow-600 text-white ",
        success: "bg-gradient-to-r from-green-600 to-green-500 hover:bg-gradient-to-r hover:from-green-800 hover:to-green-600 text-white",
        info: "bg-gradient-to-r from-cyan-600 to-cyan-500 hover:bg-gradient-to-r hover:from-cyan-800 hover:to-cyan-600 text-white",
        light: "bg-gray-100 hover:bg-gray-200 text-gray-800",
        dark: "bg-gray-800 hover:bg-gray-900 text-white"
    }

    const sizeClasses = {
        sm: "px-2 py-1 text-sm",
        md: "px-4 py-2",
        lg: "px-6 py-3 text-lg"
    }

    return (<>
        <button 
            type="button" 
            disabled={disabled || loading}
            className={cn(
                "flex items-center gap-2 font-medium rounded-md transition-colors",
                variantClasses[variant],
                sizeClasses[size],
                disabled && "opacity-50 cursor-not-allowed",
                loading && "opacity-75 cursor-wait",
                className
            )} 
            onClick={onClick}
            {...rest}
        >
            {loading ?(loadingIcon || <svg className="size-5 animate-spin text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg> ): startIcon && startIcon}
            {loading ? loadingText || "Loading..." : (title || children)}
            {endIcon && endIcon}
        </button>
        
    </>)
}

const UiButtonOutline = (props:ButtonProps) => {
    const {title,children, className, startIcon, endIcon, variant = "default", size = "md", disabled, loading, loadingIcon, loadingText, onClick, ...rest} = props

    const variantClasses = {
        default: "border border-primary-500 hover:bg-primary-600 text-primary-800 hover:text-white",
        secondary: "border border-gray-500 hover:bg-gray-600 text-black hover:text-white",
        danger: "border border-red-700 text-black hover:bg-gradient-to-r hover:from-red-800 hover:to-red-600 hover:text-white",
        warning: "border border-yellow-600 text-black hover:bg-gradient-to-r hover:from-yellow-800 hover:to-yellow-600 hover:text-white ",
        success: "border border-green-600 text-black hover:bg-gradient-to-r hover:from-green-800 hover:to-green-600 hover:text-white",
        info: "border border-cyan-600 text-black hover:bg-gradient-to-r hover:from-cyan-800 hover:to-cyan-600 hover:text-white",
        light: "bg-gray-100 hover:bg-gray-200 text-gray-800",
        dark: "bg-gray-800 hover:bg-gray-900 text-white"
    }

    const sizeClasses = {
        sm: "px-2 py-1 text-sm",
        md: "px-4 py-2",
        lg: "px-6 py-3 text-lg"
    }

    return (<>
        <button 
            type="button" 
            disabled={disabled || loading}
            className={cn(
                "flex items-center gap-2 font-medium rounded-md transition-colors",
                variantClasses[variant],
                sizeClasses[size],
                disabled && "opacity-50 cursor-not-allowed",
                loading && "opacity-75 cursor-wait",
                className
            )} 
            onClick={onClick}
            {...rest}
        >
            {loading ?(loadingIcon || <svg className="size-5 animate-spin text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg> ): startIcon && startIcon}
            {loading ? loadingText || "Loading..." : (title || children)}
            {endIcon && endIcon}
        </button>
        
    </>)
}


export type ResetFormProps<T extends FieldValues> = ButtonProps & {
    resetValue?: Partial<T>;
} 

const UiButtonReset = <T extends FieldValues>(props:ResetFormProps<T>) => {
    const { reset } = useFormContext()
    const { resetValue, title, children, className, startIcon, endIcon, variant = "default", size = "md", disabled, loading = false, loadingIcon, loadingText, onClick, ...rest} = props

    const variantClasses = {
        default: "bg-gradient-to-r from-primary-600 to-primary-700 hover:bg-gradient-to-r hover:from-primary-800 hover:to-primary-600 text-white",
        secondary: "bg-gradient-to-r from-gray-600 to-gray-700 hover:bg-gradient-to-r hover:from-gray-800 hover:to-gray-600 text-white",
        danger: "bg-gradient-to-r from-red-700 to-red-500 hover:bg-gradient-to-r hover:from-red-800 hover:to-red-600 text-white",
        warning: "bg-gradient-to-r from-yellow-600 to-yellow-500 hover:bg-gradient-to-r hover:from-yellow-800 hover:to-yellow-600 text-white ",
        success: "bg-gradient-to-r from-green-600 to-green-500 hover:bg-gradient-to-r hover:from-green-800 hover:to-green-600 text-white",
        info: "bg-gradient-to-r from-cyan-600 to-cyan-500 hover:bg-gradient-to-r hover:from-cyan-800 hover:to-cyan-600 text-white",
        light: "bg-gray-100 hover:bg-gray-200 text-gray-800",
        dark: "bg-gray-800 hover:bg-gray-900 text-white"
    }

    const sizeClasses = {
        sm: "px-2 py-1 text-sm",
        md: "px-4 py-2",
        lg: "px-6 py-3 text-lg"
    }

    const handleReset = () => {
        reset(resetValue)
    }

    return (<>
        <button 
            type="button" 
            disabled={disabled || loading}
            className={cn(
                "flex items-center gap-2 font-medium rounded-md transition-colors",
                variantClasses[variant],
                sizeClasses[size],
                disabled && "opacity-50 cursor-not-allowed",
                loading && "opacity-75 cursor-wait",
                className
            )} 
            onClick={onClick || handleReset}
            {...rest}
        >
            {loading ?(loadingIcon || <svg className="size-5 animate-spin text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg> ): startIcon && startIcon}
            {loading ? loadingText || "Loading..." : (title || children)}
            {endIcon && endIcon}
        </button>
        
    </>)
}

UiButton.displayName = "UiButton";
UiButton.Outline = UiButtonOutline;
UiButton.Reset = UiButtonReset;
export default UiButton;
