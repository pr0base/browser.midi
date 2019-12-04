// import { SpriteSpaceInvader } from './modules/sprites-space-invader.js';

const BTN_MATRIX_OFF = 0x00;
const BTN_MATRIX_GREEN = 0x01;
const BTN_MATRIX_GREEN_BLINK = 0x02;
const BTN_MATRIX_RED = 0x03;
const BTN_MATRIX_RED_BLINK = 0x04;
const BTN_MATRIX_YELLOW = 0x05;
const BTN_MATRIX_YELLOW_BLINK = 0x06;

const BTN_MATRIX_CMD_ON = 0x90;
const BTN_MATRIX_CMD_OFF = 0x80;
const MASK_8BIT = 0b11111111;

let gPatternX = [
    1, 0, 0, 0, 0, 0, 0, 1,
    0, 1, 0, 0, 0, 0, 1, 0,
    0, 0, 1, 0, 0, 1, 0, 0,
    0, 0, 0, 1, 1, 0, 0, 0,
    0, 0, 0, 1, 1, 0, 0, 0,
    0, 0, 1, 0, 0, 1, 0, 0,
    0, 1, 0, 0, 0, 0, 1, 0,
    1, 0, 0, 0, 0, 0, 0, 1
];
let gPatternRamp = [
    0, 0, 0, 0, 0, 0, 0, 1,
    0, 0, 0, 0, 0, 0, 1, 0,
    0, 0, 0, 0, 0, 1, 0, 0,
    0, 0, 0, 0, 1, 0, 0, 0,
    0, 0, 0, 1, 0, 0, 0, 0,
    0, 0, 1, 0, 0, 0, 0, 0,
    0, 1, 0, 0, 0, 0, 0, 0,
    1, 0, 0, 0, 0, 0, 0, 0
];
let gPatternTest = [
    0, 1, 0, 1, 0, 1, 0, 1,
    1, 0, 1, 0, 1, 0, 1, 0,
    0, 1, 0, 1, 0, 1, 0, 1,
    1, 0, 1, 0, 1, 0, 1, 0,
    0, 1, 0, 1, 0, 0, 0, 0,
    0, 0, 1, 0, 0, 0, 0, 0,
    0, 1, 0, 0, 0, 0, 0, 0,
    1, 0, 0, 0, 0, 0, 0, 0
];
let gPatternDog1 = [
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 1, 1, 0, 0, 0, 0, 0,
    1, 0, 0, 1, 0, 0, 1, 0,
    1, 0, 0, 0, 0, 0, 1, 1,
    0, 1, 1, 1, 1, 1, 0, 0,
    0, 1, 0, 0, 0, 1, 0, 0,
    1, 0, 0, 0, 0, 0, 1, 0,
    0, 0, 0, 0, 0, 0, 0, 0
];
let gPatternDog2 = [
    0, 0, 0, 1, 0, 0, 0, 0,
    0, 1, 1, 0, 0, 0, 0, 0,
    1, 0, 0, 0, 0, 0, 1, 0,
    1, 0, 0, 0, 0, 0, 1, 1,
    0, 1, 1, 1, 1, 1, 0, 0,
    0, 1, 0, 0, 0, 1, 0, 0,
    0, 0, 1, 0, 1, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0
];
// Bitmaps based on https://i.redd.it/retx0v0qbeq11.jpg
const gPtnCat = [
    0b00010000,
    0b01100000,
    0b10000010,
    0b10000011,
    0b01111100,
    0b01000100,
    0b10000010,
    0b00000000
];
const gPtnClear = [
    0x0,
    0x0,
    0x0,
    0x0,
    0x0,
    0x0,
    0x0,
    0x0
];
const gPtnAlien = [
    0b00000000,
    0b00000100,
    0b00001110,
    0b00111110,
    0b00000100,
    0b01100110,
    0b00011100,
    0b00000100
];

let gLast = gPtnClear; 
let gLastColor = BTN_MATRIX_YELLOW; 
let midiMessage = document.getElementById('midi');
var gMidi;
var lColor = 0;

const onMIDIAccess = (midiAccessObject) => {
    gMidi = midiAccessObject;
    let inputs = midiAccessObject.inputs.values()
    for (let input = inputs.next(); input && !input.done; input = inputs.next()) {
        input.value.onmidimessage = onMIDIMessage
    }
    setLedMatix(gPtnClear, BTN_MATRIX_OFF);
    setRightButtons(0x52);
}

const onMIDIMessage = (message) => {
    let midiMessage = document.getElementById('midi')
    midiMessage.innerHTML = "Button Pressed: " + message.data[1].toString(16);
    let output = gMidi.outputs.values().next().value;
    switch (message.data[0]) {
        case 0x90: 
            console.log("Button Pressed: " + message.data[1].toString(16)); 
            apcButtonResponse(message.data[1]);
            break;
    }
}

function apcButtonResponse(value) {
    switch(value) {
        case 0x40:
            gLast = SpriteSpaceInvader.Squid();
            break;
        case 0x41:
            gLast = SpriteSpaceInvader.Turtle();
            break;
        case 0x42:
            gLast = SpriteSpaceInvader.Eggman();
            break;
        case 0x43:
            gLast = SpriteSpaceInvader.Cowboy();
            break;
        case 0x44:
            gLast = SpriteSpaceInvader.Bug();
            break;
        case 0x52:
            gLastColor = BTN_MATRIX_GREEN;
            break;
        case 0x53:
            gLastColor = BTN_MATRIX_YELLOW;
            break;
        case 0x54:
            gLastColor = BTN_MATRIX_RED;
            break;
        case 0x55:
            gLastColor = BTN_MATRIX_GREEN_BLINK;
            break;
        case 0x56:
            gLastColor = BTN_MATRIX_YELLOW_BLINK;
            break;
        case 0x57:
            gLastColor = BTN_MATRIX_RED_BLINK;
            break;
        }
    setLedMatix(gLast, gLastColor);
    setRightButtons(value);

}

function setRightButtons(pActive) {
    let output = gMidi.outputs.values().next().value;
    for (let iii=82; iii < 90; iii++) {
        output.send([BTN_MATRIX_CMD_ON, iii, BTN_MATRIX_OFF], window.performance.now());
    }
    if (pActive > 81 && pActive < 90) {
        output.send([BTN_MATRIX_CMD_ON, pActive, BTN_MATRIX_GREEN], window.performance.now());
    }
    
}

const onMIDIAccessFailure = (err) => {
    console.log(`No MIDI devices are available, or Web MIDI isn’t supported by this browser.`)
    console.log(`Utilize Chris Wilson’s Web MIDI API Polyfill in order to use the Web MIDI API: http://cwilso.github.io/WebMIDIAPIShim/`)
    console.log(err)
}

if (navigator.requestMIDIAccess) {
    navigator.requestMIDIAccess({ sysex: true }).then(onMIDIAccess, onMIDIAccessFailure)
} else {
    console.warn(`This browser does not support MIDI.`)
}





function scrollPattern(pPattern, pCnt, pLeft) {
    let lResult = [];
    for (let iii = 0; iii < 8; iii++) {
        if (pLeft)
            lResult.push((pPattern[iii] << pCnt) & MASK_8BIT);
        else
            lResult.push((pPattern[iii] >> pCnt) & MASK_8BIT)
    }
    return lResult;
}

function get8BitStr(value) {
    let lResult = value.toString(2);
    return "00000000".substr(lResult.length) + lResult;
}
function get8BitStrForArray(value) {
    let lResult = "";
    for (let iii = 0; iii < 8; iii++) {
        lResult += get8BitStr(value[iii]) + "\n";
    }
    return lResult;
}

function sendPattern(pPattern) {
    console.log("sendPattern");
    let lPattern;
    switch (pPattern) {
        case 1: lPattern = SpriteSpaceInvader.Turtle(); break;
        case 2: lPattern = SpriteSpaceInvader.Bug(); break;
        case 3: lPattern = SpriteSpaceInvader.Cowboy(); break;
        case 4: lPattern = SpriteSpaceInvader.Squid(); break;
    }
    setLedMatix(lPattern, BTN_MATRIX_YELLOW);
}   

function animateSprite() {
    window.setInterval(drawSprites, 1000);
}
let gCount = 0;

function doScroll() {
    console.log("scroll");
    let lPattern = gPtnAlien;
    var lDelay = 1000.0;
    
    console.log(get8BitStrForArray(lPattern));
    setLedMatix(lPattern, BTN_MATRIX_GREEN);
    lPattern = scrollPattern(lPattern, 1, false);
    console.log(get8BitStrForArray(lPattern));
    setLedMatix(lPattern, BTN_MATRIX_GREEN, lDelay*1);
    lPattern = scrollPattern(lPattern, 1, false);
    console.log(get8BitStrForArray(lPattern));
    setLedMatix(lPattern, BTN_MATRIX_GREEN, lDelay*2);
    lPattern = scrollPattern(lPattern, 1, false);
    console.log(get8BitStrForArray(lPattern));
    setLedMatix(lPattern, BTN_MATRIX_GREEN, lDelay*3);
    lPattern = scrollPattern(lPattern, 1, false);
    console.log(get8BitStrForArray(lPattern));
    setLedMatix(lPattern, BTN_MATRIX_GREEN, lDelay*4);
    lPattern = scrollPattern(lPattern, 1, false);
    console.log(get8BitStrForArray(lPattern));
    setLedMatix(lPattern, BTN_MATRIX_GREEN, lDelay*5);
    lPattern = scrollPattern(lPattern, 1, false);
    console.log(get8BitStrForArray(lPattern));
    setLedMatix(lPattern, BTN_MATRIX_GREEN, lDelay*6);
    lPattern = scrollPattern(lPattern, 1, false);
    console.log(get8BitStrForArray(lPattern));
    setLedMatix(lPattern, BTN_MATRIX_GREEN, lDelay*7);
    lPattern = scrollPattern(lPattern, 1, false);
    console.log(get8BitStrForArray(lPattern));
    setLedMatix(lPattern, BTN_MATRIX_GREEN, lDelay*8);
}



function setLedMatix(pPattern, pColor, pDelay) {
    // Set the MIDI Timing for the message to be send
    let lTiming = window.performance.now() + 0.0;
    // console.log("now():\t" + lTiming);
    if (pDelay > 0) {
        lTiming = lTiming + pDelay;
        // console.log("now() delay:\t" + lTiming + " delay was = " + pDelay);
    }
    // Get MIDI output device
    let output = gMidi.outputs.values().next().value;

    for (let iii = 0; iii < pPattern.length; iii++) {
        // console.log(get8BitStr(pPattern[iii]));
        for (let jjj = 0; jjj < 8; jjj++) {
            let lColor = BTN_MATRIX_OFF;
            // If the pixel is set in the bit mask assing a color
            // Shift here by 7 - the counter because other wise we would mirror the pixel assignment:)
            if ((pPattern[iii] >> 7-jjj) % 2 == 1) {
                lColor = pColor;
            }
            // Get screen position of pixel
            let lPixel = getOutputButtonForPixel((iii * 8) + jjj);
            // Activate the button by sending a MIDI message
            // console.log("BitPosition: " + ((iii * 8) + jjj) + "Set lPixel:" + lPixel + " to: " + lColor + " BitIndex: " + jjj + "ShiftResult: " + (pPattern[iii] >> jjj)%2);
            output.send([BTN_MATRIX_CMD_ON, lPixel, lColor], lTiming);
        }
    }
}

function drawSprites() {
    console.log("animate");
    let lPattern = gPatternDog1;
    let output = gMidi.outputs.values().next().value;
    for (let iii = 0; iii < lPattern.length; iii++) {
        let lColor = 0x00;
        if (lPattern[iii] == 1) {
            lColor = 0x03;
        }
        let lPixel = getOutputButtonForPixel(iii);
        output.send([0x90, lPixel, lColor], window.performance.now() + iii);
    }
    lPattern = gPatternDog2;
    for (let iii = 0; iii < lPattern.length; iii++) {
        let lColor = 0x00;
        if (lPattern[iii] == 1) {
            lColor = 0x03;
        }
        let lPixel = getOutputButtonForPixel(iii);
        output.send([0x90, lPixel, lColor], window.performance.now() + 500.0);
    }
}

function getOutputButtonForPixel(pPixel) {
    let lCase = Math.floor(pPixel / 8);
    let lOffset = 0;
    switch (lCase) {
        case 0: lOffset = 56; break;
        case 1: lOffset = 48; break;
        case 2: lOffset = 40; break;
        case 3: lOffset = 32; break;
        case 4: lOffset = 24; break;
        case 5: lOffset = 16; break;
        case 6: lOffset = 8; break;
    }
    return lOffset + (pPixel % 8);
}