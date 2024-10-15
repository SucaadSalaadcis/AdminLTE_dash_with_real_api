
import { createSlice } from '@reduxjs/toolkit';

const dataSlice = createSlice({
    name: 'userData',

    initialState: {
        roles: {
            data: [],
            loading: false,
        },
        permissions: {
            data: [],
            loading: false,
        },
        users: {
            data: [],
            loading: false,
        },
        products: {
            data: [],
            loading: false,
        },
        customers: {
            data: [],
            loading: false,
        },
        agents: {
            data: [],
            loading: false,
        },
        orders: {
            data: [],
            loading: false,
        },

    },

    // A reducer is a pure function that takes the current state and an action and returns a new state.
    reducers: {
        setRolesData: (state, action) => {
            state.roles.loading = false;
            state.roles.data = action.payload;
        },
        setUserData: (state, action) => {
            state.users.loading = false;
            state.users.data = action.payload;
        },
        setPermisionData: (state, action) => {
            state.permissions.loading = false;
            state.permissions.data = action.payload;
        },
        setProductData: (state, action) => {
            state.products.loading = false,
                state.products.data = action.payload;
        },
        setCustomerData: (state, action) => {
            state.customers.loading = false,
                state.customers.data = action.payload;
        },
        setAgentData: (state, action) => {
            state.agents.loading = false,
                state.agents.data = action.payload;
        },
        setOrderData: (state, action) => {
            state.loading = false,
                state.orders.data = action.payload;
        },


        removeOneData: (state, action) => {
            const { id, type } = action.payload;

            if (type === 'role') {
                // Remove the item with id = 2 by keeping all the items where x.id !== 2.
                state.roles.data = state.roles.data.filter(x => x.id !== id);
            } else if (type === 'user') {

                state.users.data = state.users.data.filter(x => x.id !== id);
            } else if (type === 'permision') {

                state.permissions.data = state.permissions.data.filter(x => x.id !== id);
            } else if (type === 'product') {

                state.products.data = state.products.data.filter(x => x.id !== id);
            } else if (type === 'customer') {

                state.customers.data = state.customers.data.filter(x => x.id !== id);
            } else if (type === 'agent') {

                state.agents.data = state.agents.data.filter(x => x.id !== id);
            } else if (type === 'order') {

                state.orders.data = state.orders.data.filter(x => x.id !== id);
            }
        },


    },
});


export const { setRolesData, setUserData, setPermisionData, setProductData, setCustomerData, setAgentData, setOrderData, removeOneData } = dataSlice.actions;

export default dataSlice.reducer;

// the state looks like this
/* state = {
    deleteAll: {
      data: [
        { id: 1, name: 'item 1' },
        { id: 2, name: 'item 2' },
        { id: 3, name: 'item 3' },
      ]
    }
  }; */


// Action: In Redux, an action is simply a JavaScript object that describes what happened in the application.
// Every action has at least a type field, which indicates the type of action being performed(e.g., ADD_ITEM, DELETE_ITEM, UPDATE_ITEM).

// Payload: The payload is an optional property in the action object that contains the data or information that the reducer needs to update the state.For example, if you're deleting an item, the payload would usually include the id of the item to delete.

/* {
    type: 'DELETE_ITEM',
    payload: {
      id: 2
    }
  } */

// type: This is the action type, such as 'DELETE_ITEM', which tells the reducer what to do.
// payload: This is the data the action is carrying. In this example, payload contains the id of the item we want to delete.


// When you dispatch an action like this:
/*  dispatch({
    type: 'DELETE_ITEM',
    payload: {
      id: 2
    }
  }); */
