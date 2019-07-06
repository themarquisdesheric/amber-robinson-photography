# How to use your website

<!-- TODO: keep up to date, dependencies, etc -->

## Running your website locally

  1.  Open the terminal by typing `ctrl` and `~`

  2. Type `gatsby develop` and hit enter

  3. Your site is now running at `http://localhost:8000`! You can now edit the source code. Save your changes and the browser will update in real time!

## Blog

  You will notice there is no link to go to the blog section on your website. That's because no blog posts exist yet. Once you have at least one blog post, the link will appear, as if by magic ✨🧙‍

  I have provided a sample blog post in the required format. To see your blog section come to life, do the following: 
  
  1. Make sure your website is running locally by following the instructions above

  2. Locate the file `sample-blog-post.md` from the bottom of the sidebar on the left or via your computer's `Finder` app. Move it to the `src/blog` directory

  3. Voila! You should now see the `Blog` link appear

  - 🚧 _Don't forget to remove the sample blog post before deploying_

### Adding new blog posts

  1. In the `src/blog` directory, create a new file with the extension `.md`. **Make sure the name is lowercase and separated by hyphens if it is longer than one word.** So if the gallery name is `Beautiful Plants` its filename should be `beautiful-plants.md`

  2. Make sure the format is the same as in `sample-blog-post.md`. If your website is running locally, you should immediately be able to see the new post

  3. **SEO Keywords**: 
  for  blogpost-specific keywords, include them in the keywords array. 
  
  - 🚧 _Try not to include keywords that are already in your `src/general-keywords.js` array, as Google may penalize you for duplicates by not listing you as well as it could_ 

# SEO Keywords

Every single page of your site automatically injects the keywords listed in `src/general-keywords.js`. 

That said, every page can accept additional, more-specific keywords to inject as well. If the page is a blog post, instructions can be found there. Let me know if you want me to add more specific keywords to other pages (like `Portfolio`) and I'll include documentation from then on 




<!-- 

## Deploy

TODO: set this up

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/gatsbyjs/gatsby-starter-default) 

-->

