+++
title = 'Godot Summary'
date = 2024-10-21T11:34:25+01:00
draft = false
+++

I am doing a tutorial by Clear Code and this is my summary of Godot.
>[Tutorial](https://youtu.be/nAh_Kx5Zh5Q)

## Scenes and Nodes

- For every scene you need a root node.
- After that you can add as many Scenes and Nodes as you want

## ready function

``` gdscript
func _ready():
	pass
```

The ready function runs every time the node is instantiated. In that sense it is kinda like a constructor.

## process function

``` gdscript
func _process(delta):
	print("I run every frame")
	pass
```

The process function is run every frame. 

### Working with delta

To ensure that values, which are modified every time the process function is called, are changing at the same rate on every pc, delta is used. Delta is the time passed since the last time the process function was run. 

> that means a pc running a game at 30 fps runs the delta function 30 times in a second (1/30).

To ensure the game is running the same speed for every pc we multiply by delta. This px of movement are at every framerate 10px/s, but for higher framerates the movement per frame is smaller to compensate. 

| speed | fps | delta | original movement | normalized movement     |
| ----- | --- | ----- | ----------------- | ----------------------- |
| 10px  | 30  | 1/30  | 10 * 30 = 300     | 10 \* 30 \* 1/30 = 10   |
| 10px  | 60  | 1/60  | 10 * 60 = 600     | 10 \* 60 \* 1/60 = 10   |
| 10px  | 120 | 1/120 | 10 * 120 = 120    | 10 \* 120 \* 1/120 = 10 |

## Input

Inputs can be assigned to actions in the project settings. Later actions can be checked with the Input field. One example being:

``` gdscript
func _process(_delta):
	if Input.is_action_pressed("left"):
		print("Pressed buttons corresponding to action left.")
```


## Signals

Signals are methods that run when a certion action happens to a node. For example a body entering an area node or a timer running out or a collision of two nodes.

There are preset signals for the nodes you choose. Timers for example have a timeout() signal. But you can also create your own signals, similar to defining a global variable in a node script, like this:

``` gdscript
signal laser_shot(direction: Vector2, speed: int)
```

To emit the signal you can use the emit() method:

``` gdscript
laser_shot.emit(Vector2.UP, 200)
```