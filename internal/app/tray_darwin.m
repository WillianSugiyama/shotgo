#import <Cocoa/Cocoa.h>
#include <stdio.h>
#include "_cgo_export.h"

@interface SGTrayDelegate : NSObject
@end

@implementation SGTrayDelegate
- (void)menuAction:(NSMenuItem *)sender {
    goTrayCallback((int)sender.tag);
}
@end

static NSStatusItem *_sgItem = nil;
static SGTrayDelegate *_sgDel = nil;

void SGSetupTray(void) {
    dispatch_async(dispatch_get_main_queue(), ^{
        _sgDel = [[SGTrayDelegate alloc] init];
        _sgItem = [[NSStatusBar systemStatusBar]
            statusItemWithLength:NSVariableStatusItemLength];
        _sgItem.button.title = @"SG";
        NSMenu *m = [[NSMenu alloc] init];

        void (^add)(NSString *, int, NSString *) =
            ^(NSString *t, int tag, NSString *ke) {
            NSMenuItem *i = [[NSMenuItem alloc] initWithTitle:t
                action:@selector(menuAction:) keyEquivalent:ke];
            i.tag = tag;
            i.target = _sgDel;
            [m addItem:i];
        };

        add(@"Capture Fullscreen", 1, @"");
        add(@"Capture Region", 2, @"");
        [m addItem:[NSMenuItem separatorItem]];
        add(@"Record Screen", 3, @"");
        [m addItem:[NSMenuItem separatorItem]];
        add(@"Settings", 4, @",");
        add(@"Quit ShotGo", 5, @"q");
        _sgItem.menu = m;
        fprintf(stderr, "[shotgo] tray icon created\n");
    });
}

void SGRemoveTray(void) {
    if (_sgItem) {
        [[NSStatusBar systemStatusBar] removeStatusItem:_sgItem];
        _sgItem = nil;
    }
}
