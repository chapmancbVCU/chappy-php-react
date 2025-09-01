import React from "react";
import '@css/profileImage.css';
import Forms from "@/components/Forms";

function Edit({user, displayMessages, profileImages}) {
    return (
        <div className="row align-items-center justify-content-center mb-5">
            <div className="col-md-6 bg-light p-3">
                <h1 className="text-center">Edit Details for {user.username}</h1>
                <hr />
                <form className="form" action="" method="post" encType="multipart/form-data">
                    <Forms.CSRF />
                    <Forms.Input 
                        text={"text"} 
                        label={"First Name"} 
                        name={"fname"}
                        value={user.fname}
                        inputAttrs={{'className': 'form-control input-sm is-invalid', 'placeholder': 'placeholder'}}
                        divAttrs={{'className': 'form-group mb-3'}}
                        errors={displayMessages}
                    />
                    <Forms.Input 
                        text={"text"} 
                        label={"Last Name"} 
                        name={"lname"}
                        value={user.lname}
                        inputAttrs={{'className': 'form-control input-sm', 'placeholder': 'placeholder'}}
                        divAttrs={{'className': 'form-group mb-3'}}
                        errors={displayMessages}
                    />
                    <Forms.Input 
                        text={"email"} 
                        label={"Email"} 
                        name={"email"}
                        value={user.email}
                        inputAttrs={{'className': 'form-control input-sm', 'placeholder': 'placeholder'}}
                        divAttrs={{'className': 'form-group mb-3'}}
                        errors={displayMessages}
                    />
                </form>
            </div>
        </div>
    );
}

export default Edit;