import React from "react";
import { useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import { Link } from "react-router-dom";
import Loader from "../layout/loader";
const Profile = () => {
  const { loading, user } = useSelector((state) => state.user);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={"Your Profile"} />
          <h2>My Profile</h2>
          <div className="row justify-content-around mt-5 user-info">
            <div className="col-12 col-md-3">
              <figure className="avatar avatar-profile">
                <img
                  className="rounded-circle img-fluid border border-secondary"
                  src={user.avatar.url || "/images/default_avatar.jpg"}
                  alt={`${user.name} profile picture`}
                />
              </figure>
              <Link
                to="/me/update"
                id="edit_profile"
                className="btn btn-primary btn-block my-5"
              >
                Edit Profile
              </Link>
            </div>

            <div className="col-12 col-md-5">
              <h4>Full Name</h4>
              <p>{user.name}</p>

              <h4>Email Address</h4>
              <p>{user.email}</p>
              <h4>Join on </h4>
              <p>{String(user.createdAt).substring(0, 10)}</p>
              {user.role !== "admin" && (
                <Link to="/orders" className="btn btn-danger btn-block mt-5 ">
                  My Orders
                </Link>
              )}

              <Link
                to="/password/update"
                className="btn btn-primary btn-block mt-5 "
                style={{ marginLeft: "2rem" }}
              >
                Change Password
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Profile;
