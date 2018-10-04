# ApiTriviaCrack

## Description
ApiTriviaCrack is a web-app where users answer questions from multiple programming topics, competing against other users in duels.

## Modules
Users: Represents a player or admin, who has a unique nickname and a global score, can play games and submit questions.
    Friends: Users can add friends to easily start duels.
    Emails: Users can have multiple emails besides a main one.
Games: Based on duels between friends or random players, each game consists of 10 randomly selected questions per player (not necessarily the same questions).
    GamesQuestions: Each of the questions is assigned to a player and it stores the
    answer and whether or not it is correct.
Questions: Each question can have three options, only one being the correct one.
Questions are related to the user that submitted it, and whether or not it has been approved.
    Categories: Questions are selected based on the category they fall on.

## Installation
You will need:
Git
sudo apt-get install git-core

NVM
curl https://raw.githubusercontent.com/creationix/nvm/v0.30.2/install.sh | bash

Node
nvm install node


Get the sources:
git clone https://github.com/ricmtz/ApiTriviaCrack.git

Install project dependencies:
npm install

Run the app:
node index.js

## Demo URL
https://api-trivia-crack.herokuapp.com/

## Collaborators
Cervantes Jiménez Irving https://github.com/IrvingCJ
Martínez Helguera Ricardo https://github.com/ricmtz
