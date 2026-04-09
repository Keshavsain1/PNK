import React, { useState } from "react";
import { Calendar, MapPin, Tag } from "lucide-react";
import type { Project } from "../data/projects";

interface ProjectCardProps {
  project: Project;
  onClick?: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const isInProgress = !project.completionDate || /in progress/i.test(project.completionDate);

  const getCategoryStyles = (category?: string) => {
    const key = (category || "").toLowerCase();
    if (key.includes("interior")) return "bg-[#F6E7C5] text-[#6B4E16] border-[#E9C982]";
    if (key.includes("construction")) return "bg-[#E3ECF8] text-[#1F3B5B] border-[#BBD1EE]";
    if (key.includes("renovation")) return "bg-[#F5E0D1] text-[#6B3E1E] border-[#E9BFA0]";
    if (key.includes("3d")) return "bg-[#EAE3F7] text-[#3F2B6B] border-[#CDBEF0]";
    if (key.includes("consult")) return "bg-[#E2F0E6] text-[#1F5133] border-[#B7D9C1]";
    return "bg-[#F5F0E8] text-[#493E25] border-[#E6B566]/30";
  };

  const getLocationStyles = () => "bg-[#EEF2F6] text-[#425466] border-[#D7E0EA]";

  const buildSrcSet = (src: string) => {
    if (!src || !src.includes("-1024")) return undefined;
    return [
      src.replace("-1024", "-480") + " 480w",
      src.replace("-1024", "-768") + " 768w",
      src + " 1024w",
    ].join(", ");
  };
  const imgSrc =
    project.image ||
    (Array.isArray(project.images) && project.images.length > 0
      ? project.images[0]
      : "/assets/placeholder.jpg");

  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const img = e.currentTarget;
    // avoid looping fallback
    // @ts-ignore
    img.onerror = null;
    img.src = "/assets/placeholder.jpg";
  };

  return (
    <div
      className={`group h-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md transition-all duration-300 hover:shadow-xl hover:border-[#D2A761] ${
        onClick ? "cursor-pointer" : "cursor-default"
      }`}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={(e) => {
        if (!onClick) return;
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
    >
      {/* Image container */}
      <div className="relative h-56 overflow-hidden bg-gray-100">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 animate-pulse" />
        )}
        <img
          src={imgSrc}
          srcSet={buildSrcSet(imgSrc)}
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          alt={project.title}
          className={`h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03] ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          loading="lazy"
          decoding="async"
          onLoad={() => setImageLoaded(true)}
          onError={handleImgError}
        />
      </div>

      {/* Text content */}
      <div className="p-5">
        {/* Category + Date */}
        <div className="flex items-center justify-between mb-2 text-xs">
          <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 font-semibold uppercase tracking-wider ${getCategoryStyles(project.category)}`}>
            <Tag size={12} />
            {project.category}
          </span>
          <span className={`flex items-center gap-1 rounded-full border px-2.5 py-1 ${isInProgress ? "bg-[#FCE6B0] text-[#6B4E16] border-[#F5C970]" : "bg-white text-gray-600 border-gray-200"}`}>
            <Calendar size={12} />
            {project.completionDate || "In Progress"}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-[#493E25] group-hover:text-[#D2A761] transition-colors duration-200 line-clamp-2">
          {project.title}
        </h3>

        {/* Short Description */}
        {project.description && (
          <p className="text-sm text-gray-600 mt-2 line-clamp-2">
            {project.description}
          </p>
        )}

        {/* Work scope tags */}
        {project.workScope && project.workScope.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {project.workScope.slice(0, 2).map((scope) => (
              <span
                key={scope}
                className="inline-flex items-center rounded-full bg-gray-100 text-gray-700 px-2.5 py-1 text-xs"
              >
                {scope}
              </span>
            ))}
          </div>
        )}

        {/* Footer metrics */}
        <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
          <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 ${getLocationStyles()}`}>
            <MapPin size={12} />
            {project.location || "--"}
          </span>
          <span className="font-semibold text-[#D2A761] opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            View -{'>'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
