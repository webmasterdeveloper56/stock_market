from django.db import models
from django.conf import settings

class CustomUser(models.Model):
    id = models.AutoField(primary_key=True)
    useremail = models.CharField(max_length=255, unique=True)
    username = models.CharField(max_length=255)
    userpasswd = models.CharField(max_length=255)

class Materials(models.Model):
    id = models.AutoField(primary_key=True)
    stockname = models.CharField(max_length=255)

class StockOrder(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, null=True)
    stock_id = models.ForeignKey(Materials, on_delete=models.CASCADE, null=True)
    order_type = models.CharField(max_length=4, choices=[('BUY', 'Buy'), ('SELL', 'Sell')])
    price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.PositiveIntegerField()
    timestamp = models.CharField(max_length=255)


class UserStocks(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, null=True)
    stockId = models.ForeignKey(Materials,on_delete=models.CASCADE,  null=True)
    amount = models.PositiveIntegerField()

class Transaction(models.Model):
    id = models.AutoField(primary_key=True)
    buyer = models.ForeignKey(CustomUser, related_name='buyer', on_delete=models.CASCADE, null=True)
    seller = models.ForeignKey(CustomUser, related_name='seller', on_delete=models.CASCADE, null=True)
    stockId = models.ForeignKey(Materials, on_delete=models.CASCADE, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.PositiveIntegerField()
    timestamp = models.CharField(max_length=255)
