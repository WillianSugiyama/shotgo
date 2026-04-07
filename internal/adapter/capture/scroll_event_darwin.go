package capture

/*
#cgo CFLAGS: -x objective-c
#cgo LDFLAGS: -framework CoreGraphics -framework ApplicationServices
#include <ApplicationServices/ApplicationServices.h>

static void postScrollWheel(int deltaY) {
    CGEventRef event = CGEventCreateScrollWheelEvent(
        NULL,
        kCGScrollEventUnitLine,
        1,
        deltaY
    );
    if (event != NULL) {
        CGEventPost(kCGHIDEventTap, event);
        CFRelease(event);
    }
}

static void moveMouseTo(int x, int y) {
    CGPoint point = CGPointMake((CGFloat)x, (CGFloat)y);
    CGEventRef move = CGEventCreateMouseEvent(
        NULL,
        kCGEventMouseMoved,
        point,
        kCGMouseButtonLeft
    );
    if (move != NULL) {
        CGEventPost(kCGHIDEventTap, move);
        CFRelease(move);
    }
}
*/
import "C"

// PostScrollWheel posts a synthetic vertical scroll wheel event.
// Negative deltaY scrolls down, positive scrolls up.
func PostScrollWheel(deltaY int) {
	C.postScrollWheel(C.int(deltaY))
}

// MoveMouseTo moves the cursor to the given screen coordinates.
// Used to position the cursor inside the target scroll region before scrolling.
func MoveMouseTo(x, y int) {
	C.moveMouseTo(C.int(x), C.int(y))
}
