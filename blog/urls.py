from django.conf.urls import url
from . import views


urlpatterns = [
    # url(r'^$', views.post_list, name='post_list'),
    # url(r'^post/(?P<pk>\d+)/$', views.post_detail, name='post_detail'),
    url(r'^$', views.api_root, name='api_root'),
    url(r'^api/post/$', views.PostListAPI.as_view(), name='post_list'),
    url(r'^api/post/(?P<pk>\d+)/$', views.PostDetailAPI.as_view(), name='post_detail'),
    # url('http://localhost:8080/post/(?P<pk>\d+)/$', views.PostDetailAPI.as_view(), name='post_detail_2'),
    url(r'^api/comment/$', views.CommentListAPI.as_view(), name='comment_list'),
    url(r'^api/comment/(?P<pk>\d+)/$', views.CommentDetailAPI.as_view(), name='comment_detail'),
    url(r'^api/user$', views.UserAPI.as_view(), name='user')

]