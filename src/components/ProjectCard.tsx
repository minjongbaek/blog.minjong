import { Project } from "@/types/project";
import Image from "next/image";

const ProjectCard = ({ title, description, imageURL, githubURL }: Project) => {
  return (
    <a href={githubURL} target="_blank" className="group">
      <div className="rounded-md flex flex-col gap-1">
        <Image
          src={imageURL}
          width={500}
          height={300}
          alt={title}
          className="rounded-[3px] aspect-video"
        />
        <div>
          <div className="text-lg font-semibold group-hover:text-orange-500 transition-colors duration-300">
            {title}
          </div>
          <div className="break-keep">{description}</div>
        </div>
      </div>
    </a>
  );
};

export default ProjectCard;
