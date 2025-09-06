import React from "react";
import Forms from "@/components/Forms";
export default function Test({vars, test1Var, test2Var, cellNumber, options}) {
    console.log("Options");
    console.log(options)

    return (
        <>
            <h1>Test</h1>
            {vars &&
                <h2>Button for {vars.fav_language} was selected</h2>
            }
            <form method='post' action=''>
                <Forms.CSRF />
                <Forms.Radio 
                    label={"HTML"}
                    id={"html"}
                    name={"fav_language"}
                    value={"HTML"}
                    checked={test1Var}
                    inputAttrs={{className: 'form-group me-1'}}
                />
                <Forms.Radio 
                    label={"CSS"}
                    id={"css"}
                    name={"fav_language"}
                    value={"CSS"}
                    checked={test2Var}
                    inputAttrs={{className: 'form-group me-1'}}
                />
                <Forms.Tel 
                    label={"Cell Phone"}
                    name={"cell"}
                    value={cellNumber}
                    inputAttrs={{className: 'form-control input-sm'}}
                    divAttrs={{className: 'form-group mb-3'}}
                />
                <div className="d-flex justify-content-center">

                    <Forms.SubmitTag label={"submit"} inputAttrs={{className: 'btn btn-primary'}}/>
                </div>
            </form>
        </>
    )
}