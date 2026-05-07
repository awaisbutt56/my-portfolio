import React, { useEffect, useState } from "react";
import ProjectLoader from "../components/ProjectLoader";
import ProjectHero from "../components/ProjectHero";

const Project = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <ProjectLoader />;
  }

  return (
    <div>
      <ProjectHero />

      {/* Yahan tum apne projects list / cards add kar sakte ho */}
      <div className="p-5 text-white">
        <h2 className="text-2xl font-bold">My Projects</h2>
        <p className="opacity-70">Showcase of my work coming soon...</p>
      </div>
    </div>
  );
};

export default Project;