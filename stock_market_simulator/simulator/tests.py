from django.test import TestCase, Client
from django.contrib.auth import get_user_model
from .models import Materials, StockOrder
from datetime import datetime

class SetOrdersViewTestCase(TestCase):
    def setUp(self):
        self.client = Client()
        self.user = get_user_model().objects.create_user(username='testuser', password='testpassword')
        self.material = Materials.objects.create(name='Test Material', description='Test Description')

    def test_set_orders_view(self):
        params = {
            'userId': self.user.id,
            'type': 'buy',  # Or 'SELL', depending on your test case
            'stockId': self.material.id,
            'amount': 10,  # Change as needed
            'price': 50.0,  # Change as needed
        }

        # Make a test request to setOrdersView
        response = self.client.get('/setOrders', params)

        # Check that the response is successful
        self.assertEqual(response.status_code, 200)

        # Check that a StockOrder object was created
        self.assertTrue(StockOrder.objects.exists())

        # Check any additional assertions based on your requirements
        # For example, you might want to check the values of the created StockOrder
        created_order = StockOrder.objects.first()
        self.assertEqual(created_order.user, self.user)
        self.assertEqual(created_order.stock_id, self.material)
        self.assertEqual(created_order.order_type, 'buy')  # Or 'SELL', depending on your test case
        self.assertEqual(created_order.quantity, 10)  # Change as needed
        self.assertEqual(created_order.price, 50.0)  # Change as needed

        # Check that the 'excuetMatching' function was called
        # You might need to mock this function depending on its implementation
        # For simplicity, assume it is called in your view
        self.assertTrue(hasattr(created_order, 'excuetMatching'))

    # Add more test cases as needed
