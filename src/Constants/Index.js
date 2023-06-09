import {Dimensions, PermissionsAndroid} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import RNFS from 'react-native-fs';
import {moderateScale} from 'react-native-size-matters';
import socket from '../utils/socket';
import axiosconfig from '../Providers/axios';
import moment from 'moment';
export const emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
export const passRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
export const dummyImage =
  'https://designprosusa.com/the_night/storage/app/1678168286base64_image.png';
export const width = Dimensions.get('window').width;
export const height = Dimensions.get('window').height;

export const Organization = [
  {id: 'Alpha Phi Alpha Fraternity, Inc.', color: 'blue'},
  {id: 'Alpha Kappa Alpha Sorority Inc.', color: 'green'},
  {id: 'Omega Psi Phi Fraternity, Inc.', color: 'red'},
  {id: 'Delta Sigma Theta Sorority Inc.', color: 'yellow'},
  {id: 'Kappa Alpha Psi Fraternity, Inc.', color: 'orange'},
  {id: 'Sigma Gamma Rho Sorority Inc.', color: 'brown'},
  {id: 'Phi Beta Sigma Fraternity, Inc.', color: 'pink'},
  {id: 'Zeta Phi Beta Sorority Inc.', color: 'purple'},
  {id: 'Iota Phi Theta Fraternity, Inc.', color: 'blue'},
];

export const theme = 'dark';
export const captureImage = async (type, refRBSheet, setFilePath) => {
  let options = {
    mediaType: type,
    maxWidth: moderateScale(300, 0.1),
    maxHeight: moderateScale(270, 0.1),
    quality: 1,
    videoQuality: 'low',
    durationLimit: 30,
    saveToPhotos: true,
  };
  let isCameraPermitted = await requestCameraPermission();
  let isStoragePermitted = await requestExternalWritePermission();
  if (isCameraPermitted || isStoragePermitted) {
    launchCamera(options, response => {
      if (response.didCancel) {
        alert('User cancelled camera picker');
        return;
      } else if (response.errorCode == 'camera_unavailable') {
        alert('Camera not available on device');
        return;
      } else if (response.errorCode == 'permission') {
        alert('Permission not satisfied');
        return;
      } else if (response.errorCode == 'others') {
        alert(response.errorMessage);
        return;
      }

      convertImage(response.assets[0].uri, setFilePath);
      refRBSheet.current.close();
    });
  }
};

const convertImage = async (image, setFilePath) => {
  await RNFS.readFile(image, 'base64')
    .then(res => {
      let base64 = `data:image/png;base64,${res}`;
      setFilePath(base64);
    })
    .catch(err => {
      console.log(err);
    });
};
export const requestCameraPermission = async () => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'App needs camera permission',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  } else return true;
};

export const requestExternalWritePermission = async () => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'External Storage Write Permission',
          message: 'App needs write permission',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      alert('Write permission err', err);
    }
    return false;
  } else return true;
};
export const chooseFile = async (type, refRBSheet, setFilePath) => {
  var options = {
    title: 'Select Image',
    customButtons: [
      {
        name: 'customOptionKey',
        title: 'Choose file from Custom Option',
      },
    ],
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };
  launchImageLibrary(options, res => {
    if (res.didCancel) {
    } else if (res.error) {
    } else if (res.customButton) {
      alert(res.customButton);
    } else {
      let source = res;
      convertImage(source.assets[0].uri, setFilePath);
      refRBSheet.current.close();
    }
  });
};
export const getColor = id => {
  let color;
  Organization?.forEach(elem => {
    if (elem.id == id) {
      color = elem.color;
    }
  });
  return color;
};
// socket functionality
export const socketLike = (postId, postUserId, myId) => {
  socket.emit('like', {
    postId: postId,
    postUserId: postUserId,
    myId: myId,
  });
};
export const socketRequest = (from, to, type) => {
  socket.emit('request', {
    from: from,
    to: to,
    type: type,
  });
};
export const socketComment = (postId, postUserId, myId) => {
  socket.emit('comment', {
    postId: postId,
    postUserId: postUserId,
    myId: myId,
  });
};
export const socketMessage = (from, to, message, time, socketUniqueId) => {
  socket.emit('message', {
    from: from,
    to: to,
    message: message,
    time: time,
    socketUniqueId: socketUniqueId,
  });
};
export const storeMsg = async (msg, token) => {
  await axiosconfig
    .post('message_store', msg, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(res => {
      console.log('message send', res.data);
    })
    .catch(err => {
      console.log(err);
    });
};
export function formatTimestamp(timestamp) {
  const now = moment();
  const date = moment(timestamp);
  if (now.isSame(date, 'day')) {
    return date.format('h:mm A');
  } else {
    return date.format('DD/mm/yyyy');
  }
}
export const Poppins = '';
export const PoppinsBold = '';
export const generateRandomId = () => {
  const timestamp = Date.now().toString(36);
  const randomString = Math.random().toString(36).substring(2);
  return timestamp + randomString;
};
