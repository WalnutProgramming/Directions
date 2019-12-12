/**
 * A direction can be `LEFT` or `RIGHT`, or if you're
 * at the end of a hallway, it can be `FRONT` or `BACK`.
 *
 * You can refer to these directions as `Direction.LEFT` or
 * `Direction.RIGHT`, for example, but it may be easier to do
 * this if you're using them a lot:
 * ```ts
 * const { LEFT, RIGHT, BACK, FRONT } = Direction;
 * console.log(LEFT);
 * console.log(RIGHT);
 * ```
 */

enum Direction {
  LEFT = -1,
  RIGHT = 1,
  BACK = -2,
  FRONT = 2,
}

export default Direction;
