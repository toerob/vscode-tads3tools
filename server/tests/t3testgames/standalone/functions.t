// Tests for the signature provider, function definition on line 2 and 3:
function functionHead(x,y,z) { }


// NOTE: Don't change the ordering in this file
function test() {
	functionHead() // Cursor at position line 7, position 14
	functionHead(1,) // Cursor at position line 8, position 16
	functionHead(1,2,) // Cursor at position line 9, position 18
}


