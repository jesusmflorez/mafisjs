from flask import Flask, jsonify, request
from flask_cors import CORS
import pymysql

app = Flask(__name__)
CORS(app)  # permite llamadas desde React

def get_connection():
    return pymysql.connect(
        host='127.0.0.1',
        user='root',
        password='Jesusflorez01.',
        database='activos',
        charset='utf8mb4',
        cursorclass=pymysql.cursors.DictCursor
    )

# ---------------------------
# GET ACTIVOS
# ---------------------------
@app.route('/activos', methods=['GET'])
def get_activos():
    try:
        conn = get_connection()
        with conn.cursor() as cursor:
            cursor.execute("SELECT * FROM activoss")  # TABLA CORRECTA
            rows = cursor.fetchall()
        conn.close()
        return jsonify(rows), 200
    except Exception as e:
        print("ERROR GET:", e)
        return jsonify({"error": str(e)}), 500


# ---------------------------
# POST ACTIVOS
# ---------------------------
@app.route('/activos', methods=['POST'])
def crear_activos():
    try:
        data = request.get_json()
        conn = get_connection()
        with conn.cursor() as cursor:
            sql = 'INSERT INTO activoss (nombreActivo, ubicacion, estado) VALUES (%s, %s, %s)'
            cursor.execute(sql, (data['nombreActivo'], data['ubicacion'], data['estado']))
            conn.commit()
        conn.close()
        return jsonify({'msg': 'creado'}), 201
    except Exception as e:
        print("ERROR POST:", e)
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)
