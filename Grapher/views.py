import json

from pandas.io.json import json_normalize
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from sklearn.metrics import accuracy_score as acc
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.svm import SVC

class SrcGrapherView(APIView):

    def get(self, format=None):
        return Response(None)

    def post(self, request):
        # return Response(JsonEncoder().encode(CodeParser().start((request.data).get("code"))),
        #                 status=status.HTTP_202_ACCEPTED)

        json_data = json.loads(request.body.decode(encoding='UTF-8'))
        print('Waiting ...')
        print('kernel is ' + str(json_data['kernel']))

        df = json_normalize(json_data['feature'])
        df.drop(df.columns[0], axis=1, inplace=True)

        df['s1'] = df['s1'].astype('int')
        df['s2'] = df['s2'].astype('int')
        df['s3'] = df['s3'].astype('int')
        df['s4'] = df['s4'].astype('int')
        df['s5'] = df['s5'].astype('int')
        df['s6'] = df['s6'].astype('int')
        df['s7'] = df['s7'].astype('int')
        df['s8'] = df['s8'].astype('int')
        df['malware'] = df['malware'].map({'False': False, 'True': True})

        X = df.iloc[:, 1:9].values
        Y = df.iloc[:, 9].values

        X_train, X_test, y_train, y_test = train_test_split(X, Y.astype(int), test_size=0.3)

        sc = StandardScaler()
        X_train = sc.fit_transform(X_train)
        X_test = sc.transform(X_test)

        classifier = SVC(kernel=str(json_data['kernel']), degree=3)
        classifier.fit(X_train, y_train)

        y_pred = classifier.predict(X_test)
        accuracy = acc(y_test, y_pred)
        print('accuracy', accuracy)

        return Response(accuracy, status=status.HTTP_202_ACCEPTED)
