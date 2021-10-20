import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    ImageBackground,
    StatusBar,
    SafeAreaView,
    Image,
    Alert,
    Platform
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import axios from "axios";

export default class MeteorScreen extends Component {
    constructor(props){
    super(props);
    this.state={meteors:{}}
    }
    componentDidMount(){
    this.getMeteors()
    }
    getMeteors=()=>{
    axios
    .get("https://api.nasa.gov/planetary/apod?api_key=8oRxaQL3IOJFxu2OfBglQJiH7lQLalb4h3vLfxfW")
    .then(response=>{
        this.setState({meteors: response.data.near_earth_objects})})
    .catch(error=>{
        Alert.alert(error.message)
    })
    }
    render() {
        if (Object.keys(this.state.meteors).length === 0) {
            return (
                <View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                    <Text>Loading</Text>
                </View>
            )
        }else{
            let meteorArry=object.keys(this.state.meteors).map(meteor_date=>{
            return(
                this.state.meteors[meteor_date]
            )
            })
            let meteor=[].concat.apply([],meteorArry)
            meteor.forEach(function(element){
            let diameter=(element.estimated_diameter.kilometers.estimated_diameter_min+element.estimated_diameter.kilometers.estimated_diameter_max)/2
            let threatScore=(diameter/element.close_approach_data[0].miss_distance.kilometers)*1000000000
            element.threat_score=threatScore
            })
        return (
            <View
                style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
                }}>
                <Text>Meteor Screen!</Text>
                <View>
                <TouchableOpacity style={{flex: 0.25,marginLeft: 50,marginRight: 50,marginTop: 50,borderRadius: 30,backgroundColor: 'Red'}} onPress={() =>
                        this.props.navigation.navigate("Home")}>
                        <Text style={{fontSize: 15,color: "black",fontWeight: "bold"}}>back</Text>
                </TouchableOpacity>
                </View>
            </View>
        )
        }
    }
}


