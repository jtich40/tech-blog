# Tech Blog
  ![License](https://img.shields.io/badge/license-MIT-red.svg)

## Description
A CMS-style blog site where developers can publish their blog posts and comment on other developers’ posts as well. The site follows the MVC paradigm in its architectural structure, using Handlebars.js as the templating language, Sequelize as the ORM, and the express-session npm package for authentication.

## Table of Contents
* [Installation](#installation)
* [Usage](#usage)
* [License](#license)
* [Questions](#questions)

## Installation

Start in the root directory and run `npm i` in the terminal to install required dependencies. Next, run `mysql -u root -p` to login to MySQL shell. Create the schema by running `source ./db/schema.sql` and then run `quit` to exit MySQL shell. Seed the database by running `npm run seed` in the terminal. Lastly, run `npm start` in the terminal to start the server.

## Usage
The site's homepage is designed to feature existing blog posts with nav links for the homepage, dashboard, and login.
![image](https://user-images.githubusercontent.com/116316302/229935416-2e4bef9b-464c-453e-a810-30ccbdeaf938.png)

If you click Login or Dashboard in a logged-out state, you will be prompted to either login or signup as a new user.
![image](https://user-images.githubusercontent.com/116316302/229935552-1bb24cbb-44fe-4116-be28-30db9ecccecf.png)

Once logged in, you are redirected to the Dashboard where you can add a post and see your previously created posts.
![image](https://user-images.githubusercontent.com/116316302/229935754-37156408-ccd4-40ac-936f-acd586b824dd.png)

To add a post, simply fill out the blog title and blog content fields and it will be added to the homepage's list of posts. You can also edit any existing post on your dashboard by clicking the Edit Blog button. You will be presented with the options to update or delete the post. If you update or delete the post, the content will either be updated on the homepage or deleted from the homepage.
![image](https://user-images.githubusercontent.com/116316302/229937009-ec912d37-6b56-4cd7-a158-7ed04230495f.png)

You can also add a comment to an existing post by clicking View Blog on the homepage. Please note that you must be logged in to leave a comment on a post.
![image](https://user-images.githubusercontent.com/116316302/229937277-63fa94f3-07b6-4635-9140-b4c6f210b16d.png)

## License
  This application is licensed by the MIT license.

## Questions

For any questions, please contact me at jared.tichacek@gmail.com. Feel free to check out more of my projects at [jtich40](https://github.com/jtich40)!
