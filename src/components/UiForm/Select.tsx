import React, { Fragment, SelectHTMLAttributes } from "react"
import { Controller, FieldValues, Path } from "react-hook-form"
import { useUiFormContext } from "../../contexts/UiFormContext"
import { cn } from "../../utils"


type UiFormSelectProps<T extends FieldValues> = {
    name: Path<T>
    options: {
        label: string
        value: string
    }[],
    placeholder?: string
} & SelectHTMLAttributes<HTMLSelectElement>

const  UiSelect = <T extends FieldValues>(props: UiFormSelectProps<T>) => {

    const control = useUiFormContext<T>()
    const {name, options, placeholder, ...rest} = props

    return (
        <Controller
            control={control}
            name={props.name}
            render={({ field, fieldState }) => {
              return (
                <Fragment>
                  <select
                    className={cn(
                        "border border-gray-300 rounded p-2 bg-gray-50 outline-0 w-full", 
                        rest.className,
                        fieldState?.error && "border-red-500"
                      )}
                    {...field}
                    {...rest}
                  >
                    <Fragment>
                      <option value="">{placeholder}</option>
                      {options.map((option) => (
                          <option key={option.value} value={option.value}>{option.label}</option>
                      ))}
                    </Fragment>
                  </select>
                  {fieldState?.error && <p className="text-red-500">{fieldState?.error?.message}</p>}
                </Fragment>
              )
            }}
        />
    )
}

export default UiSelect;