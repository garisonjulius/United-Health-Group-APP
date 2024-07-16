PRAGMA foreign_keys = ON;

-- User table
CREATE TABLE Users (
    uid INT AUTO_INCREMENT PRIMARY KEY,
    pid INT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    age INT NOT NULL,
    num_children INT NOT NULL,
    has_spouse BOOLEAN NOT NULL,
    spouse_age INT,
    spouse_gender VARCHAR(10),
    gender VARCHAR(10) NOT NULL,
    avg_annual_household_income INT NOT NULL,
    zip_code VARCHAR(10) NOT NULL,
    num_in_network_providers INT NOT NULL,
    has_outside_coverage BOOLEAN NOT NULL,
    spouse_has_outside_coverage BOOLEAN,
    FOREIGN KEY (pid) REFERENCES PlanInfo(pid)
);

-- User health conditions table
CREATE TABLE UserHealthConditions (
    uid INT,
    condition VARCHAR(50),
    PRIMARY KEY (uid, condition)
);

-- User health information table
-- This table holds information about the user's health such
-- as whether or not they smoke and how many surgeries they have 
-- had in the current year, and it also contains information
-- about the user's usage of their current plan.
CREATE TABLE UserHealthInformation (
    uid INT PRIMARY KEY,
    smokes BOOLEAN NOT NULL,
    consumes_alcohol BOOLEAN,
    num_doctor_visits INT NOT NULL,
    num_specialist_visits INT NOT NULL,
    num_hospital_visits INT NOT NULL,
    num_emergency_room_visits INT NOT NULL,
    num_surgeries INT NOT NULL,
    num_labs_or_tests INT NOT NULL,
    doctor_visits_price INT NOT NULL,
    specialist_visits_price INT NOT NULL,
    labs_tests_price INT NOT NULL,
    prescription_price INT NOT NULL,
    hospital_visits_price INT NOT NULL,
    emergency_visits_price INT NOT NULL,
    num_prescriptions INT NOT NULL,
    generic_prescription_spending INT NOT NULL,
    brand_prescription_spending INT NOT NULL,
    nonbrand_prescription_spending INT NOT NULL,
    specialty_prescription_spending INT NOT NULL,
    activity_level VARCHAR(10) NOT NULL,
    is_pregnant BOOLEAN NOT NULL
);

-- Family health conditions table
CREATE TABLE FamilyHealthConditions (
    uid INT,
    condition VARCHAR(50),
    PRIMARY KEY (uid, condition),
    FOREIGN KEY (uid) REFERENCES Users (uid)
);

-- Plan information table
CREATE TABLE PlanInfo (
    pid INT AUTO_INCREMENT PRIMARY KEY,
    plan_type VARCHAR(255),
    monthly_premium INT NOT NULL,
    deductible_per_person INT NOT NULL,
    out_of_pocket_max_per_person INT NOT NULL,
    network_primary_bd VARCHAR(20) NOT NULL,
    network_primary_ad VARCHAR(20) NOT NULL,
    network_preventive_bd VARCHAR(20) NOT NULL,
    network_preventive_ad VARCHAR(20) NOT NULL,
    network_specialist_bd VARCHAR(20) NOT NULL,
    network_specialist_ad VARCHAR(20) NOT NULL,
    network_xray_bd VARCHAR(20) NOT NULL,
    network_xray_ad VARCHAR(20) NOT NULL,
    network_imaging_bd VARCHAR(20) NOT NULL,
    network_imaging_ad VARCHAR(20) NOT NULL,
    network_blood_bd VARCHAR(20) NOT NULL,
    network_blood_ad VARCHAR(20) NOT NULL,
    network_generic_bd VARCHAR(20) NOT NULL,
    network_generic_ad VARCHAR(20) NOT NULL,
    network_brand_bd VARCHAR(20) NOT NULL,
    network_brand_ad VARCHAR(20) NOT NULL,
    network_npbrand_bd VARCHAR(20) NOT NULL,
    network_npbrand_ad VARCHAR(20) NOT NULL,
    network_specialty_bd VARCHAR(20) NOT NULL,
    network_specialty_ad VARCHAR(20) NOT NULL,
    network_hospital_bd VARCHAR(20) NOT NULL,
    network_hospital_ad VARCHAR(20) NOT NULL,
    network_emergency_bd VARHCAR(20) NOT NULL,
    network_emergency_ad VARHCAR(20) NOT NULL,
    annual_estimates INT NOT NULL,
    plan_description VARCHAR(255) NOT NULL
);
