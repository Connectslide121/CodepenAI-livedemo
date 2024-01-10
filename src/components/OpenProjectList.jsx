import React, { useEffect, useState } from "react";
import { GetProjects } from "../APIs/API";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

export default function OpenProjectList(props) {
  const [projectList, setProjectList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const projects = await GetProjects();
      setProjectList(projects);
    };

    fetchData();
  }, []);

  const formatDate = (dateString) => {
    const options = { day: "numeric", month: "long", year: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <>
      <div className="project-list-wrapper">
        <div className="project-list-header">
          <div className="project-title">Title</div>
          <div className="project-description">Description</div>
          <div className="project-date">Date created</div>
          <div className="spacer"></div>
        </div>

        <ul>
          {projectList.map((project) => (
            <li
              title="Open project"
              key={project.projectId}
              onClick={() => props.openProject(project.projectId)}
            >
              <div className="project-title">{project.title}</div>
              <div className="project-description">{project.description}</div>
              <div className="project-date">
                {formatDate(project.createdAt)}
              </div>
              <div title="Delete project" className="delete-project-button">
                <FontAwesomeIcon icon={faTrashCan} />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
