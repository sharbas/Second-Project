import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../../components/Loader.jsx";
import { setCredentials } from "../../slices/HotelSlices/hotelAuthSlice.js";
import { useUpdateHotelUserMutation } from "../../slices/HotelSlices/hotelApiSlice.js";

const HotelUserProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { hotelInfo } = useSelector((state) => state.hotelauth);
  const [updateProfile, { isLoading }] = useUpdateHotelUserMutation();

  useEffect(() => {
    setName(hotelInfo.name);
    setEmail(hotelInfo.email);
  }, [hotelInfo.setName, hotelInfo.setEmail]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await updateProfile({
          _id: hotelInfo._id,
          name,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success("profile updated");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold">Hotel User Profile</h1>
      <form className="mt-4" onSubmit={submitHandler}>
        <div className="mb-4">
          <label className="block text-sm font-medium" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium" htmlFor="email">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium" htmlFor="confirmPassword">
            Confirm password
          </label>
          <input
            type="password"
            id="confirmPassword"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            placeholder="Enter confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        {isLoading && <Loader />}

        <button
          type="submit"
          className="mt-4 bg-primary-500 text-white rounded-md py-2 px-4 hover:bg-primary-600 focus:outline-none"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default HotelUserProfile;
