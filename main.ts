bluetooth.onBluetoothConnected(function () {
    connected = 1
})
bluetooth.onBluetoothDisconnected(function () {
    connected = 0
})
input.onButtonPressed(Button.A, function () {
    RingbitCar.forward()
})
bluetooth.onUartDataReceived(serial.delimiters(Delimiters.NewLine), function () {
    command = bluetooth.uartReadUntil(serial.delimiters(Delimiters.NewLine))
    if (command == "z") {
        RingbitCar.forward()
    } else if (command == "s") {
        RingbitCar.back()
    } else if (command == "w") {
        RingbitCar.brake()
    } else if (command == "q") {
        RingbitCar.turnleft()
    } else if (command == "d") {
        RingbitCar.turnright()
    } else if (command == "o") {
        blink = 1
    } else if (command == "p") {
        strip.showColor(neopixel.colors(NeoPixelColors.Green))
    } else {
        RingbitCar.brake()
    }
})
input.onButtonPressed(Button.B, function () {
    RingbitCar.brake()
})
let command = ""
let connected = 0
let blink = 0
let strip: neopixel.Strip = null
basic.showIcon(IconNames.Ghost)
bluetooth.startUartService()
RingbitCar.init_wheel(AnalogPin.P1, AnalogPin.P2)
strip = neopixel.create(DigitalPin.P0, 2, NeoPixelMode.RGB)
strip.showColor(neopixel.colors(NeoPixelColors.Green))
blink = 0
basic.forever(function () {
    let upleft = 0
    if (blink == 1) {
        strip.showColor(neopixel.colors(NeoPixelColors.Green))
        basic.pause(100)
        strip.showColor(neopixel.colors(NeoPixelColors.Blue))
        basic.pause(100)
    }
    if (upleft == 1) {
        RingbitCar.forward()
        basic.pause(100)
        RingbitCar.turnleft()
        basic.pause(100)
    }
})
