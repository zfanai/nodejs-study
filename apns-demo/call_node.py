#encoding:utf8

import os
import base64
import json


#args={
#'deviceToken':'ddddddsskdjflekfjlskdjflekfjlsdkjffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffje;lfkjlsdkfjlekfjlskdjfsefefefsdfefsdfefsdfefsdfefsdfefsdfefddddd123',
# 'data': {
#     'event':1
#  }
#}
args={
    'deviceToken':'f54edf9caf714c53b01a276cff496a81be2a6b48b207f0fb8ebcd3def77db9c7',
    'production':False,
    'topic':'com.medtrum.buddleid',
    'alert':{
        'body':'glucose high',
        'title':'high glucose'
    },
    'payload':{
        'event':5,
        'user_name':'zftest1'
    }

}

b64str=base64.b64encode(json.dumps(args,ensure_ascii=False))
print 'b64str:', b64str

#os.system('node hello.js '+b64str);
os.system('node apns_push.js '+b64str);
