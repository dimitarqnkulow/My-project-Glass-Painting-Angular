# My project Glass-Painting Angular

This is my first full stack project using Angular for the frontend and express and mongoose for the backend.

It's a website for an artist who is creating diffrent types of paintings on glass and plastic products, which is based on customer desire, idea, description etc.

##How to start the project

1. Clone the repository: https://github.com/dimitarqnkulow/My-project-Glass-Painting-Angular;
2. Navigate to the server folder and use the following commands in the terminal:
   - npm i;
   - npm start;
     This will start the needed data base for the app on localhost:3030/.
3. Navigate to Glass-Painting folder and use the following commands in the terminal:
   - npm i;
   - ng serve;
     This will start the application on localhost:4200/;

Application overview:

Every page has a footer and a dynamic navigation, which depends on logged/authenticated user.

Public pages, which can be used by all users:

1. Home page
   Contains:
   - About us;
   - Story about the artist;
   - Top 3 trending articles;
2. Catalogue page
   Contains:

   - Shows all articles available;

3. Register page
   Contains:

   - 3 input fields with dynamic validations requiring email, repeatpassword and password must be matching.

4. Login page
   Contains:
   - 2 input fiedls with dynamic validations requiring email and password.

Private pages, which can be used by authenticated users:

1. Order page
   From this page, authentciated user can order their own idea for a paint on glass.
   Contains:
   - 3 required input fields and 1 not required.
2. Liked by the user articles page
   Contains:

- List of the articles, which are liked by the current logged in user;

3. Details page
   Page, which can be used by every user, but not authenticated users can't like or unliked the post.

   Contains:

   - Detailed infromation about an article - optional price, crafting time, number of likes, like or unlike button.
