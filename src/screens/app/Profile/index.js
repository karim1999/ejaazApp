import React, { Component } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, AsyncStorage} from 'react-native';
import {Container, Content, Text, Button, Icon, H2, ListItem, Toast,} from 'native-base';
import Hr from "react-native-hr-component";
import AppTemplate from "../appTemplate";
import {connect} from "react-redux";
import {setUser} from "../../../reducers";
import Server from "../../../constants/config";
import ImagePicker from "react-native-image-picker";
import axios from 'axios';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            source: Server.storage+this.props.user.img,
        };
    }
    logout(){
        return AsyncStorage.removeItem('token').then(()=>{
            this.props.navigation.navigate('Auth');
        });
    }
    changeImg(){
        let options = {
            title: "Avatar",
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        };
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                this.setState({
                    isLoading: true
                });
                let uri = response.uri;
                let data = new FormData();
                data.append('img', {
                    name: "img",
                    uri,
                    type: 'image/png'
                });
                AsyncStorage.getItem('token').then(userToken => {
                    axios.post(Server.url+'api/user/img'+'?token='+userToken, data).then((resp) => {
                        this.setState({
                            isLoading: false,
                        });
                        this.props.setUser(resp.data.user);
                    }).catch((err) => {
                        this.setState({
                            isLoading: false,
                        });
                        Toast.show({
                            text: "Unknown error has occurred",
                            buttonText: "OK",
                            type: "danger"
                        })
                    })
                });
                this.setState({
                    source: response.uri
                });
            }
        });
    }

    componentDidMount(){
        AsyncStorage.getItem('token').then(userToken => {
            axios.post(Server.url+'api/auth/me?token='+userToken).then(response => {
                this.props.setUser(response.data.user);
            }).catch(error => {
                Toast.show({
                    text: 'Error reaching the server.',
                    type: "danger",
                    buttonText: 'Okay'
                });
            })
        }).then(() => {
            this.setState({
                refreshing: false
            });
        });
    }

    render() {
        return (
            <AppTemplate navigation={this.props.navigation} title="Profile">

                <View style={styles.container}>
                <Icon active style={styles.setting} type="MaterialCommunityIcons" name="settings" 
                            onPress={()=> this.props.navigation.navigate('Security')}/>
                    <H2 style={styles.containerH2}>{this.props.user.name}</H2>
                    <Icon active style={styles.edit} type="FontAwesome" name="edit" 
                    onPress={()=> this.props.navigation.navigate('UserInfo')}/>
                </View>
                <View style={styles.viewImage}>
                    <TouchableOpacity
                        onPress={() => this.changeImg()}
                    >
                        <Image style={styles.image} source={{uri: this.state.source}} />
                    </TouchableOpacity>
                    {
                        (this.props.user.type == 1)?(
                            <Text style={styles.viewImageText}>Trainee</Text>
                        ):(
                            <Text style={styles.viewImageText}>Trainer</Text>
                        )
                    }
                </View>
                <TouchableOpacity style={styles.courseFollow}>
                    <View style={styles.course}>
                        <Text style={styles.text}>Courses</Text>
                        {this.props.user.courses.map((result, i) => 
                            <Text style={styles.text}>{result.length}</Text>
                        )}
                    </View>
                </TouchableOpacity>
                <Hr lineColor="#e5e3e3" width={1} />
                <TouchableOpacity
                    onPress={()=> this.props.navigation.navigate('ProfileInfo', {user_id: this.props.user.id})}
                    style={styles.Profile}>
                    <Text style={styles.textProfil}>Profile info</Text>
                    <Icon style={styles.icon} type="MaterialCommunityIcons" name="chevron-right"/>
                </TouchableOpacity>
                <Hr lineColor="#e5e3e3" width={1} />
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate("Education", {...this.props.user, user_id: this.props.user.id})}
                    style={styles.Profile}>
                    <Text style={styles.textProfil}>Education</Text>
                    <Icon style={styles.icon} type="MaterialCommunityIcons" name="chevron-right"/>
                </TouchableOpacity>
                <Hr lineColor="#e5e3e3" width={1} />
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate("Jobs", {...this.props.user, user_id: this.props.user.id})}
                    style={styles.Profile}>
                    <Text style={styles.textProfil}>Jobs</Text>
                    <Icon style={styles.icon} type="MaterialCommunityIcons" name="chevron-right"/>
                </TouchableOpacity>
                <Hr lineColor="#e5e3e3" width={1} />
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate("Certificates", {...this.props.user, user_id: this.props.user.id})}
                    style={styles.Profile}>
                    <Text style={styles.textProfil}>Certificates</Text>
                    <Icon style={styles.icon} type="MaterialCommunityIcons" name="chevron-right"/>
                </TouchableOpacity>
                <Hr lineColor="#e5e3e3" width={1} />
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate("CallUs")}
                    style={styles.Profile}>
                    <Text style={styles.textProfil}>Call us</Text>
                    <Icon style={styles.icon} type="MaterialCommunityIcons" name="chevron-right"/>
                </TouchableOpacity>
                <Hr lineColor="#e5e3e3" width={1} />
                <TouchableOpacity
                    onPress={() => this.logout()}>
                    <View style={styles.Profile}>
                        <Text style={styles.textProfil}>Logout</Text>
                        <Icon style={styles.icon} type="MaterialCommunityIcons" name="chevron-right" />
                    </View>
                </TouchableOpacity>

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
        height: 70,
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
});
const mapStateToProps = ({ user }) => ({
    user
});

const mapDispatchToProps = {
    setUser
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Profile);