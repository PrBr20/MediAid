import React from "react";
import { Input } from "@/components/ui/input";
import AuthContext from "@/context/AuthContext";
import { useContext } from "react";
import { Button } from "@/components/ui/button";

const MediLabSettings = () => {
  const { state } = useContext(AuthContext);

  return (
    <div className="flex-col space-y-10">
      <h1 className="font-bold text-3xl">Settings</h1>
      <hr className="border-black" />

      <div className="space-y-1">
        <label className="font-medium leading-none" htmlFor="">
          Username :
        </label>
        <Input placeholder={state?.user.name}></Input>
        <p className="text-xs text-muted-foreground">
          This is the display name that will be shown to other users.
        </p>
      </div>

      <div className="space-y-1">
        <label className="font-medium leading-none" htmlFor="">
          Email :
        </label>
        <Input placeholder={state?.user.email}></Input>
        <p className="text-xs text-muted-foreground">
          Change you email address.
        </p>
      </div>

      <div className="space-y-1">
        <label className="font-medium leading-none" htmlFor="">
          Change Mobile Number :
        </label>
        <Input placeholder="mobile"></Input>
        <p className="text-xs text-muted-foreground">
          Change you phone number.
        </p>
      </div>

      <div className="space-y-1">
        <label className="font-medium leading-none" htmlFor="">
          Change Password :
        </label>
        <Input placeholder="Enter old password"></Input>
        <p className="text-xs text-muted-foreground">
          old password attached to you account
        </p>
        <Input placeholder="Enter new password"></Input>
        <p className="text-xs text-muted-foreground">
          Enter new password for your account
        </p>
        <Input placeholder="Enter confirm password"></Input>
        <p className="text-xs text-muted-foreground">
          Enter confirm password for your account
        </p>
      </div>

      <div className="space-y-1">
        <label className="font-medium leading-none" htmlFor="">
          Change display picture :
        </label>
        <Input placeholder={state?.user.email} type="file"></Input>
        <p className="text-xs text-muted-foreground">
          Change you email address.
        </p>
      </div>

      <Button>Update Profile</Button>
    </div>
  );
};

export default MediLabSettings;
