import Ember from 'ember';

/**
 * class to used in conjunction with the document-uploader component
 * supplies a number of helper lists and functions to support a middle step
 * where the users modifies data to be submitted along with the file(s)
 *
 * To use: extend your controller with this mixin
 * Depends on
 *     - initializers/lists
 *     - A currently open matter #
 *
 *
 */
export default Ember.Mixin.create({

    // config server values
    postURL: function () {
        return this.postBase + this.postResource;
    }.property('postResource', 'postBase'),
    postResource: 'documents',
    postBase: '/phalcon-base/v1/',

    // an array of records that map to the file upload form
    // hold extra inputs like subject, docType, viewable, receipt whatever
    fileList: [],

    // the list of files to be uploaded
    //pulled form the upload components
    files: null,
    // class that actually runs the upload
    uploader: null,


    // lists to be used on the template
    // this probably doesn't belong in the mixin
    fileTypes: [
        'green', 'yellow', 'red'
    ],
    selectedType: 'yellow',
    subjectList: [
        {name: 'billy', id: 12},
        {name: 'bobby', id: 14}
    ],
    selectedSubject: 12,

    // make matter controller available in the mixin
    needs: "matter",
    matter: Ember.computed.alias("controllers.matter"),

    //use an object literal to store all variables destined
    propertyBag: {},


    // hook to be called before we actually submit files & post for upload
    // use this function to process custom data from fileList (ie the form)
    // store in the property bag
    // you probably want to write your own in the calling controller
    beforeUpload: function () {
        //customize me in the controller

    },

    // hook to be called after uploading is successful
    // you probably want to write your own in the calling controller
    // this one will attempt to work with documents by default
    afterUpload: function (self, data) {
        var store = self.store;

        if (Ember.none(data)) {
            // the upload failed
            console.log('no dice...clay');
            return;
        }
        //add the new document to the controller array?
        //flash.success('Successfully uploaded file(s)!');

        if (Array.isArray(data.documents)) {
            data.documents.forEach(function (item) {
                console.log('process multiple documents...');
                //console.log(item);
                store.createRecord('document', item);
            }, self);
        } else {
            console.log('process single document');
            //load object into controller here?
            store.createRecord('document', data.document);
        }

        //now reset to the documents page
        this.transitionToRoute('matter.documents');
    },

    actions: {
        // will prep data going to POST & pass along to the uploader
        upload: function () {
            console.log('upload action called');

            //make some variables available for future use
            var self = this;
            var files = this.files;
            var uploader = this.uploader;
            //var store = this.get('store');

            //call beforeUpload hook
            this.beforeUpload();

            ////loop through each file and upload?
            var promise = uploader.upload(files, this.get('propertyBag'));
            ////single file example
            //var promise = uploader.upload(files[0]);

            promise.then(function (data) {
                console.log('upload successful...but then again, it is ALWAYS successful ATM');
                //call afterUpload
                self.afterUpload(self, data);
            }, function (error) {
                // Handle failure
                // would use flash message here, but it isn't supported in a mixin yet
                // flash.error('File Upload Failed!');
                console.log(error);
            });
        }

    }
});