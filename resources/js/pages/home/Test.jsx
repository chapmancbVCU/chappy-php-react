import React from "react";
import Forms, { CheckBoxLeftLabel, CSRF } from "@/components/Forms";
export default function Test({vars, test1Var}) {
    console.log("Vars");
    console.log(vars)
    console.log("Test1Var");
    console.log(test1Var)
    return (
        <>
            <h1>Test</h1>
            <form method='post' action=''>
                <CSRF />
                <CheckBoxLeftLabel 
                    label={"test1"}
                    name={"test1"}
                    value={"on"}
                    checked={test1Var}
                />
                <Forms.SubmitTag label={"submit"} inputAttrs={{className: 'btn btn-primary'}}/>
            </form>
        </>
    )
}