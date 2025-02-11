# Hikma UI - A Modern Headless React Component Library based on TailwindCSS and React Hook Form

![NPM Version](https://img.shields.io/npm/v/hikma-ui)
![License](https://img.shields.io/npm/l/hikma-ui)



## Description
**Hikma UI** is a collection of unstyled, headless React components that provide functionality without enforcing any specific styling. While built with TailwindCSS support, the components are style-agnostic and can be fully customized to match any design system.

## Features
- Headless components with complete styling flexibility
- Zero default styles - bring your own CSS
- Built with TailwindCSS support (optional)
- Supports React with TypeScript
- Includes unstyled form components with React Hook Form integration
- Flexible button system with customizable variants and states
## Prerequisites
- Node.js (v14.0 or later)
- React (v17.0 or later)
- TailwindCSS (v4.0 or later)
- Zod (v3.0 or later)
<!-- - React Hook Form (v7.0 or later)
- Zod resolver (v3.0 or later) -->

## Dependencies

Before installing Hikma UI, ensure you have the following peer dependencies installed:

```bash
npm install zod  
```

## Installation

Install the package via NPM:
```bash
npm install hikma-ui --save
```

## Usage

To use Hikma UI, import the components you need from the library. For example:

```tsx live
import { useRef } from 'react';
import { UiForm, UiButton, UIFormRef } from 'hikma-ui';
import { z } from "zod"

const exampleSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    examples: z.array(z.object({
        name: z.string().min(2),
        phone: z.string().min(10),
    }))
})

type ExampleSchemaType = z.infer<typeof exampleSchema>

const exampleDefaultValues: ExampleSchemaType = {
    name: '',
    email: '',
    examples: [{ name: '', phone: ''} ],
}

const ExampleForm = () => {

    const formRef = useRef<UIFormRef<ExampleSchemaType>>(null)
    const onSubmitHandler = (value: ExampleSchemaType) => {
        console.log(value)
    } 

    return (
        <UIForm 
            schema={exampleSchema} 
            defaultValues={exampleDefaultValues} 
            onSubmit={onSubmitHandler}
            ref={formRef}
        >
            <UiGrid>
                <UiGrid.Item className='xl:col-span-12'>
                    <UIForm.Input<ExampleSchemaType> name="name" placeholder="Enter your name" />
                </UiGrid.Item>
                <UiGrid.Item className='xl:col-span-12'>
                    <UIForm.Select<ExampleSchemaType> name="email" placeholder="Enter your email" options={[{label: 'Option 1', value: '1'}]} />
                </UiGrid.Item>
                <UiGrid.Item className='xl:col-span-12'>
                    <div className="flex justify-end">
                        <UiButton label="Reset Form" onClick={()=>formRef.current?.reset()} variant="danger" />
                        <UiButton label="Submit" type="submit" />
                    </div>
                </UiGrid.Item>
            </UiGrid>
        </UIForm>
    )
}

export default ExampleForm
```









