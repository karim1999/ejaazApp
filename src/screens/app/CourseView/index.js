import React, { Component } from 'react';
import {StyleSheet, Image, View, FlatList, ActivityIndicator, AsyncStorage, Alert, Slider, TouchableOpacity} from 'react-native';
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
    CardItem, Left, Thumbnail, List, ListItem, Right, Textarea, Label
} from 'native-base';
import AppTemplate from "../appTemplate";
import axios from "axios";
import Server from "../../../constants/config";
import _ from "lodash";
import {setCart, setUser, setJointCourses} from "../../../reducers";
import {connect} from "react-redux";
import Color from "../../../constants/colors";
import VideoPlayer from "react-native-video-controls";

class CourseView extends Component {
    constructor(props){
        super(props);
        this.state={
            course: this.props.navigation.state.params,
            isLoading: false,
            isReviewing: false,
            isGettingReviews: false,
            isCommented:false,
            isGettingComments:false,
            isApplying:false,
            reviews: [],
            rate: 1,
            review: "",
            comment: "",
            comments:[],
            isSetting: false,
            isDeleting: false,
            status: 0
        }
    }

    onValueChange() {
        this.setState({
            selected: this.props.navigation.navigate('EditCourse', {...this.state.course})
        });
    }

    applyCourse(){
        Alert.alert(
            "Are you sure",
            "You want to apply this course?",
            [
                {text: "Cancel", onPress: () => console.log('Cancel Pressed')},
                {text: "Ok", onPress: () => {
                    this.setState({
                        isApplying: true,
                    });
                    AsyncStorage.getItem('token').then(userToken => {
                        return axios.post(Server.url+'api/apply/'+this.state.course.id+'?token='+userToken,{
                            status: this.state.status
                        })
                        .then(response => {
                            this.props.setJointCourses(response.data);
                            Toast.show({
                                text: 'Successfully applying',
                                type: "success",
                                buttonText: 'Okay'
                            });
                            this.setState({
                                isApplying: false,
                            })
                        }).catch(error => {
                            this.setState({
                                isApplying: false,
                            });
                            Toast.show({
                                text: "Error reaching the server.",
                                buttonText: "Ok",
                                type: "danger"
                            })
                        })
                    });
                    }},
            ],
            { cancelable: false }
        )

    }

    componentDidMount(){
        this.setState({
            isGettingReviews: true,
            isGettingComments: true
        });
        axios.get(Server.url+'api/course/'+this.state.course.id+'/reviews').then(response => {
            this.setState({
                reviews: response.data
            });
        }).catch(error => {
            Toast.show({
                text: "Unknown error hs occurred",
                buttonText: "Ok",
                type: "danger"
            })
        }).then(() => {
            this.setState({
                isGettingReviews: false,
            });
        });

        axios.get(Server.url+'api/course/'+this.state.course.id+'/comments').then(response => {
            this.setState({
                comments: response.data
            });
        }).catch(error => {
            Toast.show({
                text: "Unknown error hs occurred",
                buttonText: "Ok",
                type: "danger"
            })
        }).then(() => {
            this.setState({
                isGettingComments: false,
            });
        })
    }
    deleteCourse(){
        Alert.alert(
            "Are you sure?",
            "No one will be able to access this course after deleting",
            [
                {text: "Cancel", onPress: () => console.log('Cancel Pressed')},
                {text: "Ok", onPress: () => {
                        this.setState({
                            isDeleting: true,
                        });
                        AsyncStorage.getItem('token').then(userToken => {
                            return axios.delete(Server.url+'api/course/'+this.state.course.id+'?token='+userToken).then(response => {
                                // alert(response.data);
                                this.props.navigation.navigate("Interface");
                                this.props.setUser(response.data.user);
                                this.setState({
                                    isLoading: false,
                                });
                                Toast.show({
                                    text: "The course was deleted successfully",
                                    buttonText: "Ok",
                                    type: "success"
                                })
                            }).catch(error => {
                                this.setState({
                                    isLoading: false,
                                });
                                Toast.show({
                                    text: "Unknown error hs occurred",
                                    buttonText: "Ok",
                                    type: "danger"
                                })
                            })
                        });
                    }},
            ],
            { cancelable: false }
        )
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
    createRating(rate){
        let i;
        let stars= [];
        for(i =0; i< rate; i++ ){
            stars.push(<Icon key={i} active style={styles.star} type="MaterialCommunityIcons" name="star" />);
        }
        for(i; i<5; i++){
            stars.push(<Icon key={i} active style={styles.star2} type="MaterialCommunityIcons" name="star" />);
        }
        return stars;
    }
    addReview(){
        this.setState({
            isReviewing: true,
        });
        AsyncStorage.getItem('token').then(userToken => {
            return axios.post(Server.url+'api/course/'+this.state.course.id+'/addReview?token='+userToken, {
                rate: this.state.rate,
                review: this.state.review
            }).then(response => {
                this.componentDidMount();
                this.setState({
                    isReviewing: false,
                });
            }).catch(error => {
                this.setState({
                    isReviewing: false,
                });
                Toast.show({
                    text: "Error reaching the server.",
                    buttonText: "Ok",
                    type: "danger"
                })
            })
        });
    }

    addComment(id){
        this.setState({
            isCommented: true,
        });
            AsyncStorage.getItem('token').then(userToken => {
                return axios.post(Server.url+'api/course/'+this.state.course.id+'/'+id+'/addComment?token='+userToken, {
                    comment: this.state.comment
                }).then(response => {
                    this.componentDidMount();
                    this.setState({
                        isCommented: false,
                    });
                }).catch(error => {
                    this.setState({
                        isCommented: false,
                    });
                    Toast.show({
                        text: "Error reaching the server.",
                        buttonText: "Ok",
                        type: "danger"
                    })
                })
            }) 
    }

    render() {
        return (
            <AppTemplate favorite course_id={this.state.course.id} back navigation={this.props.navigation} title={this.state.course.title}>
                {

                    
                    !_.find(this.props.user.courses, course => course.id == this.state.course.id) ? (
                        _.find(this.props.jointcourses, course => course.id == this.state.course.id && course.type == 2) ? (
                                <Button
                                    primary
                                    onPress={() => this.props.navigation.navigate("CourseName", {course_id: this.state.course.id})}
                                    style={{width: "100%", alignItems: "center"}}><Text style={{flex: 1}}> Open Course </Text>
                                    <Icon name="folder-video" type="Entypo" style={{color: "white", fontSize: 25}}/>
                                </Button>
                            ) :
                            (this.state.course.type == 2)?(
                            !_.find(this.props.user.cart, course => course.id == this.state.course.id) ? (
                                <Button
                                    success
                                    onPress={() => this.addToCart()}
                                    style={{width: "100%", alignItems: "center"}}><Text style={{flex: 1}}> Add to cart </Text>
                                    {this.state.isLoading && (
                                        <ActivityIndicator size="small" color="#000000" />
                                    )}
                                    <Icon name="ios-cart" style={{color: "#FFFFFF", fontSize: 25}}/>
                                </Button>
                            ) : (
                                <Button
                                    primary
                                    onPress={() => this.props.navigation.navigate("Cart")}
                                    style={{width: "100%", alignItems: "center"}}><Text style={{flex: 1}}> Go To Cart </Text>
                                    <Icon name="ios-cart" style={{color: "#FFFFFF", fontSize: 25}}/>
                                </Button>
                            )
                        ):
                            _.find(this.props.user.jointcourses, course => course.id == this.state.course.id) ? (
                                _.find(this.props.user.jointcourses, course => course.id == this.state.course.id && 
                                    course.pivot.status == 1) ? (
                                        <Button
                                            primary
                                            onPress={() => this.props.navigation.navigate("IndoorCourses", {...this.state.course, course_id: this.state.course.id})}
                                            style={{width: "100%", alignItems: "center"}}><Text style={{flex: 1}}> Open Course </Text>
                                            <Icon name="folder-video" type="Entypo" style={{color: "white", fontSize: 25}}/>
                                        </Button>
                                    
                                ):(
                                    <Text></Text>
                                )
        
                            ):(<Text></Text>)

                    ) : (
                        <Button onPress={() => this.setState({isSetting: !this.state.isSetting})} style={{width: "100%", alignItems: "center"}} dark><Text style={{flex: 1}}> Settings </Text>
                            <Icon name={this.state.isSetting? "ios-arrow-dropup-circle": "ios-arrow-dropdown-circle"} style={{color: "#FFFFFF", fontSize: 25}}/>
                        </Button>
                    )
                    

                                                         
                        
                }
                {
                        (this.state.course.type == 1) ? (
                            (this.props.user.type == 1) ? (
                                (new Date(this.state.course.date_start).toDateString() == new Date(new Date().getTime()).toDateString())?
                                (
                                    <Text></Text>
                                ):(
                                    _.find(this.props.user.jointcourses, course => course.id == this.state.course.id) ? (
                                        _.find(this.props.user.jointcourses, course => course.id == this.state.course.id && 
                                    course.pivot.status == 1 || course.pivot.status == 2 ) ? (
                                    <Text></Text>
                                ) :
    
                                _.find(this.props.user.jointcourses, course => course.id == this.state.course.id && 
                                    course.pivot.status == 0) ? (
                                        <Button
                                            primary
                                            style={{width: "100%", alignItems: "center"}}>
                                            <Text style={{flex: 1}}> Waiting to approve </Text>
                                            <Icon name="back-in-time" type="Entypo" style={{color: "#FFFFFF", fontSize: 25}}/>
                                        </Button>
                                        
                                    
                                    
                                ) : (
                                    <Text></Text>
                                )
                        ) : (
                            <Button
                            success
                            onPress={() => this.applyCourse()}
                            style={{width: "100%", alignItems: "center"}}>
                            <Text style={{flex: 1}}> Apply </Text>
                            {this.state.isApplying && (
                                <ActivityIndicator size="small" color="#000000" />
                            )}
                            <Icon name="ios-checkmark" style={{color: "#FFFFFF", fontSize: 25}}/>
                        </Button>
                        )

                                )

                                
                    ):(
                        <Text></Text>
                    )
                    ):(
                        <Text></Text>
                    )
                }
                {
                    (this.state.isSetting) && (
                        <List style={{backgroundColor: "#FFFFFF", right: 0}}>
                            <ListItem
                                onPress={() => this.props.navigation.navigate("Applying", {...this.state.course})}
                            >
                                <Text>Applying</Text>
                            </ListItem>
                            <ListItem
                                onPress={() => this.props.navigation.navigate("Videos", {...this.state.course})}
                            >
                                <Text>Videos</Text>
                            </ListItem>
                            <ListItem
                                onPress={() => this.props.navigation.navigate("EditCourse", {...this.state.course})}
                            >
                                <Text>Edit Course</Text>
                            </ListItem>
                            <ListItem
                                onPress={() => this.deleteCourse()}
                            >
                                <Text>Delete Course</Text>
                            </ListItem>
                        </List>
                    )
                }

                <View style={styles.all}>
                    <Content>
                        <View style={styles.container}>
                            <View style={styles.paddingContent}>
                            <TouchableOpacity onPress = {()=> this.props.navigation.navigate('ProfileInfo', {user_id: this.state.course.user_id})}>
                                <CardItem style={{ paddingBottom: 30, paddingLeft: 0 }}>
                                    <Left>
                                        <Thumbnail source={{uri: Server.storage+this.state.course.img}} />
                                        <Body>
                                        <Text>{this.state.course.user_name}</Text>
                                        <Text note>{this.state.course.created_at}</Text>
                                        </Body>
                                    </Left>
                                    </CardItem>
                                </TouchableOpacity>
                                <H2 style={styles.viewH2}>{this.state.course.title}</H2>
                                <Text style={styles.viewText}>
                                    {this.state.course.description}
                                </Text>

                                {
                                    (this.state.course.type == 1) ? (

                                        <H3>In door course</H3>
                                    ) : (
                                        <H3>Online course</H3> 
                                    )
                                }

                                {/*<H2 style={styles.viewH2Padd}>{this.state.course.user_name}</H2>*/}
                                {/*<Text style={styles.viewText}>*/}
                                {/*{this.state.course.description}*/}
                                {/*</Text>*/}
                            </View>
                            <Image source={{uri: Server.storage+this.state.course.img}} style={styles.image}/>

                            {
                                    (this.state.course.type == 1) ? (

                                        <Text></Text>
                                    ) : (
                                        
                                        <View style={styles.paddingContent}>
                                            <H2 >Orientation Video</H2>
                                            <VideoPlayer source={{uri: "https://www.sample-videos.com/video/mp4/720/big_buck_bunny_720p_1mb.mp4"}}   // Can be a URL or a local file.
                                                         ref={(ref) => {
                                                             this.player = ref
                                                         }}
                                                         style={styles.backgroundVideo}
                                                         onBuffer={this.onBuffer}                // Callback when remote video is buffering
                                                         onEnd={this.onEnd}                      // Callback when playback finishes
                                                         onError={this.videoError}
                                                         playInBackground={false}
                                                         paused={true}
                                                         selectedTextTrack={{
                                                             type: "title",
                                                             value: "Dubbing"
                                                         }}
                                            />
            
                                        </View>
                                    )
                                }

                            <View style={styles.paddingContent}>
                                <Button transparent style={{alignSelf:'flex-end'}}>
                                    <Text style={styles.footerText}>{this.state.course.price}</Text>
                                    <Text style={styles.footerIcon}>$</Text>
                                </Button>


                                
                                

                                <H2>Reviews</H2>

                                <List>
                                    {
                                        ((!_.find(this.state.reviews, review => review.user_id == this.props.user.id)) && (!_.find(this.props.user.courses, course => course.id == this.state.course.id)) && (_.find(this.props.user.jointcourses, course => course.id == this.state.course.id)))
                                        && (_.find(this.props.user.jointcourses, course => course.id == this.state.course.id &&  course.pivot.status == 1)) && (
                                            <Form>
                                                <Item style={{height: 70}}>
                                                    <Icon type="MaterialIcons" name='rate-review' />
                                                    <Label>Rate</Label>
                                                    <Slider
                                                        value={Number(this.state.rate)}
                                                        onValueChange={(rate) => this.setState({rate})}
                                                        style={{flex: 1}} step={1} maximumValue={5} minimumValue={1}/>
                                                        <Text>
                                                        {Number(this.state.rate)}
                                                        </Text>
                                                </Item>
                                                <Item style={{height: 70, borderColor: "transparent", paddingBottom: 0, marginBottom: 0}} underline={false}>
                                                    <Icon type="FontAwesome" name='info' />
                                                    <Text>Description</Text>
                                                </Item>
                                                <Item style={{marginBottom: 20}}>
                                                <Textarea
                                                    style={{height: 200, paddingTop: 0, marginTop: 0, flex: 1}}
                                                    rowSpan={5}
                                                    bordered
                                                    onChangeText={(review) => this.setState({review})}
                                                    placeholder="Write your review"
                                                    placeholderTextColor="#ccc5c5"
                                                    value={this.state.description}
                                                />
                                                </Item>
                                                <Button
                                                    onPress={() => this.addReview()}
                                                    style={{flexDirection: "row", backgroundColor: '#6483f7'}}
                                                    block light
                                                >
                                                    <Text>add</Text>
                                                    {this.state.isReviewing && (
                                                        <ActivityIndicator size="small" color="#000000" />
                                                    )}
                                                </Button>
                                            </Form>

                                        )
                                    }

                                    {
                                        (this.state.isGettingReviews)? (
                                            <View>
                                                <ActivityIndicator style={{paddingTop: 20}} size="large" color={Color.mainColor} />
                                            </View>
                                        ): (
                                            <View>
                                                <FlatList
                                                    ListEmptyComponent={
                                                        <Text style={{alignItems: "center", justifyContent: "center", flex: 1, textAlign: "center"}}>No reviews were found</Text>
                                                    }
                                                    data={_.reverse(this.state.reviews)}
                                                    renderItem={({item}) => (
                                                        <View>
                                                        
                                                        <ListItem avatar onPress = {()=> this.props.navigation.navigate('ProfileInfo', {user_id: item.user.id})}>
                                                            <Left>
                                                                <Thumbnail source={{uri: Server.storage+item.user.img}} />
                                                            </Left>
                                                            <Body>
                                                            <Text>{item.user.name}</Text>
                                                            <View style={styles.viewContentStar}>
                                                                {
                                                                    this.createRating(item.rate)
                                                                }
                                                            </View>
                                                            <Text note>{item.review}</Text>
                                                            </Body>                                                           
                                                        </ListItem>
                                                        {
                                                            (item.comments &&(
                                                                <FlatList
                                                                    data={item.comments}
                                                                    renderItem={({item}) => (
                                                                        <ListItem avatar onPress = {()=> this.props.navigation.navigate('ProfileInfo', {user_id: item.user_id})}>
                                                                            <Left>
                                                                                <Thumbnail source={{uri: Server.storage+item.user.img}} />
                                                                            </Left>
                                                                            <Body>
                                                                            <Text>{item.user.name}</Text>
                                                                            <Text note>{item.comment}</Text>
                                                                            </Body>                                                            
                                                                        </ListItem>
                                                                        )}
                                                                        keyExtractor = { (item, index) => index.toString() }
                                                                />
                                                                
                                                            ))
                                                        }

                                                        {
                                                            ((_.find(this.state.reviews, review => review.user_id == this.props.user.id)) && (_.find(this.props.user.courses, course => course.id == this.state.course.id))
                                                            && (_.find(this.state.reviews.comments, comment => comment.user_id == this.props.user.id)))
                                                            && (
                                                                    <Form>
                                                                        <Item style={{height: 30, borderColor: "transparent", paddingBottom: 0, marginBottom: 0}} underline={false}>
                                                                            <Icon type="FontAwesome" name='info' />
                                                                            <Text>Comment</Text>
                                                                        </Item>
                                                                        <Item style={{marginBottom: 10}}>
                                                                        <Textarea
                                                                            style={{height: 80, paddingTop: 0, marginTop: 0, flex: 1}}
                                                                            rowSpan={3}
                                                                            bordered
                                                                            onChangeText={(comment) => this.setState({comment})}
                                                                            placeholder="Write your comment"
                                                                            placeholderTextColor="#ccc5c5"
                                                                            value={this.state.description}
                                                                        />
                                                                        </Item>
                                                                        <Button
                                                                            onPress={() => this.addComment(item.id)}
                                                                            style={{flexDirection: "row", backgroundColor: '#6483f7'}}
                                                                            block light
                                                                        >
                                                                            <Text>add</Text>
                                                                            {this.state.isCommented && (
                                                                                <ActivityIndicator size="small" color="#000000" />
                                                                            )}
                                                                        </Button>
                                                                    </Form>
                                                            )
                                                        }

                                                        
                                                        </View>
                                                    )}
                                                    keyExtractor = { (item, index) => index.toString() }
                                                />
                                            </View>
                                        )
                                    }
                                </List>



                                {/*{*/}
                                {/*(_.find(this.props.user.courses, course => course.id == this.state.course.id)) && (*/}
                                {/*!_.find(this.props.user.cart, course => course.id == this.state.course.id) ? (*/}
                                {/*<Button*/}
                                {/*onPress={() => this.addToCart()}*/}
                                {/*style={styles.button}><Text> Add To Cart </Text>*/}
                                {/*{this.state.isLoading && (*/}
                                {/*<ActivityIndicator style={{}} size="small" color="#000000" />*/}
                                {/*)}*/}
                                {/*</Button>*/}
                                {/*) : (*/}
                                {/*<Button*/}
                                {/*onPress={() => this.props.navigation.navigate("Cart")}*/}
                                {/*style={styles.button}><Text> Go To Cart </Text></Button>*/}
                                {/*)*/}
                                {/*)*/}

                                {/*}*/}
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
                </View>
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
        color: '#b8d533',
        fontSize: 17
    },
    star2:{
        color: '#d7d7d7',
        fontSize: 17
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
    user,
    jointcourses: user.jointcourses
});

const mapDispatchToProps = {
    setCart,
    setUser,
    setJointCourses
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CourseView);