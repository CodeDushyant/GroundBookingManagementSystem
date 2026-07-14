#ifndef CUSTOMER_H
#define CUSTOMER_H

#include <iostream>
#include <string>

using namespace std;

class Customer
{
private:
    int customerId;
    string name;
    string phone;
    string email;
    string address;

public:

    // Default Constructor
    Customer()
    {
        customerId = 0;
    }


    // Parameterized Constructor
    Customer(int id, string n, string p, string e, string a)
    {
        customerId = id;
        name = n;
        phone = p;
        email = e;
        address = a;
    }


    // Setters

    void setCustomerId(int id)
    {
        customerId = id;
    }

    void setName(string n)
    {
        name = n;
    }

    void setPhone(string p)
    {
        phone = p;
    }

    void setEmail(string e)
    {
        email = e;
    }

    void setAddress(string a)
    {
        address = a;
    }


    // Getters

    int getCustomerId()
    {
        return customerId;
    }

    string getName()
    {
        return name;
    }

    string getPhone()
    {
        return phone;
    }

    string getEmail()
    {
        return email;
    }

    string getAddress()
    {
        return address;
    }


    // Display Customer Details

    void displayCustomer()
    {
        cout << "\n========== Customer Details ==========\n";

        cout << "Customer ID : " << customerId << endl;
        cout << "Name        : " << name << endl;
        cout << "Phone       : " << phone << endl;
        cout << "Email       : " << email << endl;
        cout << "Address     : " << address << endl;

        cout << "=====================================\n";
    }
};

#endif