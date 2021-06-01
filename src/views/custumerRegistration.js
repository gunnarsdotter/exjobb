import React, {useState, useEffect} from "react";
import UserRegister from "../components/user/register";
import UserInfo from "../components/user/userInfo";

function CustumerRegistration() {
  const [title] = useState("Kundregister");
 

  useEffect(() => {
    // Update the document title using the browser API
        document.title = "Exjobb - " + title;
    }, [title]);
  return (
    <div className="dubbleroot">
        <div className="root left">
          <h1>{title}</h1>
          <UserRegister/>
        </div>
        <UserInfo/>
    </div>
  );
}
export default CustumerRegistration;
