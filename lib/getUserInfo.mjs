function getUserInfo(user){
    return{
        username: user.username,
        name: user.name,
        id: user.id || user._id,
        imageProfile: user.imageProfile,
        roll: user.roll,
        estado: user.estado,
        publication: user.publication.map((pub) => ({
            _id: pub._id,
            image: pub.image,
            description: pub.description,
            estado: pub.estado
        }))
    };
};
export default getUserInfo;