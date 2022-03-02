# Style Box 

The Style Box is a platform that integrates the idea of e-commerce and social network. It has three sections: ‘design for you’, ‘design for others’ and ‘favorite ootd sharing’. The Style Box lets the customer get customized clothing shopping experience, gives stylists opportunities to show their talents and maintains an active fashion community. Our platform provides one-stop service, including outfit fixing, shopping, and delivery. The customer can pick up a stylist on our website to help them select clothing items and design the outfits. The customer will get a style report and buy all the clothing items on our website. Eventually, a style box would be delivered to the customer containing all they need to become a fashion insider.

**Team**

| Name            | JHU Email       | GitHub Username |
| --------------- | --------------- | --------------- |
| Lu Wu           | lwu66@jhu.edu   | wulu0120        |
| Yingying Zhuang | yzhuang6@jh.edu | DuangYYing      |
| Zhuoying Li     | zli181@jhu.edu  | Joselyn19       |
| Xinyi Li        | xli259@jh.edu   | yiyikkk         |
| Yifan Li        | yli379@jhu.edu  | yachialice      |

**Advisors** 

| Name     | JHU Email    | GitHub Username |
| -------- | ------------ | --------------- |
| Qifan Yu | qyu24@jh.edu | qifanyyy        |

## Documentation

* [Project Document](https://docs.google.com/document/d/1lrwvV_BBTX9bgQO4EuTjWO5jQo29IkbaiXwtHO_O8BU/edit#)
* [User Manual](https://cs421sp22-homework.github.io/project-team-07-blackbox/)
* [API Documentation](https://cs421sp22-homework.github.io/project-team-07-blackbox/)

## Installing / Getting started

1. Clone the project to your local computer

   ```shell
   git clone https://github.com/cs421sp22-homework/project-team-07-blackbox.git
   ```
2. Install frontend dependency

   ```shell
   cd project-team-07-blackbox\code\frontend
   npm install
   ```
3. Open backend code project from IntelliJ IDEA and run file 'project-team-07-blackbox/code/backend/src/main/java/com/stylebox/StyleBoxBackendApplication.java', make sure your Java version is 11 and install Maven.

4. Run frontend with the following command. The frontent webpage is run on http://localhost:3000 in default.

   ```shell
   cd project-team-07-blackbox\code\frontend
   npm start
   ```

   

## Developing

1.  Install IntelliJ IDEA

We use IntelliJ IDEA as our development IDE. It can be downloaded here: https://www.jetbrains.com/idea/.

2. Clone repository

```
git clone https://github.com/cs421sp22-homework/project-team-07-blackbox.git
```

3. Install React

We are using React to develop the front end. To install React, you need to install Node.js first. Node.js can be downloaded here: https://nodejs.org/en/download/.

Then, use the following commands to set up the development environment.

```
npm install -g create-react-app
cd project-team-07-blackbox\code\frontend
npm install
```

4. Download Heroku CLI

Our web app is deployed on Heroku, installing Heroku CLI allows developers to manage Heroku apps directly from the terminal. Heroku can be installed with npm with following command. You can also refer to https://devcenter.heroku.com/articles/heroku-cli for more installing options.

```
npm install -g heroku
```

5. Set your JDK version to java 1.8
6. Install Maven from http://maven.apache.org/download.cgi

The dependencies we used:

```
spring-boot-starter-web
spring-boot-starter-tomcat
spring-boot-starter-test
mysql-connector-java
spring-data-jpa
spring-boot-starter-data-jpa
lombok
jasypt-spring-boot-starter
jasypt-spring-boot
```

The database we used is Mysql on Aliyun server.

We use JUnit to do the unit test. The test code can be found in ``project-team-07-blackbox/code/backend/src/test/java/com/stylebox/``.

We use Github Action to deploy the frontend and backend on Heroku automatically. The link can be seen on https://stylebox5.herokuapp.com/.
