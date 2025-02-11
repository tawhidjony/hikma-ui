import React, { Fragment, TextareaHTMLAttributes } from "react"
import { Controller, FieldValues, Path } from "react-hook-form"
import { useUiFormContext } from "../../contexts/UiFormContext"
import { cn } from "../../utils"


type UiFormTextAreaProps<T extends FieldValues> = {
    name: Path<T>
} & TextareaHTMLAttributes<HTMLTextAreaElement>

const UiTextArea = <T extends FieldValues>(props: UiFormTextAreaProps<T>) => {
    const control = useUiFormContext<T>()
    const { name, ...rest } = props

    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState }) => {
                return (
                    <Fragment>
                        <textarea
                            className={cn(
                                "border border-gray-300 rounded p-2 bg-gray-50 outline-0 w-full",
                                rest.className,
                                fieldState?.error && "border-red-500"
                            )}
                            {...field}
                            {...rest}
                        />
                        {fieldState?.error && (
                            <p className="text-red-500">{fieldState?.error?.message}</p>
                        )}
                    </Fragment>
                )
            }}
        />
    )
}

export default UiTextArea