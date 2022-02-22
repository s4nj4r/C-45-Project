var bg, bgImg;
var player, shooterImg, shootingImg;
var bullet, bulletGroup;
var explosionSound, loseSound;
var zombie, zombieImg, zombieGroup;
var score=0;
var life = 3;

function preload(){
    bgImg = loadImage("assets/bg.jpeg");  
    shooterImg = loadImage("assets/shooter_2.png");
    shootingImg = loadImage("assets/shooter_3.png");
    zombieImg = loadImage("assets/zombie.png");
    
    explosionSound = loadSound("assets/explosion.mp3");
    loseSound = loadSound("assets/lose.mp3");
}

function setup(){
    createCanvas(windowWidth, windowHeight);
    bg = createSprite(displayWidth/2-20, displayHeight/2-40,20,20);
    bg.addImage(bgImg);
    bg.scale = 1.1;

    player = createSprite(displayWidth-1150, displayHeight-300);
    player.addImage(shooterImg);
    player.scale = 0.4;
    player.debug = true;
    player.setCollider("rectangle",0,0,200,300);

    bulletGroup = new Group();
    zombieGroup = new Group();


}
function draw(){
    background(0);
    
    if(keyDown("UP_ARROW")){
        player.y-=30;
    }
    if(keyDown("DOWN_ARROW")){
        player.y+=30;
    }
    if(keyWentDown("space")){
        bullet = createSprite(displayWidth-1150, player.y-30, 20, 10);
        bullet.velocityX = 20;

        bulletGroup.add(bullet);
        player.addImage(shootingImg);

        explosionSound.play();
    }
    else if(keyWentUp("space")){
        player.addImage(shooterImg);
    }

    if(zombieGroup.isTouching(bulletGroup)){
        for(var i = 0; i < zombieGroup.length; i++){
            if(zombieGroup[i].isTouching(bulletGroup)){
                zombieGroup[i].destroy();
                bulletGroup.destroyEach();
                explosionSound.play();
                score+=2;
            }
        }
    }

    if(zombieGroup.isTouching(player)){
        loseSound.play();
        for(var i = 0; i < zombieGroup.length; i++){
            if(zombieGroup[i].isTouching(player)){
                zombieGroup[i].destroy();
                life = life - 1;
            }
        }
    }
    
    spawnZombies();
    drawSprites();
    if(life===0){
        textSize(100);
        fill("red");
        text("Game Over", 400, 400);
        zombieGroup.destroyEach();
        player.destroy();
    }
    if(score===10){
        textSize(100);
        fill("yellow");
        text("You Won!", 400, 400);
        zombieGroup.destroyEach();
        player.destroy();
    }
    textSize(20);
    text("score: "+ score, displayWidth-200, displayHeight - 100);
    text("lives: "+ life, displayWidth - 200, displayHeight - 150);
}

function spawnZombies(){
    if(frameCount%70===0){
        zombie = createSprite(random(700, 1100),random(100, 500));
        zombie.addImage(zombieImg);
        zombie.scale = 0.15
        zombie.velocityX = -5;
        zombie.debug = true;
        zombie.setCollider("rectangle",0,0,400,400);
        zombie.lifetime = 400;
        zombieGroup.add(zombie);
    }
}