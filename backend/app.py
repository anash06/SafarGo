import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from bson import ObjectId

app = Flask(__name__)
CORS(app)

# MongoDB connection
MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017/")
client = MongoClient(MONGO_URI)
db = client.safargo

# Helpers
def format_doc(doc):
    """Convert MongoDB _id to string id and extract creation timestamp"""
    if doc:
        if '_id' in doc:
            doc['submitted_at'] = doc['_id'].generation_time.isoformat()
            doc['id'] = str(doc.pop('_id'))
    return doc

# --- DESTINATIONS API ---

@app.route('/api/destinations', methods=['GET'])
def get_destinations():
    destinations = list(db.destinations.find())
    return jsonify([format_doc(d) for d in destinations])

@app.route('/api/destinations/<id_or_name>', methods=['GET'])
def get_destination(id_or_name):
    try:
        # Try finding by ObjectId first if it's a valid ID
        from bson.errors import InvalidId
        try:
            dest = db.destinations.find_one({'_id': ObjectId(id_or_name)})
            if dest:
                return jsonify(format_doc(dest))
        except InvalidId:
            pass

        # Otherwise try matching by title slug (replace hyphens with spaces)
        title_query = id_or_name.replace('-', ' ')
        dest = db.destinations.find_one({'title': {'$regex': f'^{title_query}$', '$options': 'i'}})
        if dest:
            return jsonify(format_doc(dest))

        return jsonify({'error': 'Destination not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/api/destinations', methods=['POST'])
def add_destination():
    data = request.json
    result = db.destinations.insert_one(data)
    data['_id'] = result.inserted_id
    return jsonify(format_doc(data)), 201

@app.route('/api/destinations/<id>', methods=['PUT'])
def update_destination(id):
    try:
        data = request.json
        if '_id' in data:
            del data['_id']
        db.destinations.update_one({'_id': ObjectId(id)}, {'$set': data})
        updated = db.destinations.find_one({'_id': ObjectId(id)})
        return jsonify(format_doc(updated))
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/api/destinations/<id>', methods=['DELETE'])
def delete_destination(id):
    try:
        db.destinations.delete_one({'_id': ObjectId(id)})
        return jsonify({'success': True}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400

# --- CONTACT API ---

@app.route('/api/contact', methods=['GET'])
def get_contacts():
    contacts = list(db.contacts.find().sort('_id', -1))
    return jsonify([format_doc(c) for c in contacts])

@app.route('/api/contact', methods=['POST'])
def add_contact():
    data = request.json
    # ensure it has name, email, phone, message
    if not all(k in data for k in ("name", "email", "phone", "message")):
        return jsonify({'error': 'Missing required fields'}), 400
    
    result = db.contacts.insert_one(data)
    data['_id'] = result.inserted_id
    return jsonify(format_doc(data)), 201

@app.route('/api/contact/<id>', methods=['DELETE'])
def delete_contact(id):
    try:
        db.contacts.delete_one({'_id': ObjectId(id)})
        return jsonify({'success': True}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/api/contact/<id>', methods=['PUT'])
def update_contact(id):
    try:
        data = request.json
        if '_id' in data:
            del data['_id']
        db.contacts.update_one({'_id': ObjectId(id)}, {'$set': data})
        updated = db.contacts.find_one({'_id': ObjectId(id)})
        return jsonify(format_doc(updated))
    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True, port=5000)
