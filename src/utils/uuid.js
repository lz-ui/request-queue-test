/*
 * @Author: your name
 * @Date: 2021-06-07 09:45:33
 * @LastEditTime: 2021-06-07 12:01:16
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /my-react-app/src/utils/uuid.js
 */
function Uid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      let r = Math.random() * 16 | 0,
          v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
  });
};

export default Uid

