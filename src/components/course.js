import React, { Component } from 'react';
import {Button, Card, CardItem, Icon, Text} from 'native-base';
import {Image, StyleSheet, View} from "react-native";
import Server from "../constants/config";
import _ from "lodash";
export default class Course extends Component {
    render() {
        return (
            <View style={styles.viewDirection}>
                <Card style={styles.card}>
                    <CardItem cardBody>
                        <Image source={{uri: Server.storage+this.props.img}} style={styles.image}/>
                    </CardItem>
                    <CardItem header style={{paddingTop: 5, paddingBottom: 0}}>
                        <Text style={styles.cardText}>{_.truncate(this.props.title)}</Text>
                    </CardItem>
                    <View>
                        <Text style={styles.carditemText}>
                            {_.truncate(this.props.user_name)}
                        </Text>
                    </View>


                    <View style={styles.viewContentStar}>
                        <Icon active style={styles.star} type="MaterialCommunityIcons" name="star" />
                        <Icon active style={styles.star} type="MaterialCommunityIcons" name="star" />
                        <Icon active style={styles.star} type="MaterialCommunityIcons" name="star" />
                        <Icon active style={styles.star} type="MaterialCommunityIcons" name="star" />
                        <Icon active style={styles.star} type="MaterialCommunityIcons" name="star" />
                        {/*<Text style={styles.viewContentStarText}>4.6</Text>*/}
                    </View>

                    <View footer style={styles.footer}>
                        <Button transparent>
                            <Text style={styles.footerText}>{this.props.price}</Text>
                            <Text style={styles.footerIcon}>SAR</Text>
                        </Button>
                    </View>
                </Card>

            </View>

        );
    }
}
const styles = StyleSheet.create({
    container: {
        padding:5,
    },
    containerH1:{
        marginLeft:10
    },
    viewDirection:{
        flexDirection:'row',
    },
    card:{
        width:150,
        marginLeft:10,
        borderRadius:10,
    },
    image:{
        height: 100,
        width: 150,
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
        flex: 1
    },
    cardText:{
        color:'#000',
        fontSize:15,
    },
    carditemText:{
        color: '#1e1e1e',
        fontSize: 12,
        alignSelf: 'flex-start',
        paddingLeft: 20,
        paddingBottom: 5,
        padding: 5
    },
    viewContentStar:{
        flexDirection: 'row',
        alignSelf: 'flex-start',
        paddingLeft: 15,
    },
    star:{
        color: '#b8d533',
        fontSize: 15,
    },
    viewContentStarText:{
        fontSize: 12,
        color: '#5f5f5f',
        paddingTop: 5,
        paddingLeft: 4
    },
    footer:{
        alignSelf:'flex-end',
        marginRight: 10,
    },
    footerText:{
        backgroundColor:'#ebebec',
        borderTopLeftRadius:5,
        borderBottomLeftRadius:5,
    },
    footerIcon:{
        backgroundColor:'#cbb6b6',
        borderTopRightRadius:5,
        borderBottomRightRadius:5,
    }

});
