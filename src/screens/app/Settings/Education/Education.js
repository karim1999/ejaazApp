import React, { Component } from 'react';
import { StyleSheet, View, ActivityIndicator, AsyncStorage, FlatList} from 'react-native';
import {Container, Textarea, Button, Icon, Text, Input, Item, Form, Label, DatePicker, Toast,} from 'native-base';
import Server from "../../../../constants/config"
import {connect} from "react-redux";
import axios from "axios"
import AppTemplate from "../../appTemplate";
import Color from "../../../../constants/colors";

export default class Education extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.navigation.state.params,
            chosenDate: new Date(),
            isLoading: false,
            cloneEducation: [],
            name: "",
            institution: "",
            description: "",
            start_date: 0,
            end_date: 0
        };
        // this.setDate = this.setDate.bind(this);
    }
    // setDate(newDate) {
    //     this.setState({ chosenDate: newDate });
    // }

    _onLoad(){
        this.setState({
            isLoading: true
        });
        return AsyncStorage.getItem('token').then(userToken=>{
            return axios.get(Server.url + 'api/user/education?token=' + userToken)
            .then(response=>{
                this.setState({
                    isLoading:false,
                    cloneEducation: response.data,
                })
            }).catch(error => {
                Toast.show({
                    text: 'Error reaching the server.',
                    type: "danger",
                    buttonText: 'Okay'
                });
            })
        })
    }
    async componentDidMount(){
        await this._onLoad();
    }

    render() {
        return (
            <AppTemplate interface onLoad={()=> this._onLoad()} back navigation={this.props.navigation} title="Education">
                
                <Button
                    dark
                    onPress={() => this.props.navigation.navigate("AddEducation", {isEducation: false})}
                    style={{width: "100%", alignItems: "center"}}><Text style={{flex: 1}}> Add Education </Text>
                    {this.state.isLoading && (
                        <ActivityIndicator size="small" color="#000000" />
                    )}
                    <Icon name="ios-add-circle" style={{color: "#FFFFFF", fontSize: 25}}/>
                </Button>

                <View style={styles.container}>
                {
                    (this.state.isLoading)? (
                        <View>
                            <ActivityIndicator style={{paddingTop: 20}} size="large" color={Color.mainColor} />
                        </View>
                    ): (
                        <View>
                            <FlatList
                                ListEmptyComponent={
                                    <Text style={{alignItems: "center", justifyContent: "center", flex: 1, textAlign: "center"}}>No Education were found</Text>
                                }
                                data={this.state.cloneEducation}
                                renderItem={({item}) => (
                                    <Item style={{height: 90, flexDirection: 'row', padding: 5}}
                                            onPress={() => this.props.navigation.navigate("AddEducation", {...item, isEducation: true, education_id: item.id})}
                                    >
                                    <Icon type="FontAwesome" name='institution' style={{padding: 5}}/>
                                        <View style={{paddingLeft: 20}}>
                                            <Label>{item.name}</Label>
                                            <Text>{item.institution}</Text>
                                        </View>
                                        <View style={{position: 'absolute', right: 10}}>
                                            <Text note>{item.start_date}</Text>
                                            <Text note>{item.end_date}</Text>
                                        </View>
                                    </Item>

                                )}
                                keyExtractor = { (item, index) => index.toString() }
                            />
                        </View>
                    )
                    }

                </View>
            </AppTemplate>            
            // <Container style={styles.all}>
            //     <Form style={styles.container}>
            //         <Item style={{height: 70}}>
            //             <Icon type="FontAwesome" name='pencil' />
            //             <Label>Title</Label>
            //             <Input onChangeText={(name) => this.setState({name})}
            //                 placeholder="Name of your education...."
            //                 placeholderTextColor="#ccc5c5"
            //             />
            //         </Item>
            //         <Item style={{height: 70}}>
            //             <Icon type="FontAwesome" name='institution' />
            //             <Label>institution</Label>
            //             <Input onChangeText={(institution) => this.setState({institution})}
            //                 keyboardType='numeric' placeholder="institution of your education...."
            //                 placeholderTextColor="#ccc5c5"
            //             />
            //         </Item>
            //         <Item style={{height: 70}}>
            //             <Icon type="FontAwesome" name='hourglass-start' />
            //             <Label>Start_date</Label>
            //             <DatePicker
            //                 defaultDate={new Date().getTime()}
            //                 minimumDate={new Date(1990, 1, 1).getTime()}
            //                 maximumDate={new Date(2018, 12, 31).getTime()}
            //                 locale={"en"}
            //                 timeZoneOffsetInMinutes={undefined}
            //                 modalTransparent={false}
            //                 animationType={"fade"}
            //                 androidMode={"default"}
            //                 placeHolderText="Select date"
            //                 textStyle={{ color: "green" }}
            //                 placeHolderTextStyle={{ color: "#cacaca" }}
            //                 onDateChange={(val) => this.setState({start_date: val})}
            //         />
            //         </Item>
            //         <Item style={{height: 70}}>
            //             <Icon type="FontAwesome" name='hourglass-end' />
            //             <Label>End_date</Label>
            //             <DatePicker
            //                 defaultDate={new Date().getTime()}
            //                 minimumDate={new Date(1990, 1, 1).getTime()}
            //                 maximumDate={new Date(2018, 12, 31).getTime()}
            //                 locale={"en"}
            //                 timeZoneOffsetInMinutes={undefined}
            //                 modalTransparent={false}
            //                 animationType={"fade"}
            //                 androidMode={"default"}
            //                 placeHolderText="Select date"
            //                 textStyle={{ color: "green" }}
            //                 placeHolderTextStyle={{ color: "#cacaca" }}
            //                 onDateChange={(val) => this.setState({end_date: val})}
            //         />
            //         </Item>
            //         <Item style={{height: 70, borderColor: "transparent", paddingBottom: 0, marginBottom: 0}} underline={false}>
            //             <Icon type="FontAwesome" name='info' />
            //             <Text>Description</Text>
            //         </Item>
            //         <Item style={{marginBottom: 20}}>
            //             <Textarea
            //                 style={{height: 200, paddingTop: 0, marginTop: 0}}
            //                 style={{flex: 1}}
            //                 rowSpan={5}
            //                 bordered
            //                 onChangeText={(description) => this.setState({description})}
            //                 placeholder="Write more about your education"
            //                 placeholderTextColor="#ccc5c5"
            //                 value={this.state.description}
            //             />
            //         </Item>
            //         <Button
            //             onPress={this.onEducationPressed.bind(this)}
            //             style={{flexDirection: "row", backgroundColor: '#6483f7'}}
            //             block light>
            //             <Text>Save</Text>
            //             {this.state.isLoading && (
            //                 <ActivityIndicator style={{}} size="small" color="#000000" />
            //             )}
            //         </Button>
            //     </Form>
            // </Container>
        );
    }
}

const styles = StyleSheet.create({
    all: {
        backgroundColor: '#f1f1f1',
        padding: 20,
        height: '100%',
        flex: 1,
        flexDirection: "row"
    },
    container: {
        alignSelf: 'center',
        width: '100%',
        backgroundColor: '#fff',
    },
    content:{
        flexDirection: 'row',
        marginBottom:25,
    },
    contentDescription:{
    },
    input:{
        width: 200,
        padding: 10,
        height:30,
        borderRadius: 5,
        position: 'absolute',
        right: 0,
    },
    inputDescription:{
        width: 300,
        padding: 10,
        height:120,
        borderRadius: 5,
        marginTop: 7
    },
    inputText:{
        color: '#918f8f',
        fontSize: 14,
    },
    date:{
        position: 'absolute',
        right: 15,
    },
    button:{
        backgroundColor: '#6483f7',
        position: 'absolute',
        right: 20,
        bottom: 10
    },
});