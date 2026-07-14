
// import axiosClient from "./axiosClient";

// export const getFamilyMembers = async (familyId) => {

//     const response =
//         await axiosClient.get(

//             `families/${familyId}/family-members/`

//         );

//     return response.data;

// };

// export const createFamilyMember = async (

//     familyId,

//     data

// ) => {

//     const response =
//         await axiosClient.post(

//             `families/${familyId}/family-members/`,

//             data

//         );

//     return response.data;

// };

// export const getFamilyMember = async (id) => {

//     const response =
//         await axiosClient.get(

//             `family-members/${id}/`

//         );

//     return response.data;

// };

// export const updateFamilyMember = async (

//     id,

//     data

// ) => {

//     const response =
//         await axiosClient.patch(

//             `family-members/${id}/`,

//             data

//         );

//     return response.data;

// };

// export const deleteFamilyMember = async (id) => {

//     await axiosClient.delete(

//         `family-members/${id}/`

//     );

// };


import axiosClient from "./axiosClient";

export const getFamilyMembers = async (familyId) => {

    const response = await axiosClient.get(
        // `families/${familyId}/family-members/` changed
        `families/${familyId}/members/`
    );

    return response.data;
};

export const createFamilyMember = async (
    familyId,
    data
) => {

    const response = await axiosClient.post(
        // `families/${familyId}/family-members/`, changed
        `families/${familyId}/members/`,
        data
    );

    return response.data;
};

export const getFamilyMember = async (id) => {

    const response = await axiosClient.get(
        //changed
        // `family-members/${id}/`
        `members/${id}/`

    );

    return response.data;
};

export const getMyProfile = async () => {

    const response = await axiosClient.get(
        //changed
        "members/me/"
    );

    return response.data;
};

export const updateMyProfile = async (
    data
) => {

    const response = await axiosClient.patch(
        "members/me/",
        // "family-members/me/", changed
        data
    );

    return response.data;
};

export const updateFamilyMember = async (
    id,
    data
) => {

    const response = await axiosClient.patch(
        // `family-members/${id}/`, changed
        `members/${id}/`,
        data
    );

    return response.data;
};

export const deleteFamilyMember = async (
    id
) => {

    await axiosClient.delete(
        // `family-members/${id}/` changed
        `members/${id}/`
    );
};