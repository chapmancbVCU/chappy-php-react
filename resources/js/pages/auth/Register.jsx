import React from "react";
import Forms from "@/components/Forms";

/**
 * Generates the register view component
 * @property {object} user The user model object.
 * @property {object} 
 * @param {InputProps} param0 
 * @returns {HTMLDivElement} The register view component.
 */
function Register({user, errors}) {
    return (
        <div className="row align-items-center justify-content-center">
            <div className="col-md-6 bg-light p-3">
                <h3 class="text-center">Register Here!</h3>
                <hr />
                <form action="" className="form" method="post" enctype="multipart/form-data">
                    <Forms.CSRF />
                    <Forms.DisplayErrors errors={errors}/>
                    <Forms.Input 
                        type={"text"}
                        label={"User name"}
                        name={"username"}
                        value={user.username}
                        inputAttrs={{className: 'form-control input-sm'}}
                        divAttrs={{className: 'form-group mb-3'}}
                    />
                    <Forms.Input 
                        type={"text"} 
                        label={"First Name"} 
                        name={"fname"}
                        value={user.fname}
                        inputAttrs={{className: 'form-control input-sm'}}
                        divAttrs={{className: 'form-group mb-3'}}
                    />
                    <Forms.Input 
                        type={"text"} 
                        label={"Last Name"} 
                        name={"lname"}
                        value={user.lname}
                        inputAttrs={{className: 'form-control input-sm'}}
                        divAttrs={{className: 'form-group mb-3'}}
                    />
                    <Forms.Input 
                        type={"email"} 
                        label={"Email"} 
                        name={"email"}
                        value={user.email}
                        inputAttrs={{className: 'form-control input-sm'}}
                        divAttrs={{className: 'form-group mb-3'}}
                    />
                    <Forms.RichText
                        label="Description"
                        name="description"
                        value={user.description || ""}
                        inputAttrs={{ placeholder: 'Describe yourself here...' }}
                        divAttrs={{ className: 'form-group mb-3' }}
                    />
                    <Forms.Input 
                        type={"file"}
                        label={"Upload Profile Image (Optional"}
                        name={"profileImage"}
                        value={""}
                        inputAttrs={{className: 'form-control', accept: 'image/gif image/jpeg image/png'}}
                        divAttrs={{className: 'form-group mb-3'}}
                    />
                    <Forms.Input 
                        type={"password"}
                        label={"Password"}
                        name={"password"}
                        value={user.password}
                        inputAttrs={{className: 'form-control input-sm'}}
                        divAttrs={{className: 'form-group mb-3'}}
                    />
                    <Forms.Input 
                        type={"password"}
                        label={"Confirm Password"}
                        name={"confirm"}
                        value={user.confirm}
                        inputAttrs={{className: 'form-control input-sm'}}
                        divAttrs={{className: 'form-group mb-3'}}
                    />
                    <Forms.SubmitBlock
                        label={"Register"}
                        inputAttrs={{className: 'btn btn-large btn-primary'}}
                        divAttrs={{className: 'text-end'}}
                    />
                </form>
            </div>
        </div>
    );
}

export default Register;