Stock Market

    A web application that simulates a stock market limit order book, using Django Framework.
    This application allows users to add buy and sell orders for stocks, match orders where possible, and display the current state of the order book through both a UI and an API. 

    Fronted Language: React
    Backend : python (Django)

Installation and Run Instructions

 - frontend

   npm install
   npm start

   https://localhost:3000

 - backend

    Navigate to Project Directory and Create a Virtual Environment.
        python -m venv venv
        Activate the virtual environment:
            On Windows:  venv\Scripts\activate
            On Unix or MacOS:  source venv/bin/activate
    Install Dependencies.
        pip install -r requirements.txt
    Apply Migrations.
        python manage.py makemigration
        python manage.py migrate
    Run the Server.
        python manage.py runserver
        python manage.py runcrons

Matching order algorithm
    Time Complexity (O(Time))
        If there are n buy orders and m sell orders, the time complexity is approximately O(n×m). 
        This assumes that each buy order may potentially check all sell orders.

    Space Complexity (O(Space))
        O(n+m)

    Efficiency
        The algorithm is straightforward and matches buy orders with sell orders based on the price condition.
        It allows for partial fulfillment of orders, which can be efficient in a real-world trading system.
        
    Disadvantages
        Scalability: The time complexity is O(n×m), which might be inefficient for large datasets.

    
    





  