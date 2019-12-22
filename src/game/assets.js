
// this maps to files in /dist/assets
const baseURL = '/assets';

export const boxSprite = 'box';
export const boxSpriteRed = 'boxRed';
export const boxSpriteGreen = 'boxGreen';
export const catSprite = 'cat';

export const gateImages = {
    T: 't',
    H: 'h',
    X: 'x',
    Y: 'y',
    Z: 'z',
    S: 's',
    Sdag: 'Sdag',
    Tdag: 'Tdag',
};

export const catAtlasImage = "cat_atlas_image";

export const catAnim = {
    idle : "cat_anim_idle",
    run : "cat_anim_run",
    jump: "cat_anim_jump",
    fall: "cat_anim_fall"
};

export const backgroundImageStatic = "background_image_static";
export const backgroundSchrodinger = "background_schrodinger";
export const backgroundOpenAnim = "background_open_anim";

let openAnimationImages;

export function preloadGameAssets(load){
    load.setBaseURL(baseURL); 
    load.image(boxSprite, 'crate_blue.png');
    load.image(boxSpriteRed, 'crate_red.png');
    load.image(boxSpriteGreen, 'crate_green.png');
    load.spritesheet(catSprite, 'temp-cat.png', { 
        frameWidth: 50, 
        frameHeight: 50 }
    );
    load.image(gateImages.T, 't.png');
    load.image(gateImages.H, 'h.png');
    load.image(gateImages.X, 'x.png');
    load.image(gateImages.Y, 'y.png');
    load.image(gateImages.Z, 'z.png');
    load.image(gateImages.S, 'S.png');
    load.image(gateImages.Sdag, 'Sdag.png');
    load.image(gateImages.Tdag, 'Tdag.png');
    load.atlas(catAtlasImage, 'cat-atlas.png', 'cat-atlas.json');

    // background

    load.image(backgroundImageStatic, 'background/Background.png');
    load.image(backgroundSchrodinger, 'background/schrodinger.png');
    openAnimationImages = [...Array(14).keys()].map(i => `background/BackgroundOpen${i+1}.png`);
    openAnimationImages.forEach(img => load.image(img, img));
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
        repeatDelay:4000
    });
    anims.create({
        key: backgroundOpenAnim, 
        frames: openAnimationImages.map(img => { return { key:img }}),
        framerate: 12,
        repeat: 0,
        repeatDelay: 1000
    })
}