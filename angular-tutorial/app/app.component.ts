import * as template from './app.template.html';

export const appComponent = {
  template,
  controller($http, $log, $state) {
      const blog = this;
      let commentsData;
      let postsData;
      let userData;
      blog.commentFormData = {
          text: ''
      };
      blog.postFormData = {
          text: '',
          title: ''
      };

      blog.$onInit = () => {
          $http.get('http://127.0.0.1:8000/api/post').then(response => {
              $log.log(response.data);
              blog.posts = response.data;
              postsData = response.data;
          });

          $http.get('http://127.0.0.1:8000/api/comment').then(response => {
              // $log.log(response.data);
              $log.log(response.data);
              commentsData = response.data;
              $log.log(commentsData);
          });

          $http.get('http://127.0.0.1:8000/api/user').then(response => {
              $log.log(response.data);
              userData = response.data;
          });
      };

      blog.getComments = (postPk) => {
          const commentList = [];
          for (const c of commentsData) {
              // $log.log(c);
              if (c.article === postPk) {
                  commentList.push(c);
              }
          }
          $log.log(commentList);

          if (commentList.length > 0) {
                  return commentList;
              } else {
                  $log.log('No comment yet for post ' + postPk);
              }
      };

      blog.goToPost = (postPk) => {
          return $state.go('postDetail', {pk: postPk});
      };

      // blog.getPost = (postPk) => {
      //     return $http.get('http://127.0.0.1:8000/api/post/' + postPk).then(response => {
      //         $log.log(response.data);
      //     });
      // };

      blog.getPost = (pk) => {
          $log.log(this);
          for (const p of postsData) {
              if (p.pk === pk) {
                  $log.log(pk);
                  return p.text;
              }
          }
      };

      blog.commentForm = (postPk) => {
          return $http.post('http://127.0.0.1:8000/api/comment/',
              {text: blog.commentFormData.text, article: postPk, author: 103}).then(response => {
                  $log.log(response.data);
                  commentsData.push(response.data);
                  blog.commentFormData.text = '';
          });
      };

      blog.postForm = () => {
          return $http.post('http://127.0.0.1:8000/api/post/',
              {writer: 105, title: blog.postFormData.title, text: blog.postFormData.text}).then(response => {
                  $log.log(response.data);
                  postsData.push(response.data);
                  blog.postFormData.text = '';
                  blog.postFormData.title = '';
          });
      };

      blog.getUserName = (userPk) => {
          for (const user of userData) {
              if (user.pk === userPk) {
                  return user.username;
              }
          }
      };
  }
};
