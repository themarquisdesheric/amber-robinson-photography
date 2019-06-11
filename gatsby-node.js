const path = require('path');

module.exports.onCreateNode = ({ node, actions: { createNodeField } }) => {
  if (node.internal.type === 'MarkdownRemark') {
    const slug = path.basename(node.fileAbsolutePath, '.md');

    createNodeField({
      node,
      name: 'slug',
      value: slug
    });
  }
};

module.exports.createPages = async ({ graphql, actions: { createPage } }) => {
  const BlogTemplate = path.resolve('./src/templates/blog.js');
  const { data: { allMarkdownRemark: { edges: blogPosts } } } = await graphql(`
    query slugQuery {
      allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/blog/" } }) {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `);

  blogPosts.forEach(({ node: { fields: { slug } } }) => {
    createPage({
      component: BlogTemplate,
      path: `/blog/${slug}`,
      context: {
        slug
      }
    });
  });

  const GalleryTemplate = path.resolve('./src/templates/gallery.js');
  const { data: { allMarkdownRemark: { edges: galleries } } } = await graphql(`
    query slugQuery {
      allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/gallery/" } }) {
        edges {
          node {
            fileAbsolutePath
            fields {
              slug
            }
          }
        }
      }
    }
  `);

  galleries.forEach(({ node }) => {
    const { fields: { slug } } = node;

    createPage({
      component: GalleryTemplate,
      path: `/portfolio/${slug}`,
      context: {
        slug,
        // Pass the current directory of the project as regex in context so that the GraphQL query can filter by it
        absolutePathRegex: `/^${path.dirname(node.fileAbsolutePath)}/`
      }
    });
  });
};
