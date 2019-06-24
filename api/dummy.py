from flask import Flask, jsonify
from time import sleep
import random
# Rest API
app = Flask(__name__)

@app.route('/', methods=['GET'])
def get_data():
    try:
        return jsonify(batt_voltage=random.uniform(8,14),
                       pv_voltage=random.uniform(8,14),
                       charge_current=random.uniform(8,18),
                       load_amps=random.uniform(0,14))

    except (IndexError, IOError) as e:
        port.flushInput()
        port.flushOutput()
        return jsonify({'error': e.message}), 503

try:
    app.run(host='0.0.0.0', port=80)

except KeyboardInterrupt:
    print ("\nCtrl-C pressed.  Closing serial port and exiting...")
finally:
    port.close()
