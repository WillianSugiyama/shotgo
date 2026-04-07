//go:build darwin

package permissions

/*
#cgo CFLAGS: -x objective-c -fmodules -fblocks
#cgo LDFLAGS: -framework AVFoundation -framework Foundation

#import <AVFoundation/AVFoundation.h>

// Returns: 0=undetermined, 1=restricted, 2=denied, 3=authorized
static int avAuthStatus(int mediaType) {
    AVMediaType type = (mediaType == 0) ? AVMediaTypeAudio : AVMediaTypeVideo;
    AVAuthorizationStatus s = [AVCaptureDevice authorizationStatusForMediaType:type];
    return (int)s;
}

static void avRequestAccess(int mediaType) {
    AVMediaType type = (mediaType == 0) ? AVMediaTypeAudio : AVMediaTypeVideo;
    [AVCaptureDevice requestAccessForMediaType:type completionHandler:^(BOOL granted) {}];
}
*/
import "C"

import "shotgo/internal/domain/port"

const (
	avAudio = 0
	avVideo = 1
)

func mapAVStatus(s C.int) port.PermissionStatus {
	switch s {
	case 3:
		return port.PermissionGranted
	case 0:
		return port.PermissionUndetermined
	default:
		return port.PermissionDenied
	}
}

func (p *DarwinPermissions) CheckMicrophone() port.PermissionStatus {
	return mapAVStatus(C.avAuthStatus(C.int(avAudio)))
}

func (p *DarwinPermissions) CheckCamera() port.PermissionStatus {
	return mapAVStatus(C.avAuthStatus(C.int(avVideo)))
}

func (p *DarwinPermissions) RequestMicrophone() error {
	C.avRequestAccess(C.int(avAudio))
	return nil
}

func (p *DarwinPermissions) RequestCamera() error {
	C.avRequestAccess(C.int(avVideo))
	return nil
}
