import { storageRef } from "@/utils/firebaseInit.js";

export default function useFirebaseStorage() {
  //reuse from N315 final project

  const uploadImage = async (imageUpload) => {
    if (imageUpload == null) {
      console.log("no image selected");
      return;
    }

    const imageName = +new Date() + "-" + imageUpload.name;
    const metadata = {
      contentType: imageUpload.type,
    };

    return new Promise((resolve, reject) => {
      // const storageRef = firebase.storage().ref();
      let uploadTask = storageRef
        .child("images/" + imageName)
        .put(imageUpload, metadata);
      uploadTask.on(
        "state_changed",
        function (snapshot) {},
        function (error) {
          console.log(error);
          alert(MESSAGES.ERROR_IMG_UPLOAD);
          reject(error);
        },
        function () {
          uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
            console.log("Uploaded a blob or file!");
            console.log("got downloadURL: ", downloadURL);
            resolve(downloadURL);
          });
        }
      );
    });
  };

  return {
    uploadImage,
  };
}
