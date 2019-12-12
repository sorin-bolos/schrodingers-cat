
// this maps to files in /dist/assets
const baseURL = '/assets';

export const boxSprite = 'box';
export const catSprite = 'cat';

export const gateImages = {
    T: 'gate_t',
    H: 'gate_h'
};

export const catAtlasImage = "cat_atlas_image";

export const catAnim = {
    idle : "cat_anim_idle",
    run : "cat_anim_run",
    jump: "cat_anim_jump",
    fall: "cat_anim_fall"
}

export function preloadGameAssets(load){
    load.setBaseURL(baseURL);
    load.image(boxSprite, 'temp-box.png');
    load.spritesheet(catSprite, 'temp-cat.png', { 
        frameWidth: 50, 
        frameHeight: 50 }
    );
    load.image(gateImages.T, 'gate-t.png');
    load.image(gateImages.H, 'gate-h.png');
    load.atlas(catAtlasImage, 'cat-atlas.png', 'cat-atlas.json');
}

export function createGameAnimations(anims){
    anims.create({
        key: catAnim.idle,
        frames: [{ key: catAtlasImage, frame: 'cat_default' }],
    });
    anims.create({
        key: catAnim.fall,
        frames: [{ key: catAtlasImage, frame: 'cat_fall' }],
    });
    anims.create({
        key: catAnim.run,
        frames: anims.generateFrameNames(catAtlasImage, { prefix: 'cat_run', start:1, end: 5, }),
        frameRate: 15,
        repeat: -1
    });
    anims.create({
        key: catAnim.jump,
        frames: anims.generateFrameNames(catAtlasImage, { prefix: 'cat_jump', start:1, end: 6, }),
        frameRate: 15,
        repeat: 1,
        repeatDelay:2000
    });
}