# JavaScriptGame

You will need to create a fun interactive game using JS.

![image](https://user-images.githubusercontent.com/34707669/206923131-88bd771d-e231-4de9-bbc4-fedc88f70cdf.png)


This game is about Jonny the brave, he needs to go from the starting point to the finish line.<br>
The game contains a board and Jonny the brave can move between the board slots.<br>
The board will contain good things like items to make Jonny stronger but also monsters.

Can you arrive at the destination point before getting killed by monsters?  

The game will contain:
-

- A board of 25x25 slots with the player/monsters on the board slots.
- A player can move using the arrow keys, he will move 1 slot for every key pressed.
- The board will contain your player, monsters, and pick up items (+10 hp, +5 attack).
- Each pick up item will upgrade the player status.
- The player will start the game with 100 health points.
- When the player will move into a slot with a monster on it he will enter combat.
For each combat turn, the player will attack the monster, and the monster will attack the player and vice versa.
The battle will end when some one will run out of hp.

- Game over:
  - Game is lost when the player run out of hp
  - Game is won when the player arrives at the detination (it can be generated randomly or static)


------

You must implement:
-

1. 25*25 matrix representing the board.
2. save, show, and update the game status after every move (player hp, if he is in battle, attack points).
3. When the player will enter a battle you will need to print all the attacks between the player and the monster +
    combat lost/won.
4. Slots containing monsters/items will be marked with ? or any other thing you like (the point is that the player will not know if he is about to enter combat or get an item).
---

Bonus
-

Add some UI for the game and not just a console game.


![image](https://user-images.githubusercontent.com/34707669/206924758-7d5fb794-c80d-4f50-9e77-8f0f1418dc0b.png)

