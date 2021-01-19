# Catalog Music Webshop

## MERN Capstone Project, developed by Daniel Keefer and Rob Dirken

---

### Overview ---

#### **[ Summary ]**

Our real world client for the application is Issac, Rob's friend. He has just started a record store and would like primarily to have an app that can serve as a digital shopfront and integrate with his Square account to manage customer orders and inventory.

#### **[ Features ]**

- Allow his customers to browse his stock online.
- Allow his customers to filter stock based on attributes.
- Allow his customers to place orders online.
- A cart interface, that allows customers to purchase multiple records at once.
- Keep his catalog and inventory synced with his physical stock.
- An opt in newsletter where Issac can send out information about new stock to his customer base.
- Ability to upload an invoice file and automagically update his inventory in Square.

#### **[ Target Audience ]**

There are two target Audiences, firstly an outward facing digital shopfront to expand his cliental to anyone that can reach his website. And Secondly the internal administration app for the business that will be aimed at Issac and his staff.

#### **[ Tech Stack ]**

- MongoDB
- Express.js
- React.js
- Node.js
- Material UI
- Heroku
- Netlify
- Discogs API
- Square API
- Cloudinary

##### **--- Packages (backend) ---**

- **axios**: utilized to make requests to the various API's the app connects to.
- **cloudinary**: utilized for the hosting of uploaded images for the apps blog functions.
- **connect-mongo**: allows the storing of session cookies on the mongo database
- **cors**: configures the the way the app handles resources between two different servers for the front end and the back end.
- **express**: used to route requests in an un-opinionated way
- **express-session**: lets express utilise sessions to store current user credentials
- **mongoose**: is a wrapper for Mongo DB that lets he app interface with the database.
- **mongoose-bcrypt**: is an extension for mongoose so that app can hash user passwords.
- **passport**: is a library that handles authorization and authentication.
- **passport-local**: allows passport to authenticate through the use of session cookies
- **uuid**: generates standardized unique strings. is used for idempotency of requests to Square API's

##### **--- Packages (frontend) ---**

- **react query**: React Query is a relatively new, lightweight library for React that offers numerous features for querying, caching and updating data. It minimises the need for global state management and using reducers for the purposes of querying and provides easy access to query statuses to control logic based around loading, success and error states.
- **react hook form**: React Hook Form is a simple API designed to handle form building that can be added onto HTML (or JSX) markup. It provides an easy structure for dealing with form responses as well as error and success messages. It also boosts performance by cutting down on re-renders.
- **react reveal**: React Reveal is an animation library used for smooth animations that can be used with scroll and on click events.
- **material-UI**: Material UI is a React UI framework that provides styled React components for fast, responsive web design. Components can be used out of the box or further styled to requirement.
- **axios**: JS library for asynchronous API requests
- **react-router-dom:** React library for routing with features for maximizing performance through lazy code loading and dynamic route matching.

##### **--- Packages (testing/development) ---**

- **bcrypt:** utilized to compared hashed passwords in testing
- **chai:** assertion library used for writing automated tests.
- **chai-exclude:** extension for chai that allows deep equal testing of returned objects "excluding" so keys, like ids, etc... that cannot be determined before the test.
- **chai-http:** extension for chai that allows chai to make http requests to the app. Also mock user to login in and make requests and hold a session
- **dotenv:** creates a mock set of environment variables for use when in development.
- **mocha:** testing frame work that is used to run chai tests
- **nodemon:** automates the restarting of the server file when any changes are made.

---

### Application Architecture Diagram ---

![Application Architecture Diagram](./docs/diagrams/application_arch.png)

---

### Dataflow Diagram ---

![Dataflow Diagram](./docs/diagrams/data_flow.png)

---

### User Stories ---

#### **[ Users ]**

1. As a **User** I want to **add Items to a cart before I check out**, so that **I can order multiple items at once.**

2. As a **User** I want to **be able to browse through records**, so that **I can choose a record to purchase.**

3. As a **User** I want to **have a user experience that is both functional and interactive**, so that **I enjoy my time on the website.**

4. As a **User** I want to **be able to have an account**, so that **I can save my payment details for easier checkouts in the future.**

5. As a **User** I want to **be able to filter record searches based on specific parameters**, so that **I can narrow down my search.**

6. As a **User** I want to **be emailed an invoice after purchasing my items**, so that **I can have a record of the purchase.**

7. As a **User** I want to **click on the track names of a record I'm browsing**, so that **I can view/listen to the track before I purchase.**

#### **[ Business Owner ]**

1. As a **Business Owner** I want to **make it easier for customers to share their purchases to their social media**, so that **I can attract more business by word of mouth.**

2. As a **Business Owner** I want to **be able to upload my suppliers invoice**, so that **I can automatically add new stock to my website.**

3. As a **Business Owner**, I want to **be able to send out a newsletter**, so that **I can let previous customers know about the new stock we have in.**

4. As a **Business Owner** I want to **be able to see all of the orders placed online**, So that **I can fulfil the order and have the stock ready for pickup or shipping.**

5. As a **Business Owner** I want to **have a website designed to reflect the style and ethos of my business**, so that **it aligns with and strengthens my business's branding.**

6. As a **Business Owner** I want to **have a section on the website where I can share more expertise and thoughts**, so that **customers can read my blog and be informed on the news I want to tell them.**

7. As a **Business Owner** I want to **have a section on the website that is a curated list of my stock**, so that **I can make recommendations on a broad scale to my customers.**

8. As a **Business Owner** I want to **be able to leave reviews on my on stock that are visible to my customers**, so that **customers can get a summary of the item based on my expert opinion.**

9. As a **Business Owner** I want to **integrate PayPal as a payment option my customers**, so that **customers have more flexibility with their purchasing.**

10. As a **Business Owner** I want to **recommend customers additional products based on their current cart**, so that **encourage larger purchases from my consumers.**

---

### Wireframes ---

#### Mobile

![Mobile Wireframes 1](./docs/wireframes/mobile-wireframes-1.png)
![Mobile Wireframes 2](./docs/wireframes/mobile-wireframes-2.png)
![Mobile Wireframes 3](./docs/wireframes/mobile-wireframes-3.png)

#### Desktop

![Desktop Wireframes 1](./docs/wireframes/desktop-wireframes-1.png)
![Desktop Wireframes 2](./docs/wireframes/desktop-wireframes-2.png)
![Desktop Wireframes 3](./docs/wireframes/desktop-wireframes-3.png)
![Desktop Wireframes 4](./docs/wireframes/desktop-wireframes-4.png)
![Desktop Wireframes 5](./docs/wireframes/desktop-wireframes-5.png)
![Desktop Wireframes 6](./docs/wireframes/desktop-wireframes-6.png)
![Desktop Wireframes 7](./docs/wireframes/desktop-wireframes-7.png)
![Desktop Wireframes 8](./docs/wireframes/desktop-wireframes-8.png)

#### Tablet

![Tablet Wireframes 1](./docs/wireframes/tablet-wireframes-1.png)
![Tablet Wireframes 2](./docs/wireframes/tablet-wireframes-2.png)
![Tablet Wireframes 3](./docs/wireframes/tablet-wireframes-3.png)
![Tablet Wireframes 4](./docs/wireframes/tablet-wireframes-4.png)

---

### Devlog Screenshots ---

#### [Link to Trello](https://trello.com/b/ggfHDspf/mern-stak-capstone)

We have managed to plan very rapidly, which is why there isn't many screen shots. We imagine it will get more use during Part B.

![Day One](./docs/devlog/day_one.png)
![Day Four](./docs/devlog/day_four.png)
![Day Five](./docs/devlog/day_five.png)
