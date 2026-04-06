#import <Cocoa/Cocoa.h>
#include <stdio.h>
#include "_cgo_export.h"

@interface SGTrayDelegate : NSObject
- (void)menuAction:(NSMenuItem *)sender;
- (void)setupWithIcon:(const void *)bytes length:(int)len;
- (void)removeTray;
@end

@implementation SGTrayDelegate {
    NSStatusItem *_item;
}

- (void)menuAction:(NSMenuItem *)sender {
    goTrayCallback((int)sender.tag);
}

- (void)setupWithIcon:(const void *)bytes length:(int)len {
    _item = [[[NSStatusBar systemStatusBar]
        statusItemWithLength:NSSquareStatusItemLength] retain];

    if (bytes && len > 0) {
        NSData *data = [NSData dataWithBytes:bytes length:len];
        NSImage *img = [[NSImage alloc] initWithData:data];
        [img setSize:NSMakeSize(18, 18)];
        [img setTemplate:YES];
        _item.button.image = img;
    } else {
        _item.button.title = @"SG";
    }

    NSMenu *m = [[NSMenu alloc] init];
    [self add:m t:@"Capture Fullscreen" tag:1 key:@""];
    [self add:m t:@"Capture Region" tag:2 key:@""];
    [m addItem:[NSMenuItem separatorItem]];
    [self add:m t:@"Record Screen" tag:3 key:@""];
    [m addItem:[NSMenuItem separatorItem]];
    [self add:m t:@"Settings" tag:4 key:@","];
    [self add:m t:@"Quit ShotGo" tag:5 key:@"q"];
    _item.menu = m;
    fprintf(stderr, "[shotgo] tray icon ready\n");
}

- (void)add:(NSMenu *)m t:(NSString *)t tag:(int)tag key:(NSString *)k {
    NSMenuItem *i = [[NSMenuItem alloc]
        initWithTitle:t action:@selector(menuAction:) keyEquivalent:k];
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

void SGSetupTrayWithIcon(const void *bytes, int len) {
    dispatch_async(dispatch_get_main_queue(), ^{
        _sgDel = [[SGTrayDelegate alloc] init];
        [_sgDel setupWithIcon:bytes length:len];
    });
}

void SGRemoveTray(void) {
    if (_sgDel) {
        [_sgDel removeTray];
    }
}
