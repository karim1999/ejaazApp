import React, { Component } from 'react';
import {StyleSheet, View, ActivityIndicator, AsyncStorage} from 'react-native';
import {
    Button,
    Item,
    Text,
    Input,
    Form,
    Icon,
    Label,
    Textarea,
    Picker,
    Toast,
    ListItem,
    Right, Radio, Left,DatePicker
} from 'native-base';
import AppTemplate from "../appTemplate";
import ImagePicker from "react-native-image-picker";
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker';
import {connect} from "react-redux";
import {setCategories} from "../../../reducers";
import axios from "axios/index";
import Server from "../../../constants/config";
import UserCourses from "../UserCourses";

class AddCourse extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            title: "",
            description: "",
            price: "",
            type: 1,
            category: 1,
            hours: "",
            img: "",
            video: "",
            center: "",
            address: "",
            date_start: "",

        };
        this.setDate = this.setDate.bind(this);
    }
    setDate(newDate) {
        this.setState({ chosenDate: newDate });
    }
    selectImage(){
        let options = {
            title: "Course Image",
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
                console.log(response.data);
                this.setState({
                    img: response.uri
                });
            }
        });

    }
    selectVideo(){
        DocumentPicker.show({
            filetype: [DocumentPickerUtil.allFiles()],
        },(error,res) => {
            this.setState({
                video: res.uri
            });
        })
    }
    addOrEdit(){
        if(this.state.type == 1){
            if(this.state.title == "" || this.state.price == "" || this.state.description == "" || this.state.hours == ""
            || this.state.img == "" || this.state.center == "" || this.state.address == "" || this.state.date_start == ""){
                Toast.show({
                    text: 'please fill out fields.',
                    type: "danger",
                    buttonText: 'Okay'
                });
            }else{
                this.setState({
                    isLoading: true
                });
                return AsyncStorage.getItem('token').then(userToken => {
                    let data = new FormData();
                    data.append('title', this.state.title);
                    data.append('type', this.state.type);
                    data.append('price', this.state.price);
                    data.append('category', this.state.category);
                    data.append('description', this.state.description);
                    data.append('hours', this.state.hours);
                    data.append('center', this.state.center);
                    data.append('address', this.state.address);
                    data.append('date_start', new Date(this.state.date_start).toLocaleDateString('en-GB'));
                    if (this.state.img) {
                        data.append('img', {
                            name: "img",
                            uri: this.state.img,
                            type: 'image/png'
                        });
                    }
                    if (this.state.video) {
                        data.append('video', {
                            name: "video",
                            uri: this.state.video,
                            type: 'image/png'
                        });
                    }
                    return axios.post(Server.url + 'api/addcourses?token='+userToken, data).then(response => {
                        this.setState({
                            isLoading: false,
                        });
                        Toast.show({
                            text: "A Course was added successfully",
                            buttonText: "Ok",
                            type: "success"
                        });
                        this.props.navigation.navigate("UserCourses");
                    }).catch(error => {
                        alert(error.data)
                    })
                }).then(() => {
                    this.setState({
                        isLoading: false
                    });
                });
            }
        }else if(this.state.type == 2){
            if(this.state.title == "" || this.state.price == "" || this.state.description == "" || this.state.hours == ""
            || this.state.img == "")
            {
                Toast.show({
                    text: 'please fill out fields.',
                    type: "danger",
                    buttonText: 'Okay'
                });
            }else{

                this.setState({
                    isLoading: true
                });
                return AsyncStorage.getItem('token').then(userToken => {
                    let data = new FormData();
                    data.append('title', this.state.title);
                    data.append('type', this.state.type);
                    data.append('price', this.state.price);
                    data.append('category', this.state.category);
                    data.append('description', this.state.description);
                    data.append('hours', this.state.hours);
                    if (this.state.img) {
                        data.append('img', {
                            name: "img",
                            uri: this.state.img,
                            type: 'image/png'
                        });
                    }
                    if (this.state.video) {
                        data.append('video', {
                            name: "video",
                            uri: this.state.video,
                            type: 'image/png'
                        });
                    }
                    return axios.post(Server.url + 'api/addcourses?token='+userToken, data).then(response => {
                        this.setState({
                            isLoading: false,
                        });
                        Toast.show({
                            text: "A Course was added successfully",
                            buttonText: "Ok",
                            type: "success"
                        });
                        this.props.navigation.navigate("UserCourses");
                    }).catch(error => {
                        alert(error.data)
                    })
                }).then(() => {
                    this.setState({
                        isLoading: false
                    });
                });

            }
        }   
    }
    render() {
        return (
            <AppTemplate back navigation={this.props.navigation} title="Add Course">
                <View style={styles.all}>
                    <Form style={styles.container}>
                        <Item style={{height: 70}}>
                            <Icon type="FontAwesome" name='pencil' />
                            <Label>Title</Label>
                            <Input onChangeText={(title) => this.setState({title})}
                                   value={this.state.title}
                                   placeholder="ex:Web Development..."
                                   placeholderTextColor="#ccc5c5"
                            />
                        </Item>
                        <Item style={{height: 70}}>
                            <Icon name='md-time' />
                            <Label>Number of hours</Label>
                            <Input onChangeText={(hours) => this.setState({hours})}
                                   value={this.state.hours}
                                   keyboardType='numeric'
                                   placeholder="ex:33h..."
                                   placeholderTextColor="#ccc5c5"
                            />
                        </Item>
                        <Item style={{height: 70}}>
                            <Icon type="FontAwesome" name='dollar' />
                            <Label>Price</Label>
                            <Input onChangeText={(price) => this.setState({price})}
                                   value={this.state.price}
                                   keyboardType='numeric'
                                   placeholder="ex:20$..."
                                   placeholderTextColor="#ccc5c5"
                            />
                        </Item>
                        <Item style={{height: 70}}>
                            <Icon name='ios-folder-open' />
                            <Label>Categories</Label>
                            <Picker
                                mode="dropdown"
                                iosIcon={<Icon name="ios-arrow-down-outline" />}
                                style={{ width: undefined }}
                                placeholder="Select your Category"
                                placeholderStyle={{ color: "#bfc6ea" }}
                                placeholderIconColor="#007aff"
                                selectedValue={this.state.category}
                                onValueChange={(itemValue, itemIndex) => this.setState({ category: itemValue})}
                            >
                                {this.props.categories.map((category) => (
                                    <Picker.Item key={category.id} label={category.name} value={category.id} />
                                ))}
                            </Picker>
                        </Item>
                        <Item style={{height: 70}}>
                            <Icon name='md-images' />
                            <Label>Image</Label>
                            <Button
                                style={{alignSelf: "center"}}
                                onPress={() => this.selectImage()} light>
                                <Text>
                                    {
                                        (this.state.img) && (
                                            <Icon name="md-checkmark-circle" style={{color: "green", fontSize: 17, marginRight: 10}} />
                                        )
                                    }
                                     Select</Text>
                            </Button>
                        </Item>
                        <Item style={{height: 70}}>
                            <Icon name='ios-videocam' />
                            <Label>Orientation Video</Label>
                            <Button
                                style={{alignSelf: "center"}}
                                onPress={() => this.selectVideo()} light>
                                <Text>
                                    {
                                        (this.state.video) && (
                                            <Icon name="md-checkmark-circle" style={{color: "green", fontSize: 17, marginRight: 10}} />
                                        )
                                    }
                                     Select</Text>
                            </Button>
                        </Item>
                        <ListItem
                            onPress={(type) => {this.setState({type: 1})}}
                        >
                            <Left>
                                <Text>In Door</Text>
                            </Left>
                            <Right>
                                <Radio selected={this.state.type === 1}
                                       onPress={(type) => {this.setState({type: 1})}}
                                />
                            </Right>
                        </ListItem>
                        <ListItem
                            onPress={(type) => {this.setState({type: 2})}}
                        >
                            <Left>
                                <Text>Online</Text>
                            </Left>
                            <Right>
                                <Radio selected={this.state.type === 2}
                                       onPress={(type) => {this.setState({type: 2})}}
                                />
                            </Right>
                        </ListItem>
                        {
                            (this.state.type == 1)?
                            (
                                <Form>
                                    <Item style={{height: 70}}>
                                    <Icon type="FontAwesome" name='pencil' />
                                    <Label>Center name</Label>
                                    <Input onChangeText={(center) => this.setState({center})}
                                        placeholder="Center name..."
                                        placeholderTextColor="#ccc5c5"
                                    />
                                    
                                    </Item>
                                    <Item style={{height: 70}}>
                                    <Icon type="FontAwesome" name='pencil' />
                                    <Label>Address</Label>
                                    <Input onChangeText={(address) => this.setState({address})}
                                        placeholder="Address..."
                                        placeholderTextColor="#ccc5c5"
                                    />
                                    </Item>
                                    <Item style={{height: 70}}>
                                        <Icon type="FontAwesome" name='hourglass-end' />
                                        <Label>Date start</Label>
                                        <DatePicker
                                            defaultDate={new Date((this.state.date_start))}
                                            minimumDate={new Date(1990, 1, 1).getTime()}
                                            maximumDate={new Date(2018, 12, 31).getTime()}
                                            locale={"en"}
                                            timeZoneOffsetInMinutes={undefined}
                                            modalTransparent={false}
                                            animationType={"fade"}
                                            androidMode={"default"}
                                            placeHolderText='Select date'
                                            textStyle={{ color: "green" }}
                                            placeHolderTextStyle={{ color: "#cacaca" }}
                                            onDateChange={(val) => this.setState({date_start: val})}
                                        />
                                    </Item>
                                </Form>
                            )
                            :(
                               <Text></Text> 
                            )
                        }
                        <Item style={{height: 70, borderColor: "transparent", paddingBottom: 0, marginBottom: 0}} underline={false}>
                            <Icon type="FontAwesome" name='info' />
                            <Text>Description</Text>
                        </Item>
                        <Item style={{marginBottom: 20}}>
                            <Textarea
                                style={{height: 200, paddingTop: 0, marginTop: 0, flex: 1}}
                                rowSpan={5}
                                bordered
                                onChangeText={(description) => this.setState({description})}
                                placeholder="Write more about the course"
                                placeholderTextColor="#ccc5c5"
                                value={this.state.description}
                            />
                        </Item>
                        <Button
                            onPress={() => this.addOrEdit()}
                            style={{flexDirection: "row", backgroundColor: '#6483f7'}}
                            block light
                        >
                            <Text>Save</Text>
                            {this.state.isLoading && (
                                <ActivityIndicator size="small" color="#000000" />
                            )}
                        </Button>
                    </Form>
                </View>
            </AppTemplate>
        );
    }
}

const styles = StyleSheet.create({
    all:{
        padding:20,
        backgroundColor: '#f1f1f1',
    },
    container:{
        backgroundColor: '#fff',
        borderRadius: 10,
        flex: 1,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        padding: 20
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
const mapStateToProps = ({ categories }) => ({
    categories
});

const mapDispatchToProps = {
    setCategories
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddCourse);