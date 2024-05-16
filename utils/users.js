const users = [];

// joining user to chat
function userjoin(id,username,room) {
    const user = {
        id,
        username,
        room
    };

    users.push(user);

    return user;
}

// get scurrent user
function getCurrentUser (id) {
    return users.find(user=> user.id === id);
}

// user leaving
function userLeave(id) {
    const ind = users.findIndex(user => user.id === id);

    if(ind !== -1) {
        return users.splice(ind,1)[0];
    }
}

// room users
function getRoomUsers(room) {
    return users.filter(user=> user.room === room);
}


export { userjoin, getCurrentUser,getRoomUsers,userLeave }