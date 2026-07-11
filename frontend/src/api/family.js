import axiosClient from './axiosClient'

export const createFamily=async(data)=>{
    const response=await axiosClient.post(
        "families/",
        data
    );
    return response.data;
}



export const joinFamily=async(inviteCode)=>{
    const response=await axiosClient.post(
        "families/join/",
        {
            invite_code:inviteCode
        }
    );
    return response.data;
}


export const getMemberships = async (familyId) => {

    const response = await axiosClient.get(
        `families/${familyId}/memberships/`
    );

    return response.data;
};

export const updateMembershipRole = async (
    familyId,
    membershipId,
    role
) => {

    const response = await axiosClient.patch(
        `families/${familyId}/memberships/${membershipId}/`,
        {
            role,
        }
    );

    return response.data;
};