import React from "react";
import '@css/profileImage.css';


function Edit({user, displayMessages, profileImages}) {
    return (
        <div className="row align-items-center justify-content-center mb-5">
            <div className="col-md-6 bg-light p-3">
                <h1 className="text-center">Edit Details for {user.username}</h1>
                <hr />
                <form className="form" action="" method="post" encType="multipart/form-data">
                    <CSRF />
                    {/* {input('text', 'First Name', 'fname', user.fname, {'class': 'form-control input-sm'}, {'class': 'form-group mb-3'})} */}

                </form>
            </div>
        </div>
    );
}

export default Edit;