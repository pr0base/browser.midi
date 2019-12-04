class Sprite {
    constructor(img, x, y, speed, , floating) {
        this.spriteImage = img;

        this.animation = [];
        this.floating = floating;
        
        for(let iii=0; iii<3; iii++){
            // --- get part of the image we expect 128x128px sprites
            let lImg = this.spriteImage.get(192*iii,192*3, 192, 192);
            
            // if (this.spriteMask != undefined && this.spriteMask.length > -1) {
            //     for (let jjj=0; jjj < this.spriteMask.length; jjj++) {
            //         let lMaskImg = this.spriteMask[jjj].get(128*iii,128*3, 128, 128);
            //         lImg.blend(lMaskImg, 0, 0, 128, 128, 0, 0, 128, 128, ADD);
            //     }
                
            // }
            this.animation.push(lImg);
        }

        this.color = color;
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.index = 0;
        this.rotation = 0;

    }

    show() {
        let index = floor(this.index) % this.animation.length;
        
        if (this.floating == true)
        {
            imageMode(CENTER);
            angleMode(DEGREES);
            push();
            translate(this.x, this.y);
            rotate(this.rotation);
            image(this.animation[index], 0, 0);
            pop();
        } else {
            image(this.animation[index], this.x, this.y);
        }
        
    }
    
    animate() {
        
        this.index += this.speed;
        this.x += this.speed * 2;

        if (this.x > width) {
            this.x = -this.animation[0].width;
        }
        // if ( second() % 2 == 0) {
        //     this.rotation++;
        // }
        this.rotation += floor(random(0.5, 6));

        
        if (this.rotation > 359) {
            this.rotation = 0;
        }
    }
}