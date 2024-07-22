from flask import jsonify
from united_health import app
import sqlite3
import united_health.ai

DATABASE = 'UHCDatabase.db'

def get_db():
    """Return connection to the UHCDatabase."""

    db = sqlite3.connect(DATABASE)

    # db.row_factory = sqlite3.Row
    return db

@app.route("/recommend/<uid>")
def recommend_plan(uid):
    """Prompt OpenAI API with user infomation to generate a plan recommendation for the user, and 
    then store the recommended plan in the database."""
    response = united_health.ai.put_rid(uid)
    return response

@app.route("/user/<uid>", methods=['GET'])
def get_user_info(uid):
    """Return basic user information from the database given the user id."""
    # Connect to the database
    db = get_db()
    cur = db.cursor()

    # Fetch user's name, pid, and rid
    cur.execute(
        "SELECT first_name, last_name, pid, rid "
        "FROM Users "
        "WHERE uid = ?",
        (uid, )
    )
    user_info = cur.fetchone()

    # Close the cursor and database connection
    cur.close()
    db.close()

    # Verify user exists
    if not user_info:
        return f'Invalid user id: {uid}. User information is not available', 400

    response = {
        'first_name': user_info[0],
        'last_name': user_info[1],
        'pid': user_info[2],
        'rid': user_info[3]
    }

    return jsonify(response)

@app.route("/plan/<pid>", methods=['GET'])
def get_plan_info(pid):
    """Based off the plan id, fetch their current plan info"""

    # Verify pid is not None. This may occur if a user is not yet
    # recommended a plan.
    if pid is None:
        return f'Provide plan id is None', 400

    # Connect to database
    db = get_db()
    cur = db.cursor()

    # Store their plan info
    plan_info = cur.execute(
        "SELECT * "
        "FROM PlanInfo "
        "WHERE pid = ?",
        (pid, )
    )
    # Verify that the plan exsists
    plan_info = plan_info.fetchall()
    if len(plan_info) == 0:
        db.close()
        return f'Invalid plan id: {pid}', 400
    plan_info = plan_info[0]
    db.close()

    response = {
        'pid': plan_info[0],
        'plan_title': plan_info[1],
        'plan_network_type': plan_info[2],
        'monthly_premium': plan_info[3],
        'deductible_per_person': plan_info[4],
        'out_of_pocket_max_per_person': plan_info[5],
        'network_primary_bd': plan_info[6],
        'network_primary_ad': plan_info[7],
        'out_of_network_primary_bd': plan_info[8],
        'network_preventive_bd': plan_info[9],
        'network_preventive_ad': plan_info[10],
        'network_specialist_bd': plan_info[11],
        'network_specialist_ad': plan_info[12],
        'network_xray_bd': plan_info[13],
        'network_xray_ad': plan_info[14],
        'network_imaging_bd': plan_info[15],
        'network_imaging_ad': plan_info[16],
        'network_blood_bd': plan_info[17],
        'network_blood_ad': plan_info[18],
        'network_generic_bd': plan_info[19],
        'network_generic_ad': plan_info[20],
        'network_brand_bd': plan_info[21],
        'network_brand_ad': plan_info[21],
        'network_npbrand_bd': plan_info[23],
        'network_npbrand_ad': plan_info[24],
        'network_specialty_bd': plan_info[25],
        'network_specialty_ad': plan_info[26],
        'network_hospital_bd': plan_info[27],
        'network_hospital_ad': plan_info[28],
        'network_emergency_bd': plan_info[29],
        'network_emergency_ad': plan_info[30],
        'annual_estimates': plan_info[31]
    }
    

    return jsonify(response)