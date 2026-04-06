#import <Cocoa/Cocoa.h>
#include <stdio.h>
#include "_cgo_export.h"

@interface SGTrayDelegate : NSObject
- (void)menuAction:(NSMenuItem *)sender;
- (void)setupWithIconData:(NSData *)iconData;
- (void)removeTray;
@end

@implementation SGTrayDelegate {
    NSStatusItem *_item;
}

- (void)menuAction:(NSMenuItem *)sender {
    goTrayCallback((int)sender.tag);
}

- (void)setupWithIconData:(NSData *)iconData {
    _item = [[[NSStatusBar systemStatusBar]
        statusItemWithLength:NSSquareStatusItemLength] retain];

    if (iconData && iconData.length > 0) {
        NSImage *img = [[NSImage alloc] initWithData:iconData];
        [img setSize:NSMakeSize(18, 18)];
        [img setTemplate:YES];
        _item.button.image = img;
    } else {
        _item.button.title = @"SG";
    }

    NSMenu *m = [[NSMenu alloc] init];
    [self addTo:m title:@"Capture Fullscreen" tag:1 key:@""];
    [self addTo:m title:@"Capture Region" tag:2 key:@""];
    [m addItem:[NSMenuItem separatorItem]];
    [self addTo:m title:@"Record Screen" tag:3 key:@""];
    [m addItem:[NSMenuItem separatorItem]];
    [self addTo:m title:@"Settings" tag:4 key:@","];
    [self addTo:m title:@"Quit ShotGo" tag:5 key:@"q"];
    _item.menu = m;
    fprintf(stderr, "[shotgo] tray: status item created\n");
}

- (void)addTo:(NSMenu *)m title:(NSString *)t tag:(int)tag key:(NSString *)k {
    NSMenuItem *i = [[NSMenuItem alloc] initWithTitle:t
        action:@selector(menuAction:) keyEquivalent:k];
    i.tag = tag;
    i.target = self;
    [m addItem:i];
}

- (void)removeTray {
    if (_item) {
        [[NSStatusBar systemStatusBar] removeStatusItem:_item];
        [_item release];
        _item = nil;
    }
}
@end

static SGTrayDelegate *_sgDel = nil;

void SGSetupTrayWithIcon(const void *iconBytes, int iconLen) {
    NSData *data = nil;
    if (iconBytes && iconLen > 0) {
        data = [NSData dataWithBytes:iconBytes length:iconLen];
    }
    dispatch_async(dispatch_get_main_queue(), ^{
        _sgDel = [[SGTrayDelegate alloc] init];
        [_sgDel setupWithIconData:data];
    });
}

void SGRemoveTray(void) {
    if (_sgDel) {
        [_sgDel removeTray];
    }
}
