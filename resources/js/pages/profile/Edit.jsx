import React from "react";

import Forms from "@/components/Forms";
import route from "@/utils/route";
import ProfileImageSorter from '@/components/ProfileImageSorter';
function Edit({user, displayMessages, profileImages}) {
    return (
        <div className="row align-items-center justify-content-center mb-5">
            <div className="col-md-6 bg-light p-3">
                <h1 className="text-center">Edit Details for {user.username}</h1>
                <hr />
                <form className="form" action="" method="post" encType="multipart/form-data">
                    <Forms.CSRF />
                    <Forms.DisplayErrors errors={displayMessages}/>
                    <Forms.Input 
                        type={"text"} 
                        label={"First Name"} 
                        name={"fname"}
                        value={user.fname}
                        inputAttrs={{className: 'form-control input-sm'}}
                        divAttrs={{className: 'form-group mb-3'}}
                        // errors={displayMessages}
                    />
                    <Forms.Input 
                        type={"text"} 
                        label={"Last Name"} 
                        name={"lname"}
                        value={user.lname}
                        inputAttrs={{className: 'form-control input-sm'}}
                        divAttrs={{className: 'form-group mb-3'}}
                        // errors={displayMessages}
                    />
                    <Forms.Input 
                        type={"email"} 
                        label={"Email"} 
                        name={"email"}
                        value={user.email}
                        inputAttrs={{className: 'form-control input-sm'}}
                        divAttrs={{className: 'form-group mb-3'}}
                        // errors={displayMessages}
                    />
                    <Forms.RichText
                        label="Description"
                        name="description"
                        value={user.description}
                        inputAttrs={{ placeholder: 'Describe yourself here...' }}
                        divAttrs={{ className: 'form-group mb-3' }}
                        // errors={displayMessages}
                    />

                    <Forms.Input 
                        type={"file"}
                        label={"Upload Profile Image (Optional"}
                        name={"profileImage"}
                        value={""}
                        inputAttrs={{className: 'form-control', accept: 'image/gif image/jpeg image/png'}}
                        divAttrs={{className: 'form-group mb-3'}}
                    />

                    <ProfileImageSorter initialImages={profileImages} deleteEndpoint="/profile/deleteImage" />
                    <div className="col-md-12 text-end">
                        <a href={route('profile')} className="btn btn-default">Cancel</a>
                        <Forms.SubmitTag label={"Submit"} inputAttrs={{className: 'btn btn-primary'}}/>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Edit;