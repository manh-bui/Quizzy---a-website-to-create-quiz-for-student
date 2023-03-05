# Project 2: Repeated practice of learned content website

# Note before run the project:

I have been working with the project on MacOS so expect some error when running
this project on other os. When that happen you can try modified the first line
of the Dockerfile (FROM lukechannings/deno:v1.26.2 -> FROM
denoland/deno:alpine-1.26.2) or try to study the code without launching it.

# 1. How to run the project

Currently, I cannot deploy my web using fly.io due to some error with the credit
card requirement so there is no online location to check this project. Reviewer
need to check the project by running it in locally.

Way to run the project: launching the terminal in this project and using the
command `docker compose up`

# 2. How to access the database

The database can be accessed by the command below

`docker exec -it database-p2-c21fc485-2c79-4e3e-82ae-1340aed5ab81 psql -U username database;`

this opens up psql console, where you can use the SQL command.

# 3. How to run the Playwright test

I have writed 4 meaning full test in the `tests` folder inside `e2e-playwright`
folder folder. You can launch the test with the command below

`docker-compose run --entrypoint=npx e2e-playwright playwright test && docker-compose rm -sf`

Please take note that you must leave the database at it **default state** before
running the test to ensure the test work perfectly.

If you have added or modify the database you can run the following commands to
reset the database to it default state.

`docker-compose down` **THEN** `docker-compose up`

# 4. How to run unit test and HTTP test using SuperOak

**`After you run playwright e2e test please reset the databsae to the default state before running these unit tests`**

You can run the following commands to reset the database to it default state

`docker-compose down` **THEN** `docker-compose up`

I have write 7 meaning fully tests in the `tests` folder inside
`drill-and-practice` folder. You can launch the test with the command below

`docker-compose run --rm drill-and-practice deno test --allow-all`

Please take note that in order to ensure the test work correctly you must leave
the database at it **default state** to test i.e **No data has been added**.

If you have added or modify the database you can run the following commands to
reset the database to it default state

`docker-compose down` **THEN** `docker-compose up`

# 5. How to test API function of the application

In order to test the API function you can modify the command below and run it in
the terminal.

For getting random question:

`curl -X GET http://localhost:7777/api/questions/random`

For sending the answer to the application:

`curl -X POST http://localhost:7777/api/questions/answer -H 'Content-Type: application/json' -d '{"questionId":"1","optionId":"1"}'`

you can change the questionId and optionId above. Because the way the terminal
show json data is very hard to read so I have add a command

`console.log(response json data)`

in both sending random question and sending response for the answer for better
view and comnprehension.

# 6. Some additional function that I add on

The application is very similar to the example application II so at here I will
only explain some of my add on function. I have add some additional function
that not define in the requirement of the project for the special case.

First function is when you register but you use the same email that has exist in
the database then there will be the error "the email has been used" and the
email field will be populated.

Second function is when you add more than one correct choice to the question,
the application will only take the first correct choice that you add and show
that first correct option when you choose incorrect choice in the quiz.

Third function is when you posting your answer back to the web in the address
"/api/questions/answer" as json data, if the optionId do not exist in the
database you will receive the json data response as "error: thre is no such
option".

Fourth function is when you try to delete/add topic using `curl` command in the
terminal. If you are not using admin account or there is no "user.admin: true"
in the sessions when doing this the application will only recirect you to
"/topcis" without doing nothing.

# That is all. Hope you have a nice day coding!
