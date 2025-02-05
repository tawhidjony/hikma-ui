import { createContext, useContext } from "react"
import { Control, FieldValues } from "react-hook-form"

export type UiFormContextType<TFormValues extends FieldValues = any> = {
    control: Control<TFormValues>
  }
  
export const UiFormContext = createContext<UiFormContextType | null>(null)
  
export  const useUiFormContext =<TFormValues extends FieldValues = any>() => {
    const context = useContext(UiFormContext)
    if (!context) {
      throw new Error('useUiFormContext must be used within a UiForm component')
    }
    return context.control as Control<TFormValues   >
}