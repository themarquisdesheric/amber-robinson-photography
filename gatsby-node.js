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
  const Blog = path.resolve('./src/templates/blog.js');

  const { data: { allMarkdownRemark: { edges } } } = await graphql(`
    query {
      allMarkdownRemark {
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

  edges.forEach(({ node: { fields: { slug } } }) => {
    createPage({
      component: Blog,
      path: `/blog/${slug}`,
      context: {
        slug
      }
    });
  });
};