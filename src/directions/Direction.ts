// A direction can be LEFT or RIGHT, or if you're
// at the end of a hallway, it can be FRONT or BACK

enum Direction {
  LEFT = -1,
  RIGHT = 1,
  BACK = -2,
  FRONT = 2,
}

export default Direction;
