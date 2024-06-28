import React from "react";
import Main from "../../../images/Main.jpg";
import { AuthRoute } from "../../routes/Check_Routes";

function AuthenticationContainer({ mobileViewImage, children }) {
  return (
    <AuthRoute>
      <div className="flex flex-col md:flex-row h-screen  bg-white w-full overflow-auto">
        {/* <div className="md:w-1/2 flex items-center justify-center">
          <img src={Main} alt="pic" className="w-full md:max-w-2xl h-auto" />
          <img
            src={mobileViewImage}
            alt="pic"
            className="w-full md:hidden h-auto"
          /> */}
        <div className="h-[50%] md:h-auto md:w-1/2 flex items-center justify-center bg-[#F7F4FF] md:bg-white">
          <img
            src={Main}
            alt="pic"
            className="hidden md:block w-full md:max-w-2xl h-auto"
          />
          <div className="md:hidden h-full flex flex-col items-center justify-center p-[16px]">
            <div className="text-center text-[#5732BF] font-semibold text-[16px] pb-[16px]">
              Inventory Management System
            </div>
            <div>
              <img
                src={mobileViewImage}
                alt="pic"
                className="block w-[187.686px] h-[190.506px]"
              />
            </div>
          </div>
        </div>
        <div className="md:h-auto md:w-1/2 flex items-center justify-center p-4 rounded-md shadow-md">
          {/* <div className="max-w-md bg-white  mt-10"> */}
          {/* <div className="flex items-center justify-center"> */}
          {/* </div> */}

          {children}
        </div>
        {/* </div> */}
      </div>
    </AuthRoute>
  );
}

export default AuthenticationContainer;