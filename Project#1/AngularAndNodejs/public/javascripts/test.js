(function() {
  var app = angular.module('AdminInterface', []);

  app.controller('PostsCtrl', function(){
    this.post = {};

    this.addPost = function(postData) {
      posts.push(this.post);

    this.post = {};
    }
  });

  app.controller('EditPagesCtrl', function(){
    this.posts = postDetails;
  });



  var postDetails = 
  [
    {
      postName: "Hello World",
      postDescription: "Welcome to my website",
      imageUrl: "#"
    }
  ];
})();