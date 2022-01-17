import { extendObservable } from 'mobx';

class UserStorage{
    isLoggedIn() {
        if (!UserStorage.token) {
            return false;
        }
        return true;
    }

    isSpec() {
        return UserStorage.roleLevel === 2;

    }

    logout() {
        window.localStorage.removeItem('userdata');
        UserStorage.token = ""
        UserStorage.roleLevel = -1
        UserStorage.userId = -1
        UserStorage.specId = -1
    }

    login(roleLevel,token,userId,specId){
        UserStorage.token = token
        UserStorage.roleLevel = roleLevel
        UserStorage.userId = userId
        UserStorage.specId = specId

        let userdata = {
            token: token,
            roleLevel: roleLevel,
            userId: userId,
            specId: specId
        }

        window.localStorage.setItem('userdata', JSON.stringify(userdata));
    }

    constructor() {
        let token = '';
        let roleLevel = -1;
        let userId = -1;
        let specId = -1;
        const userdata = window.localStorage.getItem('userdata');
        if (userdata !== null) {
            ({token, roleLevel,userId,specId} = JSON.parse(userdata));
        }

        UserStorage.token = token
        UserStorage.roleLevel = roleLevel
        UserStorage.userId = userId
        UserStorage.specId = specId

        extendObservable(this, {
            token: token,
            roleLevel: roleLevel,
            userId: userId,
            specId: specId
        })
    }
}
export default new UserStorage();