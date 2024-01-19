import time
from datetime import datetime
import logging
from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from .models import CustomUser, StockOrder, Transaction, Materials, UserStocks
from django.shortcuts import get_object_or_404
BUYORDER = 'buy'
SELLORDER = 'sell'
def buyOderView(request):
    useremail = request.GET['useremail']

    StockOrder.objects.create(user=useremail, stock_name='food', order_type=BUYORDER, price='12', quantity='2', timestamp=datetime.now().timestamp())
    
    return HttpResponse("Buy Order View")

def userRegisterView(request):
    if request.method == 'GET':
        username = request.GET.get('username')
        userpasswd = request.GET.get('password')
        useremail = request.GET.get('userEmail')
        try:
            if CustomUser.objects.filter(useremail = useremail).exists():
                return HttpResponse("user already exists")
            
            newUser = CustomUser.objects.create(username=username, useremail=useremail, userpasswd=userpasswd)
        except Exception as e :
            logging.error(e)
            return HttpResponse("failed")
        logging.error("Created New User", newUser)
    return HttpResponse("success")

def userLoginView(request):
    if request.method == 'GET':
        userpasswd = request.GET.get('password')
        useremail = request.GET.get('email')
        try:
            if CustomUser.objects.filter(useremail = useremail, userpasswd=userpasswd).exists():
                user = CustomUser.objects.get(useremail = useremail, userpasswd=userpasswd)
                res = {
                    'status': 'success',
                    'message': 'login success',
                    "data": {
                        'useremail' : user.useremail,
                        'id': user.id,
                        'name':user.username
                    }
                }
            else:
                res = {
                    'status': 'failed',
                    'message': 'incorrect info',
                    "data": {}
                }
            
            return JsonResponse(res)
        
        except Exception as e :
            logging.error(e)
            res = {
                'status': 'failed',
                'message': 'server error',
                "data": {}
            }
            return JsonResponse(res)

def userOrdersView(request):
    data = []
    res = {
        'status':'failed',
        'message': 'server error',
        'data': data
    }
    userId = 1
    try:
        currentUser = CustomUser.objects.get(id=userId)
        orders = StockOrder.objects.filter(user = currentUser)
        for order in orders:
            data.append({'id': order.id,'stock':order.stock_id.stockname, 'amount': order.quantity, 'price': order.price, 'type': order.order_type})
        res = {
            'status':'success',
            'message': 'succeced',
            'data': data
        }
    except Exception as e:
        logging.error(e)
    return JsonResponse(res, safe=False)

def userHistoryView(request):
    data = []
    res = {
        'status':'failed',
        'message': 'server error',
        'data': data
    }
    try:
        transations = Transaction.objects.all()
        for tr in transations:
            data.append({'id': tr.id, 'from': tr.buyer.username, 'to': tr.seller.username, 'stock': tr.stockId.stockname, 'amount': tr.quantity, 'price': tr.price, 'date': tr.timestamp })
        res = {
            'status':'success',
            'message': 'succeced',
            'data': data
        }
    except Exception as e:
        logging.error(e)

    return JsonResponse(res, safe=False)

def getSellsView(request):
    data = []
    res = {
        'status':'failed',
        'message': 'server error',
        'data': data
    }
    try:
        sellOrders = StockOrder.objects.filter(order_type = SELLORDER)
        for order in sellOrders:
            data.append({'owner': order.user.username, 'stock':order.stock_id.stockname, 'amount': order.quantity, 'price': order.price})
        res = {
            'status':'success',
            'message': 'succeced',
            'data': data
        }
    except Exception as e:
        logging.error(e)
    return JsonResponse(res, safe=False)

def getBuysView(request):
    data = []
    res = {
        'status':'failed',
        'message': 'server error',
        'data': data
    }
    try:
        buyOrders = StockOrder.objects.filter(order_type = BUYORDER)
        for order in buyOrders:
            data.append({'owner': order.user.username, 'stock': order.stock_id.stockname, 'amount': order.quantity, 'price': order.price})
        res = {
            'status':'success',
            'message': 'succeced',
            'data': data
        }
    except Exception as e:
        logging.error(e)

    return JsonResponse(res, safe=False)

def getStocksView(request):
    data = []
    res = {
        'status':'failed',
        'message': 'server error',
        'data': data
    }
    try:
        materials = Materials.objects.all()
        for mt in materials:
            data.append({'id': mt.id, 'stockname': mt.stockname})
        res = {
            'status':'success',
            'message': 'succeced',
            'data': data
        }
    except Exception as e:
        logging.error(e)

    return JsonResponse(res, safe=False)

def getHistoryView(request):
    data = []
    res = {
        'status':'failed',
        'message': 'server error',
        'data': data
    }
    try:
        transations = Transaction.objects.all()
        for tr in transations:
            print("TR--------", tr.id)
            data.append({'id': tr.id, 'from': tr.buyer.username, 'to': tr.seller.username, 'stock': tr.stockId.stockname, 'amount': tr.quantity, 'price': tr.price, 'date': tr.timestamp })
        res = {
            'status':'success',
            'message': 'succeced',
            'data': data
        }
    except Exception as e:
        logging.error(e)

    return JsonResponse(res, safe=False)

def setOrdersView(request):
    userId = request.GET.get('userId')
    type = request.GET.get('type')
    stockId = request.GET.get('stockId')
    amount = request.GET.get('amount')
    price = request.GET.get('price')
    try:
        user = CustomUser.objects.get(id=userId)
        mt = Materials.objects.get(id = int(stockId))
        StockOrder.objects.create(user=user, stock_id=mt, order_type=type, price=price, quantity=amount, timestamp=datetime.now().timestamp())
        from .cron import excuetMatching
        excuetMatching()

    except Exception as e:
        logging.error(e)
        res = {
            'status': 'failed',
            'message': 'server error'
        }
        return JsonResponse(res)
    
    res = {
        'status': 'success',
        'message': 'Created New Order'
    }
    return JsonResponse(res)

def deleteOrder(request):
    res = {
        'status': 'success',
        'message': 'Created New Order'
    }
    order_id = request.GET.get('orderId')
    try:
        stock_order = get_object_or_404(StockOrder, id = order_id)
        stock_order.delete()
    except Exception as e:
        res = {
            'status': 'failed',
            'message': 'server error'
        }
    return JsonResponse(res)

def matching(request):
    from .cron import excuetMatching
    excuetMatching()
    return JsonResponse("success", safe=False)