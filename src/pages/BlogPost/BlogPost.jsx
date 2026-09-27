import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import BlogPostLayout from '../../components/BlogPostLayout/BlogPostLayout';
import { getBlogPostBySlug } from '../../utils/contentResolver';

// Eagerly import all assets from src/assets/blog to resolve markdown images cleanly
const blogImages = import.meta.glob('../../assets/blog/*.{png,jpg,jpeg,svg,webp}', {
  eager: true,
  import: 'default',
});

// Custom MDX image resolver that handles both Vite-bundled assets and public fallbacks
const mdxComponents = {
  img: ({ src, alt, ...rest }) => {
    const filename = src ? src.split('/').pop() : '';
    const matchedKey = Object.keys(blogImages).find((key) => key.endsWith(`/${filename}`));
    const resolvedSrc = matchedKey
      ? blogImages[matchedKey]
      : (src?.startsWith('/') ? src : `/assets/blog/${filename}`);
    return <img src={resolvedSrc} alt={alt} {...rest} />;
  },
};

export const BlogPost = () => {
  const { slug } = useParams();

  const post = useMemo(() => {
    return getBlogPostBySlug(slug);
  }, [slug]);

  if (!post) {
    return (
      <BlogPostLayout
        frontmatter={{
          title: 'Publicación no encontrada',
          subtitle: 'El artículo solicitado no existe o fue movido.',
          date: '',
          tags: ['#404', '#Blog'],
        }}
      >
        <p>
          Lo sentimos, no pudimos encontrar el artículo con el identificador{' '}
          <code>{slug}</code>.
        </p>
        <p>
          Puedes explorar todas las publicaciones disponibles en nuestro{' '}
          <Link to="/blog/posts">catálogo general del Blog</Link>.
        </p>
      </BlogPostLayout>
    );
  }

  const PostContent = post.Component;

  return (
    <BlogPostLayout frontmatter={post}>
      {PostContent ? <PostContent components={mdxComponents} /> : null}
    </BlogPostLayout>
  );
};

export default BlogPost;
