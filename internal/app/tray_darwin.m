#import <Cocoa/Cocoa.h>
#include <stdio.h>
#include "_cgo_export.h"

@interface SGTrayDelegate : NSObject
- (void)menuAction:(NSMenuItem *)sender;
- (void)removeTray;
@end

@implementation SGTrayDelegate {
    NSStatusItem *_item;
    NSData *_iconData;
}

- (void)menuAction:(NSMenuItem *)sender {
    goTrayCallback((int)sender.tag);
}

- (void)createTray {
    _item = [[[NSStatusBar systemStatusBar]
        statusItemWithLength:NSSquareStatusItemLength] retain];

    if (_iconData && _iconData.length > 0) {
        NSImage *img = [[NSImage alloc] initWithData:_iconData];
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
    fprintf(stderr, "[shotgo] tray: visible\n");
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

- (void)setIconData:(NSData *)data {
    _iconData = [data retain];
}
@end

static SGTrayDelegate *_sgDel = nil;

void SGSetupTrayWithIcon(const void *bytes, int len) {
    _sgDel = [[SGTrayDelegate alloc] init];
    if (bytes && len > 0) {
        NSData *data = [NSData dataWithBytes:bytes length:len];
        [_sgDel setIconData:data];
    }
    // Delay to ensure NSApplication is fully launched
    dispatch_after(
        dispatch_time(DISPATCH_TIME_NOW, (int64_t)(1.0 * NSEC_PER_SEC)),
        dispatch_get_main_queue(), ^{
            [_sgDel createTray];
        });
}

void SGRemoveTray(void) {
    dispatch_async(dispatch_get_main_queue(), ^{
        if (_sgDel) [_sgDel removeTray];
    });
}
