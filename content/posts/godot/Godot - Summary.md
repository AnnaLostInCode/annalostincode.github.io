+++
title = '🤖 Godot - Summary'
date = 2024-10-21
+++

## Scenes and Nodes
Every scene requires a root node. After the root node, as many nodes and scenes as needed, can be added. 

Scenes can be dynamically created and added via script. To create a scene, it needs to be preloaded, instantiate and added to the node tree. An example of this looks like this:

``` gdscript
var laser_scene: PackedScene = preload(res://scenes/laser.tscn)

func _on_player_laser():
	var laser: Node = laser_scene.instantiate()
	add_child(laser)

```

> In a real scenario, there is probably quite a lot of configuration happening between the instantiation and adding the child to the node tree.

I will go into detail about specific nodes in a separate post.

## ready function
The ready function runs every time the node is instantiated. In that sense it is kind of like a constructor.

``` gdscript
func _ready():
	pass
```

## process function
The process function is run every frame and looks like this:

``` gdscript
func _process(_delta):
	print("I run every frame")
```

### Working with delta
To ensure that values, which are modified every time the process function is called, are changing at the same rate on every pc, delta is used. Delta is the time passed since the last time the process function was run. 

> that means a pc running a game at 30 fps runs the delta function 30 times in a second (1/30).

To ensure the game is running the same speed for every pc we multiply by delta. The amount of pixel of movement are at every framerate 10px/s, but for higher framerates the movement per frame is smaller to compensate. 

| desired speed | fps | delta | original movement        | normalized movement                  |
| ------------- | --- | ----- | ------------------------ | ------------------------------------ |
| 10px          | 30  | 1/30  | 10px * 30fps = 300px/s   | 10px \* 30fps \* 1s/30fps = 10px/s   |
| 10px          | 60  | 1/60  | 10px * 60fps = 600px/s   | 10px \* 60fps \* 1s/60fps = 10px/s   |
| 10px          | 120 | 1/120 | 10px * 120fps = 1200px/s | 10px \* 120fps \* 1s/120fps = 10px/s |

## Input
Inputs can be assigned to actions in the project settings. Later actions can be checked with the Input field. One example being:

``` gdscript
func _process(_delta):
	if Input.is_action_pressed("left"):
		print("Pressed buttons corresponding to action left.")
```

## Signals
Signals are methods that run when a certain action happens to a node. For example a body entering an area node or a timer running out or a collision of two nodes.

There are predefined signals one can choose from. Timer Nodes for example come with a timeout signal. Defining custom signals is also an option, it works similar to defining a global variable in a node script and looks like this:

``` gdscript
signal laser_shot(direction: Vector2, speed: int)
```

To emit the signal the emit() method is used:

``` gdscript
func _process(delta):
	laser_shot.emit(Vector2.UP, 200 * delta)
```

> Another major use case for signals are the area nodes. Signals are used to handle players or other nodes colliding with or entering the area. 

## User Input
Handling user input is very straightforward. All inputs are assigned to actions, which is done in the Project Setting at Input Map. For example the left key and the 'A' key are assigned to an action called left.

To handle the actions Input can be accessed, there are a lot of methods to check if an action was just pressed or released or pressed in general. An Implementation can look like this:

``` gdscript
func _process(_delta):
	if Input.is_action_pressed("left"):
		print("I am pressing left")
```

## Tile Maps
TileMaps contain a sample of tiles, which are used to create grid based maps. It needs to contain every single possible tile. For example every straight and every curve in each direction for a wall. 

Tile maps can have several Layers. That means a TileMap for a house can have the ground and the walls and with layers it's possible to place both on the same grid. In the TileSet physics layers can be defined and collision shapes drawn. 

An example of a TileMap might look like this:

![tilemap Example](https://raw.githubusercontent.com/AnnaLostInCode/annalostincode.github.io/0de7bc50782e02efdc89cf224fdb22a574232827/content/resources/Dungeon_Tileset.png)

## Collision Layers and Masks
Collision Layers and Masks help to determine which CollisionObject can collide with which other CollisionObject. The Layers are named numerically, but can be given an alternative name in the project settings under Layer Names -> 2D Physics. 

Setting the layer determines which layer the RigidBody2D is on and setting the mask determines which other object layers can collide with it. For example projectiles should be able to collide with players, enemies and walls. 