# Object-Oriented Javascript

## Table of Contents

* [About this project](#about-this-project)
* [Steps implemented](#steps-implemented)
* [Link to a hosted version of the game](#link-to-a-hosted-version-of-the-game)
* [Game rules](#game-rules)
* [Dependencies](#dependencies)
* [Instructions for running the project locally](#instructions-for-running-the-project-locally)
* [Author](#author)

## About this project

The starter code had a static, non-interactive version of the game: visual assets and a game loop engine.
The <canvas> element has already been created and the two-dimensional drawing context for the canvas element is available.
The task was to build your own version of the classic arcade game Frogger, using ES6 classes and inheritance. Add a number of entities to the game, including the player characters and enemies.

```diff
- This App is not responsive to screen resolutions with width below canvas width = 505 pixels and can be played only using a keyboard (does not support touches or clicks).
```

## Steps implemented

1. Player class
2. Enemy class
3. Functions that provide functionality to each of a class instances
4. Game objects (player and vehicles) are implemented using JavaScript object-oriented programming features.
5. Keyboard events handling
6. Characters location
7. Characters speeds and movements
8. Collision with the Player
9. Player cannot move off screen
10. Player reaches the water
11. Score

## Link to a hosted version of the game

https://viacheslavbulba.github.io/3-object-oriented-javascript-es6-html5-canvas/

## Game rules

* Use the arrow keys to control the character (move the player up, down, left, right)
* Once the player reaches the water (i.e., the top of the game board), the game is won
* Avoid meeting bugs, they are your enemies
* The enemies move at varying speeds on the paved block portion of the game board
* The speed of bugs is assigned randomly each time they are crossing the screen
* The game displays your score - number of times you reached the water without meeting the bugs
* Once a the player collides with an enemy, the game is reset and the player moves back to the starting square
* Player skin will be randomly changed when you reach the water

## Dependencies

The following external resources are used:

* [Coda Font](https://fonts.googleapis.com/css?family=Coda)

You will need the browser that supports HTML5 Canvas (usually the latest version of all modern browsers does support it)

## Instructions for running the project locally

1. Download as ZIP or Clone the repo using command line: git clone https://github.com/ViacheslavBulba/3-object-oriented-javascript-es6-html5-canvas.git
2. Go inside downloaded/cloned repository folder
3. Run index.html

## Author

Implemented by Viacheslav Bulba in 2019 as a part of Front-End Web Developer Nanodegree program on Udacity