'use strict';
let totalCookiesOwned = 10000000,
    totalCookiesBaked = 0,
    cookieClicks = 0;
const bigCookie = document.getElementById("cookie"),
    totalCookiesDisp = document.getElementById("total-cookies"),
    totalCps = document.getElementById('total-cps'),
    //Buy buttons
    buyCursorBtn = document.getElementById("buy-cursor"),
    buyShowelBtn = document.getElementById("buy-showel"),
    buyTractorBtn = document.getElementById("buy-tractor"),
    buyTruckBtn = document.getElementById("buy-truck"),
    buyShipBtn = document.getElementById("buy-ship"),
    buySpaceShipBtn = document.getElementById("buy-space-ship"),
    buySatelliteBtn = document.getElementById("buy-satellite");



class Upgrade {
    constructor(upgradeName, reqCookies, reqClicks, cost, cpsBonus, isAvailable, isBought,) {
        this.upgradeName = upgradeName;
        this.reqCookies = reqCookies;
        this.reqClicks = reqClicks;
        this.cost = cost;
        this.cpsBonus = cpsBonus;
        this.isAvailable = isAvailable;
        this.isBought = isBought;
    }
}


class CookieObject {
    constructor(objectName, objectCount, cps, baseCost, costId, objectCountDisp, buyObjButton, discoverCookies, upgrades) {
        this.objectName = objectName;
        this.objectCount = objectCount;
        this.cps = cps;
        this.baseCost = baseCost;
        this.costId = costId;
        this.objectCountDisp = objectCountDisp;
        this.buyObjButton = buyObjButton;
        this.discoverCookies=discoverCookies
        this.upgrades = upgrades
    }

    //Counted object cost
    totalObjCostCount = () => {
        if (this.objectCount > 0) {
            return (Math.round((this.baseCost * (1.15 ** this.objectCount))));
        }
        else {
            return (this.baseCost);
        }


    };

    totalObjCps = () => {
        return (this.objectCount * this.cps)
    };

    buyObject = () => {
        if (totalCookiesOwned - this.totalObjCostCount() >= 0) {
            totalCookiesOwned = totalCookiesOwned - this.totalObjCostCount();
            totalCookiesDisp.innerHTML = totalCookiesOwned.toFixed(1)
            document.getElementById(`${this.objectCountDisp}`).innerHTML = this.objectCount + 1;
            this.objectCount++;
            document.getElementById(`${this.costId}`).innerHTML = this.totalObjCostCount();
            console.log('You bought an object');
            cpsCounter();

        }

    };

    checkAvailablility = () => {
        let objCost = document.getElementById(`${this.costId}`);

        if ((totalCookiesOwned - this.totalObjCostCount()) >= 0) {
            objCost.classList.add('available');
            objCost.classList.remove('not-available')
        }
        else {
            objCost.classList.add('not-available');
            objCost.classList.remove('available')
        }

        if(totalCookiesOwned>=this.discoverCookies){
            document.getElementById(`buy-${this.objectName}`).classList.remove('not-discovered')
        }

    };
}


let cursorUpgrades = [
    new Upgrade('Cursot I', 25, 25, 100, 0.1, false, false),
    new Upgrade('Cursot II', 50, 50, 100, 0.1, false, false),
    new Upgrade('Cursot III', 100, 100, 100, 0.1, false, false),

];
const objectCursor = new CookieObject('cursor', 0, 0.1, 1, 'cursors-price', 'cursors-number', 'buy-cursor', 0, cursorUpgrades),
    objectShowel = new CookieObject('showel', 0, 1, 1000, 'showels-price', 'showels-number', 'buy-showel', 100),
    objectTractor = new CookieObject('tractor', 0, 8, 11000, 'tractors-price', 'tractors-number', 'buy-tractor', 10000),
    objectTruck = new CookieObject('truck', 0, 47, 120000, 'trucks-price', 'trucks-number', 'buy-truck', 1000000),
    objectShip = new CookieObject('ship', 0, 260, 1300000, 'ships-price', 'ships-number', 'buy-ship', 100000000),
    objectSpaceShip = new CookieObject('space-ship', 0, 1400, 14000000, 'space-ships-price', 'space-ships-number', 'buy-space-ship',10000000000),
    objectSatellite = new CookieObject('satellite', 0, 7800, 200000000, 'satellites-price', 'satellites-number', 'buy-satellite', 100000000000);
let objects = [objectCursor, objectShowel, objectTractor, objectTruck, objectShip, objectSpaceShip, objectSatellite];

$(document).ready(() => { //Animated display of earned cookies after click
    $(bigCookie).click(() => {
        totalCookiesOwned += 1 + (+cpsCounter().toFixed(1) * 0.01);
        totalCookiesDisp.innerHTML = totalCookiesOwned.toFixed(1);
        $('#big-cookie-wrapper').append(`<div class='cps'>+${Number(cpsCounter().toFixed(1)) + 1}</div>`);
        $('.cps').css({ 'position': 'absolute', 'opacity': '0', 'top': `50%`, 'left': `50%`,  'transform': 'translate(-50%, -50%)' }).animate({ 'opacity': '1', 'top': '10%' }, 700);
        setTimeout(() => { $('.cps').css({ 'opacity': '1' }).animate({ 'opacity': '0', 'top': '10%' }, 700); }, 0);
        setTimeout(() => { $('.cps')[0].remove(); }, 600)
    });
});




let cpsCounter = () => { //Sum of all current objects cps
    let cpsSum = 0
    objects.forEach(building => cpsSum += building.totalObjCps())
    totalCps.innerHTML = cpsSum.toFixed(1) * 10;
    return (cpsSum)
}
cpsCounter();

let totalCookiesCounter = () => { //Realtime total cookies count
    totalCookiesOwned += cpsCounter()
    totalCookiesDisp.innerHTML = totalCookiesOwned.toFixed(1);
};

setInterval(totalCookiesCounter, 100);
setInterval(() => {
    for (let i = 0; i < objects.length; i++) {
        objects[i].checkAvailablility()
    }
}, 300)

bigCookie.addEventListener("click", () => { cookieClicks += 1; console.log(cookieClicks) })
buyCursorBtn.addEventListener("click", objectCursor.buyObject);
buyShowelBtn.addEventListener("click", objectShowel.buyObject);
buyTractorBtn.addEventListener("click", objectTractor.buyObject);
buyTruckBtn.addEventListener("click", objectTruck.buyObject);
buyShipBtn.addEventListener("click", objectShip.buyObject);
buySpaceShipBtn.addEventListener("click", objectSpaceShip.buyObject);
buySatelliteBtn.addEventListener("click", objectSatellite.buyObject);






