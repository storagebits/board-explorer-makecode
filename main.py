def on_bluetooth_connected():
    global connected, uartData
    basic.show_leds("""
        . # # # .
        . # . . .
        . # . . .
        # # . . .
        # # # # .
        """)
    connected = 1
    while connected == 1:
        uartData = bluetooth.uart_read_until(":")
        basic.show_string(uartData)
        if uartData == "FORWARD":
            RingbitCar.forward()
bluetooth.on_bluetooth_connected(on_bluetooth_connected)

def on_bluetooth_disconnected():
    basic.show_leds("""
        . # # # .
        . # . # .
        . # . # .
        . # . # .
        # # # # .
        """)
bluetooth.on_bluetooth_disconnected(on_bluetooth_disconnected)

def on_button_pressed_a():
    RingbitCar.forward()
input.on_button_pressed(Button.A, on_button_pressed_a)

def on_button_pressed_b():
    RingbitCar.brake()
input.on_button_pressed(Button.B, on_button_pressed_b)

uartData = ""
connected = 0
basic.show_icon(IconNames.SKULL)
bluetooth.start_uart_service()
RingbitCar.init_wheel(AnalogPin.P1, AnalogPin.P2)
strip = neopixel.create(DigitalPin.P0, 2, NeoPixelMode.RGB)

def on_forever():
    strip.show_color(neopixel.colors(NeoPixelColors.RED))
basic.forever(on_forever)
