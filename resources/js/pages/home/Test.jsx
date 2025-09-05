import React from "react";
import Forms from "@/components/Forms";
export default function Test({vars, test1Var, test2Var, test1Checked, test2Checked}) {
    console.log("Vars");
    console.log(vars)
    console.log("Test1Var");
    console.log(test1Checked)
    console.log("Test2Var");
    console.log(test2Checked)
    return (
        <>
            <h1>Test</h1>
            <form method='post' action=''>
                <Forms.CSRF />
                <Forms.Radio 
                    label={"HTML"}
                    id={"html"}
                    name={"fav_language"}
                    value={"HTML"}
                    checked={test1Checked}
                    inputAttrs={{className: 'form-group mr-1'}}
                />
                <Forms.Radio 
                    label={"CSS"}
                    id={"css"}
                    name={"fav_language"}
                    value={"CSS"}
                    checked={test1Checked}
                    inputAttrs={{className: 'form-group mr-1'}}
                />
                <Forms.SubmitTag label={"submit"} inputAttrs={{className: 'btn btn-primary'}}/>
            </form>
        </>
    )
}