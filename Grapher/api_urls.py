from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from .views import *

app_name = 'grapher'


urlpatterns = [
]

urlpatterns += format_suffix_patterns([

    url(r'^grapher/$',
        SrcGrapherView.as_view(),
        name='graph'),

    # url(r'^logParser/(?P<pk>\d+)/$',
    #     LogParserView.as_view(),
    #     name='logParser_list_update'),
    #
    # url(r'^customPattern/$',
    #     CustomPatternView.as_view(),
    #     name='custom_pattern_list'),
    #
    # url(r'^customPattern/(?P<pk>\d+)/$',
    #     CustomPatternView.as_view(),
    #     name='custom_pattern_list'),
    #
    # url(r'^jasonParser/$',
    #     JasonParserView.as_view(),
    #     name='jason_parser_list'),
    #
    # url(r'^jasonParser/(?P<pk>\d+)/$',
    #     JasonParserView.as_view(),
    #     name='jason_parser_list_update'),
])

