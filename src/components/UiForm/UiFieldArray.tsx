
import { ArrayPath, UseFieldArrayReturn } from "react-hook-form"
import { FieldValues, useFieldArray } from "react-hook-form"
import { ReactNode } from "react"
import { useUiFormContext } from "../../contexts/UiFormContext"


export type FieldArrayProps<TFormValues extends FieldValues> = {
    children: (fieldArray: UseFieldArrayReturn<TFormValues, ArrayPath<TFormValues>>) => ReactNode
    name: ArrayPath<TFormValues>
}

export const FieldArray = <TFormValues extends FieldValues>(props: FieldArrayProps<TFormValues>) => {
    const { name, children } = props
    const control = useUiFormContext<TFormValues>()
    const fieldArray = useFieldArray<TFormValues>({ control, name })
    return children(fieldArray)
}

FieldArray.displayName = 'FieldArray'