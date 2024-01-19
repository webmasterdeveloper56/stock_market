import logging
from django_cron import CronJobBase, Schedule
from .models import StockOrder
from .models import Transaction
from .models import CustomUser, Materials
from .views import BUYORDER, SELLORDER

from django.shortcuts import get_object_or_404
class Matching(CronJobBase):
    RUN_EVERY_MINS = 1

    schedule = Schedule(run_every_mins=RUN_EVERY_MINS)
    code = 'stock_market.cron'    # a unique code

    def do(self):
        excuetMatching()

def excuetMatching():
    buyLists = []
    matchedHistory = []
    sellLists = []
    buy_orders = StockOrder.objects.filter(order_type='buy').order_by('-price')
    for order in buy_orders:
        buyLists.append({'id': order.id,'user':order.user.id, 'stockid': order.stock_id.id, 'price': order.price, 'amount': order.quantity, 'date': order.timestamp})
        print(f"Order ID: {order.id}, Price: {order.price}, Quantity: {order.quantity}")
    sell_orders = StockOrder.objects.filter(order_type='sell').order_by('price')
    for order in sell_orders:
        sellLists.append({'id': order.id,'user':order.user.id ,'stockid': order.stock_id.id, 'price': order.price, 'amount': order.quantity, 'date': order.timestamp})
        print(f"Order ID: {order.id}, Price: {order.price}, Quantity: {order.quantity}")

    def match_orders(orderList, sellList):
        for buy_order in orderList:
            while buy_order['amount'] > 0:
                matching_sell_order = find_matching_sell_order(buy_order, sellList)
                if not matching_sell_order:
                    print('no matched')
                    break  # No matching sell order found

                if matching_sell_order['amount'] >= buy_order['amount']:
                    # Sell order can fully fulfill the buy order
                    matching_sell_order['amount'] -= buy_order['amount']
                    stock_order = get_object_or_404(StockOrder, id = buy_order["id"])
                    stock_order.delete()
                    logging.warn("deleted", buy_order['user'])

                    buyer = CustomUser.objects.get(id=buy_order['user'])
                    seller = CustomUser.objects.get(id=matching_sell_order['user'])
                    stock = Materials.objects.get(id=buy_order['stockid'])
                    StockOrder.objects.filter(order_type=SELLORDER, id = matching_sell_order['id']).update(quantity=matching_sell_order['amount'])
                    Transaction.objects.create(buyer = buyer, seller= seller, stockId=stock, price = matching_sell_order['price'], quantity = buy_order['amount'])
                    matchedHistory.append(buy_order.copy())
                    buy_order['amount'] = 0
                    if matching_sell_order['amount'] == 0:
                        sellList.remove(matching_sell_order)
                        
                else:
                    buy_order['amount'] -= matching_sell_order['amount']
                    buyer = CustomUser.objects.get(id=buy_order['user'])
                    seller = CustomUser.objects.get(id=matching_sell_order['user'])
                    stock = Materials.objects.get(id=buy_order['stockid'])
                    StockOrder.objects.filter(order_type=BUYORDER, id = buy_order['id']).update(quantity=buy_order['amount'])
                    stock_order = get_object_or_404(StockOrder, id = matching_sell_order["id"])
                    stock_order.delete()
                    Transaction.objects.create(buyer = buyer, seller= seller, stockId=stock, price = matching_sell_order['price'], quantity = buy_order['amount'])
                    sellList.remove(matching_sell_order)
                    matchedHistory.append(matching_sell_order)

    def find_matching_sell_order(buy_order, sellList):
        for sell_order in sellList:
            if sell_order['price'] <= buy_order['price']:
                print('matched', sell_order['price'])
                return sell_order
        return None



    print(match_orders(buyLists, sellLists))

    print("buyLists", buyLists)
    print("sellLists", sellLists)
    print("matchedHistory", matchedHistory)
    print("Cron job executed")
