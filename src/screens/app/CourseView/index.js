import React, { Component } from 'react';
import {StyleSheet, Image, View, FlatList, ActivityIndicator, AsyncStorage} from 'react-native';
import {
    Container,
    Content,
    Button,
    Icon,
    Text,
    Body,
    H2,
    H3,
    Item,
    Input,
    Toast,
    Picker,
    Form,
    CardItem, Left, Thumbnail
} from 'native-base';
import AppTemplate from "../appTemplate";
import axios from "axios";
import Server from "../../../constants/config";
import _ from "lodash";
import {setCart} from "../../../reducers";
import {connect} from "react-redux";

class CourseView extends Component {
    constructor(props){
        super(props);
        this.state={
            course: this.props.navigation.state.params,
            isLoading: false,
        }
    }

    onValueChange() {
        this.setState({
            selected: this.props.navigation.navigate('EditCourse', {...this.state.course})
        });
    }

    onCommentPressed(){
        if(this.state.comment == ""){

            Toast.show({
                text: 'comment cannot be empty.',
                type: "danger",
                buttonText: 'Okay'
            });

        }else{
            this.setState({
                isCommented:true
            });

            return axios.post(Server.url+'api/course/1/comment',{

                comment: this.state.comment

            }).then(response => {
                Toast.show({
                    text: 'Successfully commented.',
                    type: 'success',
                    buttonText: 'Okay'
                });
                this.setState({
                    isCommented: false,
                });
            });
        }
    }

    addToCart(){
        this.setState({
            isLoading: true,
        });
        AsyncStorage.getItem('token').then(userToken => {
            return axios.post(Server.url+'api/cart/'+this.state.course.id+'?token='+userToken).then(response => {
                this.setState({
                    isLoading: false,
                });
                this.props.setCart(response.data);
            }).catch(error => {
                this.setState({
                    isLoading: false,
                });
                Toast.show({
                    text: "Error reaching the server.",
                    buttonText: "Ok",
                    type: "danger"
                })
            })
        });
    }
    render() {
        return (
            <AppTemplate favorite course_id={this.state.course.id} back navigation={this.props.navigation} title={this.state.course.title}>
                <Container style={styles.all}>
                    <Content>
                        <View style={styles.container}>
                            <View style={styles.paddingContent}>
                                <Form>
                                    <Picker
                                        note
                                        mode="dropdown"
                                        style={{ width: 50, position:'absolute', right:0, top:0}}
                                        selectedValue={this.state.selected}
                                        onValueChange={this.onValueChange.bind(this)}
                                    >
                                        <Picker.Item label="Select" value="key0" />
                                        <Picker.Item label="Edit" value="key1" />
                                        <Picker.Item label="Delete" value="key2" />
                                    </Picker>
                                </Form>
                                <CardItem style={{ paddingBottom: 30, paddingLeft: 0 }}>
                                    <Left>
                                        <Thumbnail source={{uri: Server.storage+this.state.course.img}} />
                                        <Body>
                                        <Text>{this.state.course.user_name}</Text>
                                        <Text note>{this.state.course.created_at}</Text>
                                        </Body>
                                    </Left>
                                </CardItem>
                                <H2 style={styles.viewH2}>{this.state.course.title}</H2>
                                <Text style={styles.viewText}>
                                    {this.state.course.description}
                                </Text>

                                {/*<H2 style={styles.viewH2Padd}>{this.state.course.user_name}</H2>*/}
                                {/*<Text style={styles.viewText}>*/}
                                    {/*{this.state.course.description}*/}
                                {/*</Text>*/}
                            </View>
                            <Image source={{uri: Server.storage+this.state.course.img}} style={styles.image}/>

                            <View style={styles.paddingContent}>
                                <H2 >Price</H2>
                                <Button transparent>
                                    <Text style={styles.footerText}>{this.state.course.price}</Text>
                                    <Text style={styles.footerIcon}>$</Text>
                                </Button>
                                <H2>Rating</H2>
                                <View style={styles.viewContentStar}>
                                    <Icon active style={styles.star} type="MaterialCommunityIcons" name="star" />
                                    <Icon active style={styles.star} type="MaterialCommunityIcons" name="star" />
                                    <Icon active style={styles.star} type="MaterialCommunityIcons" name="star" />
                                    <Icon active style={styles.star} type="MaterialCommunityIcons" name="star" />
                                    <Icon active style={styles.star} type="MaterialCommunityIcons" name="star" />
                                </View>
                                {
                                    (_.find(this.props.user.courses, course => course.id == this.state.course.id)) && (
                                        !_.find(this.props.user.cart, course => course.id == this.state.course.id) ? (
                                            <Button
                                                onPress={() => this.addToCart()}
                                                style={styles.button}><Text> Add To Cart </Text>
                                                {this.state.isLoading && (
                                                    <ActivityIndicator style={{}} size="small" color="#000000" />
                                                )}
                                            </Button>
                                        ) : (
                                            <Button
                                                onPress={() => this.props.navigation.navigate("Cart")}
                                                style={styles.button}><Text> Go To Cart </Text></Button>
                                        )
                                    )

                                }
                                {/*<Text style={styles.viewH2Padd}>Reviews and comments</Text>*/}
                                {/*<Item regular style={styles.input}>*/}
                                {/*<Input style={styles.inputText} placeholder="Write comment..." placeholderTextColor="#ccc5c5"*/}
                                {/*onChangeText={(val) => this.setState({comment: val})}/>*/}
                                {/*</Item>*/}
                                {/*<Button info style={styles.button} onPress={this.onCommentPressed.bind(this)}>*/}
                                {/*<Text style={styles.buttonText}> Submit </Text>*/}
                                {/*{this.state.isCommented && (*/}
                                {/*<ActivityIndicator style={{}} size="small" color="#000000" />*/}
                                {/*)}*/}
                                {/*</Button>*/}
                                {/* <View style={styles.reviewComment}>
                                <Image source={require("../../../images/images.png")} style={styles.imageComment}/>
                                <Text style={styles.commentName}>Abdelrahman Labib</Text>
                                <View style={styles.viewContentStarComment}>
                                  <Icon active style={styles.starComment} type="MaterialCommunityIcons" name="star" />
                                  <Icon active style={styles.starComment} type="MaterialCommunityIcons" name="star" />
                                  <Icon active style={styles.starComment} type="MaterialCommunityIcons" name="star" />
                                  <Icon active style={styles.starComment} type="MaterialCommunityIcons" name="star" />
                                  <Icon active style={styles.starComment} type="MaterialCommunityIcons" name="star" />
                                </View>
                              </View>
                              <Text style={styles.commentText}>Lsdasdasdsdsdasd</Text> */}
                            </View>
                        </View>
                    </Content>
                </Container>
            </AppTemplate>
        );
    }
}

const styles = StyleSheet.create({
    all:{
        backgroundColor: '#f1f1f1',
        padding:20,
        height: '100%',
    },
    container: {
        alignSelf: 'center',
        width: '100%',
        backgroundColor: '#fff',
    },
    paddingContent:{
        padding: 20
    },
    viewH2Padd:{
        paddingTop: 15,
    },
    viewText:{
        color: '#464646',
        fontSize: 15,
    },
    image:{
        paddingTop: 20,
        height: 150,
        width: null,
        flex: 1
    },
    footerText:{
        backgroundColor:'#f1f1f1',
        borderTopLeftRadius:5,
        borderBottomLeftRadius:5,
        paddingLeft: 30,
        paddingRight: 30,
    },
    footerIcon:{
        backgroundColor:'#0f0f0f',
        color: '#fff',
        borderTopRightRadius:5,
        borderBottomRightRadius:5,
    },
    viewContentStar:{
        flexDirection: 'row',
    },
    star:{
        color: '#b8d533'
    },
    button:{
        backgroundColor: '#6483f7',
        alignSelf: 'flex-end',
        padding: 15,
    },
    reviewComment:{
        flexDirection: 'row',
        paddingTop: 10,
    },
    imageComment:{
        width: 30,
        height: 30,
        borderRadius: 100,
        borderWidth: 2,
        borderColor: '#e5e5e5',
    },
    viewContentStarComment:{
        flexDirection: 'row',
        position: 'absolute',
        right: 25,
        bottom: 5
    },
    starComment:{
        color: '#b8d533',
        fontSize: 15,
    },
    commentName:{
        paddingLeft: 10,
        paddingTop: 5
    },
    commentText:{
        paddingTop: 5
    },
    input:{
        width: 350,
        marginBottom: 10,
        marginTop: 10,
        padding: 10,
        height: 40,
        alignSelf: 'center',
        borderColor: '#000'
    },
    inputText:{
        color: '#000',
        fontSize: 16
    },

});
const mapStateToProps = ({ categories, user }) => ({
    user
});

const mapDispatchToProps = {
    setCart,
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CourseView);