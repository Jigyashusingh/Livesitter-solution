from flask import Flask, jsonify, request, render_template

app = Flask(__name__)

# Sample overlay data (replace with MongoDB or another database)
overlays = []

@app.route('/')
def index():
    return render_template('index.html')

# API endpoints for overlays
@app.route('/api/overlays', methods=['GET', 'POST'])
def overlay_api():
    if request.method == 'GET':
        return jsonify(overlays)
    elif request.method == 'POST':
        data = request.get_json()
        overlays.append(data)
        return jsonify({'message': 'Overlay added successfully'}), 201

@app.route('/api/overlays/<int:id>', methods=['PUT', 'DELETE'])
def overlay_detail(id):
    if request.method == 'PUT':
        data = request.get_json()
        overlays[id] = data
        return jsonify({'message': 'Overlay updated successfully'})
    elif request.method == 'DELETE':
        overlays.pop(id)
        return jsonify({'message': 'Overlay deleted successfully'})

if __name__ == '__main__':
    app.run(debug=True)
