import { Meteor }          from 'meteor/meteor';
import { FilesCollection } from 'meteor/ostrio:files';

const Filetes = new FilesCollection({
  debug: true,
   //storagePath: 'upload',
  collectionName: 'Filetes',
  allowClientCode: false, // Disallow remove files from Client
  onBeforeUpload: function (file) {
    // Allow upload files under 10MB, and only in png/jpg/jpeg formats
    if (file.size <= 1024 * 1024 * 10 && /png|jpe?g/i.test(file.extension)) {
      return true;
    }
    return 'Please BITCH';
  }
});

if (Meteor.isServer) {
  //Filetes.denyClient();
  Meteor.publish('files.all', function () {
    return Filetes.find().cursor;
  });
} else {
  Meteor.subscribe('files.all');
}

export default Filetes;
