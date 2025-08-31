import React from "react";
import SafeHtml from '@/utils/SafeHtml.jsx';
function Index({ user, profileImage }) {
    // console.log(user.description);
    return (
        <>
            <h1 className="text-center">Profile Details for {user.username}</h1>
            <div className="col align-items-center justify-content-center mx-auto my-3 w-50">
                {profileImage && (
                    <img src={profileImage}
                        className="img-thumbnail mx-auto my-5 d-block w-50 rounded border border-primary shadow-lg"
                        loading="lazy"
                    />
                )}

                <table className="table table-striped  table-bordered table-hover bg-light my-5">
                    <tbody>
                        <tr>
                            <th className="text-center">First Name</th>
                            <td className="text-center">{user.fname}</td>
                        </tr>
                        <tr>
                            <th className="text-center">Last Name</th>
                            <td className="text-center">{user.lname}</td>
                        </tr>
                        <tr>
                            <th className="text-center">E-mail</th>
                            <td className="text-center">{user.email}</td>
                        </tr>
                        <tr>
                            <th className="text-center">ACL</th>
                            <td className="text-center">{user.acl}</td>
                        </tr>
                        <tr>
                            <th className="text-center" colSpan={2}>
                                {user.description ? 'Description' : 'No description'}
                            </th>
                            
                        </tr>
                        {user.description && (
                            <tr>
                                <td id="description" className="p-4" colSpan={2}>
                                    <SafeHtml html={user.description} className="prose"/>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default Index;