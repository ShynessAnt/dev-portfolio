import { Link } from 'react-router-dom';
import { ArrowUpRight, Clock } from 'lucide-react';
import type { Post } from '@/types';
import styles from './PostCard.module.css';

interface PostCardProps {
  post: Post;
}

function formatDate(iso: string): string {
  const date = new Date(`${iso}T00:00:00`);
  return new Intl.DateTimeFormat('es', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date);
}

export function PostCard({ post }: PostCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.meta}>
        <span className={styles.badge}>{post.category}</span>
        <time className={styles.date} dateTime={post.date}>
          {formatDate(post.date)}
        </time>
        <span className={styles.readingTime}>
          <Clock size={12} aria-hidden />
          {post.readingTimeMin} min
        </span>
      </div>
      <h3 className={styles.title}>
        <Link to={`/blog/${post.slug}`}>
          <span>{post.title}</span>
          <ArrowUpRight className={styles.arrowIcon} size={16} aria-hidden />
        </Link>
      </h3>
      <p className={styles.excerpt}>{post.excerpt}</p>
    </article>
  );
}

export default PostCard;
