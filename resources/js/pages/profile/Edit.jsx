import React from "react";
import '@css/profileImage.css';
import Forms from "@/components/Forms";
import { initializeTinyMCE } from "@/TinyMCE";
import { Editor } from "@tinymce/tinymce-react";
function Edit({user, displayMessages, profileImages}) {
    return (
        <div className="row align-items-center justify-content-center mb-5">
            <div className="col-md-6 bg-light p-3">
                <h1 className="text-center">Edit Details for {user.username}</h1>
                <hr />
                <form className="form" action="" method="post" encType="multipart/form-data">
                    <Forms.CSRF />
                    <Forms.Input 
                        type={"text"} 
                        label={"First Name"} 
                        name={"fname"}
                        value={user.fname}
                        inputAttrs={{'className': 'form-control input-sm'}}
                        divAttrs={{'className': 'form-group mb-3'}}
                        errors={displayMessages}
                    />
                    <Forms.Input 
                        type={"text"} 
                        label={"Last Name"} 
                        name={"lname"}
                        value={user.lname}
                        inputAttrs={{'className': 'form-control input-sm'}}
                        divAttrs={{'className': 'form-group mb-3'}}
                        errors={displayMessages}
                    />
                    <Forms.Input 
                        type={"email"} 
                        label={"Email"} 
                        name={"email"}
                        value={user.email}
                        inputAttrs={{'className': 'form-control input-sm'}}
                        divAttrs={{'className': 'form-group mb-3'}}
                        errors={displayMessages}
                    />
                    <Forms.TextArea
                        label={"description"}
                        name={"description"}
                        value={user.description}
                        inputAttrs={{'className': 'form-control input-sm', 'placeholder': 'Describe yourself here...'}}
                        divAttrs={{'className': 'form-group mb-3'}}
                    />
                </form>
            </div>
        </div>
    );
}

export default Edit;