# @Software Engineering Sprint 2

**Re:** 
**Akhill Dhileep**,
**Charchit Devkota** 


## Code Details
- In the github repository, the Javascript functions can be found at 
../js/

- The HTML code can be found at
./routes/ and index.html

- the css files can be found at
./css/

## Link to website
http://clabsql.clamv.jacobs-university.de/~cdevkota/

## Deploy on your machine
If you would like to use the website locally on your machine you can simply download the code and press index.html to get started, it's a static website, so it doesn't need a server. 

## Getting Started
To use the website first you must navigate to the upload page, afterwards you need to upload the world map, bug brains for two swarms and enter the number of iterations the simulation should run. Activating the log functionality is optional. Once all the information is entered you can press the upload button and proceed to the game page. On the game page you can start the simulation, change the options such as the names of the bug swarms, number of iterations and number of ticks (by default 10), you can also exit the game which will navigate you to the starting page.

# About Bug World

## Bug World
The website has been designed to replicate the software-defined behavior of bugs competing for food and survival and whichever swarm brings the most food to their colony is victorious. To initiate the simulation, it is necessary to upload the world map, which serves as the environment and the "brain" of the bug for two swarms. These bug brain files contain a specialized assembler-like language program that defines the insects' behavior. Further details are elaborated below.


# Updates made to the software

**The Upload Page:**

- The first problem was that even though user uploaded the proper mapfile there was an error message mentioning the border was not proper evnthough the input was correct. The previous developers had provided the correct format for the mapfile and even though we used that it still showed errors. 

**This was provided in the documentation as an example of a map that works:**
```
10
10
# # # # # # # # # #
# 9 9 . . . . 3 3 #
# 9 # . - - - - - #
# . # - - - - - - #
# . . 5 - - - - - #
# + + + + + 5 . . #
# + + + + + + # . #
# + + + + + . # 9 #
# 3 3 . . . . 9 9 #
# # # # # # # # # #
```

- The second probelm was with bug assembelr files. even though user uses the proper format for the files it still showed errors and fixed the bug. The previous developers had provided the correct format for the bug assembler code and even though we used that it still showed errors.

**This was provided in the documentation as an example of a bug brain that works:** 

```
sense ahead 1 3 food; [ 0]
move 2 0; [ 1]
pickup 8 0; [ 2]
flip 3 4 5; [ 3]
turn left 0; [ 4]
flip 2 6 7; [ 5]
turn right 0; [ 6]
move 0 3; [ 7]
sense ahead 9 11 home; [ 8]
move 10 8; [ 9]
drop 0; [ 10]
flip 3 12 13; [ 11]
turn left 8; [ 12]
flip 2 14 15; [ 13]
turn right 8; [ 14]
move 8 11; [ 15]
```

**The Main Page**

- The mainPage of the previous group could not be accessed as the user couldnt go past the main page and even when the url of the website was changed from the uplopage route to the mainPage route we still colundt view the main page as it keeps rerouting the user to the index page because unless you upload all the files and all the files are valid only then the user can be takedn to the mainPage without being redirected to the index.html page since the file upload was not working the user cant go to the mainPage.

**Options Page**

- There was no proper option page with functionalities so we made a options page for the game.

**Restart Page**

- A restart page was addded as there was no reestart page

**Test Cases**

- There was no test cases fro teh various classes that are required for the game. we developed the test cases for all the classes that are mentioned in the specification document.

**Test cases implementation:**

Implemented following classes with attributes and functions 
**World**
Attributes:
height
width

**worldContent**
Functions:
cellAt()

**WorldCell**
Attributes:
obstructed
food
base
bug
markers
Functions:
isObstructed()
isOccupied()
setBug(bug)
getBug()
removeBug()
getFood()
setFood(food)
isFriendlyBase(color)
isEnemyBase(color)
setMarker(color, pos)
clearMarker(pos)
isFriendlyMarker(color)
isEnemyMarker(color) functions)

**Bug**
Attributes:
id
color
bugBrain
hasFood
resting
direction
Functions:
toString()

All of these classes are in a World.js file named Bug, WorldCell and World. And their test files in World.test.js.

**Testing performed :**
We have used the Jest framework for Javascript  for testing the cases and we have successfully passed all the cases .
The steps we did were installing the jest  with
npm install --save-dev jest
and running the test case with  command
npx  jest World.test
in the directory of the folder naya.
Here we can see the final image of the successful test passing.

![WhatsApp Image 2023-04-13 at 10 23 42 PM](https://user-images.githubusercontent.com/86961698/231885880-21d83a15-8f00-4ad7-a065-2abdb115ed5c.jpeg)

