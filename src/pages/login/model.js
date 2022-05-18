import $http from 'api';
import { message } from 'antd';
import { history } from 'umi';

export default {
    namespace: 'login',
    state: {
        // obj -> key valu str
        userInfo: sessionStorage.getItem('userProfile') ? JSON.parse(sessionStorage).getItem('userProfile') : null;
    },
    reducers: {
        updateUserProfile: (state, { payload }) => ({ ...state, ...payload })
    },
    effects: {
        *login({ payload }, { put, call, select }) {
            const { data, msg } = yield call($http.userLogin, payload)
            if (!data) {
                // 没有数据
                message.error(msg);
                return
            }

            sessionStorage.setItem('userProfile', JSON.stringify(data));

            yield put({
                type: 'updateUserProfile',
                payload: { userInfo: data },
            })

            // todo 页面跳转
            console.log('page to  ', data, msg);
        }
    }
}