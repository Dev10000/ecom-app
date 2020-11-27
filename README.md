## E-Commerce Website
test

### Ground rules for the group working

#### Disagreements

##### If you can't solve an argument in either 5 minutes or 10 messages, take the arguement to Perttu (together, through a daily meeting or discord call). Perttu will consult software development team, if he runs in to a problem that he can not comment on.

#### Responsibility

##### When assigning an issue, it's the assignees responsibility to finish the task the way they see fit.

##### When working on an issue, a new branch should be created to it.

##### If a team member runs in to problems with their issue, it's their responsiblity to seek help and guidance from Perttu or other team members.

##### Only the assignee can close an issue or choose to divide the issue to multiple issues.

##### You can merge branches only when the definition of done is met.

#### Respect

##### Technologies and frameworks are added and decided for the project only when the whole team is in an understanding or Perttu makes the decision.

#### DOD (Definition of Done)
1. Meets the Issue requirements and specification.
2. Passes a code review, conducted by all team members before Sprint meeting. (A team member leaves a comment on GitLab, if there's a problem. Otherwise it's expected to have passed.)
3.  Passes manual testing.

### Technologies that we use 

#### React
- typescript
- autoprefixer
- axios
- jsonwebtoken
- postcss
- tailwindcss
- web-vitals

#### Express
- passport-jwt
- pg
- bcrypt
- cors 
- nodemon 
- jsonwebtoken
- passport
- pluralize
- uuid

Docker

PostgreSQL

pgAdmin

dbdiagram.io

Amazon Web Services (AWS)


### Features List

- "Should have strong SEO stuff"
- Authentication
    - `User` can create an account
    - `User` can log in
    - `User` has acess to My Profile, where:
        - can see a list of previous orders
        - can edit it's own information
    - Visitors need to be authenticated to be able to: Place Orders
    - Guests can: View Products, Search, Add to Cart
- Store
    - Has `Product` catalog 
    - Products have `Product Categories`
    - Products have `Product Options`
    - Search Functionality

- `Order`
    - `Coupon Code` could be applied
- Shopping Cart
    - Store it in LocalStorage before placing the order
- Backend (Admin Panel)
    - See a list of all Products (consider importing data)
    - See a list of all Users (need some seeders)
    - See a list of all Orders
    - Add New Products
    - Delete Products
    - Edit Products




### Models and Database structure

[https://dbdiagram.io/d/5f9a8a363a78976d7b79a60b](https://dbdiagram.io/d/5f9a8a363a78976d7b79a60b)
