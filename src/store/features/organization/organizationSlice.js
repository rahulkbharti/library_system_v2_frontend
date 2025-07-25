import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    organizations: [],
    selectedOrganization: null,
};

const organizationSlice = createSlice({
    name: 'organization',
    initialState,
    reducers: {
        setOrganizations(state, action) {
            state.organizations = action.payload;
        },
        selectOrganization(state, action) {
            state.selectedOrganization = action.payload;
        },
        clearSelectedOrganization(state) {
            state.selectedOrganization = null;
        },
    },
});

export const { setOrganizations, selectOrganization, clearSelectedOrganization } = organizationSlice.actions;
export default organizationSlice.reducer;
