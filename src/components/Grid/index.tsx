import React from "react";
import { cn } from "../../utils";

type GridProps = {
  className?: string;
  children?: React.ReactNode;
};

const UiGrid = (props:GridProps) => {
    const {className, children} = props
    return (
        <div className={cn("grid gap-4 grid-cols-12", className)}>
            {children}
        </div>
    )
   
}

type GridItemProps = {
    className?:string;
    children?:React.ReactNode;
}

const GridItem = (props:GridItemProps) => {
    const {className, children} = props
    return (
        <div className={cn("col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-2", className)}>
            {children}
        </div>
    )
}
UiGrid.displayName = "UiGrid"
UiGrid.Item = GridItem
export default UiGrid