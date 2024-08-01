//import * as React from "react";
import React, {useState, useEffect} from "react"
import { StyleSheet, Image, View, Text, Pressable } from "react-native";
import { Color, FontSize, FontFamily, Border } from "../assets/GlobalStyles";
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import { TouchableOpacity } from "react-native-gesture-handler";
import AntDesign from '@expo/vector-icons/AntDesign';



const ComparisonFrame1 = ({route}) => {
  
  const [currPlan, setCurrPlan] = useState("");
  const [recPlan, setRecPlan] = useState("");
  const [userData, setUserData] = useState("");
  const [isTextVisible, setTextVisible] = useState(false);

  const {uid} = route.params;

  useEffect(() => {
    fetch(`http://10.0.2.2:5000/user/${uid}`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setUserData(data);
      })
      .catch(err => {
        console.log("Invalid Rec Plan Info");
      });
  }, []);

  useEffect(() => {
    if (userData && userData.pid){
      fetch(`http://10.0.2.2:5000/plan/${userData.pid}`)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          setCurrPlan(data);
        })
        .catch(err => {
          console.log("Invalid Plan Info");
        });
      }
  }, [userData]);


  useEffect(() => {
    // Fetch recommended plan data when userData changes
    if (userData && userData.rid) {
      fetch(`http://10.0.2.2:5000/plan/${userData.rid}`)
        .then(response => response.json())
        .then(data => {
          console.log('Recommended Plan:', data);
          setRecPlan(data);
        })
        .catch(err => {
          console.log("Error fetching recommended plan:", err);
        });
    }
  }, [userData]);

  const tableInformation = {
    tableHead: ['Features', 'Current', 'Recommended'],
    tableTitle: ['Monthly Premium', 'Annual Deductible per person (USD)', 'Annual Maximum OP (USD)', 'IN Prim Care Visit before deductible', 'ON Prim Care Visit before deductible', 'IN Specialist Visit before deductible', 'HMO/PPO/POS/EPO'],
    tableData: [
      ['$' + currPlan['monthly_premium'], '$' + recPlan['monthly_premium']],
      [currPlan['deductible_per_person'], recPlan['deductible_per_person']],
      [currPlan['out_of_pocket_max_per_person'], recPlan['out_of_pocket_max_per_person']],
      [currPlan['network_primary_bd'], recPlan['network_primary_bd']],
      [currPlan['out_of_network_primary_bd'], recPlan['out_of_network_primary_bd']],
      [currPlan['network_specialist_bd'], recPlan['network_specialist_bd']],
      [currPlan['plan_network_type'], recPlan['plan_network_type']],
    ]
  }

  return (
    <View style={styles.container}>
      {/* Exclamation Warning */}
      <Pressable onPress={
        () => {
          setTextVisible(!isTextVisible);
        }
      } style={styles.warningExclamation}>
        <Image
            style={{ width: 15, height: 15 }}
            contentFit="cover"
            source={require("../assets/disclaimer.png")}
        />
      </Pressable>

      {/* Warning Text for Exclamation */}
      {isTextVisible && 
      <View style={styles.warningBox}>
        <Text><Text style={{ fontWeight: 'bold' }}>Disclaimer:</Text> This health care plan recommendation is generated by AI and should not replace professional medical advice. Please consult a healthcare provider for personalized guidance.</Text>
      </View>}

      <Table borderStyle={{borderWidth: 1}}>
        <Row data={tableInformation.tableHead} flexArr={[.74, 1.13, 1.13]} style={styles.head} textStyle={styles.textHead}>
          <Text>{tableInformation.tableHead[0]}</Text>
          <Text>{tableInformation.tableHead[1]}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text>{tableInformation.tableHead[2]}</Text>
            <AntDesign name="right" size={16} color="pink" />
          </View>
        </Row>
        <TableWrapper style={styles.wrapper}>
          <Col data={tableInformation.tableTitle} style={styles.title} textStyle={styles.textCol}/>
          <Rows data={tableInformation.tableData} flexArr={[1, 1, 1]} style={[styles.row, styles.innerData]} textStyle={styles.text}/>
        </TableWrapper>
      </Table>
      <Text style={{color: 'white', paddingLeft: 5}}>*IN = In Network, ON = Out-of-network, OP = Out-of-pocket</Text>

      <View style={styles.belowTable}>
        <View style={styles.aiReasoning}>
          <Text style={styles.aiReasoningText}>{userData['ai_rec_reasoning']}</Text>
        </View>

        <View style={styles.moreOptions}>
          {/* All plan options */}
          <View style={styles.planOptions}>
            <View style={styles.centerFlex}>
              <Text style={styles.optionsText}>All plan options</Text>
              <AntDesign name="right" size={16} color="white" />
            </View>
          </View>

          {/* Contact an agent */}
          <View  style={styles.callOption}>
            <View style={styles.centerFlex}>
              <Text style={styles.optionsText}>Contact an agent</Text>
              <Image style={{ width: 20, height: 20}}source={require("../assets/phone-call.png")}></Image>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    // padding: 16,
    // paddingTop: 30,
    backgroundColor: '#02226d'
  },
  head: {  
    height: 60,
    backgroundColor: '#02226d',
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
  },
  title: { 
    flex: 1,
    backgroundColor: '#edf8fc' 
  },
  innerData: {
    backgroundColor: '#fff' 
  },
  row: {  
    height: 70,
  },
  text: { 
    textAlign: 'center'
  },
  textHead: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  textCol: {
    fontWeight: 'bold',
    textAlign: 'center'
  },
  aiReasoning: {
    margin: 20,
  },
  aiReasoningText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  },
  moreOptions: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 10
  },
  planOptions: {
    display: 'flex',
    flexDirection: 'row',
    gap: 5
  },
  callOption: {
    display: 'flex',
    flexDirection: 'row',
    gap: 5
  },
  optionsText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  belowTable: {
    backgroundColor: '#02226d'
  },
  centerFlex: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5
  },
  warningExclamation: {
    width: 20,
    height: 20,
    position: 'absolute',
    top: 24,
    right: 5,
    zIndex: 1,
  },
  warningBox: {
    zIndex: 1,
    position: 'absolute',
    width: '35%',
    top: 50,
    right: 10,
    backgroundColor: '#edf8fc',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    elevation: 5,
    borderRadius: 5
  },
  warningBoxText: {
    textAlign: 'center'
  }
});

export default ComparisonFrame1;
