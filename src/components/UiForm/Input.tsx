import React, { Fragment, InputHTMLAttributes } from "react"
import { Controller, FieldValues, Path } from "react-hook-form"
import { useUiFormContext } from "../../contexts/UiFormContext"
import { cn } from "../../utils"


type UiFormInputProps<T extends FieldValues> = {
    name: Path<T>
} & InputHTMLAttributes<HTMLInputElement>

const  UiInput = <T extends FieldValues>(props: UiFormInputProps<T>) => {

    const control = useUiFormContext<T>()
    const {name, ...rest} = props

    return (
        <Controller
            control={control}
            name={props.name}
            render={({ field, fieldState }) => {
              return (
                <Fragment>
                  <input 
                    type="text" 
                    className={cn("border border-gray-300 rounded-md p-2 w-full", rest.className)}
                    {...field}
                    {...rest}
                  />
                  {fieldState?.error && <p className="text-red-500">{fieldState?.error?.message}</p>}
                </Fragment>
              )
            }}
        />
    )
}

export default UiInput;