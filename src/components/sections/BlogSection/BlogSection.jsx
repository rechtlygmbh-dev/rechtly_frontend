import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import './BlogSection.css';

const blogPosts = [
  {
    id: 1,
    title: 'Unfallschaden richtig abwickeln',
    excerpt: 'Erfahren Sie, wie Sie nach einem Unfall die maximale Entschädigung erhalten.',
    category: 'Unfallrecht',
    date: '15. März 2024',
    image: '/assets/images/Unfall.png',
    readTime: '5 min'
  },
  {
    id: 2,
    title: 'Bußgeldbescheid anfechten',
    excerpt: 'Tipps und Strategien zur erfolgreichen Anfechtung eines Bußgeldbescheids.',
    category: 'Bußgeldrecht',
    date: '12. März 2024',
    image: '/assets/images/Bußgeld.webp',
    readTime: '4 min'
  },
  {
    id: 3,
    title: 'KFZ-Gutachten verstehen',
    excerpt: 'Alles Wichtige zum Thema KFZ-Gutachten bei Unfallschäden.',
    category: 'Gutachten',
    date: '10. März 2024',
    image: '/assets/images/KFZGutachten.jpg',
    readTime: '6 min'
  }
];

const BlogSection = () => {
  // return null; // Vorübergehend ausgeblendet
  return (
    <section className="blog">
      <div className="blog__container">
        <div className="blog__header">
          <h2>Aktuelle Rechtsinformationen - <span className="blog__highlight">Verkehrsrecht</span></h2>
        </div>

        <div className="blog__grid">
          {blogPosts.map(post => (
            <article key={post.id} className="blog-card">
              <div className="blog-card__image">
                <img src={post.image} alt={post.title} />
                <span className="blog-card__category">{post.category}</span>
              </div>
              <div className="blog-card__content">
                <h3 className="blog-card__title">{post.title}</h3>
                <p className="blog-card__excerpt">{post.excerpt}</p>
                <Link to={`/blog/${post.id}`} className="blog-card__link">
                  Weiterlesen <FiArrowRight />
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="blog__cta">
          <Link to="/blog" className="blog__button">
            Alle Beiträge ansehen <FiArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogSection; 