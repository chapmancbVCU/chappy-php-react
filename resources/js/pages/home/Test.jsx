import React from "react";
import Forms, { CheckBoxLeftLabel } from "@/components/Forms";
export default function Test({}) {
    return (
        <>
            <h1>Test</h1>
            <form method='post' action=''>
                <CheckBoxLeftLabel 
                    label={"test1"}
                    name={"test1"}
                    checked={"on"}
                    value={"on"}
                />
            </form>
        </>
    )
}