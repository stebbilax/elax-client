import React, { Component } from "react";
import { Admin, Resource, ListGuesser } from "react-admin";
import jsonServerProvider from 'ra-data-json-server'

const dataProvider = jsonServerProvider('https://elax-api.herokuapp.com/api/v1')


class AdminPanel extends Component {


    render() {
        return (
            <Admin dataProvider={dataProvider}>
                <Resource name="albums" list={ListGuesser} />
            </Admin>
        );
    }
}
export default AdminPanel;