"use client";
import { useChangePasswordMutation } from "@/redux/api/authApi";
import { getIdFromToken } from "@/utils/getIdFromToken";
import { logOut } from "@/utils/logOut";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaEye, FaEyeSlash, FaKey } from "react-icons/fa";
import { toast } from "react-toastify";

const ChangePasswordForm = () => {
  const router = useRouter();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const id = getIdFromToken();

  const [changePassword, { isLoading, isError, error }] =
    useChangePasswordMutation();

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!id) {
        return toast.error("User not found");
      }

      await changePassword({
        id: id,
        old_password: oldPassword,
        new_password: newPassword,
      }).unwrap();

      toast.success("Password changed successfully");
      // router.push("/signin");
      logOut();
    } catch (err) {
      console.error("Failed to change password:", err);
      toast.error("Failed to change password");
    }
  };

  return (
    <div className=" bg-white text-gray-800 shadow-md border border-gray-100 w-full rounded-md">
      <div className="p-5">
        <form onSubmit={handleUpdatePassword} className="space-y-6">
          <h3 className="text-center text-2xl font-semibold uppercase text-secondary">
            Update Password
          </h3>
          <div className="relative flex items-center">
            <FaKey className="absolute left-3 text-gray-400" />
            <input
              type={showOldPassword ? "text" : "password"}
              name="old_password"
              className="w-full py-3 pl-10 pr-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
              placeholder="Old Password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="absolute right-3 text-lg text-gray-400"
              onClick={() => setShowOldPassword(!showOldPassword)}
            >
              {showOldPassword ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>

          <div className="relative flex items-center">
            <FaKey className="absolute left-3 text-gray-400" />
            <input
              type={showNewPassword ? "text" : "password"}
              name="new_password"
              className="w-full py-3 pl-10 pr-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="absolute right-3 text-lg text-gray-400"
              onClick={() => setShowNewPassword(!showNewPassword)}
            >
              {showNewPassword ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-secondary text-white rounded-md hover:bg-primary focus:outline-none focus:ring-2 focus:ring-secondary"
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordForm;
