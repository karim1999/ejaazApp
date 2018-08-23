import React from 'react';
import {StyleSheet, View, FlatList, AsyncStorage} from 'react-native';
import { Container, Content, List, ListItem, Text, Left, Right, Icon, ActivityIndicator } from 'native-base';
import axios from "axios";
import Server from "../../../constants/config";
import AppTemplate from "../appTemplate";
import {connect} from "react-redux";
import {setCategories} from "../../../reducers";


class Categories extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
        }
    }
    componentDidMount(){
    }

    render() {
        return (
            <AppTemplate navigation={this.props.navigation} title="Categories">
                <View style={styles.container}>
                    <Container>
                        <Content>
                            <List>
                                <FlatList
                                    data={this.props.categories}
                                    renderItem={({item}) => (
                                        <ListItem>
                                            <Left>
                                                <Icon type="Ionicons" name='person' />
                                                <Text> {item.name}</Text>
                                            </Left>
                                            <Right>
                                                <Icon type="Ionicons" name="arrow-dropright" />
                                            </Right>
                                        </ListItem>
                                    )}
                                    keyExtractor = { (item, index) => index.toString() }
                                />
                            </List>
                        </Content>
                    </Container>
                </View>
            </AppTemplate>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
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
)(Categories);