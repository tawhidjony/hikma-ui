import React,{ useImperativeHandle } from "react";
import {   DefaultValues, FormProvider,  useForm,  } from "react-hook-form"
import { z, ZodType } from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { UiFormContext } from "../../contexts/UiFormContext";
import { UiFormProps } from "./types/UiForm";
import UiInput from "./Input";
import { FieldArray } from "./UiFieldArray";
import UiTextArea from "./TextArea";
import UiSelect from "./Select";

const UiForm = <TSchema extends ZodType>(props: UiFormProps<TSchema>) => {

    const { schema, defaultValues, onSubmit, mode = "onChange", ref, children } = props
    type FormValues = z.infer<TSchema>

    const form = useForm<FormValues>({
        mode,
        resolver: zodResolver(schema),
        defaultValues: defaultValues as DefaultValues<FormValues>
    })

    useImperativeHandle(ref, () => ({
        control: form.control,
        formState: form.formState,
        getValues: form.getValues,
        setValue: form.setValue,
        reset: form.reset,
        form: form
    }), [form])

    return (
        <UiFormContext value={{ control: form.control }}>
            <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    {children}
                </form>
            </FormProvider>
        </UiFormContext>
    )
}

UiForm.displayName = 'UiForm'
UiForm.Input = UiInput
UiForm.Select = UiSelect
UiForm.TextArea = UiTextArea
UiForm.Array = FieldArray
export default UiForm;
