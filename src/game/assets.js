
// this maps to files in /dist/assets
const baseURL = '/assets';

export const boxSprite = 'box';
export const catSprite = 'cat';
export const catLeftAnim = 'cat_left';
export const catRightAnim = 'cat_right';
export const catIdleAnim = 'cat_wait';

export const gateImages = {
    T: 'gate_t',
    H: 'gate_h'
};

export function preloadGameAssets(load){
    load.setBaseURL(baseURL);
    load.image(boxSprite, 'temp-box.png');
    load.spritesheet(catSprite, 'temp-cat.png', { 
        frameWidth: 50, 
        frameHeight: 50 }
    );
    load.image(gateImages.T, 'gate-t.png');
    load.image(gateImages.H, 'gate-h.png');
}

export function createGameAnimations(anims){
    anims.create({
        key: catLeftAnim,
        frames: anims.generateFrameNumbers(catSprite, { start: 0, end: 1 }),
        frameRate: 10,
        repeat: -1
    });
    anims.create({
        key: catIdleAnim,
        frames: [{ key: catSprite, frame: 2 }],
        frameRate: 20
    });
    anims.create({
        key: catRightAnim,
        frames: anims.generateFrameNumbers(catSprite, { start: 3, end: 4 }),
        frameRate: 10,
        repeat: -1
    });
}