import { Project } from "@/types/project";
import Image from "next/image";

const ProjectCard = ({ title, description, imageURL, githubURL }: Project) => {
  return (
    <a href={githubURL} target="_blank" className="group">
      <div className="flex flex-col gap-1 rounded-md">
        <Image
          src={imageURL}
          width={500}
          height={300}
          alt={title}
          className="aspect-video rounded-[3px]"
        />
        <div>
          <div className="text-lg font-semibold transition-colors duration-300 group-hover:text-orange-500">
            {title}
          </div>
          <div className="break-keep">{description}</div>
        </div>
      </div>
    </a>
  );
};

export default ProjectCard;
