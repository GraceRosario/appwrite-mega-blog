import { useEffect, useState } from "react";
import "./App.css";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { Outlet } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentuser()
  .then((user) => console.log("Current user:", user))
  .catch((error) => console.log("Auth error:", error));
  
    authService
      .getCurrentuser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return !loading ? (
    <>
      <div className="min-h-screen flex flex-wrap contennt-between bg-gray-400">
        <div className="w-full block">
          <Header />
          <main>
           Todo: 
           <Outlet />
          </main>
          <Footer />
        </div>
      </div>
    </>
  ) : null;

//   return (
//   <div>
//     App is working
//   </div>
// );
}

export default App;
