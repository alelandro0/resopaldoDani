import  { useEffect } from "react";
import NavbarProjects from "./AllProjects-comps/NavbarProjects";
import AllProjects from "./homepage-comps/AllProjects";

const AllProjectsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <NavbarProjects />
      <AllProjects />
    </>
  );
};

export default AllProjectsPage;
