'use client';

import Link from 'next/link';
import { FadeIn, SlideIn } from '@/app/components/Animations';
import Image from 'next/image';

interface ProjectCard {
  slug: string;
  title: string;
  summary: string;
  tech: string[];
  impact: string[];
  links?: {
    demo?: string;
    github?: string;
  };
}

export function ProjectShowcase({ project }: { project: ProjectCard }) {
  return (
    <FadeIn>
      <Link href={`/projects/${project.slug}`}>
        <div className="group cursor-pointer h-full">
          <div className="card p-6 h-full hover:scale-105 transition-transform duration-300">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-brand-700 transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-slate-600">{project.summary}</p>
              </div>
              <svg className="w-5 h-5 text-brand-700 opacity-0 group-hover:opacity-100 transform group-hover:translate-x-2 transition-all" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" />
              </svg>
            </div>

            <div className="mb-4">
              <div className="flex flex-wrap gap-2">
                {project.tech.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 text-xs font-semibold bg-brand-100 text-brand-700"
                  >
                    {tech}
                  </span>
                ))}
                {project.tech.length > 4 && (
                  <span className="px-2 py-1 text-xs font-semibold bg-slate-100 text-slate-600">
                    +{project.tech.length - 4}
                  </span>
                )}
              </div>
            </div>

            <div className="space-y-2 mb-4">
              {project.impact.slice(0, 2).map((item, idx) => (
                <div key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                  <svg className="w-4 h-4 text-brand-700 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                  </svg>
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {project.links && (
              <div className="flex gap-3 pt-4 border-t border-slate-200">
                {project.links.demo && (
                  <a
                    href={project.links.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-brand-700 hover:text-brand-900 transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Live Demo
                  </a>
                )}
                {project.links.github && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    GitHub
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </Link>
    </FadeIn>
  );
}

export function ProjectsGrid({ projects }: { projects: ProjectCard[] }) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <ProjectShowcase key={project.slug} project={project} />
      ))}
    </div>
  );
}
