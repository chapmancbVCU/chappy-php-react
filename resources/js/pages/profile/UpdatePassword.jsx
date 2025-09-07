import React from "react";
import Forms from "@chappy/components/Forms";
import {PasswordComplexityRequirements} from '@chappy/components/PasswordComplexityRequirements'
function UpdatePassword({user, errors}) {

    return (
        <div className="row align-items-center justify-content-center">
            <div className="col-md-6 bg-light p-3">
                <h1 className="text-center">Change Password for {user.username}</h1>
                <hr />
                <PasswordComplexityRequirements />
                <form className="form" action="" method="post">
                    <Forms.CSRF />
                    <Forms.DisplayErrors errors={errors}/>
                </form>
            </div>
        </div>
    );
}        
export default UpdatePassword;