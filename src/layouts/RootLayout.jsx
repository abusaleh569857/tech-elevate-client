import { Outlet } from "react-router-dom";
import Footer from "@/shared/components/Footer.jsx";
import NavBar from "@/shared/components/NavBar.jsx";

const RootLayout = () => {
  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default RootLayout;
