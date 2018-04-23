# vtgrowthmarketing
marketing page for growth consulting webpage

# Adding a new blog post
(make sure you are in hexo directory for these instructions)
1. Create a new post
`$ hexo new "My New Post"`

2. edit markdown gitHub Markdown format)
hexo/source/_posts/<title of post>.md

3. Generate static files
`$ hexo generate`

4. Commit changes and push to github

* Add any images to the hexo/source/images folder

# To Delete a Blog Post
1. Delete the post under source/_post folder
2. Run hexo clean to delete the database (db.json) and assets folder
3. Run hexo generateto generate the new blog without your deleted post
4. Run hexo deploy to deploy your blog

# Original Template (to see available pages and docs)
http://themereact.herokuapp.com/3.0/
