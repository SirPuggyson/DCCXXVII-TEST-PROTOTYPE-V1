var deificity = 10
var deities = []
var lastUpdate = Date.now()

for (let i = 0; i < 10; i++) {
    let deity = {
        cost: Math.pow(Math.pow(10, i), i) * 10,
        bought: 0,
        amount: 0,
        mult: 1
    }
    deities.push(deity)
}

function format(amount) {
    let power = Math.floor(Math.log10(amount))
    let mantissa = amount / Math.pow(10, power)
    if (power < 3 ) return amount.toFixed(2)
    return mantissa.toFixed(2) + "e" + power
}

function buydeity(i) {
    let g = deities[i - 1]
    if (g.cost > deificity) return
    deificity -= g.cost
    g.amount += 1.35
    g.amount *= 1.09
    g.bought += 1
    g.mult *= 1.075
    g.cost *= 1.65
}

function updateGUI() {
    document.getElementById("currency").textContent = "You have $" + format(deificity)
    for (let i = 0; i < 10; i++) {
        let g = deities[i]
        document.getElementById("gen" + (i + 1)).innerHTML = "Amount: " + format(g.amount) + "<br>Bought: " + g.bought + "<br>Mult: " + format(g.mult) + "x<br>Cost: " + format(g.cost)
        if (g.cost > deificity) document.getElementById("gen" + (i + 1)).classList.add("locked")
        else document.getElementById("gen" + (i + 1)).classList.remove("locked")
    }
}

function productionLoop(diff) {
    deificity += deities[0].amount * deities[0].mult * diff
    for (let i = 1; i < 10; i++) {
        deities[i - 1].amount += deities[i].amount * deities[i].mult * diff / 5
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
