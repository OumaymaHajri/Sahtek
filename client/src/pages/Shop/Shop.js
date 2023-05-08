import { Outlet } from "react-router-dom";

const Shop = () => {
  return (
    <div className="mt-5 container ">
      {/* <AsideBarShop /> */}
      <div
        className="main-content"
        style={{ minHeight: "100vh", paddingTop: "2rem" , marginTop: "70px"}}
      >
        <Outlet />
      </div>
    </div>
  );
};
export default Shop;
