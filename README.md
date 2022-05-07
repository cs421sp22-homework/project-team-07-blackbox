# Style Box 

The Style Box is a platform that integrates the idea of e-commerce and social network. It has three sections: ‘design for you’, ‘design for others’ and ‘favorite ootd sharing’. The Style Box lets the customer get customized clothing shopping experience, gives stylists opportunities to show their talents and maintains an active fashion community. The customer can pick up a stylist on our website to help them select clothing items and design the outfits. Website link : http://121.41.106.214/.

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
#### Frontend
2. Install node.js and npm from https://nodejs.org/en/download/
3. Install frontend dependency

   ```shell
   npm install -g create-react-app
   cd project-team-07-blackbox\code\frontend
   npm install
   ```
4. Run frontend with the following command. The frontent webpage is run on http://localhost:3000 in default.

      ```shell
      cd project-team-07-blackbox\code\frontend
      npm start
      ```
#### SpringBoot Backend
5. Install Java 1.8, follow the instruction https://www.java.com/en/download/help/download_options.html
6. Install Maven, follow the instruction https://www.baeldung.com/install-maven-on-windows-linux-mac
7. Run Java Backend with the following command. The backend port is run on http://localhost:8080 in default.
   ```shell
   cd project-team-07-blackbox\code\backend
   mvn spring-boot:run
   ```
#### Flask Backend
8. Install Python 3.8 from https://www.python.org/downloads/
9. Install Anaconda, follow the instruction https://docs.anaconda.com/anaconda/install/
10. Create a virtual environment and activate it:
   ```shell
   conda create -n env-name python=3.8
   source activate env-name
   ```
11. Install required packages
   ```shell
   cd project-team-07-blackbox\code\flask
   pip install -r requirements.txt
   ```
12. Run Flask Backend with the following command. The backend port is run on http://localhost:8081 in default.
   ```shell
   cd project-team-07-blackbox\code\flask
   python app.py
   ```



## Developing

- Clone the project to your local computer
   ```shell
   git clone https://github.com/cs421sp22-homework/project-team-07-blackbox.git
   ```
#### Frontend
- Install node.js and npm from https://nodejs.org/en/download/
- Install frontend dependency
   ```shell
   npm install -g create-react-app
   cd project-team-07-blackbox\code\frontend
   npm install
   ```
- Install Visual Studio Code or WebStorm for development. Open the frontend repository in IDEA.
   
#### SpringBoot Backend
- Install Java 1.8, follow the instruction https://www.java.com/en/download/help/download_options.html
- Install Maven, follow the instruction https://www.baeldung.com/install-maven-on-windows-linux-mac
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
   spring-boot-starter-security
   jjwt
   modelmapper
   aliyun-sdk-oss
   ```
- Install IntelliJ IDEA from https://www.jetbrains.com/idea/. Open the backend repository in IDEA.

#### Flask Backend
- Install Python 3.8 from https://www.python.org/downloads/
- Install Anaconda, follow the instruction https://docs.anaconda.com/anaconda/install/
- Create a virtual environment and activate it:
   ```shell
   conda create -n env-name python=3.8
   source activate env-name
   ```
- Install required packages
   ```shell
   cd project-team-07-blackbox\code\flask
   pip install -r requirements.txt
   ```
The primary required packages are:
   ```
   aliyun-python-sdk-core==2.13.36
   aliyun-python-sdk-kms==2.15.0
   ChatterBot==1.0.4
   chatterbot-corpus==1.2.0
   Flask==2.1.1
   Flask-Cors==3.0.10
   imagecorruptions==1.1.2
   imageio==2.9.0
   importlib-metadata==4.11.3
   ipython==7.28.0
   opencv-python==4.5.5.64
   opencv-python-headless==4.5.5.64
   oss2==2.15.0
   packaging==21.0
   pandas==1.2.4
   pytorch-toolbelt==0.5.0
   scikit-image==0.19.2
   scikit-learn==0.23.2
   scipy==1.5.2
   sklearn==0.0
   SQLAlchemy==1.2.19
   tensorboardX==2.1
   torch==1.11.0
   torchfile==0.1.0
   torchnet==0.0.5.1
   torchvision==0.12.0
   waitress @ file:///tmp/build/80754af9/waitress_1615230899664/work
   ```
- Install Pycharm from https://www.jetbrains.com/pycharm/. Open the flask repository in IDEA.
- Configure the python interpreter: File->Settings->Project:flask->Python Interpreter, set the python interpreter which is located in the conda virtual environment created above.

#### Deploy
- Package frontend: ``npm run build``
- Package SpringBoot backend: use maven -> package
- connect to Aliyun Cloud server remotely: ``ssh root@121.41.106.214``
- Upload the above 2 packages and the flask repository to Aliyun Cloud server. 
- Install Java, Python, Nginx, Anaconda on the Aliyun Cloud server.
- Deploy frontend. Move the frontend package into /nginx/www/build repository. Configure Nginx by opening file /nginx/config/conf.d, and add content:
   ```
   server {
       root   /www/build;
       location / {
           try_files $uri $uri/ /index.html;
       }
   }
   ```
- Deploy Springboot backend.
   ```
   ps aux|grep AccessControlService-0.0.1-SNAPSHOT.jar # View the process number of the jar package that was previously run
   kill 406379 # kill the process
   source /etc/profile
   cd /java-proj  # enter the path where jar package is located
   nohup java -jar StyleBox-backend-iter3-SNAPSHOT.jar &  # run the jar package
   ```
- Deploy flask. Create a new virtual environment and activate it. Install all requirements. Use uwsgi to run the flask app on the server by adding a file start.ini.
   ```
   cd /python-proj  # enter the path where flask package is located
   uwsgi -d --ini start.ini
   ```
