const router = require('express').Router();

const {
    getAllUsers,
    addUser,
    getUserById,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/user-controller');

router.route('/')
.get(getAllUsers)
.post(addUser);

router.route('/:id')
.get(getUserById)
.put(updateUser)
.delete(deleteUser);

router.route('/:id/friends/:friendID')
.post(addFriend)
.delete(deleteFriend);

module.exports = router;