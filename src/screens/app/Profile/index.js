import React, { Component } from 'react';
import { StyleSheet, View, Image, } from 'react-native';
import { Container, Content, Text, Button, Icon, H2, } from 'native-base';
import Hr from "react-native-hr-component";
import AppTemplate from "../appTemplate";

export default class Profile extends Component {
    render() {
        return (
            <AppTemplate navigation={this.props.navigation} title="Profile">
               
                        <View style={styles.container}>
                            <Icon active style={styles.setting} type="MaterialCommunityIcons" name="settings" 
                            onPress={()=> this.props.navigation.navigate('Settings')}/>
                            <H2 style={styles.containerH2}>Zac Efron</H2>
                            <Icon active style={styles.edit} type="FontAwesome" name="edit" />
                        </View>
                        <View style={styles.viewImage}>
                            <Image style={styles.image} source={require("../../../images/trend-kid-com-ROUND.jpg")} />
                            <Text style={styles.viewImageText}>UI Trainer</Text>
                        </View>
                        <View style={styles.courseFollow}>
                            <View style={styles.course}>
                                <Text style={styles.text}>Courses</Text>
                                <Text style={styles.text}>30</Text>
                            </View>
                            <Text style={styles.separate}></Text>
                            <View style={styles.follow}>
                                <Text style={styles.text}>Followers</Text>
                                <Text style={styles.text}>1000</Text>
                            </View>
                        </View>
                        <Hr lineColor="#e5e3e3" width={1} />
                        <View style={styles.Profile}>
                            <Text style={styles.textProfil}>Profile info</Text>
                            <Icon style={styles.icon} type="MaterialCommunityIcons" name="chevron-right"
                            onPress={()=> this.props.navigation.navigate('ProfileInfo')} />
                        </View>
                        <Hr lineColor="#e5e3e3" width={1} />
                        <View style={styles.Profile}>
                            <Text style={styles.textProfil}>Courses</Text>
                            <Icon style={styles.icon} type="MaterialCommunityIcons" name="chevron-right" />
                        </View>
                        <Hr lineColor="#e5e3e3" width={1} />
                        <View style={styles.Profile}>
                            <Text style={styles.textProfil}>Messages</Text>
                            <Icon style={styles.icon} type="MaterialCommunityIcons" name="chevron-right" />
                        </View>
                        <Hr lineColor="#e5e3e3" width={1} />
                        <View style={styles.Profile}>
                            <Text style={styles.textProfil}>Testimonials</Text>
                            <Icon style={styles.icon} type="MaterialCommunityIcons" name="chevron-right" />
                        </View>
                        
            </AppTemplate>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop:20,
        padding: 5,
    },
    containerH2:{
        fontWeight: 'bold',
        alignSelf: 'center',
    },
    setting:{
        fontSize: 20,
        position: 'absolute',
        top: 20,
        left: 20
    },
    edit:{
        fontSize: 20, 
        position: 'absolute',
        top: 20,
        right: 20,
    },
    viewImage:{
        alignSelf: 'center'
    },
    image:{
        height: 110,
        width: 110,
        borderRadius:100,
    },
    viewImageText:{
        alignSelf: 'center',
        paddingTop: 10,
        fontSize: 20
    },
    courseFollow:{
        height: 90,
        paddingTop: 15,
        flexDirection: 'row',
        alignSelf: 'center',
    },
    text:{
        fontSize: 20,
        color: '#515151',
        alignSelf: 'center'
    },
    separate:{   
        marginLeft: 75,
        marginRight: 65,    
        borderStyle: 'solid',
        borderRightWidth: 1,
        borderRightColor: '#e5e3e3', 
    },
    Profile:{
        height: 60,
    },
    textProfil:{
        fontSize: 20,
        color: '#515151',
        position: 'absolute',
        top: 17,
        left: 40
    },
    icon:{
        alignSelf: 'flex-end',
        position: 'absolute',
        top: 17,
        right: 30
    }
})