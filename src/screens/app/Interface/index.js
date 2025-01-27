import React, { Component } from 'react';
import {StyleSheet, View, FlatList, AsyncStorage, Dimensions, TouchableOpacity, ActivityIndicator} from 'react-native';
import { Text, H2,Button } from 'native-base';
import axios from "axios";
import Server from "../../../constants/config";
import AppTemplate from "../appTemplate";
import Color from "../../../constants/colors";
import CourseBox from "../../../components/courseBox"
import {setUser} from "../../../reducers";
import {connect} from "react-redux";


class Interface extends Component {
    constructor(props){
        super(props);
        this.state={
            isLoading: false,
            cloneInterface:[],
            cloneTrainer:[],
        }
    }
    _onLoad(){
        this.setState({
            isLoading: true
        });
        return AsyncStorage.getItem('token').then(userToken => {
            return axios.get(Server.url + 'api/courses?token='+userToken).then(response => {
                this.setState({
                    isLoading: false,
                    cloneInterface: response.data
                });
            }).catch(error => {

            })
        }).then(() => {
            this.setState({
                isLoading: false
            });
        });
    }
    async componentDidMount(){

        await this._onLoad();

    }


    render() {
        return (
            <AppTemplate fab={this.props.user.type == 2} interface={this.props.user.type == 1} onLoad={()=> this._onLoad()} navigation={this.props.navigation} title="Home">
              {
                (this.props.user.email == 'abdolabib602@yahoo.com')?(
                      <Button
                          light
                          style={{width: "100%"}}><Text style={{fontSize:13}}> We do not support online payments, All payments will be handled with the instructors hand-to-hand. </Text>
                      </Button>

                ):(
                  <Text></Text>
                )
              }
                <View style={styles.all}>
                    {
                        (this.state.isLoading)? (
                            <View>
                                <ActivityIndicator style={{paddingTop: 20}} size="large" color={Color.mainColor} />
                            </View>
                        ):(this.props.user.type == 2) ?
                        (
                            <FlatList
                            ListEmptyComponent={
                                <Text style={{alignItems: "center", justifyContent: "center", flex: 1, textAlign: "center"}}>Add courses</Text>
                            }
                            data={this.props.user.courses}
                            renderItem={({item}) => (
                                <View style={{padding: 0}}>
                                            <TouchableOpacity
                                                onPress={() => this.props.navigation.navigate("CourseView", {...item, user_name: item.user.name, user_id: item.user.id,user_img: item.user.img})}>
                                                <CourseBox {...item} user_name={item.user.name} />
                                            </TouchableOpacity>

                                </View>
                            )}
                            keyExtractor = { (item, index) => index.toString() }
                        />
                        ):
                        (
                            <View>
                            <FlatList
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle ={styles.searchTitle}
                                data={this.state.cloneInterface}
                                renderItem={({item}) => (
                                    <TouchableOpacity
                                        onPress={() => this.props.navigation.navigate("ShowCategories", {...item})} style={{alignSelf: 'flex-start'}}>
                                        <Text style={styles.searchName}>{item.name}</Text>
                                    </TouchableOpacity>
                                )}
                                keyExtractor = { (item, index) => index.toString() }
                            />

                            <FlatList
                                ListEmptyComponent={
                                    <Text style={{alignItems: "center", justifyContent: "center", flex: 1, textAlign: "center"}}>No categories were found</Text>
                                }
                                data={this.state.cloneInterface}
                                renderItem={({item}) => (
                                    <View style={{padding: 0}}>
                                        <View style={styles.container}>
                                        {
                                            (item.courses.length == 0)?
                                            (
                                                <Text></Text>
                                            ):
                                            (
                                                <H2 style={styles.containerH1}>{item.name}</H2>
                                            )
                                        }
                                        </View>
                                        {
                                            (item.courses && (
                                                <FlatList
                                                    data={item.courses}
                                                    renderItem={({item}) => (
                                                        <TouchableOpacity
                                                            onPress={() => this.props.navigation.navigate("CourseView", {...item, user_name: item.user.name, user_id: item.user.id,user_img: item.user.img})}>
                                                            <CourseBox {...item} user_name={item.user.name} />
                                                        </TouchableOpacity>
                                                    )}
                                                    keyExtractor = { (item, index) => index.toString() }
                                                />
                                            ))
                                        }
                                    </View>
                                )}
                                keyExtractor = { (item, index) => index.toString() }
                            />
                        </View>

                        )

                    }
                </View>
            </AppTemplate>
        );
    }
}

const styles = StyleSheet.create({
    all:{
        height: '100%',
        paddingLeft: 0,
        marginLeft: 0
    },
    container: {
    },
    containerH1:{
        alignSelf: 'flex-start',
        backgroundColor: '#6483f7',
        padding: 10,
        marginTop: 15,
        color: '#fff',
        alignItems: 'flex-start',
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        fontWeight: "bold",
        fontFamily: "times new roman",
        fontSize: 16,
    },
    searchName:{
        color: '#fff',
        backgroundColor: '#6483f7',
        padding: 5,
        borderRadius: 6,
        alignSelf: 'flex-start',
        fontSize: 16,
        marginLeft: 5
    },
    searchTitle:{
        flexDirection: 'row',
        padding: 10
    },

});

const mapStateToProps = ({ user }) => ({
    user,
});

const mapDispatchToProps = {
    setUser
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Interface);
