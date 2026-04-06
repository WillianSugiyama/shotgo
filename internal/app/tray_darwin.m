#import <Cocoa/Cocoa.h>

extern void goTrayCallback(int action);

@interface TrayDelegate : NSObject
@end

@implementation TrayDelegate
- (void)menuAction:(NSMenuItem *)sender {
    goTrayCallback((int)sender.tag);
}
@end

static NSStatusItem *_item = nil;
static TrayDelegate *_del = nil;

static void addItem(NSMenu *m, NSString *t, int tag, NSString *ke) {
    NSMenuItem *i = [[NSMenuItem alloc] initWithTitle:t
        action:@selector(menuAction:) keyEquivalent:ke];
    i.tag = tag;
    i.target = _del;
    [m addItem:i];
}

void SetupTray(void) {
    dispatch_async(dispatch_get_main_queue(), ^{
        _del = [[TrayDelegate alloc] init];
        _item = [[NSStatusBar systemStatusBar]
            statusItemWithLength:NSVariableStatusItemLength];
        _item.button.title = @"SG";
        NSMenu *m = [[NSMenu alloc] init];
        addItem(m, @"Capture Fullscreen", 1, @"");
        addItem(m, @"Capture Region", 2, @"");
        [m addItem:[NSMenuItem separatorItem]];
        addItem(m, @"Record Screen", 3, @"");
        [m addItem:[NSMenuItem separatorItem]];
        addItem(m, @"Settings", 4, @",");
        addItem(m, @"Quit", 5, @"q");
        _item.menu = m;
    });
}

void RemoveTray(void) {
    if (_item) {
        [[NSStatusBar systemStatusBar] removeStatusItem:_item];
        _item = nil;
    }
}
