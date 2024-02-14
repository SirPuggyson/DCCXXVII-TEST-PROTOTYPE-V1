let money = 10
let generators = []
let lastUpdate = Date.now()
let tickspeeds = []

for (let i = 0; i < 10; i++) {
    let generator = {
        cost: Math.pow(Math.pow(10, i), i) * 10,
        bought: 0,
        amount: 0,
        mult: 1
    }
    generators.push(generator)
}

function format(amount) {
    let power = Math.floor(Math.log10(amount))
    let mantissa = amount / Math.pow(10, power)
    if (power < 3 ) return amount.toFixed(2)
    return mantissa.toFixed(2) + "e" + power
}

function buyGenerator(i) {
    let g = generators[i - 1]
    if (g.cost > money) return
    money -= g.cost
    g.amount += 1
    g.bought += 1
    g.mult *= 2
    g.cost *= ((i + 1) * 10)
}

function buyTickspeed(i) {
    let t = tickspeed[i - 1]
    if (t.cost > money) return
    money -= t.cost
    t.amount += 1
    t.bought += 1
    t.mult *= 1.125
    t.cost *= 10;
    if tickspeed (>= 1) {
        g.mult *= t.mult;
    }
}



function updateGUI() {
    document.getElementById("currency").textContent = "You have $" + format(money)
    for (let i = 0; i < 10; i++) {
        let g = generators[i]
        document.getElementById("gen" + (i + 1)).innerHTML = "Amount: " + format(g.amount) + "<br>Bought: " + g.bought + "<br>Mult: " + format(g.mult) + "x<br>Cost: " + format(g.cost)
        if (g.cost > money) document.getElementById("gen" + (i + 1)).classList.add("locked")
        else document.getElementById("gen" + (i + 1)).classList.remove("locked")
    }
}

function productionLoop(diff) {
    money += generators[0].amount * generators[0].mult * diff
    for (let i = 1; i < 10; i++) {
        generators[i - 1].amount += generators[i].amount * generators[i].mult * diff / 5
    }
}

function mainLoop() {
    var diff = (Date.now() - lastUpdate) / 1000

    productionLoop(diff)
    updateGUI()

    lastUpdate = Date.now()
}

setInterval(mainLoop, 50)

updateGUI()
