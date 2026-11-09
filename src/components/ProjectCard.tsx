import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import type { Project } from '@/types';
import styles from './ProjectCard.module.css';

const categoryLabel: Record<Project['category'], string> = {
  web: 'Web',
  movil: 'Móvil',
  academico: 'Académico',
};

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const image = project.images[0];

  return (
    <article className={styles.card}>
      {image ? (
        <Link
          to={`/proyectos/${project.slug}`}
          className={styles.imageLink}
          aria-label={`Ver proyecto ${project.title}`}
        >
          <img
            className={styles.image}
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            loading="lazy"
          />
        </Link>
      ) : null}
      <div className={styles.content}>
        <div className={styles.meta}>
          <span className={styles.badge}>{categoryLabel[project.category]}</span>
          <span className={styles.year}>{project.year}</span>
        </div>
        <h3 className={styles.title}>
          <Link to={`/proyectos/${project.slug}`}>
            <span>{project.title}</span>
            <ArrowUpRight className={styles.arrowIcon} size={16} aria-hidden />
          </Link>
        </h3>
        <p className={styles.summary}>{project.summary}</p>
      </div>
    </article>
  );
}

export default ProjectCard;
