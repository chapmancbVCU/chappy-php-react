import React from "react";
import route from "@/utils/route";
import Forms, { CheckBoxLeftLabel } from "@/components/Forms";

/**
 * @property {object} errors The errors object.
 * @property {object} login The login model object
 * @param {InputProps} param0 
 * @returns 
 */
function Auth({errors, login, rememberMeChecked}) {

    return(
        <div className="row align-items-center justify-content-center">
            <div className="col-md-6 bg-light p-3">
                <h1 className="text-center">Login</h1>
                <form className="form" action={route('auth.login')} method="post">
                    <Forms.CSRF />
                    <Forms.DisplayErrors errors={errors}/>
                    <Forms.Input 
                        type={"text"}
                        label={"Username"}
                        name={"username"}
                        value={login.username}
                        inputAttrs={{className: 'form-control'}}
                        divAttrs={{className: 'form-group mb-3'}}
                    />
                    <Forms.Input 
                        type={"password"}
                        label={"Password"}
                        name={"password"}
                        value={login.password}
                        inputAttrs={{className: 'form-control'}}
                        divAttrs={{className: 'form-group mb-3'}}
                    />

                    <CheckBoxLeftLabel
                        label={"Remember Me"}
                        name={"remember_me"}
                        checkedV={"on"}
                        value={rememberMeChecked}
                        divAttrs={{className: 'form-group mb-3'}}
                    />
                    <div className="d-flex justify-content-end">
                        <div className="flex-grow-1 text-body">
                            Don't have an account? <a href={route('auth.register')}>Sign Up</a>
                        </div>
                        <Forms.SubmitTag label={"login"} inputAttrs={{className: 'btn btn-primary'}}/>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Auth;